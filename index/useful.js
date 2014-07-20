for (i = 0; i < 86036; i++) {
	db.get(i, function(err, doc1) {
		if (!err) {

			var data = JSON.parse(doc1);
			//console.log(data.word + '' + data['222'])
			db.get('bg' + data['222'], function(err, doc2) {
				if (!err) {
					console.log(data.word)
					db.put(data.word, doc2)
				}
			})

		}
	})

}