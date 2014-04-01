<?php 
$refer = $_SERVER['HTTP_REFERER'];
 
$chars = preg_split('/\//', $refer);
$app = $chars[2];
 
 
 switch ($app) {
 case "www.mystic-box.com":
echo 'FB_RequireFeatures(["CanvasUtil"], function(){    
FB.XdComm.Server.init("xd_receiver.html");     
FB.CanvasClient.startTimerToSizeToContent();   });
FB.init("3b24d5a790fb9c633348db91a0807001");
  function callPublish(msg, attachment, action_link) {
  FB.ensureInit(function () {
    FB.Connect.streamPublish(\'\', attachment, action_link);
  });
}';
 exit;
    case 1:
        echo "i equals 1";
        break;
    case 2:
        echo "i equals 2";
        break;
}
 
 
 
//echo 'document.write("'.app.'  ")'; ?>



