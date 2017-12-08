importScripts("https://www.gstatic.com/firebasejs/4.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js");

const CONFIG = {
  // TODO: Paste firebase config options here
};

firebase.initializeApp(CONFIG);

const messaging = firebase.messaging();

const matchDomain = (domain, url) => {
  const regex = new RegExp(`^${domain}`, "i");
  return regex.test(url);
};

// notification click event
self.onnotificationclick = (event) => {
  event.notification.close();
  const { click_action } = event.notification.data;
  // Checking if the current client is already open or not.
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then((clientList) => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      // Checking domain is matched then focus the same window
      if (matchDomain(click_action, client.url) && 'focus' in client) {
        return client.focus();
      }
    }
    // No clients opened and so open new window
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
};

messaging.setBackgroundMessageHandler((payload) => {
  console.log("Received background message --- ", payload);

  if (payload && payload.data && payload.data.message) {
    const message = JSON.parse(payload.data.message);
    let title = null;
    let options = null;
    if (message && message.title && message.body) {
      title = message.title;
      options = {};
      options.body = message.body;
      options.requireInteraction = true;
      if (message.icon) { options.icon = message.icon; }
      if (message.click_action) {
        options.data = { click_action: message.click_action };
      }
    }

    return self.registration.showNotification(title, options);
  }
})
