import { useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Breadcrum from "@/components/Breadcrum";
import Book from "./Book";
import { removeBookFromSaved } from "@/firebase/firebase";

const SavedBooks = ({ redirect }) => {
  const [user] = useAuthState(auth);
  const [snapshot, loading] = useDocument(doc(db, "users", user.uid));
  let savedBooks;
  if (snapshot) {
    savedBooks = snapshot.data().saved_books;
  }
  const [selectedBook, setSelectedBook] = useState(null);

  async function handleRemoveBook() {
    const id = snapshot.id;
    const userID = activeUserID;
    try {
      await removeBookFromSaved(id, userID);
      toast.success("Bogen er fjernet fra gemte opslag", {
        iconTheme: {
          primary: "#ffffff",
          secondary: "#79AC78",
        },
        style: {
          borderRadius: "10px",
          background: "#79AC78",
          color: "#ffffff",
        },
      });
      setIsSaved(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (snapshot)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        {selectedBook && (
          <Book docID={selectedBook} redirect={() => setSelectedBook(null)} />
        )}
        <Breadcrum title="Gemte opslag" destination={redirect} />
        {/* Books wrapper */}
        <div className="flex flex-col">
          {savedBooks.length > 0 ? (
            savedBooks.map((book, i) => (
              <div
                key={i}
                className=" border-y border-gray-300 py-6 px-8 flex text-lg justify-between"
              >
                <div className="flex justify-center items-center">
                  <img
                    className="w-20 h-28 object-cover border border-gray-300"
                    src={book.image}
                    alt={book.name}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <p>{book.name}</p>
                </div>
                <p
                  onClick={() => setSelectedBook(book.bookID)}
                  className="font-medium text-medium-green"
                >
                  Vis opslag
                </p>
              </div>
            ))
          ) : (
            <div className="w-full h-80 flex justify-center items-center">
              <p>Du har endnu ikke gemt et opslag</p>
            </div>
          )}
        </div>
      </div>
    );
  else if (loading)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        <Breadcrum title="Gemte opslag" destination={redirect} />
        {/* Books wrapper */}
        <div className="flex flex-col items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
};

export default SavedBooks;
