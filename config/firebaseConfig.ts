import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_AUTH_DOMAIN, EXPO_PUBLIC_PROJECT_ID, EXPO_PUBLIC_STORAGE_BUCKET, EXPO_PUBLIC_MESSAGING_SENDER_ID, EXPO_PUBLIC_APP_ID } from '@env';

const firebaseConfig = {
    apiKey: "AIzaSyA--YPCbTKIlM7gQ-ElKCag6uT2vbXOj_U",
    authDomain: "eduquest-1a0bd.firebaseapp.com",
    databaseURL:
      "https://eduquest-1a0bd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eduquest-1a0bd",
    storageBucket: "eduquest-1a0bd.firebasestorage.app",
    messagingSenderId: "542222212171",
    appId: "1:542222212171:web:4a1bb37867a71d744801ce",
    measurementId: "G-98538VK6LG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
