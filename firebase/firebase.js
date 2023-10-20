// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyBSTT34mXJ0y79agjqsk0B9rs9lshHuyk8",
  authDomain: "bookbazr.firebaseapp.com",
  projectId: "bookbazr",
  storageBucket: "bookbazr.appspot.com",
  messagingSenderId: "740887490016",
  appId: "1:740887490016:web:e00eb0e036299f69608f85",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      window.location.assign("/");
    })
    .catch((error) => {
      console.log(error.message);
      alert(error);
    });
};
