 function nano(template, data) {
     return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
         var keys = key.split("."),
             v = data[keys.shift()];
         for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
         return (typeof v !== "undefined" && v !== null) ? v : "";
     });
 }

 (function ($) {

     $.fn.shuffle = function () {
         return this.each(function () {
             var items = $(this).children().clone(true);
             return (items.length) ? $(this).html($.shuffle(items)) : this;
         });
     }

     $.shuffle = function (arr) {
         for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
         return arr;
     }

 })(jQuery);

 Date.prototype.customFormat = function (formatString) {
     var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
     var dateObject = this;
     YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
     MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M;
     MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
     DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D;
     DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
     th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
     formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);

     h = (hhh = dateObject.getHours());
     if (h == 0) h = 24;
     if (h > 12) h -= 12;
     hh = h < 10 ? ('0' + h) : h;
     AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
     mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m;
     ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s;
     return formatString.replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
 }




 $.gvar = {};
 $.gvar.current = 0;
 $.gvar.next = 0;
 $.gvar.itemsloaded = [];
 $.gvar.item_template = $('.itemt').html();
 $('.itemt,#myCarousel,container,section').hide();
 $('#home').show();

 $('#foo').on('click', function () {

     FB.login(function (response) {


         // handle the response
     }, {
         scope: 'user_about_me'
     });
 });

 $(document).on('click', '.addtolikes,.addtosaves', function () {

     var obj = {};
     var id = $(this).attr('alt');
      



     var installed = $('#' + id + ' input[name="installed"]').val();
     var subject = $('#' + id + ' input[name="userid"]').val();
     var img = $('#' + id + ' input[name="img"]').val();
     var name = $('#' + id + ' input[name="uname"]').val();
     var date = $('#' + id + ' input[name="date"]').val();
     var action = $(this).attr('class');

     $('#'+id+' .'+action).parent("li").addClass('disabled');


     if (installed == "yes") {
         //122683342943|wbpd8yR2Q86gsUK6jidbiCGuZ7I
         $.post("https://graph.facebook.com/" + subject + "/notifications", {
             url: "https://apps.facebook.com/pixworld/",
             access_token: "122683342943|wbpd8yR2Q86gsUK6jidbiCGuZ7I",
             template: $.gvar.ownername + " voted for your photo"
         }, function (data) {



         });

     }

     var obj = {};
     if (img) {
         obj.img = img;
         obj.name = name;
         obj.img_small = img.replace('_n', '_s');


     }
     obj.date = date;
     obj.key = 'pixapp20' + action + '' + $.gvar.ownerid;


     $('#table' + action).prepend('<tr><th><img src="' + obj.img_small + '"></th> <th>' + obj.name + '</th><th>' + obj.date + '</th><th></th></tr>');



     $.post('https://arpecop.net/angel/db2/insert', obj, function (data) {});

 });

 //process buttons




 $('.pull-right li a').on('click', function () {
     var showid = $(this).attr('href');

     $('section').hide();
     $(showid).show();


 });



 (function ($) {
     $.provide = function () {
         var current = $.gvar.current;
         var loaded = $.gvar.itemsloaded.length;
         var datax = $.gvar.items[$.gvar.current];


         if (datax && datax.id) {
             $.getJSON('https://api.facebook.com/method/fql.query?query=' + encodeURIComponent('SELECT src_big, caption,created from photo where pid in (SELECT pid from photo_tag where subject =' + datax.id + ' order by rand() limit 1)') + '&access_token=' + $.gvar.token + '&format=json&callback=?', function (data) {


                 if (data.length == 1) {
                     var obj = data[0];

                     var date = new Date(obj.created * 1000);


                     obj.date = date.customFormat("#DD# #MMMM# #YYYY#");

                     obj.id = datax.id;
                     obj.next = $.gvar.next;
                     obj.installed = datax.installed;
                     obj.first_name = $.gvar.items[$.gvar.current].first_name;
                     if ($.gvar.next === 0) {
                         $('#myCarousel').show();
                         $('.loading').hide();
                         obj.active = ' active';
                         obj.src = obj.src_big;
                         $('#myCarousel').carousel('pause')
                     } else {
                         obj.active = ' noze';
                         obj.src = 'https://arpecop.net/angel/dvanadeset/src/fancybox_loading.gif';
                     }



                     $('#items').append(nano($.gvar.item_template, obj));
                     $.gvar.itemsloaded.push(data[0]);
                     $.gvar.next++;
                     $.gvar.current++;


                 } else {

                     $.gvar.current++;


                 }
                 setTimeout(function () {
                     $.provide();

                 }, (700))




             });
         }

     }

 })(jQuery);


 var prev = 0;
 var next = 1;
 var preload = 2;




 $('#myCarousel .right').on('click', function () {
     $('#' + next + ' .itemimg').attr('src', $.gvar.itemsloaded[next].src_big);
     $('#' + preload + ' .itemimg').attr('src', $.gvar.itemsloaded[preload].src_big);
     next++;
     prev++;
     preload++;
 });



 function logged(response) {
     $.gvar.token = response.authResponse.accessToken;
     FB.api('/me', function (data) {

         $.gvar.ownerid = data.id;
         $.gvar.ownername = data.first_name;

         $.getJSON('http://arpecop.net/angel/db2/pixapp20addtolikes' + data.id, function (data) {
             if (!data.message) {
                 $.each(data, function (index, value) {
 
                     $('#tableaddtolikes').append('<tr><th><img src="' + value.img_small + '"></th> <th>' + value.name + '</th><th>' + value.date + '</th><th></th></tr>');

                 });

                 $('#tablelikes1').dataTable();
             }
             // body...
         });


              $.getJSON('http://arpecop.net/angel/db2/pixapp20addtosaves' + data.id, function (data) {
             if (!data.message) {
                 $.each(data, function (index, value) {

 
                     $('#tableaddtosaves').append('<tr><th><img src="' + value.img_small + '"></th> <th>' + value.name + '</th><th>' + value.date + '</th><th></th></tr>');
                 });

                 $('#tablesaves1').dataTable();
             }
             // body...
         });


         $('#username').text(data.first_name);
         $('.logged').show();
     });
     var $panels = $('#items');
     $.gvar.installed = [];
     $.gvar.noninstalled = [];

     var onWidgetReject = function (event, obj) {
         if (obj.installed == 'yes') {

             $.gvar.installed.push(obj);
         } else {
             $.gvar.noninstalled.push(obj);
         }

         if (($.gvar.installed.length + $.gvar.noninstalled.length) == obj.tlength) {
             $.gvar.items = $.gvar.installed
             $.each($.gvar.noninstalled, function (index, value) {
                 $.gvar.items.push(value);
             });
             $.provide();
         }

     };



     $.gevent.subscribe($panels, 'widget-reject', onWidgetReject);
     $.getJSON('https://graph.facebook.com/me/friends?fields=installed,first_name&access_token=' + response.authResponse.accessToken + '&callback=?', function (fql) {
         var data = $.shuffle(fql.data);
         var lengther = data.length;
         $.each(data, function (index, value) {
             var obj = value;
             obj.tlength = lengther;
             if (value.installed) {
                 obj.installed = 'yes';
             } else {
                 obj.installed = 'not';
                 // $.gvar.noninstalled.push(value.id)
             }
             $.gevent.publish('widget-reject', obj);
         });
     });
 }
 window.fbAsyncInit = function () {
     // init the FB JS SDK
     FB.init({
         appId: '122683342943', // App ID from the app dashboard
         channelUrl: '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
         status: true, // Check Facebook Login status
         xfbml: true, // Look for social plugins on the page
         frictionlessRequests: true
     });


     FB.Canvas.setAutoGrow();

     FB.getLoginStatus(function (response) {
         if (response.status === 'connected') {

             logged(response);



         } else {

             top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=122683342943&redirect_uri=https%3A%2F%2Fapps.facebook.com%2Fpixworld%2F&scope=friends_photos';

         }
     });

     // Additional initialization code such as adding Event Listeners goes here
     FB.Event.subscribe('auth.authResponseChange', function (response) {

         if (response.status != "connected") {


             top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=122683342943&redirect_uri=https%3A%2F%2Fapps.facebook.com%2Fpixworld%2F&scope=friends_photos';
         }
     });
 };

 // Load the SDK asynchronously
 (function (d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {
         return;
     }
     js = d.createElement(s);
     js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));