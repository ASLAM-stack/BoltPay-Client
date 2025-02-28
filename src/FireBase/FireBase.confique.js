
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj1Jd8VyaUaPlywlho0lBZEc-IgC92Wxg",
  authDomain: "boltpay-client.firebaseapp.com",
  projectId: "boltpay-client",
  storageBucket: "boltpay-client.firebasestorage.app",
  messagingSenderId: "512306490054",
  appId: "1:512306490054:web:46c8dc9e6965c2028c85c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;