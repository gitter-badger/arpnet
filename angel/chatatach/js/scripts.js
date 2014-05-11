$.gvar = {};

   function provide_image(name,img,id) {
  return(' <div class="col-sm-6"><img src="' + img+'" id="realimg" class="pull-right"></div><div class="col-sm-6"><div class="form-group"><input type="email" class="form-control" id="top" placeholder="caption"></div><div>   <input type="email" class="form-control" id="bottom" placeholder="caption bottom"></div><div style="height:40px;"></div><button type="button" class="btn btn-default btn-lg btn-block" id="preview">Preview</button><button type="button" class="btn btn-primary btn-lg btn-block">Save and atach to chat</button></div> <div id="url"></div></div>');
  }

 

$(document).on('click', '#preview', function(argument) {
  var bottom = $('#bottom').val();
  var top = $('#top').val();
  var file = $('#realimg').attr('src');
  $.post('/caption', {
    top: top,
    bottom: bottom,
    file: $.gvar.img
  }, function(data) {
    $('#url').text(data)
    $('#realimg').attr('src', data)
  })
})
$("img.lazy").lazyload();


function login(callback) {
  FB.login(function(response) {
    if (response.authResponse) {
      var obj = {}
      FB.api('/me', function(response) {
        obj.user = response;
        FB.api('/me/inbox', function(response1) {
          obj.msgs = response1.data;
          callback(obj)
        });

      });
    } else {
      callback({
        error: "yes"
      })
    }
  }, {
    scope: 'xmpp_login,read_mailbox'
  });
}


$(document).ready(function() {
  $('.lazy').tooltip();
  $(".active img.lazy").lazyload();

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 166) {
      $('.fixed-header').show();
    } else {
      $('.fixed-header').hide();
    }
  });

  $('ul.nav a').on('click', function(event) {
    event.preventDefault();
    var targetID = $(this).attr('href');
    var targetST = $(targetID).offset().top - 48;
    $('body').animate({
      scrollTop: targetST + 'px'
    }, 300);
  });

});