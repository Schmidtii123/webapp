import React from "react";
import { useState } from "react";
import Breadcrum from "../Breadcrum";
import ToggleFilter from "../ToggleFilter";
import BigButton from "../BigButton";

const FilterModal = ({ redirect, onFilterChange, currentOptions }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onFilterChange({ [name]: value });
  };

  const majors = [
    "multimedie",
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
  const clearFilter = () => {
    onFilterChange({
      sort: "",
      major: "",
      semester: "",
      stand: "",
    });
  };

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div>
      <div className="animate-up fixed inset-0 flex flex-col bg-white bg-opacity-100">
        <div className="flex w-full relative justify-center">
          <Breadcrum title="Filter" destination={redirect} />
        </div>
        <div className="flex flex-col justify-start items-center gap-8 pt-10">
          <div className="flex flex-col w-96">
            <label htmlFor="" className="text-lg font-medium">
              Sorter efter
            </label>
            <select
              defaultValue={currentOptions.sort}
              onChange={handleInputChange}
              name="sort"
              className="border border-oldman bg-white  rounded h-10"
            >
              <option value="highToLow">Pris: lav til høj</option>
              <option value="lowToHigh">Pris: høj til lav</option>
            </select>
          </div>
          <div className="flex flex-col w-96">
            <label htmlFor="" className="text-lg font-medium">
              Vælg uddannelse
            </label>
            <input
              defaultValue={currentOptions.major}
              onChange={handleInputChange}
              name="major"
              type="text"
              placeholder="Indtast uddannelse"
              autoComplete="on"
              list="majors"
              className="border-b-2 outline-none border-oldman rounded-none h-10"
            />
            <datalist id="majors">
              {majors.map((major, i) => (
                <option key={i} value={major.toUpperCase} />
              ))}
            </datalist>
          </div>
          <div className="flex flex-col w-96">
            <p className="text-lg font-medium mb-2">Vælg semester</p>
            <div className="flex flex-wrap gap-2">
              <ToggleFilter
                click={handleInputChange}
                value={1}
                title="1. Semester"
              />
              <ToggleFilter value={2} title="2. Semester" />
              <ToggleFilter value={3} title="3. Semester" />
              <ToggleFilter value={4} title="4. Semester" />
              <ToggleFilter value={5} title="5. Semester" />
              <ToggleFilter value={6} title="6. Semester" />
            </div>
          </div>
          <div className="flex flex-col w-96">
            <p className="text-lg font-medium mb-2">Vælg stand</p>
            <div className="flex flex-wrap gap-2 pb-4">
              <ToggleFilter title="Helt ny" />
              <ToggleFilter title="God, men brugt" />
              <ToggleFilter title="Slidt" />
              <ToggleFilter title="Skrevet i" />
            </div>
          </div>
          {/* <BigButton color="green" content="Filtrer bøger" /> */}
          <BigButton
            click={clearFilter}
            color="grey"
            content="Nulstil filtre"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
