  var db = require('../src/db.js');



  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function locations(data, callback) {
    console.log(data);
    if (data.location) {
      var json = {}
      var location = data.location.name.split(', ')
      json.country = location[1];
      json.city = location[0];
      json.gender = data.gender;
      if (json.gender == 'female') {
        json.opposite = 'male';
      } else {
        json.opposite = 'female';
      }
      //
      db.get('vecheibal' + data.id, function(data) {
        if (data.message) {
          json.vecheibal = 0
          callback(json)
        } else {
          var num = JSON.parse(data).value;
          json.vecheibal = num;
          callback(json)
        }
      })

    } else {
      callback(null)
    }

  }

  function charisma(req, res) {
    var json = req.session.passport.user;
    res.render('igra/dev', json);
  }

  //
  function igrarandom(req, res) {
    var json = {};
    var skip;
    var sex = req.params['sex'];
    console.log(sex);
    if (!sex) {
      sex = 'female'
    } else {
      if (sex == 'male') {
        sex = 'female';
      } else {
        sex = 'male';
      }
    }
    res.write('[');
    db.get('stack-' + sex, function(data_stack) {
      console.log(data_stack);
      var stack = Math.round(data_stack / 10);

      for (var i = 1; i <= 25; i++) {

        var min = getRandom(2, stack);
        db.get(sex + '' + min, function(data1) {

          if (!data1.message) {
            var data = JSON.parse(data1);
            data.forEach(function(val, index) {



              res.write(JSON.stringify(val) + ',')

            })



          }

        })
      }


    });

    res.end('{"key":"female10","id":"1434230447","name":"Naya","country":"Greece"}]')

  }


  ///


  function igra(req, res) {
    var json = {};
    var skip;

    locations(req.session.passport.user, function(query) {
      db.get('stack-' + query.opposite + '' + query.city, function(data_stack) {

        if (data_stack <= 10) {
          res.redirect('/char');
        } else {
          db.get('gold' + req.session.passport.user.id, function(data_gold) {
            console.log(data_gold);

            if (data_gold.message) {
              json.skip = 0;
            } else {
              json.skip = JSON.parse(data_gold).value;
            }

            //
            var stack = Math.round(data_stack / 10);


            var trigger = data_stack - 1;
            var key1 = stack;

            var arr = [];
            for (var i = 1; i <= key1; i++) {
              var key = i;
              if (key == 1) {
                key = ""
              };

              db.get(query.opposite + '' + query.city + '' + key, function(data1) {
                if (!data1.message) {
                  var data = JSON.parse(data1);
                  data.forEach(function(val, index) {

                    arr.push(val);

                    if (trigger == arr.length) {
                      json.items = arr;
                      //  json.skip = query.vecheibal;
                      res.end(JSON.stringify(json))
                    };
                  })



                }

              })
            }

          })
        }
      });
    })



  }
  exports.charisma = charisma
  exports.igra = igra
  exports.igrar = igrarandom