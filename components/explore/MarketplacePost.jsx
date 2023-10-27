import React from "react";

const MarketplacePost = (props) => {
  return (
    <div onClick={props.click} className="w-40 flex flex-col items-center">
      <div>
        <img
          src={props.img}
          width={175}
          height={175}
          alt="Et billede af bogens forside"
        />
        <h2 className="font-bold text-lg">{props.title}</h2>
        <p className="text-lg font-light">kr. {props.price}</p>
      </div>
    </div>
  );
};

export default MarketplacePost;
