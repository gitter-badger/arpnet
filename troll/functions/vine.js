var vine = require('node-vine');
var request = require('request');
var levelup = require('levelup');
var db = levelup('/usr/share/nginx/html/troll/functions/mydb');
var fs = require('fs');
var bind = require("bind");

function cron1() {
    vine.login("rudix.lab@gmail.com", "asshole1", function(err, response) {
        vine.popular(function(err, response) {
            response.records.forEach(function(val, index) {

                var json = {
                    key: 'vinez',
                    id: val.postId,
                    description: val.description,
                    thumb: val.thumbnailUrl,
                    video: val.videoLowURL
                };



                db.get(val.postId, function(err, value) {
                    if (err) {
                        request('http://translate.google.com/translate_a/t?client=t&sl=en&tl=bg&hl=bg&sc=2&ie=UTF-8&oe=UTF-8&oc=1&prev=conf&psl=en&ptl=it&otf=1&it=sel.1791&ssel=3&tsel=3&q=' + encodeURIComponent(val.description), function(err, resp, body) {


                            if (body.split('"')[1].length < 3) {
                                json.descr = body.split('"')[2];
                            } else {
                                json.descr = body.split('"')[1];
                            }

                            db.put(val.postId, JSON.stringify(json), function(err) {
                                request.post('http://arpecop.net/quotepublisher/db/vinez', {
                                    form: json
                                }, function() {
                                    //here
                                    fs.readFile("/root/accounts.txt", "utf8", function(err, data2) {
                                        var pages = JSON.parse(data2).data.reverse();
                                        pages.reverse().forEach(function(val1, index1) {
                                            request.post("https://graph.facebook.com/" + val1.id + "/links", {
                                                form: {
                                                    access_token: val1.access_token,
                                                    link: encodeURIComponent("https://arpecop.net/troll/v/" + json.id + "/?tag=" + index1)
                                                }
                                            }, function(err, data) {
                                                console.log(val1.name + '' + data.body);
                                            });

                                        });
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
    });
    request('http://arpecop.net/quotepublisher/post/', function(error, response, body) {});
}




exports.id = function(req, res) {

    db.get(req.params.id, function(err, value) {
        if (!err) {

            var json = JSON.parse(value);
            var config = {
                clip: {
                    url: json.video
                }
            };
            json.vidurl = encodeURIComponent(JSON.stringify(config));

            bind.toFile("/usr/share/nginx/html/troll/video.html", json, function callback(data) {
                res.end(data);
            });
        } else {
            res.end('404');
        }
    });



};