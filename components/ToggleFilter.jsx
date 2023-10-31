import React, { useState, useEffect } from "react";
import { useFilterStore } from "@/pages/_app";

const ToggleFilter = (props) => {
  const [isActive, setIsActive] = useState(false);

  const { setSemester, removeSemester, setCondition, removeCondition, filter } =
    useFilterStore();

  useEffect(() => {
    if (props.type === "semester") {
      if (filter.semester.includes(props.value)) {
        setIsActive(true);
      }
    } else if (props.type === "condition") {
      if (filter.condition.includes(props.value)) {
        setIsActive(true);
      }
    }
  }, [filter]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const getToggleColor = () => {
    return isActive ? "bg-medium-green text-white" : "bg-oldman text-black";
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
          toggleActive();
          if (props.type === "semester") {
            isActive ? removeSemester(props.value) : setSemester(props.value);
          } else if (props.type === "condition") {
            isActive ? removeCondition(props.value) : setCondition(props.value);
          }
        }}
      />
      <span className="font-light">{props.title}</span>
    </label>
  );
};

export default ToggleFilter;
