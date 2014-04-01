var request = require('request');
var get = require('get');
var token = 'CAACEdEose0cBANObHqZCJEZAPmVhP5N2dWRZBwip6VHyaWFFta0ofGtCZBFLU91oQIpZBWo7LMegTiirLcuZBZBreEJFrc0DJRbZA8YehD3qZCenBUPqIZC8HOobNNP2xLBbA2WpWvIQXtDmUAlXcdkwZB67hL7zSwDZCAEzomuU5HszZCwZDZD';

new get('https://graph.facebook.com/147489603879/feed?fields=message%2Ctype&limit=3000&type=status&until=1344613403&access_token=' + token).asString(function(err, bdata) {
	var data = JSON.parse(bdata);

	data.data.forEach(function(val, index) {
 
		if (val.type == "status") {
			var json = {};
			json.key = 'vicovey';
			json.text = val.message;

			new get('https://arpecop.net/angel/db2/2' + val.id).asString(function(err, bdata) {
				var checkdata = JSON.parse(bdata);
				if (checkdata.message) {
				//	console.log('inserting');
					request.post('https://arpecop.net/angel/db2/' + val.id, {
						form: {
							key: '2' + val.id,
							value: 'ok'
						}
					});
					request.post('http://arpecop.net/quotepublisher/db/insert', {
						form: json
					});
				} else {
					console.log('alredy inserted')
				}

			});
		};
	})
	console.log(data.paging.next);

})