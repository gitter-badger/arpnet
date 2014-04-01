var get = require('get');
var exec = require('child_process').exec;
var fs = require('fs');
var request = require('request');
var crypto = require('crypto');


function shuffle(o) { //v1.0
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

 
exports.post = function(req, res) {
		var token = "CAAAAHJBZCQF8BAL5dJpLjEd7xNxdyhAUfBPoDcJYk1dM2qoZBKRyRAuxTS9nxKMmphGBp3RzTixazxCET3q1pGTCiMtN9QtHvSdvFKxKSOccMNVsIrrTjxNjRa4Kn8bLLpDRd4muzCyJMIq9UMqEidg2pouBZBFM2T5vCZAZA9YVA0QM7ZAdTv";
		fs.readFile("/root/accounts.txt", "utf8", function(err, data2) {
			if (!err) {
				var dataz = JSON.parse(data2).data;
				var randomnumber = Math.floor(Math.random() * 10000);
				get('http://arpecop.net/quotepublisher/db/stack-vicovey').asString(function(err, data2) {
					var getstack = Math.round(Math.round(JSON.parse(data2).value) / 10 - 1);
					var randomnumber = Math.floor(Math.random() * getstack)
					get('http://arpecop.net/quotepublisher/db/vicovey' + randomnumber).asString(function(err, data1) {


						if (!err && data1 && data1.length > 2000) {
							var randomnumber = Math.floor(Math.random() * JSON.parse(data1).items.length);
							var text = JSON.parse(data1).items[randomnumber].text;
							var uniqid = crypto.createHash('md5').update(text).digest("hex");

							var json = {
								text: text,
								appname: 'Прочети вица ...',
								appurl: 'https://apps.facebook.com/vartelejka/vic/?vic=' + uniqid + '&id=0',
								type: 'object',
								description: text,
								appid: '329232053871264'
							};

							request.post("http://arpecop.net/angel/db2/" + uniqid, {
								form: {
									key: uniqid,
									value: text
								}
							}, function(err, data) {


							});



							request.post("http://arpecop.net/quotepublisher/iztegli/action/" + uniqid, {
								form: json
							}, function(err, data) {
								setTimeout(function() {

							
								}, 4500);

							});

						}

					});
				});
			}
		});
 
 
	res.end('ok')
}