var level = require('level-rocksdb');
var dbl = level('/usr/share/nginx/html/angel/db/mydb');

 
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

function put(value) {

    if (typeof(value) == 'object') {
        dbl.get(value.key, function(err, value_old) {
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
            dbl.put(value.key, JSON.stringify(new_value, null, 4), function(err, value) {

            });
        });

    };

}

var db2 = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var query = req.params['query'];
    if (req.method.toLowerCase() == 'get') {

        dbl.get(query, function(err, value) {
            if (err) {
             
                res.end('{"message":"missing"}');
            } else {

                res.end(value);
            }
        })
    } else {
        put(req.body)
        res.end(JSON.stringify(req.body))


    }


}
///

///
var db2delete = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");




    var query = req.params['query'];

    var del = req.body;

    dbl.get(query, function(err, value) {
        if (!err) {
            var datax = JSON.parse(value);
             

            if (datax.length > 1) {

                var newjson = [];


                datax.forEach(function(val, index) {


                    if (JSON.stringify(val) == JSON.stringify(del)) {



                    } else {
                        newjson.push(val);
                    }
                })
                dbl.put(query, JSON.stringify(newjson, null, 4), function(err, value) {

                });


            } else {

                dbl.del(query, function(err, value) {

                });



            }

        }
    });



    res.end('{"ok":"ok"}')



}


exports.db2 = db2;
exports.db2delete = db2delete;