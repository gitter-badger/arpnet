// check registration
var prekey = 'fotoz-reg-';

function insert(data) {
 return(data);
	 $.post('https://arpecop.net/angel/db/'+prekey+'' + data.key, data, function(data1) {
    
      });
}

var mata = {obj:'test',level:'up'}
 var data = {key:prekey+'test',mata:mata}
 insert(data);

function check_regs(uid,token) {
		$.getJSON('//arpecop.net/quotepublisher/db/'+prekey+'' + uid, function(data) {
		if (data.cause) {
			 $.getJSON('https://graph.facebook.com/' + uid+'/photos?access_token='+token, function(data) {
			 
			 	$.each(data.data,function(key,data){
				 //	console.log(data.images[0].source);
			 	})
			 });
			 
		} else {
			 
		}
	});
}

//get_strean

function get_stream(uid,token) {
	check_regs(uid,token);

}