import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";

function CreatePost() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center z-50 bg-slate-100 bg-opacity-100">
        <section>
          <ProgressBar color="green" />
          <div>
            <p>
              Opret en annonce ved at scanne bogens stregkode eller indtaste
              ISBN nummeret manuelt
            </p>
            <image src="./public/isbn-illustration.png" alt="" />
          </div>
        </section>
      </div>
    </>
  );
}

export default CreatePost;
