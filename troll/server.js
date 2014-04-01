var express = require('express');

 
var async = require('async');
var port = 83;



Array.prototype.chunk = function(chunkSize) {
	var array = this;
	return [].concat.apply([],
		array.map(function(elem, i) {
			return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
		})
	);
}
 
var app = express();
app.configure(function() {
	app.disable('x-powered-by');
 app.use(express.urlencoded());
 app.use(express.json());
	app.use(express.errorHandler({
		showStack: true
	}));
	app.use(express.methodOverride());
	app.use("/troll", express.static(__dirname + '/'));
});

function puts(error, stdout, stderr) {
	console.log(stdout + '-output-' + error);
};
app.listen(port, function() {
	console.log("Listening on 83");
});

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var vine = require(__dirname + '/functions/vine.js');
var troll = require(__dirname + '/functions/troll.js');
app.all('/troll/cron', troll.cron);
app.all('/troll/spodeli/:id', troll.spodelime);
app.all('/troll/v/:id', vine.id);



app.all('/troll/:id', troll.troll1);