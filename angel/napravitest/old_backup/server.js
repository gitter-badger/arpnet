var express = require('express');
var fs = require('fs');
var get = require('get');
var port = 88;
var gvar = {};
var bind = require('bind');
var app = express(),
	server = require('http').createServer(app);
app.use(express.bodyParser());


var crossed = [{
	"appid": "Кой, как целува, според зодията?",
	"id": "4c8540bae0ae9"
}, {
	"appid": "Зодии на четири колела",
	"id": "4c8bcbf14c8fe"
}, {
	"appid": "Какъв си в любовта според зодията?",
	"id": "4c7c1241cc3ed"
}, {
	"appid": "Зодии и аромати",
	"id": "4c8bdc16968e0"
}, {
	"appid": "Зодии, пари и кариера",
	"id": "4c7d3e53a5034"
}, {
	"appid": "Какъв скъпоценен камък си?",
	"id": "4c894431ca1a9"
}, {
	"appid": "Какъв десерт си?",
	"id": "4c8692b035e16"
}, {
	"appid": "Що за птица си!",
	"id": "4c89fbe98a946"
}, {
	"appid": "Характерът на зодиите в цвят",
	"id": "4c8a06f93f429"
}, {
	"appid": "Ставаш ли за шофьор ?",
	"id": "4c6e6443d4c51"
}, {
	"appid": "Сексуален зодиак",
	"id": "4c892965e1f2b"
}, {
	"appid": "Облечи се според зодията!",
	"id": "4c868afcd68f4"
}, {
	"appid": "Любовта на мъжа според зодията",
	"id": "4c76b8fc92f06"
}, {
	"appid": "Тялото на мъжа предсказва секса",
	"id": "4c7a80b55c403"
}, {
	"appid": "Кое е вашето любимо число?",
	"id": "4c78121b36041"
}, {
	"appid": "Японски хороскоп",
	"id": "4c87559b7c1fa"
}, {
	"appid": "Невинно или порочно секси си?",
	"id": "4c6bba2a9caed"
}, {
	"appid": "На \"Ти\" ли сте със секса?",
	"id": "4c6e3b084fd51"
}, {
	"appid": "Как въздействаш на мъжете?",
	"id": "4c6c4e225def9"
}, {
	"appid": "Създадени ли сте един за друг?",
	"id": "4c6cf891a680f"
}, {
	"appid": "Любов или страст?",
	"id": "4c6c09d7b596b"
}, {
	"appid": "Любовното мото на зодиите",
	"id": "4c852df741412"
}, {
	"appid": "Секс визитка",
	"id": "4c6fd130f3da0"
}, {
	"appid": "Колко си ревнив/а?",
	"id": "4c763d97328f9"
}, {
	"appid": "Какво животно си в леглото ?",
	"id": "4c6af7a8734db"
}, {
	"appid": "Кое е твоето скрито оръжие?",
	"id": "4c6bad9c9ee3f"
}, {
	"appid": "Девизите на зодиите",
	"id": "4c7cd3993f534"
}, {
	"appid": "Пазиш ли детето в теб?",
	"id": "4c792e805a556"
}, {
	"appid": "Питие според зодията",
	"id": "4c7ccc7726d0f"
}, {
	"appid": "Ерогенната зона ÑÐ¿Ð¾ÑÐµÐ´ Ð·Ð¾Ð´Ð¸ÑÑÐ°",
	"id": "4c7d4d6b76e72"
}, {
	"appid": "Бързо гадаене по букви",
	"id": "4c79235f806b6"
}, {
	"appid": "Кажи в кой месец си роден, за да ти кажа какъв си! ",
	"id": "4c76afb24cef5"
}, {
	"appid": "Тест за интелигентност (забавен)",
	"id": "4c711038103b9"
}, {
	"appid": "Какъв домашен любимец ви подхожда?",
	"id": "4c7237538055d"
}, {
	"appid": "Какъв човек си?",
	"id": "4c78dbc9525b3"
}, {
	"appid": "Цветът ти казва това!",
	"id": "4c77fdc3c9943"
}, {
	"appid": "Обичаш ли себе си?",
	"id": "4c8d2cf477f4e"
}, {
	"appid": "Умееш ли да се наслаждаваш на живота?",
	"id": "4c7431712dd71"
}, {
	"appid": "Зодиите и Луната",
	"id": "4c874a5d6ba26"
}, {
	"appid": "Тест за обвързани",
	"id": "4c78ed49d9f59"
}, {
	"appid": "Можете ли да се забавлявате ?",
	"id": "4cc9cf97ac5df"
}, {
	"appid": "Какъв характер съм?",
	"id": "4c908b04abf40"
}, {
	"appid": "Бива ли те за сваляч?",
	"id": "4c74dabb43542"
}, {
	"appid": "Умееш ли да се забавляваш?",
	"id": "4c8d41cb2bc01"
}, {
	"appid": "ЛЕСНО ЛИ СЕ ОБИЖДАТЕ?",
	"id": "4ccdd1ae5d009"
}, {
	"appid": "Очите издават характера",
	"id": "4c7a1d7a66cf1"
}, {
	"appid": "От какво се нуждаеш ?",
	"id": "4c6bf423686b0"
}, {
	"appid": "В кой ден си роден?",
	"id": "4c7a6bc36a73f"
}, {
	"appid": "Какъв телефон ти подхожда?",
	"id": "4c6e2fe2784f5"
}, {
	"appid": "Лесно ли се влюбвате?",
	"id": "4c6ce4e2558e5"
}, {
	"appid": "Умееш ли да съблазняваш?",
	"id": "4c768661ba160"
}, {
	"appid": "Кое пролетно цвете си ти?",
	"id": "4c7cb9fbd63c0"
}, {
	"appid": "Взискателна ли си към него?",
	"id": "4c8fbcb42c6fa"
}, {
	"appid": "Идеално гадже ли си?",
	"id": "4cb751439be73"
}, {
	"appid": "През кой сезон си роден?",
	"id": "4c7c24076a4d7"
}, {
	"appid": "Кажи ми как се обличаш?",
	"id": "4c8e474561438"
}, {
	"appid": "Що за пътешественик си ти?",
	"id": "4c73890513d9f"
}, {
	"appid": "Кажи какво ядеш, за да ти кажа какъв си!",
	"id": "4c8bcea65a899"
}, {
	"appid": "Избери число! (Гадание на екс)",
	"id": "4c77d8096f632"
}, {
	"appid": "Домошарка ли си?",
	"id": "4c907da2d4fac"
}, {
	"appid": "Коя приказна принцеса си?",
	"id": "4caf59a79e9be"
}, {
	"appid": "Рискуваш ли в любовта?",
	"id": "4c90738c270da"
}, {
	"appid": "Колко романтична си?",
	"id": "4c8e52b0927b6"
}, {
	"appid": "Имате ли шесто чувство ?",
	"id": "4cc734ec86e5c"
}, {
	"appid": "Следващото щастие, което ще ви сполети.",
	"id": "4c70f02f08117"
}, {
	"appid": "Ревниви ли сте?",
	"id": "4c6c1c810de2f"
}, {
	"appid": "Вие и флирта",
	"id": "4cc881e93efde"
}, {
	"appid": "Коя бира си?",
	"id": "4c73b45fcaaa3"
}, {
	"appid": "Кой от Под Прикритие си?",
	"id": "00pod"
}];


Array.prototype.chunk = function(chunkSize) {
	var array = this;
	return [].concat.apply([],
		array.map(function(elem, i) {
			return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
		})
	);
};
var other = crossed.chunk(10);



var SignedRequest = require('/usr/share/nginx/html/quotepublisher/staticapp/signed/index.js');
SignedRequest.secret = "92fb80e0e6878cb58d08e62cb3864d39";
app.all('/quiz/', function(req, res) {
	res.set({
		'Content-Type': 'text/html'
	})
	var json1 = {};
	var signed = req.body.signed_request;
	var signedRequest = new SignedRequest(signed);

	signedRequest.parse(function(errors, req) {
		if (req.data.user_id) {

			json1.access_token = req.data.oauth_token;
			json1.uid = req.data.user_id;
			get('https://graph.facebook.com/' + json1.uid + '/apprequests?access_token=' + json1.access_token).asString(function(err, body2) {
				var randomnumber = Math.floor(Math.random() * crossed.length);
				if (!err) {
					var body = JSON.parse(body2);

					if (body.data[0]) {

						res.end('<html><body><script>window.top.location.href = "https://apps.facebook.com/napravitest/' + body.data[0].data + '";</script></body><html>');
					} else {

						res.end('<html><body><script>window.top.location.href = "https://apps.facebook.com/napravitest/' + crossed[randomnumber].id + '";</script></body><html>');


					}
				} else {
					res.end('<html><body><script>window.top.location.href = "https://apps.facebook.com/napravitest/' + crossed[randomnumber].id + '";</script></body><html>');
				}
			});

		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.end('<html><body><script>window.top.location.href = "https://www.facebook.com/dialog/oauth?client_id=160206614136535&redirect_uri=https://apps.facebook.com/napravitest/";</script></body><html>');
		}

	});
});
//LIKE
app.get('/quiz/like', function(req, response) {
	res.set({
		'Content-Type': 'text/html'
	})
	var url = {
		params: function(a1) {
			var u = [];
			for (x in a1) {
				if (a1[x] instanceof Array)
					u.push(x + "=" + encodeURI(a1[x].join(",")));
				else if (a1[x] instanceof Object)
					u.push(JSON.params(a1[x]));
				else
					u.push(x + "=" + encodeURI(a1[x]));
			}
			return u.join("&");
		}
	};

	if (req.query) {
		var json = req.query;
		json.smurl = url.params(req.query);

		bind.toFile('/usr/share/nginx/html/static/like.html', json, function callback(data) {
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			response.end(data);
		});
	} else {
		response.end('no values')
	}
});

app.all('/quiz/:id', function(req, response) {

	var id = req.params.id;

	if (!id) {
		id = '4c6bad9c9ee3f';
	}

	fs.readFile(__dirname + '/data/' + id + '.json', 'utf8', function(err, data) {
		if (!err) {
			var json1 = JSON.parse(data);
			json1.id = id;



			json1.quizz = data;
			var test = Object.keys(json1.quiz);

			var arrx = [];
			var results = [];
			test.forEach(function(val, key) {
				var title = json1.quiz[val].short;
				var full = json1.quiz[val].full;
				var resultid = key + 1;
				results.push('\n<div id="result' + resultid + '" class="fluid-row" style="display:none">\n\t<img src="https://arpecop.net/quiz/data/images/' + val + '.jpg" class="result_image" style="float:right">\n\t<p class="lead" class="result_title">' + title + '</p>\n\t<p class="result_full">' + full + '</p>\n<div style="clear:both"><a class="btn publish" id="share' + resultid + '">Сподели</a></div></div>');
			});

			json1.results = results.join('');
			var randomnumber = Math.floor(Math.random() * other.length);
			var zarr = [];
			other[randomnumber].forEach(function(valz, index) {

				zarr.push('<li><a href="https://apps.facebook.com/napravitest/' + valz.id + '" target="_top">' + valz.appid + '</a></li>');
			})

			json1.others = zarr.join('');

			bind.toFile(__dirname + '/indexa.html', json1, function callback(data) {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.end(data);
			});
		} else {
			var randomnumber = Math.floor(Math.random() * crossed.length)
			response.end('<html><body><script>window.top.location.href = "https://apps.facebook.com/napravitest/' + crossed[randomnumber].id + '";</script></body><html>');
		}
	});



});
server.listen(port);