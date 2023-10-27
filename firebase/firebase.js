// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  onSnapshot,
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
      addUser({
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      });
      /* window.location.assign("/"); */
    })
    .catch((error) => {
      console.log(error.message);
      alert(error);
    });
};

// Add user to Database, and checks if their information is already stored
export async function addUser(user) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, user);
    } else {
      console.log("User with ID", user.id, "already exists.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

/* 

Firestore (Database)

*/

export const db = getFirestore(app);

//

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

// Read all chat from the database
export async function getAllMessages() {
  try {
    const data = await getDocs(collection(db, "chats"));
    const chat = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return chat;
  } catch (err) {
    console.log(err);
  }
}

export function getLiveMessages(callback) {
  const docRef = collection(db, "chats");
  onSnapshot(
    docRef,
    (snapshot) => {
      let conversations = [];
      snapshot.docs.forEach((doc) => {
        conversations.push({ ...doc.data(), id: doc.id });
      });
      callback(conversations);
    },
    (error) => {
      console.error(error);
    }
  );
}

// Update message object key: is_read to true
export async function markMessageAsRead(msgID, bool) {
  try {
    const docRef = doc(db, "chats", msgID);
    let newMessage;
    if (bool) {
      newMessage = { is_read: true };
    } else if (!bool) {
      newMessage = { is_read: false };
    }
    await updateDoc(docRef, newMessage);
  } catch (err) {
    console.log(err);
  }
}

// Add message to document
export async function addMessage(msgID, messageData) {
  try {
    const docRef = doc(db, "chats", msgID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      const updatedMessages = [...currentData.messages, messageData];
      await updateDoc(docRef, {
        messages: updatedMessages,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// Add new chat to the database
export async function addNewChat(conversationObj) {
  try {
    const colRef = collection(db, "chats");
    await addDoc(colRef, conversationObj);
  } catch (error) {
    console.log(error);
  }
}

// get username from ID
export async function getUsernameFromID(id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user.name;
    } else if (!docSnap.exists()) {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
