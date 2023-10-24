// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSTT34mXJ0y79agjqsk0B9rs9lshHuyk8",
  authDomain: "bookbazr.firebaseapp.com",
  projectId: "bookbazr",
  storageBucket: "bookbazr.appspot.com",
  messagingSenderId: "740887490016",
  appId: "1:740887490016:web:e00eb0e036299f69608f85",
};

const app = initializeApp(firebaseConfig);

/* 

Auth 

*/
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

/* 

Firestore (Database)

*/

const db = getFirestore(app);

// Read all books from the database
export async function getAllBooks() {
  try {
    const data = await getDocs(collection(db, "books"));
    const books = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return books;
  } catch (err) {
    console.log(err);
  }
}

// Read books from the database by id
export async function getBookByID(id) {
  if (typeof id !== "string") {
    console.log("Invalid ID, must be of type string");
    return null;
  }
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const book = docSnap.data();
      return book;
    } else if (!docSnap.exists()) {
      console.log("Book not found");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

// Delete book from the database
export async function deleteBookByID(id) {
  if (typeof id !== "string") {
    console.log("Invalid ID, must be of type string");
    return null;
  }
  try {
    const docRef = doc(db, "books", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
}

// Validate book input data
function validateBookInfo(bookInfo) {
  // Iterates through the bookInfo object and checks each value
  for (const key in bookInfo) {
    switch (key) {
      case "link":
      case "sellerID":
      case "name":
      case "major":
      case "image":
        if (!bookInfo[key] || bookInfo[key].trim() === "") {
          throw new Error(`'${key}' field in bookInfo is empty`);
        }
        break;
      case "semester":
      case "condition":
      case "price":
        if (typeof bookInfo[key] !== "number" || isNaN(bookInfo[key])) {
          throw new Error(`'${key}' must be a number`);
        }
        break;
      default:
        throw new Error(`Unknown field: ${key}`);
    }
  }
}

// Update book in the database
export async function updateBookByID(id, bookInfo) {
  if (typeof id !== "string") {
    console.log("Invalid ID, must be of type string");
    return null;
  }

  try {
    const docRef = doc(db, "books", id);
    const newBook = bookInfo;
    await updateDoc(docRef, newBook);
  } catch (err) {
    console.log(err);
  }
}

// Add book to the database
export async function addBook(bookInfo) {
  validateBookInfo(bookInfo);
  try {
    const book = bookInfo;
    await addDoc(collection(db, "books"), book);
  } catch (err) {
    console.log(err);
  }
}

/* 

Messaging

*/
