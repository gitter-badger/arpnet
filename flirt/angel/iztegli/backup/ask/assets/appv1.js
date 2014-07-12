(function($) {

  $.fn.shuffle = function() {
    return this.each(function() {
      var items = $(this).children().clone(true);
      return (items.length) ? $(this).html($.shuffle(items)) : this;
    });
  }

  $.shuffle = function(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  }

})(jQuery);
$('.itemfrind img').tooltip();
 $(document).ready(function(){
	
});	

function merge_options(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}

function login() {
	FB.login(function(response) {
   // handle the response
 }, {scope: 'email,user_likes'});
}

$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function(){
    FB.init({
      appId: '122683342943',
      channelUrl: '//arpecop.net/static/channel.html',
    });     
    	 var installed = [];
	 var noninstalled = [];
   	FB.getLoginStatus(function(response){
	 
	   	if(response.status !== "connected") {
		   	$('#login').show();
	   	} else {
		   	FB.api('/me/friends', {fields:"installed,name"}, function(response) {
		   
			 
			   		 $.each(response.data,function(index,value){
				   		 if(value.installed) {
					   		 installed.push(value);
				   		 } else {
					   		 noninstalled.push(value);
				   		 }
			   		 });
			   		 
			   		 initfriends(installed,noninstalled);
			   		 
			   	  
 
	$("[rel='tooltip']").tooltip();	
	
	$('#hover-cap-4col .thumbnail1').hover(
		function(){
			$(this).find('.caption').slideDown(250);
		},
		function(){
			$(this).find('.caption').slideUp(250);
		}
	);

	 
			   		 
			 });
	   	}
   	});
  });
});
