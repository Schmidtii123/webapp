import React from "react";

const Breadcrum = ({
  title = "Breadcrum",
  icon = "back",
  destination = () => {},
}) => {
  const icons = {
    back: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-10 h-10"
      >
        <path
          fillRule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clipRule="evenodd"
        />
      </svg>
    ),
    close: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.9}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  };
  const selected = icon ? icons[icon] : icons.saved;
  return (
    <>
      <div
        onClick={destination}
        className="w-full h-14 flex items-center gap-2 pt-1 px-2 border-b border-gray-300 bg-white"
      >
        <div>{selected}</div>

        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </>
  );
};

export default Breadcrum;
