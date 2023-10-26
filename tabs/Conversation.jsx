import React from "react";
import Breadcrum from "@/components/Breadcrum";
import { useState, useEffect } from "react";
import { markMessageAsRead } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { getChatUpdates } from "@/firebase/firebase";

const Conversation = ({ data, redirect, ID }) => {
  // get live message updates
  const [messages, setMessages] = useState(data.messages);

  // Update message status to being read
  useEffect(() => {
    markMessageAsRead(data.id);
  }, []);

  // Get user ID in order to style messages accordingly
  const [user, loading, error] = useAuthState(auth);
  const activeUser = user.uid;

  let messageArray = messages.sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-white slide-from-right">
      <Breadcrum title="Nicolai" destination={redirect} />
      <div className="flex flex-col gap-4 px-4 h-full w-full overflow-y-scroll">
        {messageArray?.map((message, i) => (
          <div
            className={`w-80 py-4 px-4  text-white rounded-xl ${
              message.uid === activeUser
                ? "bg-medium-green text-white self-end"
                : "bg-gray-500"
            } `}
            key={i}
          >
            {/* <p>{data[message.uid]}</p> */}
            <p>{message.content}</p>
            <p className="text-xs">
              {new Date(message.date.seconds * 1000)
                .toISOString()
                .slice(11, 16)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
