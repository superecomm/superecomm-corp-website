# Firebase Cloud Messaging Setup Guide

## Prerequisites

You have Firebase already configured with the following credentials:
- Project ID: `superecomm-corp-website`
- App ID: `1:959318720004:web:6d5f178848d51eea45bf51`

## Step 1: Generate VAPID Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `superecomm-corp-website`
3. Click the gear icon → **Project Settings**
4. Go to the **Cloud Messaging** tab
5. Scroll to **Web Push certificates**
6. Click **Generate key pair**
7. Copy the generated key

## Step 2: Update Firebase Configuration

Open `src/config/firebase.ts` and replace the VAPID key:

```typescript
// Line 51
const token = await getToken(messaging, {
  vapidKey: 'YOUR_VAPID_KEY_HERE' // Replace with your generated key
});
```

## Step 3: Enable Cloud Messaging API

1. In Firebase Console, go to **Cloud Messaging** tab
2. Make sure **Cloud Messaging API (Legacy)** is enabled
3. Also enable **Firebase Cloud Messaging API** in Google Cloud Console:
   - Go to https://console.cloud.google.com/
   - Select your project
   - Go to **APIs & Services** → **Library**
   - Search for "Firebase Cloud Messaging API"
   - Click **Enable**

## Step 4: Test Push Notifications

### Method 1: Using Firebase Console

1. Go to Firebase Console → **Cloud Messaging**
2. Click **Send your first message**
3. Enter notification title and text
4. Click **Send test message**
5. Enter your FCM token (found in browser console after granting permission)
6. Click **Test**

### Method 2: Using cURL

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "USER_FCM_TOKEN",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test from Superecomm",
      "icon": "/icons/icon-192x192.svg"
    }
  }'
```

Get your Server Key from Firebase Console → Project Settings → Cloud Messaging → Server key

## Step 5: Backend Integration (Optional)

If you want to send notifications from your backend:

### Node.js Example

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./superecomm-corp-website-firebase-adminsdk-fbsvc-b4048c5731.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Send notification
const message = {
  notification: {
    title: 'Superecomm Update',
    body: 'Check out our new features!'
  },
  token: 'USER_FCM_TOKEN'
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
```

### Python Example

```python
import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate('superecomm-corp-website-firebase-adminsdk-fbsvc-b4048c5731.json')
firebase_admin.initialize_app(cred)

message = messaging.Message(
    notification=messaging.Notification(
        title='Superecomm Update',
        body='Check out our new features!',
    ),
    token='USER_FCM_TOKEN',
)

response = messaging.send(message)
print('Successfully sent message:', response)
```

## Step 6: Topic Subscriptions (Optional)

Subscribe users to topics for group notifications:

```typescript
import { subscribeToTopic } from './services/notificationService';

// Subscribe to a topic
await subscribeToTopic('announcements');
await subscribeToTopic('updates');
```

Then send to topic from backend:

```javascript
const message = {
  notification: {
    title: 'New Announcement',
    body: 'Important update for all users'
  },
  topic: 'announcements'
};

admin.messaging().send(message);
```

## Testing Notifications

### In Development

1. Start dev server: `npm run dev`
2. Open browser and grant notification permission
3. Check console for FCM token
4. Use Firebase Console to send test notification

### In Production

1. Build and deploy: `npm run build && firebase deploy`
2. Visit your deployed site
3. Grant notification permission
4. Send test notification from Firebase Console

## Notification Best Practices

1. **Request Permission Wisely**
   - Don't ask immediately on page load
   - Explain why notifications are useful
   - Respect user's choice

2. **Notification Content**
   - Keep titles short and clear
   - Make body text actionable
   - Include relevant icon/image

3. **Frequency**
   - Don't spam users
   - Allow users to customize preferences
   - Respect quiet hours

4. **Actions**
   - Add notification actions for quick responses
   - Handle notification clicks properly
   - Deep link to relevant content

## Troubleshooting

### "Permission denied"
- User has blocked notifications
- Ask user to enable in browser settings

### "VAPID key not found"
- Make sure you've generated and added VAPID key
- Rebuild the project after adding key

### "Service worker not registered"
- Check if service worker is blocked
- Verify HTTPS (required for service workers)
- Check browser console for errors

### "Token not generated"
- Verify Firebase config is correct
- Check if Cloud Messaging API is enabled
- Look for errors in browser console

## Security Notes

⚠️ **Important:** 
- Never commit your Firebase Admin SDK private key to version control
- Store it securely on your server
- Use environment variables for sensitive data
- Restrict API keys in Firebase Console

## Next Steps

1. ✅ Generate VAPID key
2. ✅ Update `src/config/firebase.ts`
3. ✅ Test notifications in development
4. ✅ Set up backend notification sending
5. ✅ Deploy to production
6. ✅ Monitor notification delivery in Firebase Console

For more information, visit:
- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Web Push Notifications Guide](https://web.dev/push-notifications-overview/)

