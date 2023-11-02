import React from "react";
import { useUnreadMessagesStore } from "@/pages/_app";

const MessageIsRead = () => {
  const { unreadMessages } = useUnreadMessagesStore();

  if (unreadMessages === 0) {
    return null;
  }

  return (
    <div className="bg-red-500 h-6 w-6 absolute text-center rounded-full text-white ml-10 mb-20">
      {`${unreadMessages}`}
    </div>
  );
};

export default MessageIsRead;
