<? include "../phrases.php";
foreach ($cookie as $key => $value) {
 
$build = preg_split('/ /',$value);
foreach ($build as $key1 => $value1) {
if ($key1 == "2") {
	# code...
	 $arr[$key][] = '&$subheader=';
}
 $arr[$key][] = $value1;

}

 
}
echo "<pre>";
foreach ($arr as $keyx => $valuex) {
$comma_separated = implode(" ", $valuex);
 $new = ("http://s7d5.scene7.com/is/image/AdobeDI/home-hero-sidekick-v2?\$header=$comma_separated&\$size=350%2C0");
 $new = str_replace(" ","+",$new);
 echo  shell_exec('curl  \''.$new.'\' -o '.$keyx.'.png');
echo "\n";
}
 
?>