$.gvar = {};

$(document).on('click', '.lazy', function(argument) {
  var bigimg = $(this).attr('alt');
  $('#realimg').attr('src', bigimg);
  $.gvar.img = bigimg;
});

$(document).on('click', '#preview', function(argument) {
  var bottom = $('#bottom').val();
  var top = $('#top').val();
  var file = $('#realimg').attr('src');
  $.post('/caption', {
    top: top,
    bottom: bottom,
    file: $.gvar.img
  }, function(data) {
    $('#realimg').attr('src', data)
  })
})
$("img.lazy").lazyload();


function login(callback) {
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me', function(response) {
        callback(response)
      });
    } else {
      callback({error:"yes"})
    }
  },{scope:'xmpp_login'});
}


$(document).ready(function() {

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