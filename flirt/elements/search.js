 var db = require('../src/db.js');
 var pagination = require('pagination');
 var timedif = require('./fun/timedif.js')


 function profileinfo(req, res) {
 	var json = {};

 	if (!req.session.passport.user) {
 		json.notlogged = true;
 		json.profilez = true;
 	} else {
 		json = req.session.passport.user;

 		json.chat = false;
 		json.logged = true;
 		json.resultsx = json.results;
 	     json.results = false;
 		json.profilez = true;
 		 json.index = false;
 		json.game = false;
 	}
 	db.get(req.params.id, function(data) {
 		if (data.message) {
 			res.end('No such user');
 		} else {
 			if (req.params.id == json.id) {
 				res.end('you cannot write to yourself')
 			} else {

 				json.profileinfo = JSON.parse(data);
 				if (json.profileinfo.locale) {
 					json.profileinfo.img = 'https://graph.facebook.com/' + json.profileinfo.id + '/picture'
 				} else {
 					json.profileinfo.img = 'http://flirtbot.net/images/' + json.profileinfo.id + '.jpg'
 				}

 				locations(json.profileinfo, function(loc) {
 					json.loc = loc;

 					res.render('dev', json);

 				})
 			}



 		}
 	})
 }


 function locations(data, callback) {
 	if (data.location) {
 		var json = {}
 		var location = data.location.name.split(', ')
 		json.country = location[1];
 		json.city = location[0];
 		json.gender = data.gender;
 		if (json.gender == 'female') {
 			json.opposite = 'male';
 		} else {
 			json.opposite = 'female';
 		}
 		callback(json)
 	} else {
 		callback(null)
 	}

 }


 // search
 function search(req, res) {
 	var json = {};
 	if (!req.session.passport.user) {
 		json.notlogged = true;
 	} else {
 		json = req.session.passport.user;
 		json.logged = true;
 		json.profilez = false;
 	}
 	// query determine
 	var query;
 	var page = Math.round(req.params.page);
 	var prelink;
 	if (page) {
 		query = req.params.query + '' + page;
 		prelink = '/s-' + req.params.query + '-';
 	} else {
 		page = 1;
 		query = req.params.query;
 		prelink = '/s-' + req.params.query + '-';

 	}



 	///

 	var qplain = req.params.query.replace(/[0-9]/g, "");
 	qplain = qplain.replace('female', '').replace('male', '');
 	db.get('rcx-' + qplain, function(datac) {
 		if (datac.message) {
 			db.get('stack-' + qplain, function(data) {
 				if (!data.message) {
 					var stacks;
 					if (data <= 15) {
 						stacks = 0
 					} else {
 						var stacks = Math.round(Math.round(data - 5) / 10);
 						var total = data;
 						var arr = []
 						var x = 2;
 						for (var i = 1; i < stacks + 1; i++) {
 							var key;
 							if (i == 1) {
 								key = qplain
 							} else {
 								key = qplain + "" + i
 							}

 							db.get(key, function(datax) {
 								if (!datax.message) {
 									console.log("FUCK");
 								};
 								var data = JSON.parse(datax);

 								data.forEach(function(data, index) {

 									arr.push(data.val)

 									if (x == total) {
 										console.log('finish')
 										db.put({
 											key: 'rcx-' + qplain,
 											value: arr
 										})
 									};
 									x++;

 								})


 							})
 							//document.write(cars[i] + "<br>");
 						}

 					}
 				};
 			})
 		} else {
 			json.cities = JSON.parse(datac).value;

 		}


 		db.get(query, function(data) {
 			if (!data.message) {
 				json.results = JSON.parse(data);
 				db.get('stack-' + req.params.query, function(data_stack) {
 					var paginator = new pagination.SearchPaginator({
 						prelink: prelink,
 						current: page,
 						rowsPerPage: 10,
 						totalResult: data_stack - 10
 					});
 					json.paging = paginator.getPaginationData();



 					//	res.end(JSON.stringify(json.results));
 					res.render('dev', json);

 				});
 			} else {
 				res.end('no results');
 			}

 		})
 	})

 }
 //igra

 function igra(req, res) {
 	var json = {};
 	if (!req.session.passport.user) {
 		json.notlogged = true;
 	} else {
 		json = req.session.passport.user;
 		json.logged = true;
 		json.profilez = false;
 	}
 	// query determine
 	var query;
 	var page = Math.round(req.params.page);
 	var prelink;
 	if (page) {
 		query = req.params.query + '' + page;
 		prelink = '/s-' + req.params.query + '-';
 	} else {
 		page = 1;
 		query = req.params.query;
 		prelink = '/s-' + req.params.query + '-';

 	}


 	db.get(query, function(data) {
 		if (!data.message) {
 			json.results = JSON.parse(data);
 			db.get('stack-' + req.params.query, function(data_stack) {
 				var paginator = new pagination.SearchPaginator({
 					prelink: prelink,
 					current: page,
 					rowsPerPage: 10,
 					totalResult: data_stack - 10
 				});
 				json.paging = paginator.getPaginationData();



 				//	res.end(JSON.stringify(json.results));
 				res.render('dev', json);

 			});
 		} else {
 			res.end('no results');
 		}

 	})
 	delete json
 }


 ///profile info 

 //197

 exports.igra = igra;
 exports.profileinfo = profileinfo;
 exports.search = search;