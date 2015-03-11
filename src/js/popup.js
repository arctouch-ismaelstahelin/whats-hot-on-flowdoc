(function() {
	var apiKey = null;
	var flows = {};

	var flowAsHtml = function(flow) {
		return $('<div class="flow" />')
					.append('<div class="name"><a href="' + flow.url + '" target="blank">' + flow.displayName +  '</a></div>')
					.append('<div class="count" id="count-' + flow.name + '">' + flow.count + '</div>');
	};

	var addFlow = function(flow) {
		var name = flow.parameterized_name;
		if(flows[name] === undefined) {
			flows[name] = {};
		}

		//flow.name, flow.organization.parameterized_name, flow.web_url
		flows[name].organization = flow.organization.parameterized_name;
		flows[name].displayName = flow.name;
		flows[name].name = flow.parameterized_name;
		flows[name].url = flow.web_url;
		flows[name].count = 0;

		return flows[name];
	};

	var fetch = function(url) {
		var deferred = Q.defer();
		$.get(url, function(result) {
			if(result) {
				deferred.resolve(result);
			}else{
				deferred.reject('No result');
			}
		});
		return deferred.promise;
	};

	chrome.storage.sync.get('apiKey', function(data) {
		if(['', null, undefined].indexOf(data.apiKey) === -1) {
			apiKey = data.apiKey;
			var collection = [];
			var url = 'https://' + apiKey + '@api.flowdock.com/flows';
			fetch(url)
				.then(function(data) {
					data.forEach(function(flow) {
						var f = addFlow(flow);
						collection.push(flowAsHtml(f));
					});
					$('.list').html(collection);
				});
		}else{
			$('.list').html('<div class="warn">Please provide your Personal Token API in the <a href="options.html" target="_blank">options page</a>.</div>');
		}
	});
})();
