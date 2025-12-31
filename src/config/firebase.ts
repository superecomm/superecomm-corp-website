// Firebase Configuration and Initialization
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6ddsoJnFa06GFJPVOwHoAiByVrSu7JVE",
  authDomain: "superecomm-corp-website.firebaseapp.com",
  projectId: "superecomm-corp-website",
  storageBucket: "superecomm-corp-website.firebasestorage.app",
  messagingSenderId: "959318720004",
  appId: "1:959318720004:web:6d5f178848d51eea45bf51",
  measurementId: "G-8X2LY6NPH4"
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;
let messaging: Messaging | null = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics (only in browser)
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

// Initialize Firebase Cloud Messaging
export const initializeMessaging = async (): Promise<Messaging | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported in this environment');
    return null;
  }

  try {
    messaging = getMessaging(app);
    return messaging;
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
    return null;
  }
};

// Request notification permission and get FCM token
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Initialize messaging if not already done
      if (!messaging) {
        messaging = await initializeMessaging();
      }
      
      if (!messaging) {
        console.error('Messaging not initialized');
        return null;
      }

      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY_HERE' // You'll need to generate this in Firebase Console
      });
      
      if (token) {
        console.log('FCM Token:', token);
        // Store token in localStorage or send to your backend
        localStorage.setItem('fcm_token', token);
        return token;
      } else {
        console.log('No registration token available.');
        return null;
      }
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

// Handle foreground messages
export const onMessageListener = (): Promise<any> => {
  return new Promise((resolve) => {
    if (!messaging) {
      console.warn('Messaging not initialized');
      return;
    }
    
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      resolve(payload);
    });
  });
};

// Export Firebase instances
export { app, analytics, messaging };
export default app;

