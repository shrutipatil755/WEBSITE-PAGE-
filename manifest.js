if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered', reg))
    .catch(console.error);
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    // add a button or banner to ask permission at a good moment
    document.getElementById('notifyBtn').onclick = () => {
      Notification.requestPermission().then(result => {
        if (result === 'granted') subscribeUser(reg);
      });
    };
  });
}

async function subscribeUser(registration) {
  const sub = await registration.pushManager.getSubscription() ||
    await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('<YOUR_VAPID_KEY>')
    });
  console.log('Subscribed:', sub);
  // send 'sub' to your backend to store it
}