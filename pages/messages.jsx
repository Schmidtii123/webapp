import React from "react";
import Message from "@/components/messages/Message";
import { useState, useEffect } from "react";
import { getAllMessages, getUsernameByID } from "@/firebase/firebase";

const mock = [
  {
    id: 1,
    name: "Jens",
    message: "Hej, jeg er interesseret i din bog",
    isRead: false,
  },
  {
    id: 2,
    name: "Peter",
    message: "Hey, check min soundcloud ud",
    isRead: true,
  },
  {
    id: 3,
    name: "Johanne",
    message: "Jehovas vidne her, har du 5 minutter?",
    isRead: false,
  },
];
const Messageview = () => {
  const [chats, setChats] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get All chats
  async function getChats() {
    const chats = await getAllMessages();
    setChats(chats);
  }

  useEffect(() => {
    getChats();
  });
  const [filterRead, setFilterRead] = useState(false);
  return (
    <section className="flex flex-col w-screen h-[100svh] py-4 gap-4 overflow-x-hidden overflow-y-scroll">
      <h1 className="text-2xl font-bold ml-4">Beskeder</h1>
      {/* Message wrapper */}
      <button
        className="w-80 font-medium text-lg text-center py-2 px-4 mx-auto bg-gray-200 rounded-md my-4"
        onClick={() => setFilterRead(!filterRead)}
      >
        Vis kun nye beskeder
      </button>
      <div className="flex flex-col">
        {chats
          .filter((message) => {
            if (filterRead) {
              return message.isRead === false;
            } else {
              return message;
            }
          })
          .map((message, i) => (
            <Message
              key={i}
              name={message.usernames[i]}
              message={message.messages2[i].content}
              isRead={message.isRead}
            />
          ))}
      </div>
    </section>
  );
};

const messages = () => {
  return <Messageview />;
};

export default messages;
