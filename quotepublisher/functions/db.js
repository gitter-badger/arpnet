 var request = require('request');

 var level = require('level-rocksdb');
 var dbx = level('/db/mydb');
 //var dbx = levelup('/db/mydb');
 var _ = require('underscore')._;

 function merge_options(obj1, obj2) {
     var obj3 = {};
     for (var attrname in obj1) {
         obj3[attrname] = obj1[attrname];
     }
     for (var attrname in obj2) {
         obj3[attrname] = obj2[attrname];
     }
     return obj3;
 }



 ///////////////

 function put(value) {

     if (typeof(value) == 'object') {
         dbx.get(value.key, function(err, value_old) {
             if (value_old) {
                 var value_old = JSON.parse(value_old);
                 if (value_old.value) {
                     var new_value = merge_options(value_old, value);
                 } else {
                     var new_value = _.union(value, value_old);
                 }



             } else {
                 var new_value = value;

             }
             dbx.put(value.key, JSON.stringify(new_value, null, 4), function(err, value) {

             });
         });

     };

 }

 exports.db2 = function(req, res) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
     res.end('ok');

 }
 ///

 ///



 exports.insert = function(doc, callback) {
     var json = {};
     var limit = 10;
     var key = doc.key.replace(/[0-9]/g, '');

     json = doc;
     dbx.get(doc.key, function(error, body1) {
         // if (!error) {
         var prev = [];

         if (!error) {
             prev = JSON.parse(body1);
         }

         var new_value = _.union(doc, prev)
         if (!json.value || error) {


             if (!prev.cause || prev[0].cause) {

                 dbx.get('stack-' + key, function(error, bodyz) {
                     var total;

                     if (error) {
                         //no total yet
                         total = Math.round(1);
                     } else {


                         total = Math.round(bodyz);
                     }

                     dbx.put('stack-' + key, Math.round(total + 1), function(error, body) {
                         var stack = Math.round(Math.round(total) / limit);
                         var stack1 = Math.round(total) / limit;
                         var new_value1;


                         if (stack <= 1) {
                             json.key = key;
                             new_value1 = new_value;
                             dbx.put(json.key, JSON.stringify(new_value1), function(error, body) {

                                 if (!error) {
                                     var obj = prev;
                                     obj.lengther = prev.length;
                                     callback(prev);
                                 } else {
                                     callback(JSON.stringify(error));
                                 }
                                 // body...
                             })

                         } else {
                             json.key = key + '' + stack;
                             dbx.get(json.key, function(error, bodyz) {
                                 if (!error) {
                                     if (bodyz) {
                                         new_value1 = _.union(doc, JSON.parse(bodyz));
                                     } else {
                                         new_value1 = JSON.parse(bodyz);
                                     }

                                     dbx.put(json.key, JSON.stringify(new_value1), function(error, body) {

                                         if (!error) {
                                             var obj = prev;
                                             obj.lengther = prev.length;
                                             callback(prev);
                                         } else {
                                             callback(JSON.stringify(error));
                                         }
                                         // body...
                                     });
                                 } else {
                                     dbx.put(json.key, JSON.stringify(doc), function(error, body) {

                                         if (!error) {
                                             var obj = prev;
                                             obj.lengther = prev.length;
                                             callback(prev);
                                         } else {
                                             callback(JSON.stringify(error));
                                         }
                                         // body...
                                     });

                                 }
                             });

                         }



                     });
                 });
             } else {

                 dbx.put(json.key, JSON.stringify(json), function(error, body) {

                     if (!error) {


                         callback(JSON.parse(body));
                     } else {
                         callback(error)
                     }
                     // body...
                 })
             }


         } else {

             dbx.put(json.key, JSON.stringify(json), function(error, body) {

                 callback(JSON.parse(body));
             });
         }

     });
 };

 exports.direct = function(key, value, callback) {
     dbx.put(key, value, function(error, body) {
         callback(body);
     });

 }


 exports.get = function(id, callback) {
     dbx.get(id, function(error, body1) {
         if (!error) {
             var obj = {};

             obj.items = JSON.parse(body1);
             if (!obj.value) {

                 var pagination = [];
                 var bid = id.replace(/[0-9]/g, '');

                 dbx.get('stack-' + bid, function(error, body2) {

                     var total;
                     if (!error) {
                         total = Math.round(body2);
                     } else {
                         total = 1;
                     }
                     var key = id.replace(/[0-9]/g, '');

                     obj.total = total;
                     if (total > 15) {
                         var arr = [];
                         var max_pages = Math.round((total - 5) / 10);

                         arr.push('<li class="previous"><a href="#fakelink">← Previous</a></li>');
                         arr.push('<li><a href="/' + key + '">1</a></li>')

                         for (var i = 2; i < max_pages + 1; i++) {
                             var pageid = i + 1;
                             arr.push('<li><a href="/' + key + '' + i + '">' + i + '</a></li>');
                         }
                         arr.push('<li class="next"><a href="#fakelink">Newer →</a></li>');



                     };


                     callback(JSON.stringify(obj, null, 4));
                 });
             } else {
                 callback(JSON.stringify(obj.items));
             }
         } else {
             callback('{message:"missing"}')
         }
     });

 }


 exports.stack = function(req, res) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
     var bid = req.params['query'];
     var obj = {};
     dbx.get('stack-' + bid, function(error, body2) {
         if (!error) {
             obj.value = body2;
             if (body2.length > 30) {
                 obj.value = JSON.parse(body2).value;
             } else {
                 obj.value = body2
             }
             res.end(JSON.stringify(obj));
         } else {
             res.end('{"message":"missing"}');
         }



     });

 }