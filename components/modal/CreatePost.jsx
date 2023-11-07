// Simon, Emil og Nicolai
import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import Image from "next/image";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import ConfirmCreate from "./ConfirmCreate";
import axios from "axios";
import Study from "./Study";
import { useBookInfo } from "@/pages/_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import PostInfo from "./PostInfo";

function CreatePost({ redirect }) {
  const [user] = useAuthState(auth);
  const activeUser = user.uid;
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showStep, setShowStep] = useState(1);

  const { bookInfo, setBookInfo, clearBookInfo } = useBookInfo();

  /* 
"getBookInfoFromISBN" er en asynkron funktion der kaldes når brugeren klikker på "Næste". Den tager ISBN som argument og udfører en API-request 
til Google Books Api ved at bruge Axios, og gemmer oplysninger om bogen, som navn, forhåndvisning og billedlink i "bookInfo". Hvis requesten lykkedes
skifter den til "showStep" til to for at forsætte til næste del i opret annonce. "showError" bliver til sand, hvis der opstår en fejl og fejlen logges.
*/

  const [isbnInput, setIsbnInput] = useState("");
  async function getBookInfoFromISBN(isbn) {
    setShowError(false);
    const filteredString = isbn.replace(/-/g, "");
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=%E2%80%9D%E2%80%9D+isbn:${filteredString}&key=AIzaSyB0ggYsqJXjlanXN-WIRT5esEDFwniMX6s `
      );
      console.log(response.data.items[0].volumeInfo);
      const data = response.data.items[0].volumeInfo;
      const bookName = data.title;
      const previewLink = data.previewLink;

      /* 
Komponetnen under bruger "next/image" til at vise en illustration af en person, der indtaster ISBN nummer. Hvis bogen ikke er i Google APi 
bliver et standard billede vist.
*/

      const bookImage = data.imageLinks
        ? data.imageLinks.thumbnail
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT0xwyLstvC7wH8jYIKur3GTcSq-g6fj2EbL4wk-qaONHYjBswa3rpFsZJeEjuXcG-lw&usqp=CAU";
      setBookInfo("name", bookName);
      setBookInfo("link", previewLink);
      setBookInfo("image", bookImage);
      setBookInfo("sellerID", activeUser);
      setShowStep(2);
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-screen h-screen fixed top-0 bg-white z-50 slide-from-right">
        <Breadcrum title="Opret annonce" destination={redirect} />
        {showStep >= 2 && (
          <ConfirmCreate
            changeStep={() => setShowStep(showStep + 1)}
            redirect={() => setShowStep(1)}
            data={bookInfo}
          />
        )}
        {showStep >= 3 && (
          <Study
            changeStep={() => setShowStep(showStep + 1)}
            redirect={() => setShowStep(1)}
            data={bookInfo}
          />
        )}
        {showStep >= 4 && <PostInfo />}
        <div className="flex flex-col items-center ">
          <ProgressBar step={1} />
          <div className="flex flex-col items-center pb-12">
            <p className=" w-72 pb-6">
              Opret en annonce ved at indtaste ISBN nummeret
            </p>
            <Image
              alt="Illustration af en person der indtaster et ISBN nummer"
              src="/isbn-illustration.png"
              width={300}
              height={0}
              className="h-auto"
            />
          </div>
          <div className="flex flex-col items-center gap-y-3 pb-6">
            <input
              onChange={(e) => setIsbnInput(e.target.value)}
              type="text"
              placeholder="Indtast ISBN nummer"
              className={`border-b-2 border-oldman w-72 placeholder-font-black outline-none ${
                showError && "border-red-500 animate-shake"
              }`}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <BigButton
              disabled={isbnInput.length < 13}
              color="green"
              content="Næste"
              click={() => {
                getBookInfoFromISBN(isbnInput);
              }}
            />
            <BigButton color="grey" content="Annuller" click={redirect} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
