var express = require('express');
var util = require('util');
var bind = require('bind');
var path = require('path');
var reqvest = require('request');
var fs = require('fs');
var get = require('get');
var exec = require('child_process').exec;


// create an express webserver
var app = express();
app.use(express.json());
app.use(express.urlencoded());

var port = 87;
app.listen(port, function() {
    console.log("Listening on " + port);
});


// POST UPLOAD AND SHITES 

//var cron = require(__dirname + '/functions/cron.js');
//app.all('/quotepublisher/post', cron.post)


var db = require(__dirname + '/functions/db.js');

 

var get_server = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    if (req.method.toLowerCase() == 'get') {

        var query = req.params['query'];
        db.get(query, function(data) {
            res.end(data);
        })

    } else {

        if (req.body.value) {
             

            db.direct(req.body.key, req.body.value, function(bodyx) {
                res.end(bodyx);
            });
        } else {

            db.insert(req.body, function(body1) {
                res.end(JSON.stringify(body1));
            });
        }
    }

}



//app.post('/quotepublisher/db2/:query', db.db2delete);

app.get('/quotepublisher/db/stack-:query', db.stack)
app.all('/quotepublisher/db/:query', get_server);

var notify = require(__dirname + '/functions/requests.js');
//app.post('/quotepublisher/notify/',notify.notify);
///app.post('/quotepublisher/notify/apprequests/',notify.requests);


  
