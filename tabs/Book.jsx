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

const Book = ({ docID = "K6PqqAyCeidb7avm0xOA", redirect = () => {} }) => {
  const [snapshot, loading] = useDocument(doc(db, "books", docID));
  let data;
  if (snapshot) {
    data = snapshot.data();
  }
  const [sellerUsername, setSellerUsername] = useState("");
  useEffect(() => {
    console.log(snapshot);
    if (snapshot) {
      console.log(snapshot.data());
    }
  }, [snapshot]);

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
      console.log(sellerName);
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
    console.log(conversationData);
    try {
      await addNewChat(conversationData);
      router.push("/messages");
    } catch (error) {
      console.log(error);
    }
  }

  if (snapshot)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        <Breadcrum title="Opslag" destination={redirect} />
        <section className="w-full h-full flex flex-col gap-y-4 pt-8 items-center">
          {/* Image wrapper */}
          <div className="w-[13rem] h-[17rem] ">
            <img
              className="w-full h-full object-cover border border-gray-300"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl text-center font-medium">{data.name}</p>
            <p className="text-2xl text-center">{data.price} kr</p>
          </div>
          {/* text wrapper */}
          <div className="w-full flex h-80 flex-col items-start px-8 gap-2 text-lg bg-white py-4">
            <p>
              <span className="font-medium">Studie:</span> {data.major}
            </p>
            <p>
              <span className="font-medium">Semester:</span> {data.semester}.
              Semester
            </p>
            <p>
              <span className="font-medium">Stand:</span>{" "}
              {getStandValue(data.condition)}
            </p>
            <div className="flex w-full justify-center pt-2">
              <BigButton
                click={() => handleContactSeller()}
                content="Kontakt sælger"
                color="green"
              />
            </div>
          </div>
        </section>
      </div>
    );
};

export default Book;
