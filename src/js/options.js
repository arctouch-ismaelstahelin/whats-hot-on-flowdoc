function save(e) {
	var apiKey = e.target;
	if(['', null, undefined].indexOf(apiKey.value) === -1) {
		chrome.storage.sync.set({apiKey: apiKey.value}, function() {
			$('#message').show();
			setTimeout(function() {
				$('#message').hide();
			}, 2000);
		});
	}
}

function restore() {
	chrome.storage.sync.get('apiKey', function(data) {
		$('#apiKey').val(data.apiKey);
	});
}

document.addEventListener('DOMContentLoaded', restore);
$('#apiKey').on('blur', save);
