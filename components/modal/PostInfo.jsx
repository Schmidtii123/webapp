import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import Image from "next/image";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import ConfirmCreate from "./ConfirmCreate";

function PostInfo({ redirect }) {
  const handleClick = () => {
    window.location.reload();
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="slide-from-right fixed inset-0 flex justify-center z-50 bg-white bg-opacity-100">
        <section className="flex flex-col items-center ">
          <Breadcrum title="Opret annonce" destination={redirect} />
          <ProgressBar step={3} />
          <div className="flex flex-col items-center pb-12"></div>

          <div className="flex flex-col items-center justify-between gap-y-3 pb-6 h-15">
            <p className=" text-center w-72 pb-6 text-m">
              Til sidst skal du angive pris og stand på din bog
            </p>
            <input
              type="number"
              placeholder="Indtast Pris"
              className="border-b-2 border-oldman w-72 placeholder-font-black mb-5 "
            />
            <select
              name="stand"
              id="stand"
              className="border-b-2 border-oldman w-72 palceholder-font-black mb-5 pb-1"
              defaultValue={0}
            >
              <option value={0} disabled>
                Vælg stand på din bog
              </option>
              <option value={1}>Helt ny</option>
              <option value={2}>God, men brugt</option>
              <option value={3}>Slidt</option>
              <option value={4}>Skrevet i</option>
            </select>
            <div>
              <p className="text-xs text-gray-400">
                Du kan altid ændre pris og stand på din bog senere
              </p>
            </div>
            <div className="flex flex-col justify-center w-72">
              <p className="border-b-2 border-oldman placeholder-font-black mb-5 self-start">
                Uddannelse
              </p>

              <p className="border-b-2 border-oldman placeholder-font-black mb-5 self-start">
                Semester
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <BigButton
              color="green"
              content="Opret announce"
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
export default PostInfo;
