 var dat = new Date();
 var _id = 'fortunecock' + dat.getDate() + '' + dat.getMonth() + '' + dat.getFullYear();

 $('.privacy').click(function() {
   $('#privacy').toggle();
 })

 

 function login() {
   top.location.href = "https://www.facebook.com/dialog/oauth?client_id=119250176060&redirect_uri=https://apps.facebook.com/myfortunekookie/&scope=publish_stream";
 }

 function publish(quote_src, quote_text) {


   FB.api(
     'me/og.likes',
     'post', {
       object: "https://apps.facebook.com/myfortunekookie/?id=" + quote_src + "&descr=" + quote_text
     },
     function(response) {

     }
   );
 }

 window.fbAsyncInit = function() {
   FB.init({
     appId: '119250176060', // App ID
     status: true,
     cookie: true,
     xfbml: false,
     oauth: true,
     channelUrl: '//arpecop.net/static/channel.html',
     frictionlessRequests: true
   });
   //

   FB.Canvas.setAutoGrow();

   FB.Event.subscribe('auth.authResponseChange', function(response) {


     if (response.status === "connected") {

       $.post('//arpecop.net/angel/db2/insert', {
         key: _id + '' + response.authResponse.userID,
         value: 'o'
       }, function() {

       });

       var fromid = "(:id:)";
       if (fromid.length > 6) {
         $('#gift').html('<img src="https://graph.facebook.com/(:id:)/picture" class="img-responsive">&nbsp;&rarr;&nbsp;<img src="https://graph.facebook.com/' + response.authResponse.userID + '/picture" class="img-responsive">')
       };



       $.getJSON('https://api.facebook.com/method/fql.query?query=' + encodeURIComponent('SELECT uid,is_app_user,first_name FROM user WHERE is_app_user AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())') + '&access_token=' + response.authResponse.accessToken + '&format=json&callback=?', function(fql) {


         var frarr = [];
         $.each(fql, function(index, value) {

           var sid = _id + '' + value.uid;



           $.getJSON('//arpecop.net/angel/db2/' + sid, function(nosqldata1) {


             if (nosqldata1.message) {
               frarr.push('<img src="https://graph.facebook.com/' + value.uid + '/picture" width="40" height="40">');

               $.post('//arpecop.net/angel/db2/' + sid, {
                 key: sid,
                 value: 'o'
               }, function() {
                 var arr = ['and 1 other friend', 'and 2 other friends', 'and 3 other  friends ', 'and 4 other  friends', 'and 5 other  friends'];
                 var item = arr[Math.floor(Math.random() * arr.length)];
                 $.post('https://graph.facebook.com/' + value.uid + '/apprequests', {
                   href: '?id=' + response.authResponse.userID + '',
                   message: 'Its your lucky day!   @[' + response.authResponse.userID + '] ' + item + ', giving away fortune cookie"',
                   access_token: '119250176060|Cwpv6VD0ro4TDAYVzOlG3xukZc0'
                 }, function(data) {



                 })


               });
             }
           });


         });
         var arrfr = frarr.splice(0, 10);
         if (frarr.length > 1) {

           $('.info').show();
           $('#friends .avatars').html(frarr.splice(0, 10).join(''));
         }

       });
     } else {
       login();
     }
   });


   //



   //  


   $('#publish').on('click', function() {
     $.getJSON('static/items.json', function(quotes) {
       var randomnumber = Math.floor(Math.random() * quotes.length);
       var quote_text = quotes[randomnumber].value;
       var quote_src = quotes[randomnumber].key;

       $('.trigger').hide();
       $('.rezult').show('slow').html('<img src="https://graph.facebook.com/' + quote_src + '/picture?type=normal">');
       FB.getLoginStatus(function(response) {

         // if the user is logged in, continue to check permissions
         if (response.authResponse) {
           FB.api('/me/permissions', function(perms_response) {


             if (perms_response.data[0].publish_stream == 1) {
               publish(quote_src, quote_text);
             } else {
               login();
             }



           });

         } else {
           login();
         }

       });



     });

   });



 };
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