<?php
 
function v6($url, $args) {
 
 
  $APIKEY = "rudi";
  $SECRET = "password";
 
 
  $options['url'] = $url;
 
  $options += $args;
 
 
  foreach($options as $key => $value) { $_parts[] = "$key=$value"; }
 
 
  $query_string = implode("&", $_parts);
  $TOKEN = md5($url.''.$SECRET);
 
 
  return "http://api.sitecapp.com/$APIKEY/$TOKEN/?capture=".$options['url']."";
  
 
}
 
 
# usage
$options['force']     = 'false';      # [false,always,timestamp] Default: false
$options['fullpage']  = 'false';      # [true,false] Default: false
$options['viewport']  = "1280x1024";  # Max 5000x5000; Default 1280x1024
 
$src = v6("http://yahoo.com", $options);

echo $src;
 
 
?>


<iframe src="<?php echo $src?>" width="100%" height="300"></iframe>