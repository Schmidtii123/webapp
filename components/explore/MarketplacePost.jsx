// Karl
// Komponentet indeholder informationer og styling til at vise en bog fra databasen ved .map i index.jsx.
import React from "react";

const MarketplacePost = (props) => {
  return (
    <div
      onClick={props.click}
      className={`w-1/2 px-6 h-80 flex flex-col items-center cursor-pointer`}
    >
      <div className="flex flex-col h-3/4 w-full overflow-hidden">
        <img // Her vises billedet
          src={props.img}
          width={175}
          height={175}
          alt="Et billede af bogens forside"
          className="h-auto w-full object-fill"
        />
      </div>
      <div className="h-1/4 py-1 w-full">
        <h2 className="font-bold truncate">{props.title}</h2>{" "}
        {/* Her vises titlen og prisen underneden */}
        <p className="text-lg font-light">kr. {props.price}</p>
      </div>
    </div>
  );
};

export default MarketplacePost;
