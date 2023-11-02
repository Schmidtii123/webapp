import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import Study from "./Study";

const ConfirmCreate = ({ redirect, data, changeStep }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-white z-50 slide-from-right">
        <section>
          <Breadcrum title="Bekræft bog" destination={redirect} />
          <ProgressBar step={1} />
          <div className="w-full flex flex-col items-center py-4 gap-4">
            {/* Image wrapper */}
            <div className="w-40 h-60 border border-gray-300">
              <img
                className="w-full h-full object-contain"
                src={data.image}
                alt={data.name}
              />
            </div>
            <p className="text-2xl text-center">{data.name}</p>
          </div>
          <div className="flex flex-col items-center gap-y-4 pt-4">
            <p className="text-3xl font-medium pb-2">Er det din bog?</p>
            <BigButton color="green" content="Ja" click={changeStep} />
            <BigButton color="red" content="Nej" click={redirect} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ConfirmCreate;
