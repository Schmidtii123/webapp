import React from "react";
import Breadcrum from "@/components/Breadcrum";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import BigButton from "@/components/BigButton";
import { addNewChat } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { getUsernameFromID } from "@/firebase/firebase";
import {
  addBookToSaved,
  removeBookFromSaved,
  getUserInfo,
} from "@/firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

const Book = ({ docID = "K6PqqAyCeidb7avm0xOA", redirect = () => {} }) => {
  const [snapshot, loading] = useDocument(doc(db, "books", docID));
  let data;
  if (snapshot) {
    data = snapshot.data();
  }

  const [sellerUsername, setSellerUsername] = useState("");

  function getStandValue(stand_n) {
    switch (stand_n) {
      case 1:
        return "Helt ny";
      case 2:
        return "God, men brugt";
      case 3:
        return "Slidt";
      case 4:
        return "Skrevet i";
    }
  }

  // Handle contact seller
  const [user] = useAuthState(auth);
  let activeUserID;
  let activeUserName;
  let sellerID;
  if (snapshot) {
    activeUserID = user.uid;
    activeUserName = user.displayName;
    sellerID = data.sellerID;
  }

  async function getSellerName() {
    try {
      const sellerName = await getUsernameFromID(sellerID);

      setSellerUsername(sellerName);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (snapshot) {
      getSellerName();
    }
  }, [snapshot]);

  const router = useRouter();

  async function handleContactSeller() {
    const conversationData = {
      book: data.name,
      [sellerID]: sellerUsername,
      [activeUserID]: activeUserName,
      is_read: false,
      messages: [],
      userIDs: [sellerID, activeUserID],
      chat_started: new Date(),
    };
    try {
      await addNewChat(conversationData);
      router.push("/messages");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveBook() {
    const id = snapshot.id;
    const name = data.name;
    try {
      await addBookToSaved(id, name, activeUserID);
      toast.success("Bogen er gemt", {
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
      setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  }

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

  const [isSaved, setIsSaved] = useState(false);
  async function checkIfSaved() {
    const id = snapshot.id;
    const userID = activeUserID;
    try {
      const data = await getUserInfo(userID);

      if (data.saved_books.some((book) => book.bookID === id)) {
        setIsSaved(true);
        return true;
      } else {
        setIsSaved(false);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (snapshot) {
      checkIfSaved();
    }
  }, [snapshot]);

  if (snapshot)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        <Toaster />
        <Breadcrum title="Opslag" destination={redirect} />
        <section className="w-full h-full flex flex-col gap-y-4 pt-8">
          {/* Image wrapper */}
          <div className="w-[10rem] h-[14rem] m-auto">
            <img
              className="w-full h-full object-cover border border-gray-300"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl font-medium">{data.name}</p>
            <p className="text-xl">{data.price} kr</p>
          </div>
          {/* text wrapper */}
          <div className="w-full flex h-80 flex-col items-start px-8 gap-2 text-lg bg-white py-4">
            <div className="flex flex-col">
              <p>
                <span className="font-medium border-b-2">Studie:</span>
              </p>
              <p>{data.major}</p>
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-medium border-b-2">Semester:</span>
              </p>
              <p>{data.semester}.semester</p>
            </div>
            <div className="flex flex-col">
              <p>
                <span className="font-medium border-b-2">Stand:</span>{" "}
              </p>
              <p>{getStandValue(data.condition)}</p>
            </div>
            <div className="flex w-full justify-center pt-2 gap-2">
              {snapshot && user && (
                <>
                  <BigButton
                    click={() => {
                      isSaved ? handleRemoveBook() : handleSaveBook();
                    }}
                    content={isSaved ? "Slet gemt" : "Gem opslag"}
                    color="grey"
                  />
                  <BigButton
                    click={() => handleContactSeller()}
                    content="Kontakt sælger"
                    color="green"
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    );
};

export default Book;
