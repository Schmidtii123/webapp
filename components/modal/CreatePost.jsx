import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import Image from "next/image";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import ConfirmCreate from "./ConfirmCreate";

function CreatePost({ redirect }) {
  const handleClick = () => {
    window.location.reload();
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="slide-from-right fixed inset-0 flex justify-center z-50 bg-white bg-opacity-100">
        <section className="flex flex-col items-center ">
          <Breadcrum title="Opret annonce" destination={redirect} />
          <ProgressBar step={1} />
          <div className="flex flex-col items-center pb-12">
            <p className=" w-72 pb-6">
              Opret en annonce ved at scanne bogens stregkode eller indtaste
              ISBN nummeret manuelt
            </p>
            <Image
              alt="#"
              src="/isbn-illustration.png"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col items-center gap-y-3 pb-6">
            <BigButton disabled color="grey" content="Scan stregkode" />
            <p>eller</p>
            <input
              type="text"
              placeholder="Indtast ISBN nummer"
              className="border-b-2 border-oldman w-72 placeholder-font-black"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <BigButton
              color="green"
              content="Næste"
              click={() => {
                setOpenModal(true);
              }}
            />
            <BigButton color="grey" content="Annuller" click={handleClick} />
          </div>
        </section>
      </div>
      {openModal && <ConfirmCreate redirect={() => setOpenModal(false)} />}
    </>
  );
}

export default CreatePost;
