 var socket = io.connect();
 function put(query) {
 	$.post('http://flirtbot.net:81/db/' + query.key, query).done(function(data) {
 		return ('ok');

 	});
 }


 var current = 0;
 var total;
 var items = {};

 function prepare_content() {
 	$.getJSON('http://flirtbot.net:81/igra', function(data) {
 		console.log(data)
 		total = data.length;
 		items = data.items;
 		provide_number(0)
 	});

 }

 function provide_number(number) {
 	// body...
 	var data = items[number];
 	$('.name').text(data.name);
 	$('#voteimg').attr('src', 'https://graph.facebook.com/' + data.id + '/picture?width=200&height=200');
 }

 $(document).on('click', '.item', function() {
 	var data = items[current];
 	console.log(data);
 	var vote = $(this).text();
 	var to = data.id;
 	var from = "{{id}}";
 })


 // <h3 class="name">Rudi</h3> <img src="https://graph.facebook.com/arpecop/picture?width=200&amp;height=200"   id="voteimg" class="column rounded ui image">

 prepare_content();