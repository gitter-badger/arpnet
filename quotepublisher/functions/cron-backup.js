var get = require('get');
var exec = require('child_process').exec;
var fs = require('fs');

function shuffle(o) { //v1.0
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function cron() {
	fs.readFile("/root/token.txt", 'utf8', function(err, token) {

		exec('curl "https://graph.facebook.com/oauth/access_token?client_id=297685923711318&client_secret=7400d71c6f01adc3d1509902dc61751d&grant_type=fb_exchange_token&fb_exchange_token=' + token + '" --sslv3', function(error, stdout, stderr) {
			stdout = stdout.replace('access_token=', '');
			var new_token = stdout;
			if (new_token.length > 30) {
				fs.writeFile("/root/token.txt", new_token, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was saved!");
					}
				});

				get('https://graph.facebook.com/100000770889457/accounts?access_token=' + new_token + '').asString(function(err, body2) {

					if (!err) {
						//var page_post_data = JSON.parse(body2);
						fs.writeFile("/root/accounts.txt", body2, function(err) {
							if (err) {
								console.log(err);
							} else {
								console.log("The file was saved!");
							}
						});



					};

				});

			}

		});
	});


}

exports.post = function(req, res) {


	fs.readFile("/root/token.txt", "utf8", function(err, data1) {

		var token = data1;
		fs.readFile("/root/accounts.txt", "utf8", function(err, data2) {
			if (!err) {

				var dataz = JSON.parse(data2).data;
				var randomnumber = Math.floor(Math.random() * 10000);
				get('http://arpecop.net/quotepublisher/db/stack-hlikesphoto').asString(function(err, data2) {
					var getstack = Math.round(Math.round(JSON.parse(data2).value) / 10 - 1);

					var randomnumber = Math.floor(Math.random() * getstack)

					get('http://arpecop.net/quotepublisher/db/hlikesphoto' + randomnumber).asString(function(err, data1) {
						var randomnumber = Math.floor(Math.random() * 8);
						console.log('length:' + data1.length)
						if (!err &&data1 && data1.length > 20000) {
							console.log(data1.length);
							var data = JSON.parse(JSON.parse(data1).items[randomnumber].data);
							var photox = data.picture;
							photox = photox.replace('_s', '_n');
							var arr = ['333747356705341', '246560865463407', '131839906957023', '432638250153045', '167239423296429'];
							var randomnumber = Math.floor(Math.random() * 30);
							var file = '/tmp/' + randomnumber + '.jpg';
							var description;
							if (data.description) {
								description = data.description;
							} else {
								description = '';
							}
							var dl = get(photox);
							dl.toDisk(file, function(err, filename) {
								res.end('ok');
								arr.forEach(function(val, index) {
									dataz.forEach(function(val1, index1) {
										if (val1.id == val) {
											var marr = [
												'флирт в социaлната мрежа: http://feis.be/',
												'Виж и гласувай за скритите снимки на приятели: http://goo.gl/msEq7O',
												'Най споделяните снимки във FB: http://goo.gl/JjeNjh',
												'Какъв сте били в предишния си живот?: http://goo.gl/71OPxB',
												'На колко години изглеждаш: http://goo.gl/ccBfjf',
												'Какво казват за теб във FB:http://goo.gl/c9o05P',
												'Късметче специално за теб: http://goo.gl/0qZTv0',
												'Мъдрости за мъжете: http://goo.gl/twz8fV',
												'Тялото на мъжа предсказва секса: http://goo.gl/KobGMQ',
												'През кой сезон си роден?: http://goo.gl/3VsXDa',
												'Японски хороскоп: http://goo.gl/BuHCQm'
											];
											var karr = shuffle(marr);

											var mara = karr.join('\n --------------------- \n');

											exec("curl -F 'access_token=" + val1.access_token + "'  -F 'source=@" + file + "'  -F 'message=" + description + "\n" + mara + "'  -F 'uid=" + val + "'   https://graph.facebook.com/" + val + "/photos", function(argument, one, two) {
												// body...
												console.log(one);
											});
										};
									});
								});
							});
						}

					});
				});
			};
			cron();
		});

	});

	res.end('ok')
}
