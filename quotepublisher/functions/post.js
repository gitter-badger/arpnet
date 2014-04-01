var get = require('get');
var fs = require('fs');
var request = require('request')

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
					console.log(text)


					dataz.forEach(function(val, index) {
						if (val.name == "Cancer") {

							console.log(val);
						};
					})



				}

			});
		});
	}
});