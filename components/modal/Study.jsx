import React from "react";
import ProgressBar from "./modalcomp/ProgressBar";
import Breadcrum from "../Breadcrum";
import BigButton from "@/components/BigButton";
import { useState, useEffect } from "react";
import ToggleFilterBook from "@/components/ToggleFilterBook";
import { useBookInfo } from "@/pages/_app";

const Study = ({ redirect, data, changeStep, props }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const { bookInfo, setBookInfo, clearBookInfo } = useBookInfo();
  const [semesterValue, setSemesterValue] = useState(0);

  const majors = [
    "Pædagog",
    "Medicin",
    "Sygeplejerske",
    "Psykologi",
    "Diplomingeniør",
    "Folkeskolelærer",
    "socialrådgiver",
    "Civilingeniør",
    "Jura",
    "Erhvervsøkonomi",
    "Markedsføringsøkonom",
    "Fysioterapeut",
    "Designteknolog",
    "Arkitekt",
    "Finansøkonom",
    "Bygningskonstruktør",
    "Datamatiker",
    "Journalist",
    "Multimediedesigner",
    "Jordemoder",
    "Serviceøkonom",
    "Designer",
    "Odontologi",
    "International Business",
    "Statskundskab",
  ];
  function setSemester(semester) {
    setBookInfo("semester", semester);
  }

  const getFilteredMajors = () => {
    const inputText = searchText.toLowerCase();
    return majors.filter((major) => major.toLowerCase().includes(inputText));
  };

  const handleMajorSelection = (major) => {
    setSelectedMajor(major);
    setBookInfo("major", major);
  };

  useEffect(() => {}, [semesterValue]);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-white z-50 slide-from-right">
        <div>
          <Breadcrum title="Studie" destination={redirect} />
          <ProgressBar step={2} />
          <div className="flex flex-col px-10 pt-6 gap-y-10">
            <h2>
              Lad os starte med det grundlæggende. Vælg dit studie og semester{" "}
            </h2>
            <div className="relative flex grow ml-2 items-center">
              <label htmlFor="search" className="absolute left-2">
                {/* Search SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>
              <input
                type="text"
                id="search"
                placeholder="Søg"
                className="bg-gray-200 pl-10 h-9 rounded-full w-full outline-none"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setBookInfo("major", e.target.value);
                }}
              />
            </div>
          </div>
          {searchText && selectedMajor === "" && (
            <ul className="w-full flex flex-col items-start py-4  gap-2 h-[30svh] overflow-scroll">
              {getFilteredMajors().map((major, index) => (
                <li
                  key={index}
                  onClick={() => handleMajorSelection(major)}
                  className=" cursor-pointer hover:bg-gray-200 px-4 py-4 text-lg rounded-full w-max"
                >
                  {major}
                </li>
              ))}
            </ul>
          )}

          {selectedMajor && (
            <div className="flex pt-3 pl-12 border-b-2 pb-2 fade-in">
              <div
                className="flex items-center gap-x-2 px-4 py-2 bg-gray-200 rounded-full w-max cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  setSelectedMajor("");
                  setSearchText("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>

                <p>{selectedMajor}</p>
              </div>
            </div>
          )}
          {selectedMajor && (
            <div className="flex flex-col pt-6 fade-in">
              <p className="px-8 pb-4 mr-12">
                Vælg hvilke semestere bøgerne er blevet brugt
              </p>
              <div className="flex flex-wrap gap-2 pl-8">
                <ToggleFilterBook
                  title="1.semester"
                  type="checkbox"
                  isSelected={semesterValue === 1}
                  click={() => {
                    if (semesterValue !== 1) {
                      setSemesterValue(1);
                      console.log("gik igennem");
                      setSemester(1);
                    } else if (semesterValue === 1) {
                      setSemesterValue(0);
                    }
                  }}
                />
                <ToggleFilterBook
                  isSelected={semesterValue === 2}
                  click={() => {
                    if (semesterValue !== 2) {
                      setSemesterValue(2);
                      setSemester(2);
                    } else if (semesterValue === 2) {
                      setSemesterValue(0);
                    }
                  }}
                  title="2.semester"
                  type="checkbox"
                />
                <ToggleFilterBook
                  isSelected={semesterValue === 3}
                  click={() => {
                    if (semesterValue !== 3) {
                      setSemesterValue(3);
                      setSemester(3);
                    } else if (semesterValue === 3) {
                      setSemesterValue(0);
                    }
                  }}
                  title="3.semester"
                  type="checkbox"
                />
                <ToggleFilterBook
                  isSelected={semesterValue === 4}
                  click={() => {
                    if (semesterValue !== 4) {
                      setSemesterValue(4);
                      setSemester(4);
                    } else if (semesterValue === 4) {
                      setSemesterValue(0);
                    }
                  }}
                  title="4.semester"
                  type="checkbox"
                />
                <ToggleFilterBook
                  isSelected={semesterValue === 5}
                  click={() => {
                    if (semesterValue !== 5) {
                      setSemesterValue(5);
                      setSemester(5);
                    } else if (semesterValue === 5) {
                      setSemesterValue(0);
                    }
                  }}
                  title="5.semester"
                  type="checkbox"
                />
                <ToggleFilterBook
                  isSelected={semesterValue === 6}
                  click={() => {
                    if (semesterValue !== 6) {
                      setSemesterValue(6);
                      setSemester(6);
                    } else if (semesterValue === 6) {
                      setSemesterValue(0);
                    }
                  }}
                  title="6.semester"
                  type="checkbox"
                />
              </div>
            </div>
          )}

          {selectedMajor && (
            <div className="flex flex-col items-center gap-y-4 pt-8 fade-in ">
              <BigButton
                color="green"
                content="Næste"
                click={() => {
                  changeStep();
                }}
              />
              <BigButton color="grey" content="Annuller" click={redirect} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Study;
