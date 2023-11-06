// Karl
// Et komponent der viser en knap til filtrering og håndterer dele af logikken. Der benyttes zustand, props og functions.
import React, { useState, useEffect } from "react";
import { useFilterStore } from "@/pages/_app";

const ToggleFilter = (props) => {
  //State til at styre om filteret er aktivt eller ej
  const [isActive, setIsActive] = useState(false);

  //Importering af zustand fra _app.js
  const { setSemester, removeSemester, setCondition, removeCondition, filter } =
    useFilterStore();

  // Useffect der tjekker førts om filteret er semester eller condition, derefter tjekker om de er inkluderet i zustand fiilter-objektet, og derefter sætter filteret til active.
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

  // Function der på baggrund af om filteret er aktivt eller ej, ændrer stylingen på filteret.
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
        // onClick tjekker om filteret er semester eller condition, og herefter kører den zustand funktionen der tilføjer eller fjerner filteret fra zustand-objektet, alt efter om isActive er true eller fasle.
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
