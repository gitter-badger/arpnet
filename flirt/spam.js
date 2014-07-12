	db.get('stack-maleBulgaria', function(data) {
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