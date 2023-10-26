import React from "react";

const ProgressBar = ({ step }) => {
  return (
    <>
      <div className="flex flex-row justify-around mx-6 py-6">
        <div
          className={`rounded-full h-3 w-20  ${
            step >= 1 ? "bg-medium-green" : "bg-oldman"
          } mx-2`}
        ></div>
        <div
          className={`rounded-full h-3 w-20  ${
            step >= 2 ? "bg-medium-green" : "bg-oldman"
          } mx-2`}
        ></div>
        <div
          className={`rounded-full h-3 w-20  ${
            step >= 3 ? "bg-medium-green" : "bg-oldman"
          } mx-2`}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
