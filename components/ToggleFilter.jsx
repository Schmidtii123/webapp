import React from "react";
import { useState } from "react";

const ToggleFilter = (props) => {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  function getToggleColor() {
    if (isActive === true) {
      return "bg-medium-green text-white";
    } else {
      return "bg-oldman text-black";
    }
  }

  return (
    <button
      name="semester"
      value={props.value}
      className={`h-auto w-auto p-1 ${getToggleColor()} rounded`}
      onClick={(toggleActive, props.click)}
    >
      <p className="text-sm font-light">{props.title}</p>
    </button>
  );
};

export default ToggleFilter;
