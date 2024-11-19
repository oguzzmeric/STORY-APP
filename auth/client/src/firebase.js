// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaXOZEEc7Oo2MGneIamXYzaNZUf3LaDSQ" ,
  authDomain: "mern-auth-6a96d.firebaseapp.com",
  projectId: "mern-auth-6a96d",
  storageBucket: "mern-auth-6a96d.appspot.com",
  messagingSenderId: "550222267370",
  appId: "1:550222267370:web:f5e90d672651f2d5f5e893"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);