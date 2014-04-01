var request = require('request');
var levelup = require('levelup');
var db = levelup('./mydb');

var appdata = {
  '181361935494': {
    id: '181361935494',
    info: 'Въпроси',
    token: '181361935494|iii2yPaq_2q9kUKy1RWcM27d0n4',
    message: 'Някой каза нещо за теб, виж какво тук'
  },
  '1813619354941x': {
    id: '181361935494x',
    info: 'Въпроси'
  }
}



exports.notify = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var data = appdata[req.body.appid];
  var date = new Date();
  if (data) {
    var to = req.body.to;
    var json = req.body;
    var uniqid = to + '' + date.getDate() + '' + date.getMonth() + '' + date.getFullYear() + '';
    json.access_token = data.token;
    json.message = req.query.message;

    db.get(uniqid, function(err, value) {
      if (!value) {
        request.post('https://graph.facebook.com/' + to + '/notifications', {
            form: json
          },
          function(error, response, body) {
            db.put(uniqid, 'ok');
             
            res.end('{"ok":"ok"}');

          }
        );
      } else {
        res.end('{"message":"error"}');
      }
    });

  } else {
    res.end('{"message":"error"}');
  }

};



exports.requests = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  var data = appdata[req.body.appid];
  if (data) {

    var to = req.body.to;
    var id = req.query.uid;
    var json = req.body;
    json.access_token = data.token;

    request.post('https://graph.facebook.com/' + to + '/apprequests', {
        form: json
      },
      function(error, response, body) {
         

        res.end('{"ok":"ok"}');

      }
    )
  } else {
    res.end('{"message":"error"}');
  }
}