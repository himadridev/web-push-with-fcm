# Web Push Notification :bell:
with **Firebase Cloud Messaging**

### Installation
```
git clone https://github.com/iamhimadri/web-push-with-fcm.git
cd web-push-with-fcm
yarn
yarn start
```
### Few steps to make it work

##### Step #1
Create a Firebase Project in [Firebase Console](https://console.firebase.google.com/) :arrow_upper_right:

##### Step #2
Go to Firebase Project and click on **Add Firebase to your web app**.

Copy the config options and paste in [config/firebase.config.js](https://github.com/iamhimadri/web-push-with-fcm/blob/master/config/firebase.config.js#L2) and [public/service-worker.js](https://github.com/iamhimadri/web-push-with-fcm/blob/master/public/service-worker.js#L5)
```
module.exports = {
  // TODO: Paste config options here
};
```

##### Step #3
Go to [http://localhost:3000/](http://localhost:3000/)

Click on **Enable Notification** (Allow Notification permission)

We will find the token in the screen.

##### Step #4
Now we will send message to client from CLI. To do that we server **server-key** form the firebase project.

Find Server-Key, **Go to Project > Project settings > Cloud Messaging tab**

###### Sending data message
```
curl -X POST -H "Authorization: key=<SERVER-KEY>" -H "Content-Type: application/json" -d '{
"data": {
    "message": {
        "title": "Update available",
        "body": "Please upgrade your application",
        "icon": "/icons/bell-icon-72x72.png",
        "click_action": "http://localhost:3000/"
    }
},
"to": "<TOKEN>"
}' "https://fcm.googleapis.com/fcm/send"
```
###### Sending notification message
```
curl -X POST -H "Authorization: key=<SERVER-KEY>" -H "Content-Type: application/json" -d '{
"notification": {
    "title": "Update available",
    "body": "Please upgrade your application",
    "icon": "/icons/bell-icon-72x72.png",
    "click_action": "http://localhost:3000/"
},
"to": "<TOKEN>"
}' "https://fcm.googleapis.com/fcm/send"
```
###### Subscribe to a topic
```
curl -X POST -H "Authorization: key=<SERVER-KEY>" -H "Content-Type: application/json" "https://iid.googleapis.com/iid/v1/<TOKEN>/rel/topics/<TOPIC_NAME>"
```
###### Sending message to a topic
```
curl -X POST -H "Authorization: key=<SERVER-KEY>" -H "Content-Type: application/json" -d '{
"data": {
    "message": {
        "title": "Update available",
        "body": "Please upgrade your application",
        "icon": "/icons/bell-icon-72x72.png",
        "click_action": "http://localhost:3000/"
    }
},
"to": "/topics/<TOPIC_NAME>"
}' "https://fcm.googleapis.com/fcm/send"
```
### Documentations

[Add Firebase to your project](https://firebase.google.com/docs/web/setup)

[Set Up a JavaScript Firebase Cloud Messaging Client App](https://firebase.google.com/docs/cloud-messaging/js/client)

[Send your First Message to a Backgrounded App](https://firebase.google.com/docs/cloud-messaging/js/first-message)

[Receive Messages in a JavaScript Client](https://firebase.google.com/docs/cloud-messaging/js/receive)

[Topic Messaging on Web/JavaScript](https://firebase.google.com/docs/cloud-messaging/js/topic-messaging)

### Happy to help

AMA about this topic. [here](https://github.com/iamhimadri/web-push-with-fcm/issues/new)
