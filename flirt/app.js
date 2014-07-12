 $.gvar = {};
 var socket = io.connect();

 Array.prototype.unique = function() {
   var unique = [];
   for (var i = 0; i < this.length; i++) {
     if (unique.indexOf(this[i]) == -1) {
       unique.push(this[i]);
     }
   }
   return unique;
 };
 socket.on('news', function(data) {
   $.gvar[data.call](data.items);
 });

 //gold



 //MESSAGE
 socket.on('msg', function(data) {
   if (data.sender) {
     if (data.fromname !== "Activity") {

       if ($('#' + data.key).length == 1) {
         $('#' + data.key).append(formatmessage(data));

         $("html,body").animate({
           scrollTop: $('#chats .event:last').offset().top - 30
         });
       } else {
         show_chat(data.key, '')
       }
     }

   } else {
     if ($('#' + data.key).length == 1) {
       $('#' + data.key).append(formatmessage(data));

       $("html,body").animate({
         scrollTop: $('#chats .event:last').offset().top - 30
       });
     }
   }

   $.gvar.rearange(uid);

 });
 //format message

 function formatmessage(data) {
   var img = 'https://graph.facebook.com/' + data.from + '/picture'
   //<div class="event">

   return ('<div class="event"><div class="label"> <img src="' + img + '"></div><div class="content"> <div class="date">  ' + $.timeago(data.date) + ' </div> <div class="summary">    <a href="profile-' + data.from + '" class="fromnamechat">' + data.fromname + '</a> ' + data.msg + '</div>  </div></div>');
 }

 //send message on form 

 function send_message(msg, uid, fromname) {
   var data = {
     msg: msg,
     from: uid,
     to: $.gvar.replyto,
     fromname: fromname
   };


   socket.emit('pmessage', data);
   $('.chatinput input').val('');
   $('.chatinput').show();
 }


 //db functions
 function get(query, callback) {
   $.getJSON('db/' + query, function(data) {
     if (data.message) {
       callback(null)
     } else {
       callback(data)
     }
   });
 }

 function put(query) {
   $.post('db/' + query.key, query).done(function(data) {
     return ('ok');
   });
 }

 function del(query) {

   $.post('db/del/' + query.key, query).done(function(data) {

   });
 }

 function delkey(query) {
   $.post('db/delkey/' + query).done(function(data) {

   });
 }



 $(document).on('click', '.sesdel', function() {
   var session = $(this).attr('alt');

   del($.gvar[session]);


   del({
     key: 'rec' + uid,
     session: session
   });
   del({
     key: 'rec' + $.gvar.replyto,
     session: session
   });

   del({
     key: 'session' + uid + '' + $.gvar.replyto
   });
   del({
     key: 'session' + $.gvar.replyto + '' + uid
   });
   $('.' + session + ',#' + session).hide('slow')

 });



 // show chat on click or other event

 function show_chat(session, curname) {
   $('#chats, .chats').show();
   get(session, function(data1) {

     if (data1) {
       var data;
       if (!data1.length) {
         data = [];
         data.push(data1);
       } else {
         data = data1;
       }

       var arr = [];
       var formatdata = data.reverse();
       $.gvar[session] = formatdata;
       var lng = formatdata.length;
       if (lng > 10) {
         var minus = lng - 10;
       } else {
         minus = 0;
       }

       $.each(data.splice(minus, 10), function(index, value) {
         arr.push(formatmessage(value));
       });

       $('#chats').html('<div id="' + session + '"><div class="ui ribbon label curname">chat&nbsp;with&nbsp;' + curname + '</div><a class="ui icon button sesdel small" alt="' + session + '"><i class="icon trash"></i></a><div>' + arr.join('') + '</div></div>');

       if (arr.length == 1) {
         $('.chatinput , .summary a').hide();
       } else {
         $('.chatinput').show();
         $('#unlockme').hide();
         $('.chatinput div input').attr('placeholder', 'Write to  ' + curname);
         $('.curname').text(curname);
       }

       $("html,body").animate({
         scrollTop: $('#chats #' + session + ' .event:last').offset().top - 30
       });

       var unreadz = $('.unread').length;
       if (unreadz == 0) {
         $('#unread').hide();
       } else {
         $('#unread').show().text(unreadz);
       }
     } else {
       $('.chatinput').show();
     }
   });
 }


 //  click to show chat

 $(document).on('click', '.chats a', function() {
   var session = $(this).attr('alt');
   $('.chatinput').show();
   var from = $(this).attr('title');
   var curname = $('.' + session + ' .content .header').text();
   $('.' + session + ' i').remove();
   $.gvar.replyto = from;
   put({
     key: from + '' + uid,
     value: 'read'
   }, function() {

   })



   $('.chats a').removeClass('active');
   $(this).addClass('active');

   var unreaded = $('#unread').text() - 1;

   if (unreaded <= 0) {
     $('#unread').hide().text('0');
   } else {
     $('#unread').show().text(unreaded);
   }

   show_chat(session, curname);

 });
 //gold client

 socket.on('goldclient', function(data) {
   $('#gold').text(data);
 });
 //unlock



 // image check fb or system
 function imgprovide(id) {
   if (id.length > 30) {
     return ('http://flirtbot.net/src/images/' + id + '.jpg')
   } else {
     return ('https://graph.facebook.com/' + id + '/picture')
   }
 }


 //rearange item list chat

 $.gvar.rearange = function(uid) {
   get('rec' + uid, function(data1) {
     if (data1) {
       if (!data1.length) {
         data = [];
         data.push(data1);
       } else {
         data = data1;
       }

       var arr = [];
       var count = [];
       $.each(data, function(index, value) {
         if (value.fromname) {
           $.gvar[value.session] = value;

           if (value.locked == "true") {
             // arr.push('<a class="item session' + index + ' ' + value.session + ' lockedbar" alt="' + value.session + '" title="' + value.from + '""><img class="ui avatar image" src="' + imgprovide(value.from) + '"> <div class="content"> <div class="header"><i></i>Someone (locked)</div></div></a>');
             arr.push('<a class="item session' + index + ' ' + value.session + ' lockedbar" alt="' + value.session + '" title="' + value.from + '""><img class="ui avatar image" src="' + imgprovide(value.from) + '"> <div class="content"> <div class="header"><i></i>' + value.fromname + '</div></div></a>');
           } else {
             arr.push('<a class="item session' + index + ' ' + value.session + '" alt="' + value.session + '" title="' + value.from + '""><img class="ui avatar image" src="' + imgprovide(value.from) + '"> <div class="content"> <div class="header"><i></i>' + value.fromname + '</div></div></a>');
           }
           // get('unlocked' + value.session, function(data1) {  if (data1) {

           //  }  });

           get(value.from + '' + uid, function(data) {

             if (data) {
               //   

               if (data.value == 'unread' & $.gvar.replyto !== value.from) {
                 count.push('1');
                 $('.' + value.session + '').addClass('unread');
                 $('.' + value.session + ' i').addClass('unhide icon');
                 $('#unread').show().text(count.length);

               }
             }
           })
         };
       });
       //  } else {   alert('this user is not in party')   }

       $('.chats').html(arr.join(''));
     }
   });
 }



 window.fbAsyncInit = function() {
   FB.init({
     appId: '105397064351', // App ID
     channelUrl: '//flirtbot.net/src/channel.html', // Channel File
     status: true, // check login status
     cookie: true, // enable cookies to allow the server to access the session
     xfbml: true // parse XFBML
   });
   FB.Canvas.setAutoGrow();
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

 function provide(id) {

   var id1 = id.replace('#', '');

   $.getJSON('elements/' + id1 + '.json', function(data) {

     $(data.show).show();
     $(data.hide).hide();
     $(id).html(data.data);


   })
 }

 $('.addremove').on('click', function() {
   var id = $(this).attr('alt');
   provide(id);


 });