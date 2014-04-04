 var bind = require('bind');
 var get = require('get');
 var exec = require('child_process').exec;
 var geoip = require('geoip-lite');
 var express = require('express');
 var crypto = require('crypto');
 var request = require('request');
 var fs = require('graceful-fs');
 var is = require('browseris');
 var UglifyJS = require("uglify-js");
 var redis = require("redis"),
     client = redis.createClient();
 var app = express();

 app.disable('x-powered-by');
 app.use(express.urlencoded());
 app.use(express.json());
 app.use('/angel', express.static(__dirname + '/'));
 var uuid = require('node-uuid');



 function merge_options(obj1, obj2, obj4) {
     var obj3 = {};
     for (var attrname in obj1) {
         obj3[attrname] = obj1[attrname];
     }
     for (var attrname in obj2) {
         obj3[attrname] = obj2[attrname];
     }
     for (var attrname in obj4) {
         obj3[attrname] = obj4[attrname];
     }
     return obj3;
 }



 var SignedRequest = require(__dirname + '/db/index.js');



 //DB2
 var db2 = require(__dirname + '/db/server.js');
 app.all('/angel/db2/:query', db2.db2);
 app.post('/angel/db2/delete/:query', db2.db2delete);

 //DB



 var SignedRequest = require('/usr/share/nginx/html/angel/db/index.js');
 SignedRequest.secret = "22594c3671127916f64bed7ce674d24f";

 app.all('/angel/tab/', function(req, res) {
     res.set('Content-Type', 'text/html');

     var signed = req.body.signed_request;
     var preview = req.body;
     var json = {};
     if (signed) {
         var signedRequest = new SignedRequest(signed);

         signedRequest.parse(function(errors, request) {


             if (request.data) {
                 var id = request.data.page.id;
                 if (!id) {
                     id = "246560865463407";
                 }

                 json.data = request.data;
                 json.meta = req.query;
                 json.pageid = request.data.page.id;
                 json.tokent = request.data.oauth_token;
                 json.signed = signed;
                 var filez = __dirname + "/tab/" + id + "/dev.html";
                 if (fs.existsSync(filez)) {
                     bind.toFile(filez, json, function callback(data) {
                         res.end(data);
                     });
                 } else {
                     bind.toFile(__dirname + "/tab/dev.html", json, function callback(data) {
                         res.end(data);
                     });
                 }



             }
         });

     } else {
         var id = req.query["id"];
         if (!id) {
             json.pageid = "246560865463407";
         } else {
             json.pageid = id;
         }



         bind.toFile(__dirname + "/tab/dev.html", json, function callback(data) {
             res.end(data);
         });

     }
 });

 //MAIN

 app.all('/angel/*', function(req, res) {
     var url1 = req.url.split(/,|\?|\//)
     var url = url1[2];
     var json = req.query;
     json.reqid = url1[3];
     json.url = req.protocol + "://" + req.get('host') + req.url;
     res.set('Content-Type', 'text/html');
     var id = req.query["id"];
     if (id == "push" && id !== "dev") {
         url = url.replace('push', '').replace('app.json', '');
         fs.readFile('/usr/share/nginx/html/angel/' + url + '/dev.html', function read(err, dataz) {
             var data = dataz.toString();
             client.set(url, data);
             fs.writeFile('/usr/share/nginx/html/angel/' + url + '/production.html', data, function(err) {});


             fs.readFile('/usr/share/nginx/html/angel/' + url + '/app.js', function(err, data) {
                 if (!err) {
                     var result = UglifyJS.minify(data.toString(), {
                         fromString: true
                     });


                     fs.writeFile('/usr/share/nginx/html/angel/' + url + '/app-min.js', result.code, function(err) {

                     });
                 } else {

                 }
             });


             res.write('<h1>pushed real good</h1>');
         });
     };
     //POST

     if (req.method.toLowerCase() == "post") {
         var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

         var country = geoip.lookup(ip).country;

         if (country == "BG") {
             json.advert = [' <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>', '<!-- blog green -->', , '<ins class="adsbygoogle"', , 'style="display:inline-block;width:728px;height:90px"', , 'data-ad-client="ca-pub-8516663490098995"', , 'data-ad-slot="6136630466"></ins>', , '<script>', , '(adsbygoogle = window.adsbygoogle || []).push({});', , '</script>'].join('\n');
         } else {

         }
         json.appjs = "app-min.js";
         json.url = req.protocol + "://" + req.get('host') + req.url;
         var file = '/usr/share/nginx/html/angel/' + url + '/production.html';
         var admin = req.headers['user-agent'].split(' ')[1];
         if (json.reqid) {
             var file = '/usr/share/nginx/html/angel/' + url + '/' + json.reqid + '/index.html';
             fs.readFile(file, function read(err, dataz) {
                 if (!err) {
                     bind.to(dataz.toString(), json, function callback(data) {
                         res.end(data);
                     });
                 } else {
                     var file = '/usr/share/nginx/html/angel/' + url + '/dev.html';
                     bind.toFile(file, json, function callback(data) {
                         res.end(data);
                     });
                 }
             });
         } else {

             if (admin == '(rudix;') {
                 var file = '/usr/share/nginx/html/angel/' + url + '/dev.html';
                 bind.toFile(file, json, function callback(data) {
                     res.write('admin')
                     res.end(data);
                 });

             } else {
                 client.get(url, function(err, reply) {
                     if (!reply) {
                         fs.readFile(file, function read(err, dataz) {
                             if (err) {
                                 res.status(404).send('Not found');
                                 console.log(url + ' Not found');
                             } else {

                                 client.set(url, dataz.toString());
                                 bind.to(dataz.toString(), json, function callback(data) {
                                     res.end(data);
                                 });
                             }
                         });
                     } else {
                         bind.to(reply, json, function callback(data) {
                             res.end(data);
                         });
                     }
                 });
             }
         }

         //GET
     } else {
         json.advert = [' <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>', '<!-- blog green -->', , '<ins class="adsbygoogle"', , 'style="display:inline-block;width:728px;height:90px"', , 'data-ad-client="ca-pub-8516663490098995"', , 'data-ad-slot="6136630466"></ins>', , '<script>', , '(adsbygoogle = window.adsbygoogle || []).push({});', , '</script>'].join('\n');
         json.appjs = "app.js";
         var filez2 = '/usr/share/nginx/html/angel/' + url + '/dev.html';
         var filez_mobile = '/usr/share/nginx/html/angel/' + url + '/mobile.html';

         fs.readFile(filez2, function read(err, dataz) {
             if (!err) {

                 if (is(req).desktop) {
                     bind.to(dataz.toString(), json, function callback(data) {
                         res.end(data);
                     });
                 } else {

                     fs.readFile(filez_mobile, function read(err, datamobile) {
                         if (!err) {
                             bind.to(datamobile, json, function(data) {

                                 res.end(data);
                             })
                         } else {
                             bind.to(dataz.toString(), json, function callback(data) {
                                 res.end(data);
                             });
                         }
                     });

                 }

             } else {
                 res.status(404).send('Not found');
                 console.log(url + ' Not found');
             }
         });
     }
 });



 app.listen('91')