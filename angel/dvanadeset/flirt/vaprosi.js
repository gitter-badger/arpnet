$(document).on("keyup", "#ownanswer", function() {

  var text = $(this).val();

  if (text.length >= 2) {
    $('#ownanswersend').val(text);
    $('#ownanswersend').show();
  }
});


//UNLOCK INVITES


$(document).on("click", ".unlock_invite", function() {
  var sqlid = $(this).attr('alt');

  inviteunlock(sqlid);

});
//DELETE
$(document).on("click", ".unlock_delete", function() {
  var sqlid = $(this).attr('alt');
  $.post('//arpecop.net/angel/db2/delete/stream10-' + window.user.id, window.stream[sqlid], function(data) {
    $("#result" + sqlid + '').hide('slow');
  });
});

//UNLOCK

$(document).on("click", ".unlock", function() {
  var sqlid = $(this).attr('alt');
  $.getJSON('//arpecop.net/angel/db2/gold1-' + window.user.id, function(datagold) {

    if (datagold.message) {
      $("#error-" + sqlid + ', #showinggold').fadeIn('slow');

      setTimeout(function() {
        $("#error-" + sqlid + ', #showinggold').fadeOut('slow');
      }, 2400);
    } else if (Number(datagold.value) < 5) {
      $("#error-" + sqlid + ', #showinggold').fadeIn('slow');

      setTimeout(function() {
        $("#error-" + sqlid + ', #showinggold').fadeOut('slow');
      }, 2400);

    } else {

      $('.result' + sqlid + '').show();
      //$('#result' + sqlid + ' button').remove();
      update_gold(window.user.id, 'unlocking');
      $.post('//arpecop.net/angel/db2/delete/stream10-' + window.user.id, window.stream[sqlid], function(data) {


      })


    }


  });


});

// 
$(document).on("click", ".answervalue", function(e) {
  var gold = $('.gold_points').text();
  $('.infotochka').remove();
  var prevdata = {};
  prevdata.result = $(this).val();
  prevdata.q = window.mislish[prev].q;
  prevdata.to = window.fql[prev].uid;
  prevdata.from = window.user.id;
  prevdata.unlocked = "0";
  if (prevdata.result != 2) {
    providemislish(prevdata);
    update_gold(window.user.id, 'add');
  } else {
    providemislish(null);
  }

});



function initialize(uid, token) {
  update_gold(uid, 'justcheck');
  $.getJSON('https://api.facebook.com/method/fql.query?query=' + encodeURIComponent('SELECT uid,first_name,is_app_user FROM user WHERE is_app_user AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())') + '&access_token=' + token + '&format=json&callback=?', function(fql) {
    if (uid == "572383379") {
      fql = [{
        uid: "1563161591",
        first_name: "rudi"
      }, {
        uid: "1563161591",
        first_name: "rudi"
      }, {
        uid: "1563161591",
        first_name: "rudi"
      }, {
        uid: "1563161591",
        first_name: "rudi"
      }, {
        uid: "1563161591",
        first_name: "rudi"
      }, {
        uid: "1563161591",
        first_name: "rudi"
      }];
    };


    window.fql = $.shuffle(fql);


    $.each(fql, function(index, value) {

     // registertodb(value.uid, token);
    });

    $.getJSON('https://graph.facebook.com/me/?access_token=' + token + '&fields=name,first_name&callback=?', function(user) {
      window.user = user;



      if (!fql.error_code) {
        $.getJSON('//arpecop.net/angel/mobile/src/vaprosibg.json', function(qus) {
          window.mislish = $.shuffle(qus);
          providemislish(null);
          $('.username').text(window.user.name);
          $.getJSON('//arpecop.net/angel/db2/stream10-' + uid, function(dataxx1) {

            if (!dataxx1.message) {

              var dataxx;

              if (!dataxx1.length) {
                dataxx = new Array;
                dataxx.push(dataxx1);
              } else {
                dataxx = dataxx1;
              }

              window.stream = dataxx;

              if (!dataxx.message) {
                window.stream = dataxx;
                var joinitems = [];
                var unlocked = dataxx.length;

                $('.nonunlocked').text('' + unlocked + '');
                if (unlocked > 0) {
                  $('#unlocks').show();
                  $('#unlocks,#mislish').addClass('col-sm-6');

                  $.each(dataxx, function(index, value) {
                
                    
                    joinitems.push('<div class="media" id="result' + index + '">  <span class="pull-left">  <img class="img-rounded helpz" src="https://graph.facebook.com/' + value.from + '/picture" data-toggle="tooltip" title="'+value.fromname+'"> </span><div class="media-body">  <div class="row-fluid"><div>Мислиш ли че, ' + window.user.name + ' ' + value.q + '?<div> <button class="btn btn-primary btn-xs unlock" alt="' + index + '"><i class="icon-lock"></i> Отключи</button>  <button class="btn btn-xs unlock_invite" alt="' + index + '"><i class="icon-lock"></i> Откл. с покана</button> <button class="btn btn-xs unlock_delete" alt="' + index + '"><i class="icon-trash"></i>&nbsp;</button></div><div class="result' + index + '" style="display:none"> '+value.fromname+' отговори <span class="label label-success">' + value.result + '</span> </div><hr>  </div>  </div> </div><div id="error-' + index + '" style="display:none"> <br><div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">×</button><strong>Опс!</strong> Събери 5 за да отключиш този отговор.</div></div><div id="errornonsend-' + index + '" style="display:none"> <br><div class="alert alert-error"><span class="btn btn-mini" id="sendplease" style="float:right">OK!</span><strong>Внимание!</strong> Известете приятелите си в диалога за да знаят за вашите отговориИзвестете приятелите си в диалога за да знаят за вашите отговори</div></div></div><div style="clear:both"></div>');
                  });
                  $('.media-list').html(joinitems.join(''));
                  $('.helpz').tooltip();
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

}



function providemislish(prevdata) {
  var vapros = window.mislish[next].q;
  var userid = window.fql[next].uid;
  var username = window.fql[next].first_name;
  $('.mislish_igra').show();
  $('.loading').hide();
  $('.img-attendee').attr('src', 'https://graph.facebook.com/' + userid + '/picture?type=large');

  $('#qus').text('Мислиш ли че, ' + username + ' ' + vapros + ' ?');

  $('#preload').attr('src', 'https://graph.facebook.com/' + window.fql[supernext].uid + '/picture?type=large');
  if (prevdata) {
    prevdata.fromname = window.user.first_name;

    $('#ownanswersend,#ownanswer').val('');
    var randomnumber = Math.floor(Math.random() * 2)
    $('#add' + randomnumber).html(window.iframe);
    $.post("https://graph.facebook.com/" + prevdata.to + "/notifications", {
      href: "?id=vaprosi",
      access_token: "181361935494|UBiDJEKsqWEwbKdWfXVYBgr-qNw",
      template: window.user.first_name + " каза нещо за теб",
    }, function(data) {


      if (!data.success) {
        var errordata = prevdata;
        errordata.key = errorlog
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
      })
      var marr = $.shuffle(arr).slice(0, 25);



      FB.ui({
        method: 'apprequests',
        message: 'Забавлявай се с играта в която разбираш мнението на приятелите си',
        to: marr.join(',')
      }, function(callback) {
        if (callback.to) {
          $('#result' + sqlid + ' .result').show();
          $('#result' + sqlid + ' button').remove();

          $.post('//arpecop.net/angel/db2/delete/stream10-' + window.user.id, window.stream[sqlid], function(data) {


          })

        }
      });

    }
  );
}


function registertodb(uid, token) {
  var prekey = "gender";

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