import React from "react";

const Breadcrum = ({ title = "Breadcrum", destination = () => {} }) => {
  return (
    <>
      <div
        onClick={destination}
        className="w-full h-20 flex items-center gap-2 pt-1 px-2"
      >
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

        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </>
  );
};

export default Breadcrum;
