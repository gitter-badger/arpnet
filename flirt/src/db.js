var level = require('level-hyper');
var dbl = level('./DBREAL');


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

function putz(value) {

    dbl.put(value.key, JSON.stringify(value, null, 4), function(err, value) {
        return ('ok')
    });

}

//dbl.del('rec572383379', function(err, value) {       });


function put(value) {
    if (typeof(value) == 'object' && value.key) {
        dbl.get(value.key, function(err, value_old) {
            //if (value_old) {
            if (!err) {
                var value_old = JSON.parse(value_old);
                if (value_old.value) {
                    //  var new_value = merge_options(value_old, value);
                    dbl.put(value.key, JSON.stringify(value, null, 4), function(err, value) {


                    });
                } else {
                    var new_value = _.union(value, value_old);
                    dbl.put(value.key, JSON.stringify(new_value, null, 4), function(err, value) {

                    });
                }
            } else {

                dbl.put(value.key, JSON.stringify(value, null, 4), function(err, value) {
                    console.log(err);

                });

            }



        });

    };

}

var db2 = function(req, res) {


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
var delkey = function(data) {
    dbl.del(data.key, function(err, value) {

    });
}


var deletekeyserver = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    console.log("DELETE KEY SERVER ENTIRELY")
    var query = req.params['query'];

    dbl.del(query, function(err, value) {
        res.end('{"ok":"ok"}')
    });


}


var db2delete = function(req, res) {
    var del = req.body;
    var query = req.params['query'];

    dbl.get(del.key, function(err, datax) {
        if (!err) {
            var datax = JSON.parse(datax);
            if (datax.length) {
                var newjson = [];
                datax.forEach(function(val, index) {
                    console.log(del)
                    if (val.session == del.session) {
                        console.log('this is the shit')
                    } else {
                        newjson.push(val);
                    }
                })
                dbl.put(query, JSON.stringify(newjson, null, 4), function(err, value) {});
            } else {
                dbl.del(del.key, function(err, value) {});
            }
        }
    });
    res.end('{"ok":"ok"}')
}
var get = function(query, callback) {

    dbl.get(query, function(err, value) {
        if (err) {

            callback({
                "message": "missing"
            });
        } else {

            callback(value);
        }
    })
}
exports.put = put;
exports.putz = putz;
exports.delkey = delkey;
exports.deletekeyserver = deletekeyserver;
exports.get = get;
exports.db2 = db2;
exports.db2delete = db2delete;