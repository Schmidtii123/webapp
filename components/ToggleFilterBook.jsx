import React, { useState, useEffect } from "react";
import { useFilterStore } from "@/pages/_app";

const ToggleFilterBook = (props) => {
  const [isActive, setIsActive] = useState(false);

  const { setSemester, removeSemester, filter } = useFilterStore();

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const getToggleColor = () => {
    return props.isSelected
      ? "bg-medium-green text-white"
      : "bg-oldman text-black";
  };

  return (
    <label
      className={`relative inline-block cursor-pointer ${getToggleColor()} rounded px-2 py-1`}
    >
      <input
        disabled={props.disabled}
        name={props.title}
        type="checkbox"
        className="hidden"
        onClick={() => {
          props.click();
        }}
      />
      <span className="font-light">{props.title}</span>
    </label>
  );
};

export default ToggleFilterBook;
