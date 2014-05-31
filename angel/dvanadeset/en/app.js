var prev = 0;
var next = 1;
var supernext = 2;
$.gvar = {};
$.gvar.happ = '122683342943';



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
  FB.api('/me/friends', function(data) {
    console.log(data);
    var arr = [];
    $.each(data, function(index, value) {

      arr.push(value.uid);
    });
    var marr = $.shuffle(arr).slice(0, 25);



    FB.ui({
      method: 'apprequests',
      message: 'Нов Коментар за теб',
      to: marr.join(',')
    }, function(callback) {
      if (callback.to) {
        $('#result' + sqlid + ' .result').show();
        $('#result' + sqlid + ' button').remove();

        $.post('//arpecop.net/angel/db2/delete/stream10-' + $.gvar.user.id, $.gvar.stream[sqlid], function(data) {


        });

      }
    });

  });
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

  $.post('https://graph.facebook.com/' + to + '/apprequests', {
    access_token: gptoken(),
    message: 'Някой те сръчка',

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
    } else if (Number(datagold.value) <= 4) {
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

      top.location = "https://apps.facebook.com/checkthescore/";

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

function gptoken() {
  return $.gvar.happ + '|i6JbMuSGKjhZnt3piT-nSOJNNao';
}

function providemislish(prevdata) {
  console.log($.gvar.fql[next]);
  var vapros = $.gvar.mislish[next].q;
  var userid = $.gvar.fql[next].id;
  var username = $.gvar.fql[next].name;
  $('.mislish_igra').show();
  $('.loading').hide();
  $('.img-attendee').attr('src', 'https://graph.facebook.com/' + userid + '/picture?width=200&height=200');

  $('#qus').text('Do you think, ' + username + ' ' + vapros + ' ?');
  console.log();
  if ($.gvar.fql[supernext]) {
    console.log('still got friends')
  } else {
    console.log('sad trombone')
  }
  $('#preload').attr('src', 'https://graph.facebook.com/' + $.gvar.fql[supernext].id + '/picture?width=200&height=200');
  if (prevdata) {
    prevdata.fromname = $.gvar.user.first_name;
    $('#ownanswersend,#ownanswer').val('');

    //
    var date = new Date();
    var uniqid = prevdata.to + '' + date.getDate() + '' + date.getMonth() + '' + date.getFullYear();
    $.getJSON('//arpecop.net/angel/db2/' + uniqid, function(data) {

      if (data.message) {
        $.post('https://graph.facebook.com/' + prevdata.to + '/notifications', {
          access_token: gptoken(),
          template: "New Visit: Someone viewed your profile picture, +1 unlocked question"
        }, function(data) {


          $.post('//arpecop.net/angel/db2/insert', {
            key: uniqid,
            value: '1'
          });
        });
      } else {
        //console.log('already');
      }
    });

    $.post('https://graph.facebook.com/v2.0/' + prevdata.to + '/apprequests', {
      access_token: gptoken(),
      message: 'New Visit: Someone viewed your profile picture, +1 unlocked question',
    }, function(data) {

    });



    //
    prevdata.key = 'stream10-' + prevdata.to;
    $.post('//arpecop.net/angel/db2/' + prevdata.to, prevdata, function(data) {

    });

  }

  next++;
  prev++;
  supernext++;
}



function initialize(uid, token) {
  $.getJSON('https://graph.facebook.com/me/apprequests?access_token=' + token + '&callback=?', function(data) {
    if (data.data[0]) {
      if (data.data[0].data) {
        $('#actiont').text(data.data[0].message);
        $('#actionb').attr('href', data.data[0].data);
        $('#myModal').modal('show');

      }
      $.each(data.data, function(index, val) {
        $.getJSON('https://graph.facebook.com/' + val.id + '/?access_token=' + token + '&method=delete&callback=?');
      });
    }
  });

  var date = new Date();
  var uniqidx = uid + '' + date.getDate() + '' + date.getMonth() + '' + date.getFullYear();
  $.post('//arpecop.net/angel/db2/insert', {
    key: uniqidx,
    value: '1'
  });

  update_gold(uid, 'justcheck');
  ///


  FB.api('/me/friends', function(fql) {

    console.log(fql)

    $.gvar.fql = $.shuffle(fql.data);
    FB.api('/me/', {
      fields: 'name,first_name,third_party_id,gender'
    }, function(user) {
      if (user.gender == "male") {
        $('#males').show();
      } else {
        $('#females').show();
      }
      $.gvar.user = user;
      //  console.log(user)


      if (!fql.error_code) {
        $.getJSON('//arpecop.net/angel/dvanadeset/en/src/vaprosien.json', function(qus) {
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
                $('#unlocks').show();
                $('#unlocks,#mislish').addClass('col-sm-6');
                $.each(dataxx.slice(0, 10), function(index, value) {

                  var classx;
                  if (value.unlocked === 0) {
                    classx = '';


                  } else {
                    classx = ' resultunlocked';
                  }

                  joinitems.push(template_unlock(classx, index, value.from, $.gvar.user.name, value.q, value.result, value.fromname));
                });

                $('.nonunlocked').text(joinitems.length);

                $('.media-list').html(joinitems.join(''));


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
  prevdata.to = $.gvar.fql[prev].id;
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
  top.location.href = "https://www.facebook.com/dialog/oauth?client_id=122683342943&redirect_uri=https://apps.facebook.com/checkthescore/&scope=user_friends";
}

function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
  );
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '122683342943',
    status: true,
    cookie: true,
    version: 'v2.0',
    xfbml: true,
    oauth: true,
    channelUrl: '//arpecop.net/static/channel.html',
    frictionlessRequests: true
  });



  FB.Canvas.setAutoGrow();

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      FB.api('/me/permissions', function(perms) {
        console.log(perms);
      });

      if (!$.gvar.token) {
        $.gvar.token = response.authResponse.accessToken;
        initialize(uid, accessToken);
      }

    } else {
      register();

    }
  });

  FB.getLoginStatus(function(response) {
    console.log(response);
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
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
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