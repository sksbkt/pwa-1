let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/index.html",
        "/manifest.json",
        "/logo192.png",
        "/favicon.ico",
        "/",
        "/users",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  console.warn("url", event.request.url);
  if (!navigator.onLine) {
    event.waitUntil(
      this.registration.showNotification("No connection", {
        body: "No internet connection",
      })
    );
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        const requestUrl = event.request.clone();
        fetch(requestUrl).then((resp) => {
          return resp;
        });
      })
    );
  }
  // ? this piece is experimental
  // * we are updating cache whenever we get online
  // else {
  //   event.respondWith(
  //     caches.open(cacheData).then((cache) => {
  //       return fetch(event.request).then((resp) => {
  //         cache.put(event.request.url, resp.clone());
  //         return resp;
  //       });
  //     })
  //   );
  // }
});

// this.addEventListener("fetch", (event) => {
//   if (navigator.onLine) {
//     // Check if the device is online
//     event.respondWith(
//       caches.open(cacheData).then((cache) => {
//         return fetch(event.request).then((response) => {
//           // Update the cache with the latest content
//           cache.put(event.request.url, response.clone());
//           // Return the response to serve the latest content
//           return response;
//         });
//       })
//     );
//   } else {
//     // Existing offline handling logic
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         if (resp) {
//           return resp;
//         } else {
//           const requestUrl = event.request.clone();
//           return fetch(requestUrl).then((resp) => {
//             return resp;
//           });
//         }
//       })
//     );
//   }
// });
