"use strict";var precacheConfig=[["index.html","9197411e8d3d4fd18424e3874567d971"],["service-worker.js","ed426b0d1c298462a4488f916cafc1a9"],["static/css/app.479f21d7fdbf3beb0fc3b6e86f5a6c1d.css","0a9789530dabd7a153e729501ade1332"],["static/css/fa-brands.css","25a3b90967aac0d439349f17aa40e2dd"],["static/css/fa-brands.min.css","9778756ed1a68a0d6770fd08ddf0f65e"],["static/css/fa-regular.css","77ad0a58eb12326ba08e3f21e83d12d8"],["static/css/fa-regular.min.css","40e5b573ff8576123e2a8328da4c0438"],["static/css/fa-solid.css","43176baae7b487484782f61b29e1c539"],["static/css/fa-solid.min.css","026b52c2d594907536b79fdc316f592e"],["static/css/fontawesome-all.css","421f6abfb4fa6943b8d03b471cee24a8"],["static/css/fontawesome-all.min.css","d896a88b71aa2ba5d6bd670429bf1bad"],["static/css/fontawesome.css","d63a2485a8deb28a826f6adfcef1f7e0"],["static/css/fontawesome.min.css","531d8316ef3c5c9e3dfa925450525390"],["static/js/app.6fb8031802cf3b2e2080.js","2a2a2be22a68fda037aa6b22e5d148f2"],["static/js/manifest.2ae2e69a05c33dfc65f8.js","2f4fd3b092ed7f7e76dbb3976729742e"]],cacheName="sw-precache-v3-around-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var s=new URL(e);return n&&s.pathname.match(n)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),s=createCacheKey(n,hashParamName,a,!1);return[n.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});