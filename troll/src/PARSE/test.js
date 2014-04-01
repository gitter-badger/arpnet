var levelup = require('levelup')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db1 = levelup('../db')
 
var nano = require('nano')('http://127.0.0.1:5984');
var db = nano.use('images')
var get = require('get');
 
 
 

 db1.get('10150578185937530',function (err,data) {
 
 console.log(data)

});
 
 var i = 654;

 	 db1.get('trollchunk1-'+i,function (err,bodyx) {
 	 	console.log(bodyx);
 	 	var split  = bodyx.split(",");
 
						split.forEach(function(val1,index1) {
						//	console.log(val1);
							 db1.get(val1,function (err,bodyxx) {
							 	var jsoned = JSON.parse(bodyxx);

						//	 	console.log(jsoned.source);

							 })

					 })
 
 

 	 });

 

//