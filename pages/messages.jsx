import React from "react";
import Message from "@/components/messages/Message";
import { useState, useEffect } from "react";
import { getAllMessages, getUsernameByID } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Conversation from "@/tabs/Conversation";
import { useCollection } from "react-firebase-hooks/firestore";
import { getLiveMessages } from "@/firebase/firebase";
import { useUnreadMessagesStore } from "./_app";
import MessageIsRead from "@/components/messages/MessageIsRead";

// Iterates through message object and checks for the ID that does not belong to the currently active user
function filterObjectValuesWithID(obj, id) {
  const excludedKeys = [
    "id",
    "is_read",
    "messages",
    "userIDs",
    "chat_started",
    "book",
    id,
  ];
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
  const [isLoading, setIsLoading] = useState(true);

  const { incrementUnreadMessages, resetUnreadMessages, unreadMessages } =
    useUnreadMessagesStore();

  // Get live messages
  async function getLiveChats() {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLiveChats();
  }, []);

  useEffect(() => {
    resetUnreadMessages();
    liveChats
      .filter((message) => {
        return message.userIDs.includes(activeUser);
      })
      .forEach((message) => {
        if (!message.is_read) {
          incrementUnreadMessages();
        }
      });
    console.log(unreadMessages);
  }, [liveChats]);

  const [convoID, setConvoID] = useState(null);
  const [recieverName, setRecieverName] = useState(null);

  if (isLoading)
    return (
      <div className="w-screen h-[100svh] flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-40 h-40 animate-pulse text-medium-green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <h1 className="font-bold text-4xl text-medium-green animate-pulse">
          BookBazr
        </h1>
      </div>
    );

  return (
    <>
      {showConversation && (
        <Conversation
          book={selectedConversation.book}
          name={recieverName}
          uid={activeUser}
          ID={convoID}
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
          {filterRead ? "Vis alle beskeder" : "Vis kun ulæste beskeder"}
        </button>
        <div className="flex flex-col h-[75svh] overflow-y-scroll pb-4 fade-in">
          {liveChats
            ?.filter((message) => {
              if (filterRead) {
                return message.is_read === false;
              } else {
                return message;
              }
            })
            .filter((message) => {
              return message.userIDs.includes(activeUser);
            })
            .sort((a, b) => b.chat_started - a.chat_started)
            .map((message, i) => (
              <Message
                action={() => {
                  setShowConversation(true);
                  setSelectedConversation(message);
                  setConvoID(message.id);
                  setRecieverName(
                    filterObjectValuesWithID(message, activeUser)
                  );
                }}
                id={message.id}
                key={i}
                name={
                  filterObjectValuesWithID(message, activeUser) +
                  ": " +
                  message?.book
                }
                message={
                  message.messages.length > 0
                    ? message.messages[message.messages.length - 1].content
                    : "Skriv en besked..."
                }
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
