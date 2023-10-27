import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import Image from "next/image";
import BigButton from "@/components/BigButton";
import { useState } from "react";
import ConfirmCreate from "./ConfirmCreate";
import axios from "axios";

function CreatePost({ redirect }) {
  const [openModal, setOpenModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showStep, setShowStep] = useState(1);
  const [bookInfo, setBookInfo] = useState({
    condition: 0,
    image: "",
    link: "",
    major: "",
    name: "",
    price: 0,
    sellerID: "",
    semester: 0,
  });

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
      const bookImage = data.imageLinks
        ? data.imageLinks.thumbnail
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT0xwyLstvC7wH8jYIKur3GTcSq-g6fj2EbL4wk-qaONHYjBswa3rpFsZJeEjuXcG-lw&usqp=CAU";
      setBookInfo({
        ...bookInfo,
        name: bookName,
        link: previewLink,
        image: bookImage,
      });
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
        <section className="flex flex-col items-center ">
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
        </section>
      </div>
    </>
  );
}

export default CreatePost;
