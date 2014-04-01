var scraper = require('scraper');
var nano = require('nano')('http://arpecop.com/');
var bind = require('bind');
var express = require('express');
var alice = nano.use('names'); 
var get = require('get');
var fs = require('fs');
var time = require('time');  
var app = express();


 
 
 
function job(job) {

    var obj = job;
    obj.datetoday = givemetoday();
    obj._id = obj.datetoday+''+obj.slug;
     
 get('http://arpecop.com/names/'+obj._id).asString(function(err, data) {
	   
  if(err) {
  //  if (err) throw err;
   

  
  scraper(
    {
   'uri': 'http://magicaura.com/horoskop/'+job.slug+'/'
   , 'headers': {
   'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
   }
    }
    , function(err, $) {
       
    if (err) {throw err}


 obj.today = $('#main #ctn .horoscope').children().eq(1).text();
 obj.week = $('#main #ctn .horoscope').children().eq(3).text();
 
 
   alice.insert(obj, function(err, body, header) {
      if (err) {
       
     
        return;
      }
       
    
     
    });

 
  
    }
);
} else {
   
}
});
}
 
 function givemetoday () {
   var now = new time.Date();
now.setTimezone("Europe/Bucharest");

var weekday=new Array(7);
weekday[0]="Неделя";
weekday[1]="Понеделник";
weekday[2]="Вторник";
weekday[3]="Сряда";
weekday[4]="Четвъртък";
weekday[5]="Петък";
weekday[6]="Събота";
var weekday1=new Array(12);
weekday1[0]="Януари";
weekday1[1]="Фефруари";
weekday1[2]="Март";
weekday1[3]="Април";
weekday1[4]="Май";
weekday1[5]="Юни";
weekday1[6]="Юли";
weekday1[7]="Август";
weekday1[8]="Септември";
weekday1[9]="Октомври";
weekday1[10]="Ноември";
weekday1[11]="Декември";
var zdate = now.getDate();
var zdatenastavka;
if(zdate == '1' || zdate == '21' || zdate == '31') {
zdatenastavka = 'ви';
} else if(zdate == '2' || zdate == '22') {
zdatenastavka = 'ри';
} else if(zdate == '8' || zdate == '28') {
zdatenastavka = 'ми';
} else {
zdatenastavka = "ти";
}
 
    return (now.getDate()+''+zdatenastavka+' '+weekday1[now.getMonth()]+' '+now.getFullYear()+' ('+weekday[now.getDay()]+')');

 
 }
 
////////WEB part
 

app.get('/astrolog/cron',function(req,res){
  var zodia = [{ "bg" : "Овен", "date" : "21.03 - 20.04", "element" : "Огън", "planet" : "Марс", "slug" : "oven"   },   { "bg" : "Телец", "date" : "21.04 - 20.05", "element" : "Земя", "planet" : "Венера", "slug" : "telec"   },   { "bg" : "Близнаци", "date" : "21.05 - 21.06", "element" : "Въздух", "planet" : "Меркурий", "slug" : "bliznaci"   },   { "bg" : "Рак", "date" : "22.06 - 22.07", "element" : "Вода", "planet" : "Луна", "slug" : "rak"   },   { "bg" : "Лъв", "date" : "23.07 - 22.08", "element" : "Огън", "planet" : "Слънце", "slug" : "lav"   },   { "bg" : "Дева", "date" : "23.08 - 22.09", "element" : "Земя", "planet" : "Меркурий", "slug" : "deva"   },   { "bg" : "Везни", "date" : "23.09 - 22.10", "element" : "Въздух", "planet" : "Венера", "slug" : "vezni"   },   { "bg" : "Скорпион", "date" : "23.10 - 22.11", "element" : "Вода", "planet" : "Плутон и Марс", "slug" : "skorpion"   },   { "bg" : "Стрелец", "date" : "23.11 - 21.12", "element" : "Огън", "planet" : "Юпитер", "slug" : "strelec"   },   { "bg" : "Козирог", "date" : "21.04 - 20.05", "element" : "Земя", "planet" : "Венера", "slug" : "kozirog"   },   { "bg" : "Водолей", "date" : "21.01 - 19.02", "element" : "Въздух", "planet" : "Уран и Сатурн", "slug" : "vodolei"   },   { "bg" : "Риби", "date" : "20.02 - 20.03", "element" : "Вода", "planet" : "Нептун и Юпитер", "slug" : "ribi"   }];
  for(var i = 0; i < 12; i++) {
 
   job(zodia[i]);
 
}

 
  res.end('ok')
})


app.get('/astrolog/publish',function(req,res){
var zod = req.query['zod'];
 
 get('http://arpecop.com/names/_design/zodiac/_view/todayspec?key="'+givemetoday()+''+zod+'"').asString(function(err, data1) {
  if (!err) {
    var json = JSON.parse(data1).rows[0].value;
     
  bind.toFile(__dirname+'/publish.html', json,   function callback(data) {  
        res.end(data)
        });
  } else {
      res.end('maintenance please come back later');
  }


  });

});
//index



app.all('/astrolog/',function(req,res){
  get('http://arpecop.com/names/_design/zodiac/_view/today?key="'+givemetoday()+'"').asString(function(err, data1) {
 var data = JSON.parse(data1);

    if (!err) {
    var json = {};
    json.items = data.rows;
     
         bind.toFile(__dirname+'/indexa.html', json,   function callback(data) {  
				res.end(data)
        });
    }
});
});

app.all('/astrolog/like/:id/*',function(req,res){

});



   app.listen(90);



