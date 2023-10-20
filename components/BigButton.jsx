import React from "react";

const BigButton = (props) => {
  function getButtonColor() {
    if (props.color.toLowerCase() === "green") {
      return "bg-medium-green";
    } else if (props.color.toLowerCase() === "grey") {
      return "bg-light-grey text-zinc-900";
    } else if (props.color.toLowerCase() === "red") {
      return "bg-red-500";
    } else {
      return "bg-medium-green";
    }
  }
  return (
    <button
      onClick={props.click}
      className={`rounded-full text-white w-72 h-12 text-lg whitespace-nowrap flex justify-center items-center ${getButtonColor()}`}
    >
      {props.content}
    </button>
  );
};

export default BigButton;
