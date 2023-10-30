import React from "react";
import Breadcrum from "@/components/Breadcrum";
import { useState, useEffect } from "react";
import { markMessageAsRead } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { getChatUpdates } from "@/firebase/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { addMessage } from "@/firebase/firebase";

const Conversation = ({ data, redirect, ID, uid, name, book }) => {
  // Update message status to being read
  useEffect(() => {
    markMessageAsRead(data.id, true);
    if (data.messages.length > 0) {
      setTimeout(() => {
        document.getElementById("last-message").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    }
  }, []);

  // Get user ID in order to style messages accordingly
  const [user] = useAuthState(auth);
  const activeUser = user.uid;

  // Get chat updates
  const [snapshot, loading] = useDocument(doc(db, "chats", ID));
  const [updatedData, setUpdatedData] = useState(data);
  let dataObject;

  useEffect(() => {
    if (snapshot) {
      setUpdatedData(snapshot._document.data.value.mapValue.fields);
    }
  }, [snapshot]);

  // Handle sending messages
  const currentDate = new Date();
  const danishTimeOffset = +120;
  currentDate.setMinutes(currentDate.getMinutes() + danishTimeOffset);

  const [messageInfo, setMessageInfo] = useState({
    content: "",
    date: currentDate,
    uid: uid,
  });

  async function handleMessageSend() {
    await addMessage(ID, messageInfo);
    setMessageInfo({ ...messageInfo, content: "" });
    markMessageAsRead(data.id, false);
    document.getElementById("last-message").scrollIntoView({
      behavior: "smooth",
    });
  }

  if (snapshot) {
    let messageArray = snapshot
      .data()
      .messages.sort((a, b) => a.timestamp - b.timestamp);
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-white slide-from-right">
        <Breadcrum title={name + ": " + book} destination={redirect} />
        <div className="flex flex-col gap-4 px-4 h-[80svh] w-full overflow-y-scroll pb-20 pt-10">
          {messageArray?.map((message, i) => (
            <div
              id={messageArray.length - 1 === i ? "last-message" : ""}
              className={`w-80 py-4 px-4  text-white rounded-xl ${
                message.uid === activeUser
                  ? "bg-medium-green text-white self-end"
                  : "bg-gray-500"
              } animate-up `}
              key={i}
            >
              <p>{message.content}</p>
              <p className="text-xs">
                {new Date(message.date.seconds * 1000)
                  .toISOString()
                  .slice(11, 16)}
              </p>
            </div>
          ))}
          {/* Send text */}
          <div className=" w-full bg-white fixed flex justify-center bottom-20 left-0 gap-4">
            <input
              onChange={(e) => {
                setMessageInfo({ ...messageInfo, content: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && messageInfo.content.length > 0) {
                  handleMessageSend();
                }
              }}
              value={messageInfo.content}
              className="w-3/4 py-2 px-4 border border-gray-500 rounded-lg text-lg outline-none"
              type="text"
              placeholder="Skriv en besked..."
            />
            <button
              disabled={messageInfo.content.length === 0}
              onClick={(e) => {
                e.preventDefault();
                handleMessageSend();
              }}
              className="w-auto py-2 px-4 bg-medium-green rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-white slide-from-right">
        <Breadcrum title="Nicolai" destination={redirect} />
        <div className="flex flex-col gap-4 px-4 h-full w-full overflow-y-scroll">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
};

export default Conversation;
