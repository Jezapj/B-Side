self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('B-Side').then((cache) => cache.addAll([
        '',
        'index.html',
        'main.js',
        'api.js',
        'p2p.js',
        //'firebase.json',
        'style.css',
        'B-Side.png',
        'B-SideBig.png',
        'B-SideC.png',
        'B-SideCBig.png',
        'B-SideCHQ.png',
        //'.firebaserc',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });