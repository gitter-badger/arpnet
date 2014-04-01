var Canvas = require('canvas'),
	canvas = new Canvas(320, 320),
	levelup = require('levelup'),
	db = levelup('./mydb'),
	Font = Canvas.Font,
	ctx = canvas.getContext('2d'),
	fs = require('fs'),

	crypto = require('crypto'),
	path = require("path");



function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth) {
			context.textAlign = 'center';
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		} else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}



function fontFile(name) {
	return path.join(__dirname, '/fonts/', name);
}

var pfennigFont = new Font('pfennigFont', fontFile('hanzo.ttf'));
pfennigFont.addFace(fontFile('hanzo.ttf'), 'light');
pfennigFont.addFace(fontFile('hanzo.ttf'), 'bold');


exports.action = function(req, res) {
	//app.all('/action/:id', function(req, res) {
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*'
	});
	var id = req.params.id;
	if (req.method == "POST") {

		var text = req.body.text;


		db.put(id, JSON.stringify(req.body), function(error, value) {
			if (!error) {
				res.end(JSON.stringify(req.body));
			} else {
				res.end('{"error":"fuck"}');
			}
		})
	} else {

		db.get(id, function(error, value) {
			if (!error) {
				var obj = JSON.parse(value);

				res.end('<html> <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# vartelejka: http://ogp.me/ns/fb/vartelejka#">   <title>' + obj.appname + '</title><meta property="fb:app_id" content="' + obj.appid + '" /> <meta property="og:title" content="' + obj.appname + '" /><meta property="og:image" content="http://arpecop.net/quotepublisher/iztegli/?text=' + id + '" />  <meta property="og:url" content="http://arpecop.net/quotepublisher/iztegli/action/' + id + '" /><meta property="og:type" content="' + obj.type + '" /><meta property="og:description" content="' + obj.description + '" /></head><body><script>window.location = "http://adf.ly/217038/' + obj.appurl + '";</script><img src="http://arpecop.net/quotepublisher/iztegli/?text=' + id + '"></body></html>');

			} else {
				res.end('this action does not exist yet')
			}
		})


	}

}
exports.index = function(req, res) {
	//app.get('/', function(req, res) {
	var canvas = new Canvas(300, 300)
	var ctx = canvas.getContext('2d')

	var randnum = Math.floor(Math.random() * 89);
	var maxWidth = 300;
	var lineHeight = 32;
	var x = (canvas.width - maxWidth) / 2 + 150;
	var y = 27;

	// Tell the ctx to use the font.
	ctx.addFont(pfennigFont);


	var text;
 ctx.fillStyle = '#4D69A2';
	 ctx.fillRect(0, 0, 300, 300);
	ctx.font = 'bold 26.5pt pfennigFont';
	ctx.fillStyle = '#FFF';

		ctx.shadowColor = "black";

	// Specify the shadow offset.
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 2;

	ctx.shadowBlur = 2;

	db.get(req.query['text'], function(error, value) {
		if (!error) {
			text = JSON.parse(value).text;
			var base64Data = canvas.toDataURL(wrapText(ctx, text, x, y, maxWidth, lineHeight)).replace(/^data:image\/png;base64,/, "");
			require("fs").writeFile(__dirname + "/cache/" + randnum + ".png", base64Data, 'base64', function(err) {
				res.sendfile(__dirname + "/cache/" + randnum + ".png");
			});

		} else {
			text = req.query['text'];

			if (!text) {
				text = "404";
			};
			if (text.length >= 145) {
				text = text.substr(0, 140) + ' ...';
			};

			var base64Data = canvas.toDataURL(wrapText(ctx, text.toUpperCase(), x, y, maxWidth, lineHeight)).replace(/^data:image\/png;base64,/, "");

			require("fs").writeFile(__dirname + "/cache/" + randnum + ".png", base64Data, 'base64', function(err) {
				res.sendfile(__dirname + "/cache/" + randnum + ".png");
			});
		}

	})


}