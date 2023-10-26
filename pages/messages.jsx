import React from "react";
import Message from "@/components/messages/Message";
import { useState, useEffect } from "react";
import { getAllMessages, getUsernameByID } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Conversation from "@/tabs/Conversation";
import { useCollection } from "react-firebase-hooks/firestore";
import { getLiveMessages } from "@/firebase/firebase";

// Iterates through message object and checks for the ID that does not belong to the currently active user
function filterObjectValuesWithID(obj, id) {
  const excludedKeys = ["id", "is_read", "messages", id];
  const filteredValues = Object.entries(obj)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([_, value]) => value);
  return filteredValues;
}

const Messageview = () => {
  const [chats, setChats] = useState([]);
  const [liveChats, setLiveChats] = useState([]);
  const [filterRead, setFilterRead] = useState(false);
  const [user] = useAuthState(auth);
  const [showConversation, setShowConversation] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const activeUser = user.uid;

  // Get live messages
  async function getLiveChats() {
    try {
      getLiveMessages((chats) => {
        if (chats) {
          setLiveChats(chats);
        }
        if (chats) {
          try {
            if (liveChats.length > 0 && convoID) {
              setSelectedConversation(
                liveChats.find((chat) => chat.id === convoID)
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
      if (liveChats.length > 0 && convoID) {
        setSelectedConversation(liveChats.find((chat) => chat.id === convoID));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLiveChats();
  }, []);

  const [convoID, setConvoID] = useState(null);
  const [counter, setCounter] = useState(0);

  return (
    <>
      {showConversation && (
        <Conversation
          uid={activeUser}
          ID={convoID}
          counter={counter}
          data={selectedConversation}
          redirect={() => setShowConversation(false)}
        />
      )}
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
          {liveChats
            ?.filter((message) => {
              if (filterRead) {
                return message.is_read === false;
              } else {
                return message;
              }
            })
            .map((message, i) => (
              <Message
                action={() => {
                  setShowConversation(true);
                  setSelectedConversation(message);
                  setConvoID(message.id);
                }}
                id={message.id}
                key={i}
                name={filterObjectValuesWithID(message, activeUser)}
                message={message.messages[0].content}
                isRead={message.is_read}
              />
            ))}
        </div>
      </section>
    </>
  );
};

const messages = () => {
  return <Messageview />;
};

export default messages;
