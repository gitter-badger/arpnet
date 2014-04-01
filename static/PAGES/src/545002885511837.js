  
$(document).ready(function() {
   $('#launch').text('Δες το αποτέλεσμα');
 });
function app_545002885511837(uid,token) {
  //Godini greek

 

       $.getJSON('https://graph.facebook.com/'+uid+'?fields=birthday&access_token='+token, function(data) {
 
        if (data.birthday) {
      var hrbirthday =  data.birthday.split("/");
     var currentTime = new Date();
     var currentYear = currentTime.getFullYear();
 
       var year = hrbirthday[2];
       var real_godini = currentYear - year;
 
       var rand;
       if(real_godini <= 18) {
          rand = 5;
       } else if (real_godini >= 19 && real_godini <= 35) {
 		rand = -6;

       } else if(real_godini >= 35) {
       		rand = -14;
       }
  var randomnumber=Math.floor(Math.random()* rand);
  var quote_id = real_godini + randomnumber;
 
 
        display_result(uid,quote_id,token,'Μάθε πόσο χρονών φαίνεσαι: http://cl.ly/N8sf','howoldgreek');
      
} else {
   var quote_id = randomFromTo(18,33);
   // function display_result(uid,quote,token,text,slug) {
   display_result(uid,quote_id,token,'Μάθε πόσο χρονών φαίνεσαι: http://cl.ly/N8sf','howoldgreek');
}
 
        });
     
 
 }