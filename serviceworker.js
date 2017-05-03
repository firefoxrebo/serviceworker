self.addEventListener('install', event => {
	console.log('Website-V1 installing…');
	event.waitUntil(
		caches.open('Website-V1').then(caches => caches.addAll(['/replacement.html']))
	);
});

self.addEventListener('activate', event => {
	console.log('The Cache is ready to handle fetches');
});

self.addEventListener('fetch', event => {
	const url = new URL(event.request.url);
	console.log(url.pathname);
	// You can control the cache here
	if(url.pathname == '/') {
		event.respondWith(caches.match('/replacement.html'))
	}
});