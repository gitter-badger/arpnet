<h1>RSS</h1>

<div class="form feeds">
<!-- BEGIN feeds -->
<div class="row feed well">
		<div class="col-sm-12 col-xs-12">
			<div class="form-group">
				<label>Feed URL</label>
				<input type="text" class="form-control feed-url" placeholder="Enter the RSS feed URL" value="{feeds.url}">
			</div>
		</div>
		<br/>
		<div class="clearfix">
			<div class="col-sm-3 col-xs-12">
				<div class="form-group">
					<label>Category</label>
					<select class="form-control feed-category" data-category="{feeds.category}">

					</select>
				</div>
			</div>
			<div class="col-sm-9 col-xs-12">
				<div class="form-group">
					<label>Tags</label><br/>
					<input type="text" class="form-control feed-tags" placeholder="Tags for the topics" value="{feeds.tags}">
				</div>
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>User</label>
				<input type="text" class="form-control feed-user" placeholder="User to post as" value="{feeds.username}">
			</div>
		</div>
		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>Interval</label>
				<select class="form-control feed-interval" data-interval="{feeds.interval}">
					<option value="60">1 Hour</option>
					<option value="720">12 Hours</option>
					<option value="1440">24 Hours</option>
					<option value="1">1 Minute</option>
				</select>
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>Topic Timestamp</label>
				<select class="form-control feed-topictimestamp" data-topictimestamp="{feeds.timestamp}">
					<option value="now">Now</option>
					<option value="feed">Feed Publish Time</option>
				</select>
			</div>
		</div>

		<div class="col-sm-3 col-xs-12">
			<div class="form-group">
				<label>&nbsp;</label>
				<button class="form-control remove btn-warning">Remove</button>
			</div>
		</div>

		<input type="hidden" class="form-control feed-lastEntryDate" value="{feeds.lastEntryDate}">
	</div>
	<!-- END feeds -->
</div>

<button class="btn" id="addFeed">Add Feed</button>

<button class="btn btn-primary" id="save">Save</button>

<script src="/vendor/jquery/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		var categories = null;

		function addOptionsToAllSelects() {
			$('.form-control.feed-category').each(function(index, element) {
				addOptionsToSelect($(element));
			});
		}

		function addOptionsToSelect(select) {
			for(var i=0; i<categories.length; ++i) {
				select.append('<option value=' + categories[i].cid + '>' + categories[i].name + '</option>');
			}
		}

		socket.emit('categories.get', function(err, data) {
			categories = data;
			addOptionsToAllSelects();

			$('.feed-interval').each(function(index, element) {
				$(element).val($(element).attr('data-interval'));
			});

			$('.feed-category').each(function(index, element) {
				$(element).val($(element).attr('data-category'));
			});

			$('.feed-topictimestamp').each(function(index, element) {
				$(element).val($(element).attr('data-topictimestamp'));
			});
		});

		$('#addFeed').on('click', function() {
			ajaxify.loadTemplate('partials/feed', function(feedTemplate) {
				var html = templates.parse(templates.getBlock(feedTemplate, 'feeds'), {
					feeds: [{
						url: '',
						category: '',
						username: '',
						tags: '',
						timestamp: 'now',
						lastEntryDate: 0
					}]
				});

				var newFeed = $(html).appendTo('.feeds');
				enableAutoComplete(newFeed.find('.feed-user'));
				enableTagsInput(newFeed.find('.feed-tags'));
				addOptionsToSelect(newFeed.find('.feed-category'));
			});

			return false;
		});

		$('.feeds').on('click', '.remove', function() {
			$(this).parents('.feed').remove();
			return false;
		});

		$('#save').on('click', function() {

			var feedsToSave = [];

			$('.feed').each(function(index, child) {
				child = $(child);

				var feed = {
					url : child.find('.feed-url').val(),
					category : child.find('.feed-category').val(),
					interval : child.find('.feed-interval').val(),
					username: child.find('.feed-user').val(),
					tags: child.find('.feed-tags').val(),
					timestamp: child.find('.feed-topictimestamp').val(),
					lastEntryDate: child.find('.feed-lastEntryDate').val(),
				};

				if (feed.url) {
					feedsToSave.push(feed);
				}
			});

			$.post('/api/admin/plugins/rss/save', {_csrf : $('#csrf_token').val(), feeds : feedsToSave}, function(data) {
				app.alert({
					title: 'Success',
					message: data.message,
					type: 'success',
					timeout: 2000
				});
			});
			return false;

		});

		function enableAutoComplete(selector) {
			selector.autocomplete({
				source: function(request, response) {
					socket.emit('admin.user.search', request.term, function(err, results) {
						if (err) {
							return app.alertError(err.message)
						}

						if (results && results.users) {
							var users = results.users.map(function(user) { return user.username });
							response(users);
							$('.ui-autocomplete a').attr('href', '#');
						}
					});
				}
			});
		}

		function enableTagsInput(selector) {
			selector.tagsinput({
				maxTags: config.tagsPerTopic,
				confirmKeys: [13, 44]
			});
		}

		enableAutoComplete($('.feeds .feed-user'));
		enableTagsInput($('.feeds .feed-tags'));

	});
</script>