import React from 'react'
import { useUnreadMessagesStore } from '@/pages/_app';

const MessageIsRead = () => {
  const { unreadMessages } = useUnreadMessagesStore();

  return (
    <>
      {`Du har ${unreadMessages} nye beskeder`}
    </>
  );
};

export default MessageIsRead;