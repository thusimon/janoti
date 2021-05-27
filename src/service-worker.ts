/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { SWMessageType } from './types';
import {connectDB, DB, KEYS} from './db/db-helper';
import { ja_en } from './db/ja_en'

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => {
    const path = url.pathname;
    return url.origin === self.location.origin &&
      (path.endsWith('.png') || path.endsWith('.ico') || path.endsWith('manifest.json'));
  },
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  // this stradegy is catch first, and then network, then use network to update cache
  new StaleWhileRevalidate({
    cacheName: 'static-miscs',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', async (event) => {
  if (event.data) {
    const type = event.data.type;
    switch (type) {
      case SWMessageType.SKIP_WAITING: {
        self.skipWaiting();
        break;
      }
      case SWMessageType.PAGE_LOADS: {
        const progress_idx = await DB.get(KEYS.progress_idx) || 0;
        const data = {
          progress_idx,
          ja_en
        }
        self.clients.matchAll().then(clis => {
          clis.forEach(c => {
            c.postMessage({type: SWMessageType.SEND_PAGE_INIT_DATA, data})
          });
        });
        break;
      }
      default:
        break;
    }
  }
});

self.addEventListener('activate', async (event) => {
  console.log('service worker activated');
  await connectDB(1);
})

const notificationOptions: NotificationOptions = {
  body: 'Vocabulary',
  icon: '/assets/imgs/logo96.png',
  dir: 'ltr',
  lang: 'en-US',
  vibrate: [200, 5000, 200],
  badge: '/assets/imgs/logo96.png',
  tag: 'confirm-notification',
  renotify: true,
  actions: [
    { action: 'confirm', title: 'OK', icon: '/assets/imgs/check.png' },
    { action: 'cancel', title: 'Cancel', icon: '/assets/imgs/cross.png' }
  ]
};

setInterval(() => {
  self.registration.showNotification('reminder!', notificationOptions);
}, 60*60*1000)

console.log(ja_en[0]);


