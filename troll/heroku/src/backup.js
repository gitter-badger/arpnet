<script>

var socket = io.connect();
var channel = 'history';
socket.on('connect', function() {
socket.emit('auth', 'history');
  socket.on('history', function(history) {
  //history.message
$("#history").append('<li class="ui-li ui-li-static ui-body-c">'+history.message+'</li>');
 
});
});

$("#inputchat").live({
  focus: function() {
 
    $(this).css("width","90%");
    $.mobile.fixedToolbars.show();
  },
  focusout: function() {
   
    $(this).css("width","40%");
    var message = $(this).val();
    $.post("/send", { username: "John", message: message },
       function(data) {
         
       });
    
    $(this).val("");
   
  }
});


</script>