 

var json = {
  "728" : [
    "<iframe width='720' height='300' frameborder='no' framespacing='0' scrolling='no' src='//ads.lfstmedia.com/slot/slot53849?ad_size=720x300&adkey=39c'></iframe>"  
  ],
  "320" : [
    "<a href=\"https://apps.facebook.com/sortexbg/?lang=en\" target=\"_top\"><img src=\"https://arpecop.net/pagead/src/adsmall.jpg\"></a>",
    "<a href=\"https://www.digitalocean.com/?refcode=ca32d5195d8c\" target=\"_top\"><img src=\"https://arpecop.net/pagead/src/ssd.png\"></a>"
  ]
};


var data = json[google_ad_width];

if (data) {
 
  var item = data[Math.floor(Math.random()*data.length)];
   //log(item);
   document.write(item)

};
