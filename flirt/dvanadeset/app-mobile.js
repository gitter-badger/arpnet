var prev = 0;
var next = 1;
var supernext = 2;
$.gvar = {};



(function($) {

  $.fn.shuffle = function() {
    return this.each(function() {
      var items = $(this).children().clone(true);
      return (items.length) ? $(this).html($.shuffle(items)) : this;
    });
  };

  $.shuffle = function(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };

})(jQuery);
Array.prototype.chunk = function(n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

//OWNanswer

$(document).on("keyup", "#ownanswer", function() {

  var text = $(this).val();

  if (text.length >= 2) {
    $('#ownanswersend').val(text);
    $('#ownanswersend').show();
  }
});


//UNLOCK INVITES

function inviteunlock(sqlid) {

  // body...
  FB.api({
      method: 'fql.query',
      query: 'SELECT uid FROM user WHERE is_app_user=0 AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
    },
    function(data) {
      var arr = [];
      $.each(data, function(index, value) {

        arr.push(value.uid);
      });
      var marr = $.shuffle(arr).slice(0, 25);



      FB.ui({
        method: 'apprequests',
        message: 'Забавлявай се с играта в която разбираш мнението на приятелите си',
        to: marr.join(',')
      }, function(callback) {
        if (callback.to) {
          $('#result' + sqlid + ' .result').show();
          $('#result' + sqlid + ' button').remove();

          $.post('//arpecop.net/angel/db2/delete/stream10-' + $.gvar.user.id, $.gvar.stream[sqlid], function(data) {


          });

        }
      });

    }
  );
}

$(document).on("click", ".poke", function() {
  var to = $(this).attr('alt');
  var doc = {
    key: "actionz" + to,
    from: $.gvar.user.id,
    text: 'Сръчкване',
    action: 'poke',
    date: new Date().getTime()
  };
  $(this).hide('slow');

  $.post('//arpecop.net/angel/db2/insert', doc, function(data) {});
  $.post("https://graph.facebook.com/" + to + "/notifications", {
    href: "ask/",
    access_token: "181361935494|UBiDJEKsqWEwbKdWfXVYBgr-qNw",
    template: "Някой те сръчка",
  }, function(data) {

  });

});



$(document).on("click", ".unlock_invite", function() {
  var sqlid = $(this).val();

  inviteunlock(sqlid);

});
//DELETE
$(document).on("click", ".unlock_delete", function() {
  var sqlid = $(this).val();
  $.post('//arpecop.net/angel/db2/delete/stream10-' + $.gvar.user.id, $.gvar.stream[sqlid], function(data) {
    $("#result" + sqlid + '').hide('slow');
  });
});

//UNLOCK

$(document).on("click", ".unlock", function() {
  var sqlid = $(this).val();

  $.getJSON('//arpecop.net/angel/db2/gold1-' + $.gvar.user.id, function(datagold) {

    if (datagold.message) {

      $("#error-" + sqlid + '').fadeIn('slow');

      setTimeout(function() {
        $("#error-" + sqlid + '').fadeOut('slow');
      }, 2400);
    } else if (Number(datagold.value) < 5) {
      $("#error-" + sqlid + '').fadeIn('slow');

      setTimeout(function() {
        $("#error-" + sqlid + '').fadeOut('slow');
      }, 2400);

    } else {

      $('#result' + sqlid + ' .result').show();
      $('#result' + sqlid + ' button').remove();
      update_gold($.gvar.user.id, 'unlocking');
      $.post('//arpecop.net/angel/db2/delete/stream10-' + $.gvar.user.id, $.gvar.stream[sqlid], function(data) {});
      var jsonxx = $.gvar.stream[sqlid];
      jsonxx.unlocked = 1;
      //$.post('//arpecop.net/angel/db2/insert', jsonxx, function(data) {  });

    }


  });


});

//LOGIN
$("#loginbutton").on("click", function(e) {

  FB.login(function(response) {
    if (response.authResponse) {

      top.location = "https://apps.facebook.com/feis-be/";

    }
  }, {
    scope: 'publish_actions'
  });

});



function update_gold(user, action) {
  var newval;
  if (action == 'justcheck') {
    $.getJSON('//arpecop.net/angel/db2/gold1-' + user, function(data) {
      //error
      if (data.message) {
        $.post('//arpecop.net/angel/db2/insert', {
          'key': 'gold1-' + user,
          'value': 1
        }, function(data) {

          $('.gold_points').text('0');
        });

      } else {
        $('.gold_points').text(data.value);
      }
    });

  } else if (action == 'add') {

    newval = Number($('.gold_points').text()) + 1;

    $.post('//arpecop.net/angel/db2/insert', {
      'key': 'gold1-' + user,
      'value': newval
    }, function(data) {
      $('.gold_points').text(newval);
    });

  } else if (action == 'unlocking') {

    newval = Number($('.gold_points').text()) - 5;

    $.post('//arpecop.net/angel/db2/insert', {
      'key': 'gold1-' + user,
      'value': newval
    }, function(data) {
      $('.gold_points').text(newval);
    });

  }


}



function providemislish(prevdata) {
  var vapros = $.gvar.mislish[next].q;
  var userid = $.gvar.fql[next].uid;
  var username = $.gvar.fql[next].first_name;
  $('.mislish_igra').show();
  $('.loading').hide();
  $('.img-attendee').attr('src', 'https://graph.facebook.com/' + userid + '/picture?width=200&height=200');

  $('#qus').text('Мислиш ли че, ' + username + ' ' + vapros + ' ?');

  $('#preload').attr('src', 'https://graph.facebook.com/' + $.gvar.fql[supernext].uid + '/picture?width=200&height=200');
  if (prevdata) {

    prevdata.fromname = $.gvar.user.first_name;
    $('#ownanswersend,#ownanswer').val('');

    $.post("https://graph.facebook.com/" + prevdata.to + "/notifications", {
      href: "?x=vaprosi",
      access_token: "181361935494|UBiDJEKsqWEwbKdWfXVYBgr-qNw",
      template: "Някой каза нещо за теб",
    }, function(data) {
      if (!data.success) {
        var errordata = prevdata;
        errordata.key = errorlog;
        $.post('//arpecop.net/angel/db2/errorlog', errordata, function() {});
      }
    });
    prevdata.key = 'stream10-' + prevdata.to;
    $.post('//arpecop.net/angel/db2/' + prevdata.to, prevdata, function(data) {

    });

  }

  next++;
  prev++;
  supernext++;
}

function registertodb(uid, token) {
  var prekey = "gender";
  //FB.api('/me/friends', { fields: 'bio, movies' }, function(response) {
  $.getJSON('//graph.facebook.com/' + uid + '/?fields=first_name,gender,username&callback=?', function(data_user) {
    var checkid;
    if (!data_user.username) {
      checkid = data_user.id;
    } else {
      checkid = data_user.username;
    }

    //  initcompares(data_user);

    $.getJSON('//arpecop.net/angel/db2/' + prekey + '' + checkid + '', function(dataxx) {



      if (dataxx.message && data_user.gender) {
        var json = {};
        json.key = '' + prekey + '' + checkid + '';
        json.value = 'ok';

        $.post('//arpecop.net/angel/db2/insert', json, function(data) {
          var bson = {};
          bson.key = '' + prekey + '' + data_user.gender;
          bson.firstname = data_user.first_name;

          bson.uid = uid;

          $.post('//arpecop.net/quotepublisher/db/' + bson.key, bson, function(dat) {

          });

        });
      }

    });
  });
}

function template_unlock(classx, index, from, you, q, result, fromname) {
  return ('<div class="media' + classx + '" id="result' + index + '">  <div class="pull-left"><button class="btn btn-xs unlock anonim btn-default" value="' + index + '"><i class="fa fa-unlock"></i> Разбери кой е отговорил, срещу 5 точки</button>  <img class="img-circle result" src="https://graph.facebook.com/' + from + '/picture"> </div><div class="media-body">   <div>Мислиш ли че, ' + you + ' ' + q + '?<div><strong><span class="result">' + fromname + '</span> oтговор<span class="result">и</span>: ' + result + '</strong>  <div class="result"><a class="btn btn-xs btn-default poke" alt="' + from + '">Сръчкай ' + fromname + '</a></div></div><div><button class="btn btn-xs unlock_invite" value="' + index + '"><i class="fa fa-unlock"></i> Откл. с покана</button></div></div>  </div>  </div>  <div id="error-' + index + '" style="display:none"> <br><div class="alert alert-warning"><strong>Опс!</strong> Събери 5 точки за да отключиш автора на отговора.</div></div>');
}

function initialize(uid, token) {

  update_gold(uid, 'justcheck');

  FB.api({
      method: 'fql.query',
      query: 'SELECT uid,first_name,is_app_user FROM user WHERE is_app_user AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
    },
    function(fql) {

      $.gvar.fql = $.shuffle(fql);
      FB.api('/me/', {
        fields: 'name,first_name,third_party_id'
      }, function(user) {
        $.gvar.user = user;
        $('#add1').html('<iframe src="//app.appatyze.com/gateway.php?a=353&aid=' + $.gvar.user.third_party_id + '" width="100%" height="90" scrolling="no" frameborder="0" marginwidth="0" marginheight="0"></iframe>');
        // 

        if (!fql.error_code) {
          $.getJSON('//arpecop.net/angel/dvanadeset/src/vaprosibg.json', function(qus) {
            $.gvar.mislish = $.shuffle(qus);
            providemislish(null);
            $('.username').text($.gvar.user.name);
            $.getJSON('//arpecop.net/angel/db2/stream10-' + uid, function(dataxx1) {


              if (!dataxx1.message) {

                var dataxx;

                if (!dataxx1.length) {
                  dataxx = [];
                  dataxx.push(dataxx1);
                } else {
                  dataxx = dataxx1;
                }

                $.gvar.stream = dataxx;

                if (!dataxx.message) {
                  $.gvar.stream = dataxx;
                  var joinitems = [];
                  var nonunlocked = 0;
                  $('#unlocks').show();
                  $('#unlocks,#mislish').addClass('col-sm-6');

                  $.each(dataxx.slice(0, 5), function(index, value) {

                    var classx;
                    if (value.unlocked === 0) {
                      classx = '';
                      nonunlocked++;
                    } else {
                      classx = ' resultunlocked';
                    }
                    joinitems.push(template_unlock(classx, index, value.from, $.gvar.user.name, value.q, value.result, value.fromname));
                  });
                  $('.media-list').html(joinitems.join(''));
                  if (nonunlocked > 0) {
                    $('.nonunlocked').show().text('' + nonunlocked + '');
                  }

                } else {

                  $('#mislish').addClass('col-lg-12');
                  $('.moretochkas').remove();
                }
              }
            });



          });
        }

      });
    });

  ///

}



$(document).on("click", ".answervalue", function(e) {

  var gold = $('.gold_points').text();
  $('.infotochka').remove();
  var prevdata = {};



  prevdata.result = $(this).val();
  prevdata.q = $.gvar.mislish[prev].q;
  prevdata.to = $.gvar.fql[prev].uid;
  prevdata.from = $.gvar.user.id;
  prevdata.unlocked = "0";
  if (prevdata.result != 2) {
    providemislish(prevdata);
    update_gold($.gvar.user.id, 'add');



  } else {
    providemislish(null);
  }

});

function register() {
  top.location.href = "https://www.facebook.com/dialog/oauth?client_id=181361935494&redirect_uri=https://apps.facebook.com/feis-be/&scope=user_about_me";
}

function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
  );
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '181361935494',
    status: true,
    cookie: true,
    xfbml: true,
    oauth: true,
    channelUrl: '//arpecop.net/static/channel.html',
    frictionlessRequests: true
  });

  var request = getURLParameter('request_ids');

  if (request.length >= 5) {
    top.location.href = "http://feis.be/";
  }


  FB.Canvas.setAutoGrow();

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      if (!$.gvar.token) {
        $.gvar.token = response.authResponse.accessToken;
        initialize(uid, accessToken);
      }

    } else {
      register();

    }
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      if (!$.gvar.token) {
        $.gvar.token = response.authResponse.accessToken;
        initialize(uid, accessToken);
      }
    } else {
      register();
    }
  });



};
//mobile



// Load the SDK asynchronously
(function(d) {
  var js, id = 'facebook-jssdk';
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "https://connect.facebook.net/en_US/all.js";
  //js.src = "//tabletr.herokuapp.com/js/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29127191-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();