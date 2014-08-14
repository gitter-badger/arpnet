var express = require('express');
var app = express();
var geoip = require('geoip-lite');
var feed = require("feed-read");
app.listen(3000);


app.get('/',function  (req,res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

})


feed("http://dariknews.bg/rss.php", function(err, articles) {
  if (err) throw err;
  articles.forEach(function  (val,index) {
  	var content = val.content.split('"');
  	console.log(content[1]);
  	console.log(content[12]);
  	 console.log(' <div class="col-sm-6 col-md-4"> <div class="thumbnail"><img data-src="'+content[1]+'" alt="..."><div class="caption"><h3>Thumbnail label</h3><p'+content[12]+'</p><p><a href="'+val.link+'" class="btn btn-primary" role="button">Read More</a></p></div></div></div></div>');
  })
  // Each article has the following properties:
  // 
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  // 
});

