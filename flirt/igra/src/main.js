function prepare_content(userdata, key, total) {
 
  var json = userdata;

  if (key && total) {
    $.gvar.user = userdata;
    var rkey = getRandomInt(2, total);
    var urltoget;
    if ($.gvar.user.id == '572383379') {
      urltoget = 'devjson.json';
    } else {
      urltoget = '//arpecop.net/quotepublisher/db/' + key + '' + rkey;
    }

    $.getJSON(urltoget, function(data) {
      json.arr = data.items;

      $.gvar.userdata = userdata;

      $.gvar.chunkflirts = data.items;

      populate_content(populate);
      var arr = [];
      $.each(data.items,function(index,value){
        arr.push('<img src="//graph.facebook.com/'+value.uid+'/picture?type=large" width="1" height="1">');
      });
      $('#preload').html(arr.join(''));


    });

  }
  var dataxxx;
  var dataxx;

  $.getJSON('//arpecop.net/angel/db2/comparestreamone' + json.id, function(dataxx2) {

    if (!dataxx2.message) {
      if (!dataxx2.length) {
        dataxxx = new Array;
        dataxxx.push(dataxx2);

      } else {
        dataxxx = dataxx2;
      }
      $.gvar.stream2 = dataxxx;

      var arr = [];
      $.each(dataxxx, function(index, value) {
        $.getJSON('//arpecop.net/angel/db2/' + value.session, function(data) {
          var matahari;
          if (!data.length) {
            matahari = new Array;
            matahari.push(data);
          } else {
            matahari = data;
          }
          var arr = [];
          $.each(matahari, function(index, value) {
            var timestamp;
            if (!value.timestamp) {
              timestamp = value.key;
            } else {
              timestamp = value.timestamp
            }


            if (timestamp > $.gvar.lastonline) {
              arr.push('x');
              $.gvar.notifications++;
            };
          })

          var extendchat = "Чат";
          if (arr.length > 0) {
            extendchat = arr.length;
          }

          $('#' + value.session + ' .flirtchat').html(' <i class="icon-comments"></i> ' + extendchat + ' ');


          //$.gvar.notifications = Math.round($.gvar.notifications + matahari.length); 



        });
        arr.push(template_unlocked(index, value.session, value.from, value.vote));

      });

      if ($.gvar.notifications > 0) {
        $('#notifications').show('slow').html('<a href="#"><span class="label label-warning"><i class="icon-comments"></i> ' + $.gvar.notifications + '<span></a>');
      }

      $('#inbox1').html(arr.join(''));



    }

  });

  $.getJSON('//arpecop.net/angel/db2/comparestream' + json.id, function(dataxx1) {
    if (!dataxx1.message) {

      if (!dataxx1.length) {
        dataxx = new Array;
        dataxx.push(dataxx1);
      } else {
        dataxx = dataxx1;
      }
      var arr = [];
      var i = 0;
      var i1 = 0;
      $.gvar.stream1 = dataxx;
      $.each(dataxx, function(index, value) {

        var picture;
        if (value.unlocked == "yes") {
          picture = template_unlocked(i, value.session, value.to);
          i++;
          $.gvar.unlockedid = i;
        } else {
          picture = template_locked(i1, value.session, value.to, value.vote, value.gender);

          i1++;
        }
        arr.push('' + picture + '');

      });
      $('#inbox').html(arr.join(''));
      $('.help').tooltip();
    }

  });

}