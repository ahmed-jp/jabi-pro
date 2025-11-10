const CACHE_NAME = 'jabi-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/blog.html',
    '/styles.css',
    '/script.js',
    '/manifest.json'
    // يجب إضافة مسارات الأيقونات هنا عند توفرها
    // '/icons/icon-192x192.png',
    // '/icons/icon-512x512.png'
];

// تثبيت عامل الخدمة وتخزين الأصول الثابتة مؤقتاً
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// تفعيل عامل الخدمة
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // حذف أي ذاكرة تخزين مؤقت قديمة
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// اعتراض طلبات الشبكة وتقديمها من ذاكرة التخزين المؤقت أولاً
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // تقديم الملف من ذاكرة التخزين المؤقت إذا كان موجوداً
                if (response) {
                    return response;
                }
                // وإلا، قم بطلب الملف من الشبكة
                return fetch(event.request);
            })
    );
});
