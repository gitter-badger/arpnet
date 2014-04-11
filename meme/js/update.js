var levelup = require('level-rocksdb')
var sublevel = require('level-sublevel');
//var async = require('async');
var levelQuery = require('level-query');
var concat = require('concat-stream');




var db = sublevel(levelup('./db/newdb', {
  encoding: 'json'
}));
var query = levelQuery(db);


var easyimg = require('easyimage');
var async = require('async');

var get = require('get')


  function update2(page, callback) {
    // body...
    get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=' + page + '&pageSize=24&days=7').asBuffer(function(err, data1) {
      // body... 
      var data = JSON.parse(data1.toString()).result;
      var lengs = data.length - 1;

      data.forEach(function(val, index) {
        val.index = index;
        console.log(val)
        var dl = get(val.imageUrl);
        db.get(val.ranking, function(err, datax) {
          if (!datax) {
            dl.toDisk('./db/' + val.ranking + '.jpg', function(err, filename) {
              db.put(val.ranking, val)
              console.log(err);
              easyimg.rescrop({
                  src: './db/' + val.ranking + '.jpg',
                  dst: './db/' + val.ranking + '_t.jpg',
                  width: 250,
                  height: 250,
                  cropwidth: 160,
                  cropheight: 160,
                  x: 0,
                  y: 0
                },
                function(err, image) {
                  if (err) throw err;
                  console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                  if (lengs == index) {
                    callback('ok')
                  };
                }
              );

            });
          } else {
            if (lengs == index) {
              callback('ok')
            }
          }
        });
      })
    })
  }



  function update() {
    async.forEachSeries([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(val, callback2) {
      update2(val, function(argument) {
        if (argument == "ok") {
          callback2()
        };
      })
    })
  }


exports.update = update;

exports.db = db;
exports.query = query;