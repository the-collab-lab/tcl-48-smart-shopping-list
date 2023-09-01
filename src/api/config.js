import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCle0YCfdl7oQgSA902p_AT3tGbr_bivAg',
	authDomain: 'tcl-48-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-48-smart-shopping-list',
	storageBucket: 'tcl-48-smart-shopping-list.appspot.com',
	messagingSenderId: '755383222168',
	appId: '1:755383222168:web:15dea45331b9dc9e2935ed',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const auth = app.auth();
