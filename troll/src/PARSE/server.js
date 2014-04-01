var levelup = require('levelup')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db1 = levelup('./db')
 
var nano = require('nano')('http://127.0.0.1:5984');
var db = nano.use('images')
var get = require('get');
 
 

var limit =  100;


function parse (startfrom) {
  // body...
db1.get('chunk',  function (err,chunk) {
  var chunk =   Math.round(chunk) + 1;
  console.log(chunk)

db1.put('chunk',chunk, function (err) {
get('http://127.0.0.1:5984/images/_all_docs?limit='+limit+'&startkey="'+startfrom+'"&skip=1').asString(function(err, data1) {
  var data = JSON.parse(data1);
 
   var arr = [];
  data.rows.forEach(function function_name (val,key) {

db.get(val.id,function (err,data) {
 
  var json = data;
   

 
db1.put(data.id, JSON.stringify(data), function (err,zzz) {
 

 
      arr.push(data.id);
  if (key == (limit - 1)) {
    console.log(data.id);
     parse(val.id);

 db1.put('last',val.id, function (err) {

});
       




 

 db1.put('trollchunk1-'+chunk, arr.join(','), function (err,x) {
 
 
});
 
 
  
  };

 });

 

});
  })
  // body...


})
});


});

}

 db1.get('last',function (err,data) {
 
 parse(data)

});
 

 
//parse('ffae8daf6cec15ff40a98465fefcaaaa')
 //db1.put('chunk',1, function (err) { });