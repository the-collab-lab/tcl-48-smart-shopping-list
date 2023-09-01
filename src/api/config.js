import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA9SjuxkOCOWieFtSDuTxlsKUvRfH0X8FY',
	authDomain: 'smartlist-4bfa4.firebaseapp.com',
	projectId: 'smartlist-4bfa4',
	storageBucket: 'smartlist-4bfa4.appspot.com',
	messagingSenderId: '37106960895',
	appId: '1:37106960895:web:fc36be1644a4593f397fca',
	measurementId: 'G-2QHSQHD1RK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ​​const auth = getAuth(app)
export const db = getFirestore(app);
