 var http = require('http');
 var https = require('https');
 var fs = require('fs');
 var config = require('./src/config.js');
 var passport = require('passport'),
 	util = require('util'),
 	LocalStrategy = require('passport-local').Strategy,
 	FacebookStrategy = require('passport-facebook').Strategy;

 var express = require('express');

 var uuid = require('node-uuid');
 var timedif = require('./elements/fun/timedif.js')
 var _ = require('underscore')._;
 var register = require('./elements/register.js')
 var igra = require('./igra/igra.js')
 //uuid.v1();
 var SQLiteStore = require('connect-sqlite3')(express);

 //var token = '105397064351|9RQwsm6vf5nQJMhvyZYXmqpFYx8';
 var db = require('./src/db.js');
 var request = require('request');

 var app = require('express')(),
 	swig = require('swig'),

 	server = require('http').createServer(app),
 	io = require('socket.io').listen(server, {
 		'log level': 1,
 		'transports': ['htmlfile', 'xhr-polling', 'jsonp-polling']
 	})
 	swig.setDefaults({
 		cache: config.config.cache
 	});

 app.engine('html', swig.renderFile);

 app.configure(function() {
 	app.use(express.compress());
 	app.use('/', express.static('/node/DEV/'));
 	app.set('view engine', 'html');
 	app.set('views', __dirname + '/');
 	app.use(express.cookieParser());
 	app.use(express.urlencoded());
 	app.use(express.json());

 	app.use(express.session({
 		store: new SQLiteStore,
 		secret: 'your secret',
 		cookie: {
 			maxAge: 7 * 24 * 60 * 60 * 1000
 		}
 	}));
 	app.use(passport.initialize());
 	app.use(passport.session({
 		store: new SQLiteStore,
 		secret: 'your secret',
 		cookie: {
 			maxAge: 7 * 24 * 60 * 60 * 1000
 		}
 	}));
 	app.use(app.router);
 });

 passport.serializeUser(function(user, done) {
 	done(null, user);
 });

 passport.deserializeUser(function(user, done) {
 	done(null, user);
 });
 passport.use(new FacebookStrategy({
 		clientID: '105397064351',
 		clientSecret: '51a7cfb9c325011bb2a5c5a07de1c1a7',
 		callbackURL: "http://" + config.config.url + "/auth/facebook"
 	},
 	function(accessToken, refreshToken, profile, done) {
 		done(null, profile._json);
 		var data = profile._json;

 		var data1 = profile._json;
 		data1.key = profile._json.id;
 		db.putz(data1);
 		db.get(data.id, function(data) {
 			if (data.message) {

 				register.register(profile._json)
 			};
 		})
 	}
 ));
 passport.use(new LocalStrategy({
 		usernameField: 'username',
 		passwordField: 'password'
 	},
 	function(username, password, done) {
 		db.get(username, function(err, data) {
 			if (data) {
 				done(null, data);
 			} else {
 				done(null, false);
 			}
 		});
 	}
 ));



 app.all('/auth/basic', passport.authenticate('local', {
 	successRedirect: '/',
 	failureRedirect: '/fail'

 }), function(req, res) {

 	res.end('/');
 });

 app.all('/auth/facebook',
 	passport.authenticate('facebook', {
 		scope: ['email', 'user_about_me', 'user_birthday'],
 		successRedirect: '/',
 		failureRedirect: '/auth/facebook'

 	}),
 	function(req, res) {
 		// Successful authentication, redirect home.
 		res.redirect('/');
 	});


 var count = 1;
 io.sockets.on('connection', function(socket) {
 	count++;

 	io.sockets.emit('online', {
 		number: count,
 		id: socket.id
 	});
 	db.put({
 		key: socket.id,
 		value: 'on'
 	})
 	//disconnnect

 	socket.on('disconnect', function() {
 		count--;
 		db.delkey({
 			key: socket.id
 		})
 		io.sockets.emit('online', {
 			number: count,
 			id: socket.id
 		});
 	});
 	socket.on('goldserver', function(call) {
 		var newgold;
 		db.get('gold' + call.uid, function(data) {
 			if (!data.message) {
 				var oldgold = Math.round(JSON.parse(data).value);
 				if (call.add) {
 					newgold = Math.round(call.add) + Math.round(oldgold);
 					io.sockets.socket(socket.id).emit('goldclient', newgold);
 					db.put({
 						key: 'gold' + call.uid,
 						value: Math.round(newgold)
 					})
 				} else if (call.unlock) {
 					newgold = Math.round(oldgold) - Math.round(call.unlock);
 					io.sockets.socket(socket.id).emit('goldclient', newgold);
 					db.put({
 						key: 'gold' + call.uid,
 						value: Math.round(newgold)
 					})

 				} else {
 					io.sockets.socket(socket.id).emit('goldclient', oldgold);
 				}
 			} else {
 				db.put({
 					key: 'gold' + call.uid,
 					value: 1
 				});
 				io.sockets.socket(socket.id).emit('goldclient', 1);
 			}
 		});

 	});

 	socket.on('pmessage', function(call) {
 		var date = new Date;
 		call.date = date.getTime();
 		db.put({
 			key: call.from + '' + call.to,
 			value: 'unread'
 		}, function() {

 		})

 		var insert_message = call;

 		timedif.determine(insert_message.to, call.fromname);


 		db.get('session' + call.from + '' + call.to, function(data1) {
 			if (data1.message) {
 				var session = uuid.v1();
 				insert_message.key = session;
 				db.put(insert_message);
 				insert_message.sender = true;


 				io.sockets.socket(socket.id).emit("msg", insert_message);



 				db.put({
 					key: 'session' + call.from + '' + call.to,
 					value: session
 				}, function() {

 				})
 				db.put({
 					key: 'session' + call.to + '' + call.from,
 					value: session
 				}, function() {

 				})

 				var locked;
 				if (call.locked == true) {
 					locked = "true";
 				} else {
 					locked = "false";
 					db.get(call.to, function(dataz) {

 						db.put({
 							key: 'rec' + call.from,
 							from: call.to,
 							session: session,
 							fromname: JSON.parse(dataz).first_name
 						}, function() {

 						})
 					})
 				}

 				db.put({
 					key: 'rec' + call.to,
 					from: call.from,
 					session: session,
 					fromname: call.fromname,
 					locked: locked
 				}, function() {

 				})



 			} else {

 				var session = JSON.parse(data1).value;
 				insert_message.key = session;
 				db.put(insert_message);
 				insert_message.sender = true;
 				io.sockets.socket(socket.id).emit("msg", insert_message);

 			}

 		})
 		db.get('socket' + call.to, function(data1) {

 			if (typeof data1 === 'object') {

 			} else {

 				insert_message.sender = false;
 				io.sockets.socket(JSON.parse(data1).value).emit("msg", insert_message);
 			}
 		})
 	});
 	socket.on('init', function(call) {
 		if (socket.id == call.value) {


 			db.putz(call, function() {

 				//	io.sockets.socket(call.value).emit(call.key, "Howdy, " + call.key);
 			})

 		};

 	});
 	socket.on('query', function(call) {
 		db.get(call.id, function(data1) {
 			if (!data1.message) {
 				data = {};
 				var items = JSON.parse(data1);
 				if (!items.length) {
 					data = {
 						"items": [items],
 						"call": call.call
 					}
 					io.sockets.socket(socket.id).emit("news", data);
 				} else {
 					data.call = call.call;
 					data.items = JSON.parse(data1);
 					io.sockets.socket(socket.id).emit("news", data);
 				}

 			}
 		})

 	});
 });


 //
 app.post('/reg.html', function(req, res) {

 	bind.toFile(__dirname + '/dev.html', req.body,
 		function callback(data) {
 			res.end(data)
 		});
 	//res.end(JSON.stringify(req.user))

 });

 app.all('/db/:query', db.db2);
 app.all('/db/delkey/:query', db.deletekeyserver);
 app.all('/db/del/:query', db.db2delete);


 var search = require('./elements/search.js');
 //

 app.all('/s-:query-:page', search.search);
 app.all('/s-:query', search.search);
 app.all('/igra', igra.igra);
 app.all('/igrar/:sex', igra.igrar);
 app.all('/charisma', igra.charisma);

 var emp = 'empx-s-xxx';

 app.get('/', function(req, res) {
 	var json = {};
 	if (!req.session.passport.user) {
 		json.notlogged = true;
 	} else {
 		json = req.session.passport.user;
 		json.logged = true;
 		json.index = true;
 		json.profilez = false;
 		json.results = false;
 		json.game = false;
 		json.chat = true;
 		json.emp = emp;
 	}
 	register.locations(json, function(data) {
 		console.log(data);

 	})
 	res.render('dev', json);
 	delete(json)
 });

 app.post('/', function(req, res) {
 	var json = {};
 	res.render('fbapp', json);
 });

  app.post('/dvanadeset/', function(req, res) {
 	 res.sendfile( __dirname+'/dvanadeset/index.html');
 });

 //PROFILE

 app.all('/profile-:id', search.profileinfo);



 server.listen(8080)


 https.createServer({
 		ca: fs.readFileSync('./src/crt/mydomain.ca-bundle'),
 	key: fs.readFileSync('./src/crt/cert/server.key'),
 	cert: fs.readFileSync('./src/crt/cert/test.crt') //crt ive got csr only
 }, app.handle.bind(app)).listen(8081);