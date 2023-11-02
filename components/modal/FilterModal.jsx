import React from "react";
import Breadcrum from "../Breadcrum";
import ToggleFilter from "../ToggleFilter";
import BigButton from "../BigButton";
import { useFilterStore } from "@/pages/_app";

const FilterModal = ({ redirect, acceptChange }) => {
  const majors = [
    "pædagog",
    "medicin",
    "sygeplejerske",
    "psykologi",
    "diplomingeniør",
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

  const { setMajor, setSort, filter, clearFilter } = useFilterStore();
  function handleClick() {
    clearFilter();
    redirect();
  }

  return (
    <div>
      <div className="fixed inset-0 flex flex-col bg-white bg-opacity-100">
        <div className="pt-3 bg-slate-900 bg-opacity-50 h-screen w-screen ">
          <div className="bg-white animate-up h-screen w-screen">
            <div className="flex w-full relative justify-center">
              <Breadcrum title="Filter" destination={redirect} icon="close" />
            </div>
            <div className="flex flex-col justify-start items-center gap-6 pt-4">
              <div className="flex flex-col w-96">
                <label htmlFor="" className="text-lg font-medium">
                  Sorter efter
                </label>
                <select
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                  defaultValue={filter.sort}
                  name="sort"
                  className="border border-oldman bg-white  rounded h-10"
                >
                  <option value="noSort">Vælg sortering:</option>
                  <option value="lowToHigh">Pris: lav til høj</option>
                  <option value="highToLow">Pris: høj til lav</option>
                </select>
              </div>
              <div className="flex flex-col w-96">
                <label htmlFor="" className="text-lg font-medium">
                  Vælg uddannelse
                </label>
                <input
                  value={filter.major}
                  onChange={(e) => {
                    setMajor(e.target.value);
                  }}
                  name="major"
                  type="search"
                  placeholder="Indtast uddannelse"
                  autoComplete="on"
                  list="majors"
                  className="border-b-2 outline-none border-oldman rounded-none h-10"
                />
                <datalist id="majors">
                  {majors.map((major, i) => (
                    <option key={i} value={major} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-col w-96">
                <p className="text-lg font-medium mb-2">Vælg semester</p>
                <div className="flex flex-wrap gap-2">
                  <ToggleFilter type="semester" value={1} title="1. Semester" />
                  <ToggleFilter type="semester" value={2} title="2. Semester" />
                  <ToggleFilter type="semester" value={3} title="3. Semester" />
                  <ToggleFilter type="semester" value={4} title="4. Semester" />
                  <ToggleFilter type="semester" value={5} title="5. Semester" />
                  <ToggleFilter type="semester" value={6} title="6. Semester" />
                </div>
              </div>
              <div className="flex flex-col w-96">
                <p className="text-lg font-medium mb-2">Vælg stand</p>
                <div className="flex flex-wrap gap-2 pb-4">
                  <ToggleFilter type="condition" value={1} title="Helt ny" />
                  <ToggleFilter
                    type="condition"
                    value={2}
                    title="God, men brugt"
                  />
                  <ToggleFilter type="condition" value={3} title="Slidt" />
                  <ToggleFilter type="condition" value={4} title="Skrevet i" />
                </div>
              </div>
              <BigButton
                click={acceptChange}
                color="green"
                content="Filtrer bøger"
              />
              <BigButton
                click={handleClick}
                color="grey"
                content="Nulstil filtre"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
