//encode the base64 public key

const urlB64ToUint8Array = base64String => {

  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/\-/g,
    "+").replace(/_/g, '/');

  const rawData = atob(base64);
  
  const outputArray = new Uint8Array(rawData.length);

for (let i = 0; i < rawData.length; ++i) {
  
outputArray[i] = rawData.charCodeAt(i);
  
}
    
return outputArray;


};

const saveSubscription = async subscription => {

  const SERVER_URL = 'https://robexpressapp.azurewebsites.net/save-subscription';

  const response =  await fetch(SERVER_URL, {
method: 'post',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify(subscription),
  });

  return response.json();
};


self.addEventListener('activate', async () => {

  try {

    const applicationServerKey = urlB64ToUint8Array(
'BBNF7n3iQLRNWz9xEkLLsg_ZVrkD-00c38l96lqM1GNk-hjw6chigx05wCgKYyxqFZhsFincHVNrvCJT_llBJxM'
    );
    const options = { applicationServerKey, userVisibleOnly: true };

    const subscription = await
    self.registration.pushManager.subscribe(options);

    const response = await saveSubscription(subscription);

    console.log(response);

  } catch (err) {
console.log('Error', err);
  }

});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event! ', event.data.text());
    showLocalNotification("Rob Salmon Portfolio update", event.data.text(),
    self.registration);
  } else {
    console.log('Push event but no data');
  }
});

self.addEventListener('notificationclick', function(event) {


});

const showLocalNotification = (title, body, swRegistration) => {

  const options = {

    body,
    icon: "maskable_icon_x128.png",
    badge: "maskable_icon_x128.png"

  };

  swRegistration.showNotification(title, options);
};

