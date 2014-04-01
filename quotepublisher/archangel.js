var concat = require('concat-stream');
var express = require('express')

var levelup = require('level-rocksdb');
var sublevel = require('level-sublevel');
var levelQuery = require('level-query');
var db = sublevel(levelup(__dirname + '/db', { encoding: 'json' }));
var query = levelQuery(db);
//
var app = require('express')(),
	swig = require('swig');
swig.setDefaults({
	cache: false
});
var query = levelQuery(db);
app.engine('html', swig.renderFile);
app.configure(function() {
 
	app.set('view engine', 'html');
	app.set('views', __dirname + '/');
	app.use(express.urlencoded());
	app.use(express.json());
});


app.listen('3000')

var archangel = function(req,res) {
	res.end('ok');
}

app.all('/',archangel);
app.all('/:id',archangel);
 


app.all('/dbq/', function(req, res) {

	if (req.method === 'GET') {
		res.setHeader('content-type', 'application/json');

		var q = query(req.url);
		q.on('error', function(err) {
			res.end(err + '\n')
		});
		q.pipe(res);
	} else if (req.method === 'POST') {
		req.pipe(concat(function(body) {
			db.put(req.url.slice(1), JSON.parse(body));
			res.end('ok\n');
		}));
	}

})