import React from "react";

const Message = (props) => {
  return (
    <div
      className={`flex w-screen px-2 py-4 border-b border-b-gray-300 rounded-none ${
        !props.isRead && "bg-gray-100"
      }`}
    >
      {/* Image wrapper */}
      <div className="w-1/6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-gray-700"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* text wrapper */}
      <div className=" flex flex-col w-5/6">
        <p className="text-2xl font-medium">{props.name}</p>
        <p className="text-lg font-light text-gray-700 truncate">
          {props.message}
        </p>
      </div>
    </div>
  );
};

export default Message;
