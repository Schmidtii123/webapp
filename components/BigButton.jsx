// Karl
// Et komponent der viser den knap, som går igen i vores projekt, herunder "Login", "Filtrer bøger", "Slet bog". Den er sat op med props der styrer farven, teksten og onClick funktionen.
import React from "react";

const BigButton = (props) => {
  // En lille funktion der sørger for, at farven kan ændres via en prop kaldt props.color. Her tager den props.color, og oversætter enten "green", "grey" eller "red" til tekst som tailwind forstår. ("bg-medium-green" etc.)

  function getButtonColor() {
    if (props.color.toLowerCase() === "green") {
      return "bg-medium-green";
    } else if (props.color.toLowerCase() === "grey") {
      return "bg-oldman text-zinc-900";
    } else if (props.color.toLowerCase() === "red") {
      return "bg-red-500";
    } else {
      return "bg-medium-green";
    }
  }
  return (
    <button
      onClick={props.click}
      className={`rounded-full text-white w-72 h-12 text-lg whitespace-nowrap flex justify-center items-center ${getButtonColor()} ${
        props.disabled && "opacity-50 pointer-events-none"
      }`}
    >
      {props.content}
    </button>
  );
};

export default BigButton;
