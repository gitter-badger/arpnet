 

var json = {
  "728" : [
  '<script src="\/\/ads.lfstmedia.com/getad?site=133108" type="text/javascript"><\/script><script type="text/javascript">\n//<![CDATA[\n LSM_Slot({\n  adkey: \'b09\', ad_size: \'728x90\',\n slot: \'slot50021\'\n });\n //]]>\n <\/script>\n' 
  ],
  "320" : [
  
    "<a href=\"https://www.digitalocean.com/?refcode=ca32d5195d8c\" target=\"_top\"><img src=\"https://arpecop.net/pagead/src/ssd.png\"></a>"
  ]
};


var data = json[google_ad_width];

if (data) {
 
  var item = data[Math.floor(Math.random()*data.length)];
   //log(item);
   document.write(item)

};


