import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import BigButton from "@/components/BigButton";
import { useState } from "react";

const ConfirmCreate = ({ redirect }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="slide-from-right fixed inset-0 flex justify-center z-50 bg-white bg-opacity-100">
        <section>
          <Breadcrum title="Bekræft bog" destination={redirect} />
          <ProgressBar step={1} />
          <div></div>
          <div className="flex flex-col gap-y-4">
            <BigButton
              color="green"
              content="Næste"
              click={() => {
                setOpenModal(true);
              }}
            />
            <BigButton color="grey" content="Annuller" click={redirect} />
          </div>
        </section>
      </div>
      {openModal && <ConfirmCreate redirect={() => setOpenModal(false)} />}
    </>
  );
};

export default ConfirmCreate;
