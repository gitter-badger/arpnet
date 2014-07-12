var levelup = require('level-hyper');
var request = require('request');
var db = levelup('./vol/temp/datingass111111xxxxxz')
var dbx = levelup('./vol/temp/dating111111xxxxz');
var Jobs = require('level-jobs');
var express = require('express');

var token = '105397064351|9RQwsm6vf5nQJMhvyZYXmqpFYx8';
//var app = express();
var app = require('express.io')()
app.http().io()
app.configure(function(){
  app.use('/', express.static(__dirname + '/web'));
 
});
//

var dby = require('./db.js');
app.listen('3000')
app.all('/:query', function(req, res) {
  console.log(req.params['query'])
  res.header("Access-Control-Allow-Origin", "*");

  var query = req.params['query'];


  dby.sget(query, function(data) {
    if (!data) {

      res.end('{"message":"missing"}');
    } else {

      res.end(JSON.stringify(data, null, 4));
    }
  })

});


dby.sget('femaleSofia', function(data) {
  if (!data) {
    console.log('ass')
  } else {
    console.log(data)
  }

})
//
// dbx.put('counter',1, fu

function worker(job, done) {
  dbx.get('counter', function(err, value) {
    console.log(value);

    dbx.put('counter', '' + (Math.round(value) + 1) + '', function(err, merr) {});

  });

  request('https://graph.facebook.com/' + job.id + '/friends?fields=installed&access_token=' + token, function(error, response, body) {
	//	var data = JSON.parse(body);

    if (!error && response.statusCode == 200 && body.length > 50 ) {

			var data = JSON.parse(body);
//			console.log(data);
      data.data.forEach(function(data, index) {

        if (data.installed) {
          dbx.get(data.id, function(err, value) {
            if (err) {
              request('https://graph.facebook.com/' + data.id + '/?access_token=' + token, function(error, response, body) {
                var data = JSON.parse(body);

                if (data.location) {

                  //


                  var location = data.location.name.split(', ')

                  var country = location[1];
                  var city = location[0];
                  // console.log(data.id + ' ' + data.gender + ' ' + country + ' ' + data.first_name + ' ' + city);


                  if (country && country.length > 4) {
                    dby.insert({
                      key: data.gender + '' + country,
                      id: data.id,
                      name: data.first_name
                    }, function(data) {

                    })
                    dby.insert({
                      key: data.gender,
                      id: data.id,
                      name: data.first_name,
                      country: country
                    }, function(data) {

                    })


                    if (city && city.length > 4) {
                      dby.insert({
                        key: data.gender + '' + city,
                        id: data.id,
                        name: data.first_name
                      }, function(data) {

                      })
                      dbx.get(city, function(err, value) {
                        if (err) {
                          dby.insert({
                            key: country,
                            val: city
                          }, function(data) {

                          });

                          dbx.put(city, 'ok', function(err, merr) {});

                          dby.insert({
                            key: country,
                            val: city
                          }, function(data) {

                          })

                        }

                      });
                    }
                    dbx.get(country, function(err, value) {
                      if (err) {
                        dby.insert({
                          key: "countryz",
                          val: country
                        }, function(data) {



                          dbx.put(country, 'ok', function(err, merr) {});
                        });
                      };
                    });
                  };

                  dby.put(data.id, data);

                };

              });
              var snext = Math.round(job.next + index);

              dbx.put(data.id, 'ok', function(err) {
                queue.push({
                  'id': data.id,
                  'next': snext
                });
              });

              //
              done();



            } else {
              done();

            }
          })

        };


      });

    } else {
      done();
    }
  })


}


var options = {
  maxConcurrency: 3500,
  maxRetries: 1
};

var queue = Jobs(db, worker, options);
//dbx.put('counter','1', function(err, merr) {});

//queue.push({  'id': 'arpecop', 'next':1});
