function insertdoc(doc) {
	$.post('//arpecop.net/angel/db2/inser', doc, function() {

	});
}

function initinbox(userid) {

	$.getJSON('//arpecop.net/angel/db2/actionz' + userid, function(data) {

		var dataxxx;
		if (!data.message) {
			if (!data.length) {
				dataxxx = new Array;
				dataxxx.push(data);

			} else {
				dataxxx = data;
			}
			var activity = [];
			var activity_count = 0;
			var arr = {};
			arr.poke = [];
			arr.dai_5 = [];
			arr.bliz = [];
			arr.bite = [];
			arr.gush = [];
			arr.spank = [];
			arr.tickle = [];
			arr.fostata = [];
				arr.question = [];
			var lastonline;
			$.getJSON('//arpecop.net/angel/db2/lastonline' + userid, function(datalast) {
				if (datalast.message) {
					lastonline = 1;
				} else {
					lastonline = datalast.value;
				}


				$.each(dataxxx, function(index, zdata) {
			 		var picture;
					arr[zdata.action].push("1");
					var hdate = $.timeago(Number(zdata.date));
					var extradiv;
					if (zdata.date > lastonline) {
						activity_count++;
						extradiv = " new";
					} else {
						extradiv = "";
					}
					if (zdata.action == "question") {
						picture = '<img src="assets/anonimass.png" class="img-rounded" width="40" height="40"> Анонимен: '+ zdata.text+'<div class="input-group"><input type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button">Отговори!</button></span>    </div><!-- /input-group -->';
					} else {
						picture = '<img src="https://graph.facebook.com/' + zdata.from + '/picture" class="img-rounded" width="40" height="40"> '+ zdata.text;
					}

					$('.activity-log .list-group').append('<li class="list-group-item' + extradiv + '"><span class="badge">' + hdate + '</span>'+picture+'&nbsp;&nbsp;</li>');
				});
				 
				if (activity_count > 0) {
					$('.activity,.itemx .lead').append(' <span class="label label-danger">' + activity_count + '</span>')
				};

				$.each(arr, function(index, value) {
					if (value.length > 0) {
						$('.stats').append('<li>' + actions[index].mnchislo + ': <span class="label label-default">' + value.length + '<span></li>');
					}
				});
			});
		}
	});
}


function transliterate(word) {
	var answer = "";
	var a = {};

	a["Ё"] = "YO";
	a["Й"] = "I";
	a["Ц"] = "TS";
	a["У"] = "U";
	a["К"] = "K";
	a["Е"] = "E";
	a["Н"] = "N";
	a["Г"] = "G";
	a["Ш"] = "SH";
	a["Щ"] = "SCH";
	a["З"] = "Z";
	a["Х"] = "H";
	a["Ъ"] = "'";
	a["ё"] = "yo";
	a["й"] = "i";
	a["ц"] = "ts";
	a["у"] = "u";
	a["к"] = "k";
	a["е"] = "e";
	a["н"] = "n";
	a["г"] = "g";
	a["ш"] = "sh";
	a["щ"] = "sch";
	a["з"] = "z";
	a["х"] = "h";
	a["ъ"] = "'";
	a["Ф"] = "F";
	a["Ы"] = "I";
	a["В"] = "V";
	a["А"] = "a";
	a["П"] = "P";
	a["Р"] = "R";
	a["О"] = "O";
	a["Л"] = "L";
	a["Д"] = "D";
	a["Ж"] = "ZH";
	a["Э"] = "E";
	a["ф"] = "f";
	a["ы"] = "i";
	a["в"] = "v";
	a["а"] = "a";
	a["п"] = "p";
	a["р"] = "r";
	a["о"] = "o";
	a["л"] = "l";
	a["д"] = "d";
	a["ж"] = "zh";
	a["э"] = "e";
	a["Я"] = "Ya";
	a["Ч"] = "CH";
	a["С"] = "S";
	a["М"] = "M";
	a["И"] = "I";
	a["Т"] = "T";
	a["Ь"] = "'";
	a["Б"] = "B";
	a["Ю"] = "YU";
	a["я"] = "ya";
	a["ч"] = "ch";
	a["с"] = "s";
	a["м"] = "m";
	a["и"] = "i";
	a["т"] = "t";
	a["ь"] = "'";
	a["б"] = "b";
	a["ю"] = "yu";

	for (i = 0; i < word.length; ++i) {
		answer += a[word[i]] === undefined ? word[i] : a[word[i]];
	}
	return answer;
}


jQuery.fn.sortElements = (function() {
	var sort = [].sort;
	return function(comparator, getSortable) {
		getSortable = getSortable || function() {
			return this;
		};
		var placements = this.map(function() {
			var sortElement = getSortable.call(this),
				parentNode = sortElement.parentNode,

				// Since the element itself will change position, we have
				// to have some way of storing it's original position in
				// the DOM. The easiest way is to have a 'flag' node:
				nextSibling = parentNode.insertBefore(
					document.createTextNode(''),
					sortElement.nextSibling
				);

			return function() {

				if (parentNode === this) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}

				// Insert before flag:
				parentNode.insertBefore(this, nextSibling);
				// Remove flag:
				parentNode.removeChild(nextSibling);

			};

		});

		return sort.call(this, comparator).each(function(i) {
			placements[i].call(getSortable.call(this));
		});

	};

})();


(function($) {

	$.fn.shuffle = function() {
		return this.each(function() {
			var items = $(this).children().clone(true);
			return (items.length) ? $(this).html($.shuffle(items)) : this;
		});
	}

	$.shuffle = function(arr) {
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr;
	}

})(jQuery);
$('.itemfrind img').tooltip();


function merge_options(obj1, obj2) {
	var obj3 = {};
	for (var attrname in obj1) {
		obj3[attrname] = obj1[attrname];
	}
	for (var attrname in obj2) {
		obj3[attrname] = obj2[attrname];
	}
	return obj3;
}

function login() {
	FB.login(function(response) {
		// handle the response
	}, {
		scope: 'email,user_likes'
	});
}



$(document).ready(function() {
	$.ajaxSetup({
		cache: true
	});
	$.getScript('//connect.facebook.net/bg_BG/all.js', function() {
		FB.init({
			appId: '181361935494',
			channelUrl: '//arpecop.net/static/channel.html',
		});
		var installed = [];
		var noninstalled = [];
		FB.getLoginStatus(function(response) {
			if (response.status !== "connected") {
				$('#login').show();
			} else {
				initinbox(response.authResponse.userID);
				$.gvar.ownerid = response.authResponse.userID;
				$('#userprofileid').attr('src', 'https://graph.facebook.com/' + response.authResponse.userID + '/picture');
				FB.api('/me/friends', {
					fields: "installed,name"
				}, function(response) {
					$.each(response.data, function(index, value) {
						if (value.installed) {
							installed.push(value);
						} else {
							noninstalled.push(value);
						}
					});
					initfriends(installed, noninstalled);
					$("[rel='tooltip']").tooltip();

					$('#hover-cap-4col .thumbnail1').hover(
						function() {
							$(this).find('.caption').slideDown(250);
						},
						function() {
							$(this).find('.caption').slideUp(250);
						}
					);
					FB.Canvas.setAutoGrow();



				});
			}
		});
	});
});