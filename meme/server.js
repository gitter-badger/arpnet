var express = require('express');
var concat = require('concat-stream');
var pagination = require('pagination');
//var easyimg = require('easyimage');
var get = require('get')
var db = require('./js/update.js')
var bind = require("bind");
var moment = require('moment')
var caption = require('caption')

//



var app = express();
app.use(express.bodyParser());
app.use("/", express.static(__dirname));


function diffupdate() {
	// body...
	var date = moment(new Date(), 'YYYY-M-DD HH:mm:ss');

	db.db.get(date, function(err, data) {
		// body...
	})
	var startDate = moment(new Date(), 'YYYY-M-DD HH:mm:ss')
	var modDate = moment(new Date(), 'YYYY-M-DD HH:mm:ss')
	var secondsDiff = modDate.diff(startDate, 'minutes')
	console.log(secondsDiff)
}

function dosomeshit(callback) {
	db.query('/?sort=ranking&limit=200&order=asc').pipe(concat(function(bodyx) {
		var data = JSON.parse(bodyx);
		var arr = [];
		data.forEach(function(val, index) {
			arr.push('<div class="col-xs-6 col-md-2">  <img  data-toggle="modal" data-target="#myModal" class="lazy thumbnail" data-original="/db/' + val.value.ranking + '_t.jpg" alt="/db/' + val.value.ranking + '.jpg"></div>')
		})

		callback(arr.join('\n'))
	}))
}



app.get('/', function(req, res) {
	//db.update();
	dosomeshit(function(data) {
		bind.toFile("./dev.html", {
			items: data
		}, function callback(data) {
			res.end(data)
		});
	})
})


app.post('/caption', function(req, res) {
	console.log(req.body);
	var top = req.body.top;
	var bottom = req.body.bottom;
	var file = req.body.file
	console.log(file)
	var randomnumber = Math.floor(Math.random() * 50)
	caption.path('.'+file, {
		caption: top.toUpperCase(),
		bottomCaption: bottom.toUpperCase(),
		outputFile: "./db/cache/" + randomnumber + ".jpg"
	}, function(err, filename) {
		console.log(err)
				console.log(filename)
		res.end('/db/cache/' + randomnumber + '.jpg')
	})
})

app.use("/", express.static(__dirname + '/'));

app.listen(3000);

process.on('uncaughtException', function(err) {
	console.log(err);
});