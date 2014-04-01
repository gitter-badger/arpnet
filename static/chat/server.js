var http = require('http'),
	bind = require('bind'),
	crypto = require('crypto'),
	uuid = require('node-uuid'),
	express = require('express');
var app = express.createServer();
app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.favicon());
app.set('views', __dirname + '/views');
var session_id = uuid();
console.log(session_id);

app.get('/*', function(req, res) {
	var room = req.param('r', null);
	if (!room) {
		room = "x";
	}

	bind.toFile(__dirname + "/public/indexa.html", {
		"room": room
	}, function callback(data) {
		res.end(data);

	});
});

app.post('/', function(req, res) {

	var signed_request = req.param('signed_request', null);
	var payload = signed_request.split('.');
	var sig = payload[0];
	var data = JSON.parse(new Buffer(payload[1], 'base64').toString());
	var expected_sig = crypto.createHmac('sha256', '97a90631ab340ebbeeb52ef542c2f3f2');
	expected_sig.update(payload[1]);
	expected_sig = expected_sig.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
	bind.toFile(__dirname + "/public/indexa.html", {
		"room": data.page.id
	}, function callback(data) {
		res.end(data);

	});
});

app.listen(3000);
console.log('Server started with Node ' + process.version + ', platform ' + process.platform + '.');

/*
 * Web Sockets
 */


var io = require('socket.io').listen(app),
	users = {},
	totUsers = 0;
users.userlist = [];
io.configure(function() {
	io.enable('browser client minification');
	io.set('log level', 1);
	io.set('transports', ['websocket', 'flashsocket', 'htmlfile']);
});


var chat = io.sockets.on('connection', function(client) {

	users.userlist.push(client.id);
	users[client.id] = {};
	users[client.id].id = client.id;
	users[client.id].nick = client.id;
	console.log('+ New connection from ' + client.handshake.address.address + ':' + client.handshake.address.port);

	client.emit("client_id", {
		client_id: client.id
	});


	io.sockets.emit("users", {
		users: users
	});


	client.on("chat", function(data) {
		io.sockets.emit("chat", {
			room: data.room,
			from: client.id,
			msg: data.msg
		});
	});

	client.on("changenickname", function(data) {
		users[client.id].nick = data.nick;
		users[client.id].room = data.room;

		io.sockets.emit("changenickname", users);
	});


	client.on("private", function(data) {
		io.sockets.sockets[data.to].emit("private", {
			from: client.id,
			to: data.to,
			msg: data.msg
		});
		client.emit("private", {
			from: client.id,
			to: data.to,
			msg: data.msg
		});
	});

	client.on('disconnect', function() {

		var length = users.userlist.length;
		console.log(length);
		for (var i = 0; i < length; i++) {
			if (users.userlist[i] === client.id) {

				delete users[client.id];
				users.userlist.splice(i, 1);
				break;
			}
		}


		io.sockets.emit("users", {
			users: users
		});

	});
});