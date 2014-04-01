$.gvar = {};
$.gvar.next_chunk_invites = 0;

function logintoggle() {
  $('.loginelement,.registerelement').toggle();
}

function regmein() {
  var user = $('#inputEmail').val();
  var password = $('#inputPassword').val();
  if (user && password) {
    var document = {};
    document._id = $.md5(user);
    document.password = $.md5(password);
    document.email = user;
    insert_document(document, regmein_sok, regmein_fail);

  } else {

  }

};



function logmein() {
  var user = $('#logmeinusername').val();
  var password = $.md5($('#logmeinpassword').val());

  $.getJSON('//arpecop.net/db/dating/_design/user/_view/login?key=%22' + password + '%22&value=%22' + user + '', function(data) {


    if (data.rows.length == 0) {
      $("#wrongpassword").show().delay(2000).fadeOut();
      $('#logmeinusername,#logmeinpassword').val('');
    } else {
      regmein_sok(data.rows[0].value);
    };
  });

};

function regmein_sok(username) {
  $('#navigation,#intro,#progresssection,#thumbs,.notlogged').toggle();
  $('.username').text(username);


}

function regmein_fail() {

  $("#username_zaet").show().delay(2000).fadeOut();

}

function logmein_fb1() {
  FB.login(function(response) {

    if (response.authResponse) {
      if (response.authResponse.accessToken) {
        $.gvar.fb_uid = response.authResponse.userID;
        $.gvar.fb_accessToken = response.authResponse.accessToken;
        logmein_fb();
        $('#navigation,#intro,#thumbs,.notlogged').toggle();

      } else {
        // user is logged in, but did not grant any permissions
      }
    } else {
      // user is not logged in
    }
  }, {
    scope: 'user_birthday,friends_location,friends_birthday,user_location,friends_relationships,email'
  });
}



function logmein_fb() {
  FB.api('/me?fields=name,email', function(response) {
    $('.username').text(response.name);
    var doc = {};
    doc._id = $.md5(response.id);
    doc.email = response.email;
    doc.password = response.id;
    //insert_document(doc,logmeinfbfirsttimer,null);  

  });


  function logmeinfbfirsttimer() {
    var fb_invites = [];
    var query = 'SELECT uid, first_name, birthday_date, sex, current_location,relationship_status FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = ' + $.gvar.fb_uid + ')';
    FB.api('/fql', {
      q: query
    }, function(response) {



      $.each(response.data, function(index, value) {

        if (value.relationship_status == "Single") {
          fb_invites.push(value.uid);

          var obj = {};
          obj._id = "" + value.uid + "";
          obj.refer = "" + $.gvar.fb_uid + "";
          if (value.sex) {
            obj.sex = value.sex;
          }

          obj.name = value.first_name;
          if (value.current_location) {
            obj.city = value.current_location.city;
            obj.country = value.current_location.country;
            obj.location = value.current_location.id;
          };

          // insert_document(obj,null,null);         

        };
      });
      var chunksize = 40;
      var invites = fb_invites.chunk(chunksize);
      var arr_invetes2 = [];
      $.each(invites, function(index, value) {
        arr_invetes2[index] = value.join(',');
      });
      $.gvar.invites = arr_invetes2;

      send_requests();

    });

    ///////



    ///////

  }



}


function show_hide_button(current_lement, element) {

  $('#' + element + ', .' + element + '#' + current_lement + ', .' + current_lement).toggle();

}



var task = {
  _id: "test11",
  test: "mest"
}

  function insert_document(document, success, error) {
    //$.getJSON('//arpecop.net/db/dating/'+document._id+'', function(data) {

    $.ajax({
      type: "PUT",
      url: "//arpecop.net/db/dating/" + document._id,
      contentType: "application/json",
      data: JSON.stringify(document),
      success: function() {
        if (success) {
          success();
        };


      },
      error: function() {
        if (error) {
          error();
        };

      }
    });

  }



  (function($) {
    $.fn.shuffle = function() {
      return this.each(function() {
        var items = $(this).children();
        return (items.length) ? $(this).html($.shuffle(items)) : this;
      });
    }

    $.shuffle = function(arr) {
      for (
        var j, x, i = arr.length; i; j = parseInt(Math.random() * i),
        x = arr[--i], arr[i] = arr[j], arr[j] = x
      );
      return arr;
    }
  })(jQuery);
Array.prototype.chunk = function(chunkSize) {
  var array = this;
  return [].concat.apply([],
    array.map(function(elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}

function send_requests() {
  FB.ui({
    method: 'apprequests',
    message: 'Facebook Flirt',
    to: $.gvar.invites[$.gvar.next_chunk_invites]
  }, function(response) {
    if (response) {
      var current_percentage_step = $.gvar.next_chunk_invites + 1;
      var total_steps = $.gvar.invites.length;
      $.gvar.next_chunk_invites++;
      var test = Math.round(100 * current_percentage_step / total_steps);

      $('.progress .bar').css('width', test + '%');

      if (total_steps >= $.gvar.next_chunk_invites) {


      } else {
        send_requests();
      }

    } else {



    }
  });
};

 
window.fbAsyncInit = function() {
  FB.init({
    appId: '142587889152183', // App ID
    channelUrl: '//www.secretzone.bg/channel.html', // Channel File
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true // parse XFBML
  });
  FB.Canvas.setAutoGrow();

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {

      $.gvar.fb_uid = response.authResponse.userID;
      $.gvar.fb_accessToken = response.authResponse.accessToken;
      FB.api('/me?fields=name,email', function(response) {

        regmein_sok(response.name);
      });


    } else if (response.status === 'not_authorized') {

    } else {
      // the user isn't logged in to Facebook.
    }
  });
};

// Load the SDK Asynchronously
(function(d) {
  var js, id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));