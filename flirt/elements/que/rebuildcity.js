 var db = require('/node/web/src/db.js');
 fs = require('fs')

 fs.readFile('/node/web/src/completecounty.json', function(err, data1) {
 	var data = JSON.parse(data1.toString());
 	data.forEach(function(val, index) {

 		db.get('stack-' + val, function(data) {
 			if (!data.message) {
 				var stacks;
 				if (data <= 15) {
 					stacks = 0
 				} else {
 					var stacks = Math.round(data / 10)
 				//	console.log('stacks:' + stacks + '------' + data + '----' + val + ' - - -');
 					for (var i = 1; i < stacks + 1; i++) {
 					
 						var key;
 						if (i == 1) {
 							key = val
 						} else {
 							key = val+""+i
 						}
 						 console.log(key)
 							db.get(key,function (datax) {
 								var data = JSON.parse(datax);
 								data.forEach(function (data) {
 									//console.log(data)
 								})
 							})
 						//document.write(cars[i] + "<br>");
 					}

 				}
 			};
 		})
 	})
 })