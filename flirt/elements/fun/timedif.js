//var cc =  '1387133839647';
//var c = new Date().getTime();
/*

var arr = [];
for (var i=2; i<197; i++)
  {
  var key = 'suggestc'
 
 db.get('countryz'+i,function(data){

var sdata = JSON.parse(data);
//
sdata.forEach(function (val,index) {
	 
	console.log('"'+val.val+'",')
})
 https://graph.facebook.com/oauth/access_token?client_id=105397064351&client_secret=51a7cfb9c325011bb2a5c5a07de1c1a7&grant_type=client_credentials
 });
  }
  console.log(arr)
  */

var email = require("emailjs");
var server = email.server.connect({
	user: "noreply",
	password: "mailz",
	host: "flirtbot.net"

});

var request = require('request')
var db = require('../../src/db.js');
var token = '105397064351|9RQwsm6vf5nQJMhvyZYXmqpFYx8'

	function notifynow(uid, fromname) {
		db.get(uid, function(data1) {

			if (!data1.message) {
				var data = JSON.parse(data1);

				db.put({
					key: 'socket' + uid,
					value: "fake"
				});
				db.put({
					key: 'lastnotify' + uid,
					value: new Date().getTime()
				});
				if (data.email) {
					var message = {
						text: " ",
						from: "Flirtbot <root@flirtbot.net>",
						to: data.email,
						subject: "New Message from " + fromname,
						attachment: [{
							data: fromname + " gave you a compliment on your profile picture. http://flirtbot.net/",
							alternative: true
						}]
					};

					// send the message and get a callback with an error or details of the message that was sent
					server.send(message, function(err, message) {

					});
				} else {
					request.post("https://graph.facebook.com/" + uid + "/notifications", {
						form: {
							access_token: token,
							template: "You have new message from  " + fromname + " on flirtbot.net network"
						}
					}, function(err, data) {
						console.log(data.body)

					})
				}

				//
			}
		})
	}


	function timedif(d, dd, callback) {
		var minute = 60 * 1000,
			ms = Math.abs(d - dd);
		var minutes = parseInt(ms / minute, 10);
		callback(minutes);
	};

function determine(uid, fromname) {
	db.get('socket' + uid, function(data1) {
		if (data1.message) {

			notifynow(uid, fromname)
		} else {

			var data = JSON.parse(data1);
			db.get(data.value, function(data) {
				if (!data1.message) {
					db.get('lastnotify' + uid, function(data) {
						if (data.message) {
							// notify now
							notifynow(uid, fromname)
						} else {
							var lastnotify = JSON.parse(data).value;
							var c = new Date().getTime();
							timedif(c, lastnotify, function(data) {
								console.log('last notify')
								console.log(data)
								if (data >= 5) {

									notifynow(uid, fromname)
								} else {
									console.log('no SEX wait')
								}

							})

						}
					})

				}
			});
		}

	})

}



exports.determine = determine;