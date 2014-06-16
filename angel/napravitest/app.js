
function numKeys(obj) {
	var count = 0;
	for (var prop in obj) {
		count++;
	}
	return count;
}

function Shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
$.getJSON('src/cross.json', function(data) {
	var randomnumber = Math.floor(Math.random() * 64);
	var randomnumber1 = randomnumber + 5;
	var arr = [];
	var arr1 = [];
	for (var i = randomnumber; i <= randomnumber1; i++) {
		arr.push('<a href="https://apps.facebook.com/napravitest/' + data[i].id + '" target="_top" class="list-group-item">' + data[i].appid + '</a>');
		arr1.push('<li><a href="https://apps.facebook.com/napravitest/' + data[i].id + '" target="_top">' + data[i].appid + '</a></li>');
	}
	$.each(data, function(index, value) {});
	$('.others').html(arr.join(''));
	$('.others1').html(arr1.join(''));
});

///

function calculate() {
	FB.Canvas.scrollTo(0, 0);
	$('.preresults,.populate,#last_step').hide();
	var results = $('.progress div');
	var arr = [];
	$.each(results, function(index, value) {
		val1 = index + 1;
		var percents = $('#' + value.id).attr('style').replace(/[^0-9]/g, '');
		arr[percents] = {};
		arr[percents].percents = percents;
		arr[percents].id = val1;
	});
	var result = arr.reverse()[0];
	$('.results').show();
	$('#result' + result.id).show();
	//
	var uniqid = (new Date()).getTime();

	FB.login(function(response) {
		if (response.authResponse) {
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;

			$.post("//arpecop.net/angel/db2/insert", {
				key: $.gvar.id,
				value: 'ok'
			}, function(data) {});



			$.getJSON('https://graph.facebook.com/' + uid + '/friends?access_token=' + accessToken + '&callback=?', function(data) {
				var urlcomponent = {};
				urlcomponent.title = $('.appname').text();
				urlcomponent.descr = $('.description').text();
				urlcomponent.name = data.first_name;
				urlcomponent.qtitle = $('#result' + result.id + ' .lead').text();
				urlcomponent.qdescr = $('#result' + result.id + ' .result_full').text();
					urlcomponent.image = $('#result' + result.id + ' .result_image').attr('src');
					if (!urlcomponent.image) {
						urlcomponent.image = $('.page-header .img-rounded').attr('src');
					}
				FB.api('/me', {
					fields: 'first_name,third_party_id'
				}, function(data) {
				 

					var obj = {
						app_id: "160206614136535",
						type: "napravitest:quiz",
						appurl: "http://apps.facebook.com/napravitest/" + $.gvar.id,
						url: "http://apps.facebook.com/napravitest/" + $.gvar.id,
						appname: "[★" + urlcomponent.title + " ★]",
						title: "[★" + urlcomponent.title + " ★]",
						image: 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-prn2/t1/1781954_758614150816219_1108738241_n.jpg',
						description: urlcomponent.descr,
						appid: "160206614136535",
						description: urlcomponent.descr
					}
					 

					$.post("//chimpsnap.herokuapp.com/" + uniqid, obj, function(data) {
						 
						FB.api(
							'me/objects/napravitest:quiz',
							'post', {
								object: obj
							},
							function(response) {
								 
							}
						);

						FB.api('/me/friends', {
							fields: 'installed'
						}, function(data) {

							$.each(data.data, function(index, value) {
								if (value.installed) {
									$.getJSON('//arpecop.net/angel/db2/' + value.id + '' + $.gvar.id + '', function(instdata) {

										if (instdata.message) {
											$.post("//arpecop.net/angel/db2/insert", {
												key: value.id + '' + $.gvar.id,
												value: 'ok'
											}, function(data) {});
											$.post("https://graph.facebook.com/" + value.id + "/apprequests", {
												redirect_uri: $.gvar.id,
												access_token: "160206614136535|7-z4flqlZsKpNvVCj1R5ZVMffZk",
												message: "Направи теста - " + urlcomponent.title,
											}, function(data) {



											});
										}

									});
								};
							});

						});



					});
				});

				var arr = [];
				$.each(data.data, function(index, value) {
					arr.push(value.id);
				});
				var shuffle = Shuffle(arr).slice(0, 10);

				FB.ui({
					method: 'apprequests',
					message: urlcomponent.title + ' Направи този тест',
					to: shuffle
				}, function(callback) {})

			});
			//provide with name and appatize advert

		}
	}, {
		scope: 'publish_stream'
	});
	//
}
$(document).ready(function() {
	$('img').error(function() {
		$(this).remove();
	});
});


window.fbAsyncInit = function() {
	FB.init({
		appId: '160206614136535',
		status: true,
		cookie: true,
		xfbml: true,
		oauth: true,
		channelUrl: '//arpecop.net/static/channel.html',
		frictionlessRequests: true
	});

	FB.Canvas.setAutoGrow();
	//
	$(".publish").on("click", function() {
		var id = $(this).attr('id');
		id = id.replace('share', '')
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
		FB.login(function(response) {
			if (response.authResponse) {
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;

				FB.api('/me', {
					fields: 'first_name,third_party_id'
				}, function(data) {
					var urlcomponent = {};
					urlcomponent.title = $('.appname').text();
					urlcomponent.descr = $('.description').text();
					urlcomponent.name = data.first_name;
					urlcomponent.image = $('#result' + $.gvar.id + ' .result_image').attr('src');
					if (!urlcomponent.image) {
						urlcomponent.image = $('.page-header .img-rounded').attr('src');
					}
					urlcomponent.qtitle = $('#result' + $.gvar.id + ' .lead').text();
					urlcomponent.qdescr = $('#result' + $.gvar.id + ' .result_full').text();
					// if
				 
				 
				});
			} else {}
		}, {
			scope: 'publish_stream'
		});
	});
	//
	$.getJSON('//arpecop.net/angel/napravitest/data/' + $.gvar.id + '.json', function(data) {
		$('.appname').text(data.appname);
		$('.description').text(data.description);
		var results = [];
		var i = 1;
		$.each(data.quiz, function(key, val) {
			var title = val.short;
			var full = val.full;
			var resultid = key + 1;
			results.push('\n<div id="result' + i + '" class="row-fluid" style="display:none">\n\t<img src="https://arpecop.net/angel/napravitest/data/images/' + key + '.jpg" class="result_image" style="float:right">\n\t<p class="lead" class="result_title">' + title + '</p>\n\t<p class="result_full">' + full + '</p>\n<div style="clear:both"><!--<a class="btn publish" id="share' + resultid + '">Сподели</a>--></div></div>');
			i++;
		});
		//	json1.results = results.join('');
		// body...
		$('#rezese').html(results.join(''));
		// 
		var arr = [];
		$.gvar.order = 1;
		$.gvar.next = 2;
		$.gvar.allsteps = numKeys(data.questions) - 1;
		$.gvar.step_percents = Math.round(100 / $.gvar.allsteps);
		$.each(data.questions, function(index1, value1) {
			if (index1 > 0) {
				arr.push('  \n <div  style="" class="question" id="q' + index1 + '"><div class="lead1"><i class="icon-bookmark-empty"></i> ' + value1.question + '</div><div class="btn-group-vertical">');
				for (var i = 1; i < numKeys(value1); i++) {
					arr.push('\t<button class="btn btn-default" value="' + i + '"><i class="icon-circle-blank btntoggler"></i><i class="icon-circle btntoggler"></i>&nbsp;' + value1[i] + '</button>\n');
				}
				var display = '';
				if (index1 > 0) {
					display = 'style="display:none"';
				}
				//arr.push('  \n <div  '+display+' id="q'+index1+'"><p class="lead">'+value1.text+'</p><div class="btn-group btn-group-vertical row-fluid">');
				arr.push('</div> </div>');
			} else {
				for (var i = 1; i < numKeys(value1); i++) {
					$('.progress').append('<div class="bar bar-success" id="' + i + '" style="width: 1%;"></div>');
				}
			}
		});
		$('.populate').html(arr.join(''));
	});
};
(function(d) {
	var js, id = 'facebook-jssdk';
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "https://connect.facebook.net/en_US/all.js";

	d.getElementsByTagName('head')[0].appendChild(js);
}(document));

$(document).on("click", ".btn-group-vertical button", function() {
	$(this).addClass('btn-info');
	var id = $(this).val();
	//$(this+' .btntoggler').hide();
	$(this).find(".btntoggler").toggle();
	//var percents = next * step_percents;
	var current_style = $('.progress #' + id).attr('style');
	var percents = (Math.round(current_style.replace(/[^0-9]/g, '')) + $.gvar.step_percents);
	$('.progress #' + id).css('width', percents + '%');
	//$('#')
	if ($.gvar.allsteps == $.gvar.order) {
		$('#q' + $.gvar.order + '').css({
			opacity: 0.25
		});
		calculate();
		FB.Canvas.setAutoGrow();
	} else {
		var offset = $('#q' + $.gvar.next + '').offset();
		FB.Canvas.scrollTo(0, offset.top);
		$('#q' + $.gvar.order + '').animate({
			opacity: 0.25,
		}, {
			specialEasing: {
				width: 'linear',
				height: 'easeOutBounce'
			},
			complete: function() {
				$('#q' + $.gvar.next + '').css({
					opacity: 1
				});
				$.gvar.order++;
				$.gvar.next++;
			}
		});
	}
});