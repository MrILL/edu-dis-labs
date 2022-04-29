/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "02_01.jpg",
    "revision": "4a1ded8a85c369acaebdb84ac972456a"
  },
  {
    "url": "03-01.jpg",
    "revision": "61ccd31b9a99e4dc0b2115d7a181dc71"
  },
  {
    "url": "03-02.jpg",
    "revision": "0e42c83dcc174ebfdbb611ab0956fcd9"
  },
  {
    "url": "03-03.jpg",
    "revision": "dd23072447e0798b536bd162235d14c3"
  },
  {
    "url": "03-04.jpg",
    "revision": "661a64ee2776ef94b23ba82f7ee50969"
  },
  {
    "url": "03-05.jpg",
    "revision": "6f52dcb2ccb40af28a65a4b796eb918d"
  },
  {
    "url": "03-06.jpg",
    "revision": "2643698d9412e41a449c1edee719fb29"
  },
  {
    "url": "03-07.jpg",
    "revision": "c4a788f41d803f8b9bddb5adc0513be6"
  },
  {
    "url": "03-08.jpg",
    "revision": "4c810503ec4bc1adfd29904056fc2886"
  },
  {
    "url": "03-09.jpg",
    "revision": "9c798bc91f80f84b6b0e7f7fba26d65b"
  },
  {
    "url": "03-10.jpg",
    "revision": "bb5b18b65591e9d058edbc14b02c6ba5"
  },
  {
    "url": "03-11.jpg",
    "revision": "6a88d8f48c63e79c72ec45ae84a8d9ff"
  },
  {
    "url": "04_01.jpg",
    "revision": "a89d937ef50759087613f1e34e7a67ed"
  },
  {
    "url": "04_02.jpg",
    "revision": "af07d8ade208db1cc34ce64c0e92086c"
  },
  {
    "url": "04_03.jpg",
    "revision": "a09ee13270416ff99377c6dc97334bac"
  },
  {
    "url": "04_04.jpg",
    "revision": "876ed02fe89a0db4144b561df1688586"
  },
  {
    "url": "04_05.jpg",
    "revision": "ffa4e9eb9286d5028685b55f57cc8abc"
  },
  {
    "url": "04_06.jpg",
    "revision": "fc2770ca3326f8d7647af27ee2622dfd"
  },
  {
    "url": "04_07.jpg",
    "revision": "5b13e68017ca9b5a9cf7b1c6489ada00"
  },
  {
    "url": "04_08.jpg",
    "revision": "d34b6ae5b34623f5e4cdc62b733eb449"
  },
  {
    "url": "04_09.jpg",
    "revision": "662096194b303e301ce616ba16f48cae"
  },
  {
    "url": "04_10.jpg",
    "revision": "db59f2613d9616f60498bb25c0e02e4d"
  },
  {
    "url": "04-01.jpg",
    "revision": "4bbafd5dd4000461cef55f669139b17b"
  },
  {
    "url": "05-01.jpg",
    "revision": "8d54b111a4b6b5fb4cd39e4c7261b927"
  },
  {
    "url": "06-01.jpg",
    "revision": "cf2dab320c48c5ead6fe105863629e4e"
  },
  {
    "url": "06-02.jpg",
    "revision": "aa286f8fd6540b7a7b6d36392a63f505"
  },
  {
    "url": "06-03.jpg",
    "revision": "239fa5fb2a9063f1e261ae2db81fceef"
  },
  {
    "url": "06-04.jpg",
    "revision": "a2dbf924afd6a8580ce4a2d2bcd6e049"
  },
  {
    "url": "06-05.jpg",
    "revision": "22f4f542b283cdc3d027eb664424d3c8"
  },
  {
    "url": "06-06.jpg",
    "revision": "12017ddd5b9179e8f53e93044acee998"
  },
  {
    "url": "06-07.jpg",
    "revision": "1ded65fc56da9f0008ae4ef2eacc8175"
  },
  {
    "url": "1.jpg",
    "revision": "499e653bbfd49fa7acbaa8e177308429"
  },
  {
    "url": "1.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "12-01.jpg",
    "revision": "cc85570b3c89f73291af87791115986a"
  },
  {
    "url": "12-02.jpg",
    "revision": "f2b24c5c4beb21d5302c64b59445927a"
  },
  {
    "url": "12-03.jpg",
    "revision": "61fe98dff39d0887978deb0af605571b"
  },
  {
    "url": "12-04.jpg",
    "revision": "ff2468e7fbb03e034be0ffd7312dc7d9"
  },
  {
    "url": "12-05.jpg",
    "revision": "a126fe17514d81279c677666fd459d9d"
  },
  {
    "url": "12-06.jpg",
    "revision": "c25686b2f77ac7c5a2d4706f43e40132"
  },
  {
    "url": "12-07.jpg",
    "revision": "de17f3eb1df503250bcf1a5a4b533eec"
  },
  {
    "url": "12-08.jpg",
    "revision": "f3b58c768c18919a6fa2ab59ea6627db"
  },
  {
    "url": "13-01.jpg",
    "revision": "b22f06060909d43d796a8ffd4b0743a0"
  },
  {
    "url": "13-02.jpg",
    "revision": "2d2bca0518716a8dfaf37ef5c15e54ee"
  },
  {
    "url": "13-03.jpg",
    "revision": "fec1a3db903dc05c462fb6f384a400d6"
  },
  {
    "url": "2.jpg",
    "revision": "572bc2e4ef3efb7c81bbbcac5f09147b"
  },
  {
    "url": "3.jpg",
    "revision": "248757985bb49f73624c6923057530ac"
  },
  {
    "url": "4.jpg",
    "revision": "7e305881f2b8f7afa0d153d89a159a72"
  },
  {
    "url": "404.html",
    "revision": "77b5992dad7e6c687c2765923c6218c7"
  },
  {
    "url": "5.jpg",
    "revision": "ca636465fa4bb94bd2ddb108d35feeeb"
  },
  {
    "url": "api/index.html",
    "revision": "e72b08882c7b263bfbcae9e2e7b5b915"
  },
  {
    "url": "assets/css/0.styles.bc1065be.css",
    "revision": "145a9c993fd82fd191338e365073b4d8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6618298c.js",
    "revision": "5057569dc9815077ee7d2239c288f873"
  },
  {
    "url": "assets/js/11.7227b195.js",
    "revision": "7da992d204bda4cc463737d90c32fab0"
  },
  {
    "url": "assets/js/12.81e55c03.js",
    "revision": "82ae2832a81ab95ad8a57eaee51dbbac"
  },
  {
    "url": "assets/js/13.2abc48b3.js",
    "revision": "66acaad5a75aadc7c40d2732d6b34b55"
  },
  {
    "url": "assets/js/14.8aaa01e4.js",
    "revision": "41530c674b29b34fa99c79deea2a81e6"
  },
  {
    "url": "assets/js/15.52f7ea50.js",
    "revision": "141e6a44cc110e7acd34370f6a75147a"
  },
  {
    "url": "assets/js/16.829f7456.js",
    "revision": "7eef161169f00458b3e3b3bd57204f20"
  },
  {
    "url": "assets/js/17.b64e46de.js",
    "revision": "619895115fc8ea86a2d804f9d65160b5"
  },
  {
    "url": "assets/js/18.85c55c8e.js",
    "revision": "e836b6d1d120e385108a4de09958bb0c"
  },
  {
    "url": "assets/js/19.8430de89.js",
    "revision": "af2c961602ae262a8bac7e45ec6b257b"
  },
  {
    "url": "assets/js/2.3e2da508.js",
    "revision": "d2f5f24249ac8ddd7ff685d95196f4b8"
  },
  {
    "url": "assets/js/20.55d9ac91.js",
    "revision": "0f2adf23391cc46517b06aad6136b685"
  },
  {
    "url": "assets/js/21.8350c8fe.js",
    "revision": "495d3c6557a893be6c9ca4c2c6672f40"
  },
  {
    "url": "assets/js/22.75c2533e.js",
    "revision": "97374c51fb58fc01dbb6ab9bb08042ac"
  },
  {
    "url": "assets/js/23.82cf0d10.js",
    "revision": "3c814b7e1f2225f01c3614a461ee2ecd"
  },
  {
    "url": "assets/js/24.7e3296a8.js",
    "revision": "a2d12407b19c61a374e5b8e2f6dae3be"
  },
  {
    "url": "assets/js/26.87ff770b.js",
    "revision": "78f4e8b74647795453feb067e07475f5"
  },
  {
    "url": "assets/js/3.90e6307c.js",
    "revision": "17124352913d5e75858d752c264f9b4f"
  },
  {
    "url": "assets/js/4.6821b8c5.js",
    "revision": "90773e0bf4d6aedee55e1e07f94825f3"
  },
  {
    "url": "assets/js/5.8b0efd2b.js",
    "revision": "c9beef560d0921ec782fc523cb380eac"
  },
  {
    "url": "assets/js/6.df292a59.js",
    "revision": "f0306f9ae855a5709fc912bdfb73d3e8"
  },
  {
    "url": "assets/js/7.ad42eb08.js",
    "revision": "092f44f9b407c40b73864c16ea45c86b"
  },
  {
    "url": "assets/js/8.21e8fb7d.js",
    "revision": "cc9d30c4b89b786427cb4a13dad8b93e"
  },
  {
    "url": "assets/js/9.cce8dc66.js",
    "revision": "216a81c2270a5b232cdc9ed63a7ba71c"
  },
  {
    "url": "assets/js/app.7ef3414e.js",
    "revision": "9382d140d9b082ae43cc3f93419d32e8"
  },
  {
    "url": "conclusion/index.html",
    "revision": "9958f9c69b3bb6ea2a2c0c355b94a393"
  },
  {
    "url": "design/index.html",
    "revision": "99131a83a3c196703523e83cb01507e7"
  },
  {
    "url": "index.html",
    "revision": "2ba0179fcc2a8fdef15711b2796cad98"
  },
  {
    "url": "intro/index.html",
    "revision": "b7a5b5c5d43883cc310c6496e25db323"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "824f8983323054baa52a7ebff531689d"
  },
  {
    "url": "software/index.html",
    "revision": "90a4739ee1f9d3d91ec6b608d396a1dd"
  },
  {
    "url": "software/nest-js.html",
    "revision": "e541a6b30b90b37024a4d1508c17a2af"
  },
  {
    "url": "software/restfull-services.html",
    "revision": "331d452aa59d9a2e2f7a0f84caf92cb7"
  },
  {
    "url": "test/index.html",
    "revision": "593cdff9f6d61d7760ff36d840b54ee5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
