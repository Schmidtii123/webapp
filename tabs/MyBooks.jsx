/* 
  Simon
  Liste over brugerens egne bøger. De er hentet med react-firebase-hooks og bliver filtreret med query importeret fra firebase/firestore.
*/

import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_lo42clyq.json";
import BigButton from "../components/BigButton";
import CreatePost from "../components/modal/CreatePost";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase/firebase";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import EditBook from "@/tabs/EditBook";
import Breadcrum from "@/components/Breadcrum";

const MyBooks = ({ redirect }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  const activeUserID = user.uid;
  const collectionWithQuery = query(
    collection(db, "books"),
    where("sellerID", "==", activeUserID)
  );

  const [snapshot, loading, error] = useCollection(collectionWithQuery);
  let data;
  if (snapshot) {
    data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <div className=" slide-in-right">
      <Breadcrum title="Mine opslag" destination={redirect} />
      {snapshot && data.length === 0 && (
        <div className="flex flex-col items-center gap-8">
          <Lottie className=" w-52 pt-8" animationData={animationData} />
          <p className="text-xl max-w-xs text-center pb-28">
            Du har ingen bøger til salg. Opret en annonce og få hurtigt afsat
            dine bøger
          </p>
          <BigButton
            color="green"
            content="Opret annonce"
            click={() => {
              setOpenModal(true);
            }}
          />
        </div>
      )}
      {snapshot && data.length > 0 && (
        <>
          <div className="flex flex-col gap-8 pt-10 pb-32 h-[90svh] overflow-y-scroll">
            {selectedBook && (
              <EditBook
                docID={selectedBook}
                redirect={() => setSelectedBook(null)}
              />
            )}
            <h2 className="font-medium text-lg ml-4">Dine opslag</h2>
            {data.map((book, i) => (
              <div key={i} className="w-full h-[8rem] flex">
                <div className="h-full w-1/3 flex justify-center items-center overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="h-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="h-full w-2/3 flex flex-col justify-between px-4">
                  <div className="flex flex-col">
                    <p className="text-xl font-medium">{book.name}</p>
                    <p className="text-lg">{book.price} kr</p>
                  </div>
                  <button
                    onClick={() => setSelectedBook(book.id)}
                    className="self-end flex items-center gap-1"
                  >
                    Rediger
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-7 h-7 "
                    >
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className=" fixed bottom-20 w-full flex justify-center">
              <BigButton
                color="green"
                content="Opret annonce"
                click={() => {
                  setOpenModal(true);
                }}
              />
            </div>
          </div>
        </>
      )}

      {openModal && <CreatePost redirect={() => setOpenModal(false)} />}
    </div>
  );
};

export default MyBooks;
