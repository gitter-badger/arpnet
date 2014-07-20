var levelup = require('levelup')
var app = require('express')();
var db = levelup('./mydb');
var pagination = require('pagination')
var async = require('async')
var _ = require('underscore');
var port = process.env.PORT || 3000;
var bind = require("bind");
app.listen(port, function() {
	console.log("Listening on 84");
});

function isAlphaOrParen(str) {
	return /^[a-zA-Z()]+$/.test(str);
}
app.get('/', function(req, res) {
	var page;
	if (req.param('page')) {
		page = req.param('page')
	} else {
		page = 1;
	}
	var padj = {
		prelink: '/',
		current: page,
		rowsPerPage: 100,
		totalResult: 86000
	}
	var start = padj.current * padj.rowsPerPage - padj.rowsPerPage;
	var end = start + padj.rowsPerPage;

	var sarr = [];



	for (i = start; i <= end; i++) {
		sarr.push(i)
	}


	var paginator = new pagination.SearchPaginator(padj);

	var AsyncSquaringLibrary = {
		squareExponent: 2,
		tagsen: function(word, callback) {
			callback(null, '<a href="/word/' + word + '">' + word + '</a>');
		},
		square: function(number, callback) {

			db.get(number, function(err, doc) {
				if (!err) {
					var data = JSON.parse(doc)
					db.get('bg' + data['222'], function(err, doc1) {

						if (!err) {
							var tags = _.shuffle(data['111'].toLowerCase().split(' '));
							var arr = [];
							tags.forEach(function(val, index) {
								if (val.length > 6 && val.length <= 9 && isAlphaOrParen(val)) {

									arr.push('<a href="/word/' + val + '">' + val + '</a>   ');
								}
							})

							callback(null, '<div class="item"><h3>' + data.word + '</h3><p>' + doc1 + '</p><hr> ' + arr.join('|') + '</div>')
						} else {
							callback(null, '<div class="item"><h3>' + data.word + '</h3><p>' + data['111'] + '</p></div>')
						}

					});

				} else {
					callback(null, ' ')
				}
			})
		}
	};

	async.map(sarr, AsyncSquaringLibrary.square, function(err, result) {
		bind.toFile("./dev.html", {
				content: result.join(''),
				pagination: paginator.render()
			},
			function callback(data) {

				res.end(data);
			});

	});

});

app.get('/word/:id', function(req, res) {

	db.get(req.params.id, function(err, doc1) {
		if (err) {
			res.end('404 something went wrong')
		} else {
			bind.toFile("./word.html", {
					content: doc1

				},
				function callback(data) {

					res.end(data);
				});

		}
	});

});