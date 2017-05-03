// Register a service worker
if( 'serviceWorker' in navigator ) {
	navigator.serviceWorker.register('/serviceworker.js').then(
		function(reg)
		{
			if(reg.installing) {
				console.log('The service worker is installing');
			}
			if(reg.waiting) {
				console.log('The service worker is waiting');
			}
			if(reg.active) {
				console.log('The service worker is active and ready to use');
			}
		}
	).catch(err => { console.log('Error registering the worker', err) })
}

function fetchUsers()
{
	return new Promise(function(resolved, rejected)
	{
		var request = new Request('https://randomuser.me/api/?results=10');
		fetch(request).then(function(response)
		{
			if(response.ok) {
				resolved(response);
			} else {
				rejected(Error('There an error requesting users ' + response.status));
			}
		}).then(function()
		{
			rejected(Error('Network error'));
		});
	});
}

fetchUsers().then(function(response)
{
	var jsonResponse = response.json();
	var results = jsonResponse.then(function(r)
	{
		var results = r.results;
		results.forEach(function(element) {
			console.log(element.name.title + ' ' + element.name.first + ' ' + element.name.last);
		}, this);
	});
}, function(error)
{
	console.log(error);
})