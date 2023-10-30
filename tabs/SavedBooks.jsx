import { useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Breadcrum from "@/components/Breadcrum";
import Book from "./Book";

const SavedBooks = ({ redirect }) => {
  const [user] = useAuthState(auth);
  const [snapshot, loading] = useDocument(doc(db, "users", user.uid));
  let savedBooks;
  if (snapshot) {
    savedBooks = snapshot.data().saved_books;
  }
  const [selectedBook, setSelectedBook] = useState(null);

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
                onClick={() => setSelectedBook(book.bookID)}
                key={i}
                className=" border-y border-gray-300 py-6 px-8 flex text-lg justify-between"
              >
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-medium-green"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm1.5 1.5a.75.75 0 00-.75.75V16.5a.75.75 0 001.085.67L12 15.089l4.165 2.083a.75.75 0 001.085-.671V5.25a.75.75 0 00-.75-.75h-9z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>{book.name}</p>
                </div>
                <p className="font-medium text-medium-green">Vis opslag</p>
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
