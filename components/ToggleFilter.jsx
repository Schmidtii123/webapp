import React, { useState } from "react";
import { useFilterStore } from "@/pages/_app";
const ToggleFilter = (props) => {
  const [isActive, setIsActive] = useState(false);

  const { setSemester, removeSemester } = useFilterStore();

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const getToggleColor = () => {
    return isActive ? "bg-medium-green" : "bg-oldman";
  };

  return (
    <label
      className={`relative inline-block cursor-pointer ${getToggleColor()} rounded px-2 py-1`}
    >
      <input
        name={props.title}
        type="checkbox"
        className="hidden"
        checked={isActive}
        onClick={() => {
          toggleActive();
          isActive ? removeSemester(props.value) : setSemester(props.value);
        }}
      />
      <span className="font-light">{props.title}</span>
    </label>
  );
};

export default ToggleFilter;
