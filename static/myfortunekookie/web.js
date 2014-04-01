var express = require('express');
var port = process.env.PORT || 80;
var fs = require('fs');
var get = require('get');
var crypto = require('crypto');
var bind = require('bind');
var gvar = {  
    test : "emperor"
}; 
gvar.quotes = {0 : 'A firm friendship will prove the foundation on your success in life.',1 : 'A firm friendship will prove the foundation on your success in life.', 2 : 'A friend asks only for your time, not your money.', 3 : 'A friend is a present you give yourself.', 4 : 'A member of your family will soon do something that will make you proud.', 5 : 'A pleasant surprise is in store for you.', 6 : 'A quiet evening with friends is the best tonic for a long day.', 7 : 'A secret admirer will soon send you a sign of affection.', 8 : 'A single kind word will keep one warm for years.', 9 : 'A thrilling time is in your immediate future.', 10 : 'A warm smile is testimony of a generous nature.', 11 : 'Anger begins with folly, and ends with regret.', 12 : 'As the purse is emptied the heart is filled.', 13 : 'Be mischievous and you will not be lonesome.', 14 : 'Be prepared to accept a wondrous opportunity in the days ahead!', 15 : 'Count your blessings by thinking of those whom you love.', 16 : 'Dont forget, you are always on our minds.', 19 : 'Excitement and intrigue follow you closely wherever you go!', 20 : 'Fame  riches and romance are yours for the asking.', 21 : 'Generosity and perfection are your everlasting goals.', 22 : 'Good luck is the result of good planning.', 23 : 'Good things are being said about you.', 24 : 'Happy news is on its way to you.', 25 : 'He who laughs at himself never runs out of things to laugh at.', 26 : 'Hearts are not to be had as a gift, hearts are to be earned.', 27 : 'Ideas are like children   there are none so wonderful as your own.', 28 : 'If you continually give, you will continually have.', 29 : 'If you want the rainbow, you must put up with the rain.', 30 : 'If you would be loved, love and be lovable.', 31 : 'If your desires are not extravagant they will be granted.', 32 : 'In the end there are three things that last: faith, hope and love  and the greatest of these is love.', 33 : 'It takes more than good memory to have good memories.', 34 : 'Let there be magic in your smile and firmness in your handshake.', 35 : 'Look for new outlets for your own creative abilities.', 36 : 'Love always and deeply.', 37 : 'Love asks me no questions, and gives me endless support.', 38 : 'Love begets love.', 39 : 'Love conquers all.', 40 : 'Love is for the lucky and the brave.', 41 : 'Love is like wildflowers. it is often found in the most unlikely places.', 42 : 'Love is the only medicine for a broken heart.', 43 : 'Love is the triumph of imagination over intelligence.', 44 : 'Make two grins grow where there was only a grouch before.', 45 : 'May life throw you a pleasant curve.', 46 : 'Much more grows in the garden than that which is planted there.', 47 : 'Nature, time and patience are the three best physicians.', 48 : 'One who admires you greatly is hidden before your eyes.', 49 : 'Only love lets us see normal things in an extraordinary way.', 50 : 'Plan for many pleasures ahead.', 51 : 'Pray for what you want, but work for the things you need.', 52 : 'Smiling often can make you look and feel younger.', 53 : 'Someone is speaking well of you.', 54 : 'Something you lost will soon turn up.', 55 : 'Strong and bitter words indicate a weak cause.', 56 : 'The beginning of wisdom is to desire it.', 57 : 'The greatest gift is love.', 58 : 'The joyfulness of a man prolongeth his days.', 59 : 'The one you love is closer than you think.', 60 : 'The time is right to make new friends.', 61 : 'There is no limit to love s forbearance, to its trust, its hope, its power to endure.', 62 : 'Those who have love, have wealth beyond measure.', 63 : 'To love is to forgive.', 64 : 'We cannot do great things  only small things with great love.', 65 : 'You find beauty in ordinary things, do not lose this ability.', 66 : 'You have a deep appreciation of the arts and music.', 67 : 'You will be invited to an exciting event.', 68 : 'You will have a very pleasant experience.', 69 : 'You will inherit some money or a small piece of land.', 71 : 'You will live a long, happy life.', 72 : 'You will spend old age in comfort and material wealth.', 73 : 'You will step on the soil of many countries.', 74 : 'You will take a chance in something in the near future.', 75 : 'You will witness a special ceremony.', 76 : 'Your ability to juggle many tasks will take you far.', 77 : 'Your artistic talents win the approval and applause of others.', 78 : 'Your blessing is no more than being safe and sound for the whole lifetime.', 79 : 'Your everlasting patience will be rewarded sooner or later.', 81 : 'Your flair for the creative takes an important place in your life.', 82 : 'Your great attention to detail is both a blessing and a curse.', 83 : 'Your greatest fortune is the large number of friends you have.', 84 : 'Your heart is a place to draw true happiness.', 85 : 'Your heart is a place to draw true happiness.', 86 : 'Your heart is pure, and your mind clear, and your soul devout.', 87 : 'Your heart will always make itself known through your words.', 88 : 'Your life will be happy and peaceful.', 89 : 'Your many hidden talents will become obvious to those around you.'}; 
gvar.randnum =Math.floor(Math.random()*89);
var rand_num = gvar.randnum;
var quote = gvar.quotes[gvar.randnum];
 
 	var server = express.createServer(
 
		express.bodyParser()
	 	);
	server.use("/", express.static(__dirname + '/views/'));
 
 
 

	 	server.all('/', function(req, res){
	if(req.method == "POST") {
		var signed = req.param('signed_request', null);
		var payload = signed.split('.');
		var sig = payload[0];
		var data = JSON.parse(new Buffer(payload[1], 'base64').toString());
 
		if (data['algorithm'].toUpperCase() !== 'HMAC-SHA256') {
			console.log('Unknown signed_request hash algorithm: ' + data['algorithm']);
			return null;
		}
		var expected_sig = crypto.createHmac('sha256', '3b96d27356caadd056b24ea3daba5acf');
		expected_sig.update(payload[1]);
		expected_sig = expected_sig.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
		var uid = data.user_id;
		var token =  data.oauth_token;
		}
		
 
		bind.toFile(__dirname + '/views/indexa.html', {uid:uid,token:token, quote:quote,randnum:rand_num},
		            function callback(data) {  
				    res.send(data);
			 });
	});
 

server.get('/*/swf.swf', function(request,response){
response.sendfile(__dirname + '/views/static/royale.swf');
})


server.get('/*/settings.xml', function (request, response) {
 	
 
	 var the_id = request.params[0];
	 console.log('GET ID'+the_id);
  
 
 
	  console.log(gvar.quotes[the_id])
 	response.writeHead(200, {
				'Content-Type': 'text/xml',
				'X-Frame-Options': 'GOFORIT',
				'Access-Control-Allow-Origin': '*'
			});
	
	   		bind.toFile(__dirname + '/views/settings.xml', {the_id:the_id,quote:gvar.quotes[the_id],randnum:rand_num}, function callback(data) {  
				    response.end(data);
			 });

});

 
server.listen(port);

console.log('All is well');
