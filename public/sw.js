let isStopped = true;

const broadcaster = new BroadcastChannel('sw-messages');

async function sleep(milisecond = 1000) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, milisecond);
  });
}

async function tick(seconds) {
  seconds--;
  broadcaster.postMessage({ action: 'update-time', data: seconds});

  if (isStopped || seconds <= 0) return false;

  await sleep();
  return tick(seconds);
}

async function notify(message) {
  let oldNotifs = await self.registration.getNotifications();

  oldNotifs.forEach(notification => notification.close());

  await self.registration.showNotification('20-20-20 Rule', {
    badge: '/20-20-20.svg', // URL of the image used to represent the notification
    icon: '/20-20-20.svg', // URL of an icon to be displayed in the notification 
    body: message,
    silent: false,
  });
  return (await self.registration.getNotifications())[0];
}

async function cycleStart() {
  let notif, proceed;

  notif = await notify('Back to Work. 20 minutes start.');
  proceed = await tick(20 * 60);
  if (proceed || isStopped) { return; }

  notif = await notify('look at something 20 feet (6.1 meters) away for 20 seconds');
  proceed = await tick(20);
  if (proceed || isStopped) { return; }

  cycleStart();
}

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

broadcaster.addEventListener('message', async (event) => {
  let { action, data } = event.data;

  switch (action) {
    case 'start':
      isStopped = false;
      cycleStart();
      break;

    case 'stop':
      isStopped = true;
      break;
  }
});
