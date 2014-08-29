Array.prototype.chunk = function(chunkSize) {
  var array = this;
  return [].concat.apply([],
    array.map(function(elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}



function getRandomizer(bottom, top) {
  return function() {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
}



if (!window.reqid) {

  switchapp('267f')
} else {



  $.getJSON('//arpecop.net/angel/iztegli/src/data/' + window.reqid + '.txt', function(data) {
    $('.appname').text(data.appname);
    var randomnumber = Math.floor(Math.random() * data.quotes.length);
    var img;
    window.data = data.quotes;
    if (data.quotes[randomnumber].image == null) {
      img = data.image;
    } else {
      img = data.quotes[randomnumber].image;
    }

    show_quote(data.quotes[randomnumber].quote, img);
  });

}
$.getJSON('//arpecop.net/angel/iztegli/src/data/data.json', function(data) {
  var arr = [];

  var randomnumber = Math.floor(Math.random() * data.length - 10);
  for (var i = randomnumber; i < randomnumber + 12; i++) {
    var pushdata = data[i];
    arr.push('<div id="' + pushdata.slug + '" class="col-sm-3">   <div class="thumbnail switchapp"  id="' + pushdata._id + '"><img class="img-rounded" src="//arpecop.net/angel/iztegli/imgs/' + pushdata.image + '" id="img_' + pushdata.slug + '">  <p class="lead">' + pushdata.appname + '</p>  <div class="row-fluid"><div class="clear"></div></div></div> </div>');

  }


  var chunks_arr = arr.chunk(4);
  var arr_items2 = [];
  $.each(chunks_arr, function(index, val) {

    arr_items2.push('<div class="row-fluid">' + val.join('') + '<div style="clear:both;"></div></div><hr>');
  })



  var final_item = arr_items2.join('');



  $('#promoz').html(final_item);
  // var item_width = $('#promoz   .col-3').width();

  //$('#promoz .col-3 button').css('max-width',item_width+'px')



});

window.canvas_url = "https://apps.facebook.com/vartelejka/" + window.reqid;
window.extend_dir = "(:extend:)";

function show_quote(quote, img) {
  var old_img = $('.image_quote').attr('src');
  var new_img = '//arpecop.net/angel/iztegli/imgs/' + img + '';
  var second_element_to_animate = 'image_quote1';
  if (old_img != new_img) {
    second_element_to_animate = 'image_quote';
  }


  $('.image_quote1').attr('src', '//arpecop.net/angel/iztegli/imgs/' + img + '');
  $(".share").removeClass('disabled');
  $(".publishedinfo").hide();
  $('.quote,.' + second_element_to_animate + ', #controlz').animate({
    opacity: 0
  }, 1000, function() {
    if (img) {
      $('.image_quote').attr('src', '//arpecop.net/angel/iztegli/imgs/' + img + '');
    }
    $('.quote').text(quote);

    $('.quote,.' + second_element_to_animate + ', #controlz').animate({
      opacity: 1
    });

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



$(".thumb img").on("click", function() {
  var big_image = $(this).attr('src');

  big_image = big_image.replace('_s', '_n');
  window.image_to_publish = big_image;
  jQuery.facebox({
    image: big_image
  });

});

function app_action(text) {
  $("#app_actions").html(text);
  $("#app_actions").show().delay(1500).fadeOut();
}


$("#close_dialog").on("click", function() {
  $(document).trigger('close.facebox');
});



$(".next_remove").on("click", function() {
  $('#comment').val('');

  var rand = Math.floor(Math.random() * window.data.length)
  var quote = window.data[rand].quote;

  if (!window.data[rand].image) {
    var img = window.data.image;
  } else {
    var img = window.data[rand].image;
  }

  show_quote(quote, img)


});
//switchapp

function switchapp(id) {

  app_action('<img src="https://arpecop.net/angel/iztegli/src/images/loading.gif">');


  $.getJSON('//arpecop.net/angel/iztegli/src/data/' + id + '.txt', function(getfql) {

    window.data = getfql.quotes;
    window.canvas_url = 'https://apps.facebook.com/vartelejka/' + id + '';
    $('.appname').text(getfql.appname);
    if (getfql.file) {
      window.extend_dir = "&id=" + getfql.file;
    } else {
      window.extend_dir = "";
    }
    $('.next_remove').attr('id', getfql._id);
    $('.next_remove').addClass('switchapp');
    var lengther = getfql.quotes.length;
    var rand = Math.floor(Math.random() * lengther);
    var quote = getfql.quotes[rand].quote;
    window.quote = quote;
    window.quoteid = getfql.quotes[rand].id;
    var img = getfql.quotes[rand].image;
    if (!getfql.quotes[rand].image) {
      img = getfql.image;
      window.image = img;
    } else {
      img = getfql.quotes[rand].image;
      window.image = img;
    }


    show_quote(quote, img)

  });

}



$(document).on('click', '.switchapp', function() {
  var id = $(this).attr('id');
  switchapp(id);

  FB.Canvas.scrollTo(0, 0);
})


$('.share').on('click', function() {
  var quote = $('.quote').text();

  var image = $('.image_quote').attr('src');
  var appname = $('.appname').text();



  $(".share").addClass('disabled');

  FB.login(function(response) {


    var uniqid = (new Date()).getTime();
    var usname = $('.name').text();

    var url = '//arpecop.net/angel/proxy/?appid=iztegli&result=' + uniqid;

    $.post('//arpecop.net/angel/proxy', {
      id: uniqid,
      result: quote,
      preres: window.userimg + '-emp-' + window.username,
      title: appname
    }, function(data) {
     // console.log(data)

      $.getJSON(url, function(data) {
       // console.log(data.id);

        FB.api(
          'me/og.likes',
          'post', {
            object: window.canvas_url + '?imd=' + data.id + '&title=' + appname
          },
          function(response) {
          //  console.log(response);


            $('.publishedinfo').show(0).delay(4000).hide(0);


            if (response.id) {
              //  $('.resultx').attr('src','http://arpecop.net/quotepublisher/iztegli/?text='+uniqid);
              var comment = $('#comment').val();
              if (comment) {
                FB.api(response.id + '/comments',
                  'post', {
                    message: comment
                  },
                  function(response) {


                  })

              }
            }
          }
        );
      })
    })



  }, {
    scope: 'publish_actions'
  });

});



function login() {
  window.top.location.href = "http://www.facebook.com/connect/uiserver.php?app_id=130023570502846&next=" + encodeURIComponent(window.canvas_url) + "&display=page&fbconnect=1&method=permissions.request";
}


window.fbAsyncInit = function() {
  FB.init({
    appId: '329232053871264',
    status: true,
    xfbml: true,
    version: 'v2.0'
  });
  //



  //

  function connected(uid, token) {


    FB.api(
      "/me",
      function(getfql) {

        $.getJSON('https://graph.facebook.com/v2.1/' + uid + '/picture?access_token=' + token + '&width=150&height=150&callback=?', function(getfql1) {
          $('#userimg').attr('src', getfql1.data.url);
          window.userimg = getfql1.data.url;

        });

        window.username = getfql.first_name;
        $('.name').text(getfql.first_name);

      });

  }

  FB.getLoginStatus(function(response) {



    FB.Canvas.setAutoGrow();
    if (response.status === 'connected') {
      window.uid = response.authResponse.userID;
      window.accessToken = response.authResponse.accessToken;
      connected(response.authResponse.userID, response.authResponse.accessToken)
      FB.Event.subscribe('auth.login', function(response) {
        if (response.status === 'connected') {
          window.uid = response.authResponse.userID;
          window.accessToken = response.authResponse.accessToken;
          connected(response.authResponse.userID, response.authResponse.accessToken)
        } else {
          //  login();
        }
      });
    } else {
      //login();
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
  js.src = "//connect.facebook.net/bg_BG/sdk.js";
  ref.parentNode.insertBefore(js, ref);
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