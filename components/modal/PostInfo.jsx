// Emil og Simon
import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import Image from "next/image";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import ConfirmCreate from "./ConfirmCreate";
import { useBookInfo } from "@/pages/_app";
import { addBook } from "@/firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

// Håndterer hvilke funktioner der skal køres på onClick.
function PostInfo({ redirect }) {
  const handleClick = () => {
    window.location.reload();
  };
  /* Håndtere hvordan modalen kører, og henter bookinfo information, så det er muligt at bruge useBookInfo i koden */
  const [openModal, setOpenModal] = useState(false);
  const { bookInfo, setBookInfo, clearBookInfo } = useBookInfo();
  const router = useRouter();

  async function addBookToDB() {
    {
      /*/ her vil try funktionen fange og behandle eventuelle fejl */
    }
    try {
      const response = await addBook(bookInfo);
      console.log(response);
      {
        /* Toast er en pop up meddelelse til at bekræfte brugeren i at deres annonce er blevet oprettet, */
      }
      toast.success("Annonce oprettet", {
        iconTheme: {
          primary: "#ffffff",
          secondary: "#79AC78",
        },
        style: {
          borderRadius: "10px",
          background: "#79AC78",
          color: "#ffffff",
        },
      });
      {
        /* clearBookInfo fjerner så informationen og gør klar til eventuel ny oprettelse, med nye informationer i formularen */
      }
      clearBookInfo();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="slide-from-right fixed inset-0 flex justify-center z-50 bg-white bg-opacity-100">
        <Toaster />
        <div className="flex flex-col items-center ">
          <Breadcrum title="Opret annonce" destination={redirect} />
          {/* her bliver progressbaren importeret og den står til step 3, som betyder at alle felter i progressbaren er fyldt ud */}
          <ProgressBar step={3} />
          <div className="flex flex-col items-center justify-between gap-y-3 h-15 mt-16">
            <p className=" text-center w-72 pb-6 text-xl">
              Til sidst skal du angive pris og stand på din bog
            </p>
            <input
              type="number"
              placeholder="Indtast Pris"
              className="border-b-2 border-oldman w-72 placeholder-font-black mb-5 "
              onChange={(e) => {
                const valueAsNumber = parseInt(e.target.value);
                setBookInfo("price", valueAsNumber);
              }}
            />
            {/* Her er der brugt select til at lave en valgmulighed i forhold til hvilken stand bogen er i,
               her laver er der så nogle options, altså valgmuligheder som kan vælges mellem, de har hver deres value
               det gør at vi kan se senere hvad valuen er på et senere tidspunkt, der er også en default value som er 0 og 
               den er så disabled så det ikke er muligt at vælge den når du har valgt din stand.*/}
            <select
              name="stand"
              id="stand"
              className="border-b-2 border-oldman w-72 palceholder-font-black pb-1"
              defaultValue={0}
              onChange={(e) => {
                const valueAsNumber = parseInt(e.target.value);
                setBookInfo("condition", valueAsNumber);
              }}
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
            <div className="flex flex-col justify-center w-72 pt-10">
              <p className="mb-5 self-start">
                {/* Her bliver informationen/valget af uddannelse fra den forrige side hentet og skrevet ind i {bookInfo.major}*/}
                <span className="font-semibold mr-2">Uddannelse:</span>
                {bookInfo.major}
              </p>

              <p className="mb-5 self-start">
                {/* Her bliver informationen/valget af semester fra den forrige side hentet og skrevet ind i {bookInfo.semester}*/}
                <span className="font-semibold mr-2">Semester:</span>
                {bookInfo.semester}.Semester
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <BigButton
              color="green"
              content="Opret annonce"
              click={() => {
                addBookToDB();
              }}
            />
            <BigButton color="grey" content="Annuller" click={handleClick} />
          </div>
        </div>
      </div>
      {openModal && <ConfirmCreate redirect={() => setOpenModal(false)} />}
    </>
  );
}
export default PostInfo;
