import React from "react";

const ProgressBar = (props) => {
  function getBarColor() {
    if (props.color.toLowerCase() === "green") {
      return "bg-medium-green";
    } else if (props.color.toLowerCase() === "grey") {
      return "bg-light-grey";
    } else {
      return "bg-medium-green";
    }
  }
  return (
    <>
      <div className="flex flex-row justify-around">
        <div className={`rounded-full h-3 w-20  ${getBarColor()} mx-2`}></div>
        <div className={`rounded-full h-3 w-20  ${getBarColor()} mx-2`}></div>
        <div className={`rounded-full h-3 w-20  ${getBarColor()} mx-2`}></div>
      </div>
    </>
  );
};

export default ProgressBar;
