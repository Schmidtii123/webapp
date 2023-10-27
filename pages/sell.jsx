import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation_lo42clyq.json";
import BigButton from "../components/BigButton";
import CreatePost from "../components/modal/CreatePost";
import { useState } from "react";

const Sell = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex pt-4">
        <h2 className=" text-2xl font-bold ml-4">Sælg</h2>
      </div>
      <div className="flex flex-col items-center gap-16">
        <Lottie className=" w-52 pt-8" animationData={animationData} />
        <p className="text-xl max-w-xs text-center pb-28">
          Du har ingen bøger til salg. Opret en annonce og få hurtigt afsat dine
          bøger
        </p>
        <BigButton
          color="green"
          content="Opret annonce"
          click={() => {
            setOpenModal(true);
          }}
        />
      </div>
      {openModal && <CreatePost redirect={() => setOpenModal(false)} />}
    </>
  );
};

export default Sell;
