import React from "react";
import { useState } from "react";
import Breadcrum from "../Breadcrum";
import ToggleFilter from "../ToggleFilter";
import BigButton from "../BigButton";

const FilterModal = ({ redirect, onFilterChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onFilterChange({ [name]: value });
  };

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div>
      <div className="animate-up fixed inset-0 flex flex-col bg-white bg-opacity-100">
        <div className="flex w-full relative justify-center">
          <Breadcrum title="Filter" destination={redirect} />
        </div>
        <div className="flex flex-col justify-start items-center gap-4 pt-10">
          <div className="flex flex-col w-80">
            <label htmlFor="" className="text-lg font-medium">
              Sorter efter
            </label>
            <select
              onChange={handleInputChange}
              name="sort"
              className="border border-oldman rounded h-10"
            >
              <option value="highToLow">Pris: lav til høj</option>
              <option value="lowToHigh">Pris: høj til lav</option>
            </select>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="" className="text-lg font-medium">
              Vælg uddannelse
            </label>
            <input
              onChange={handleInputChange}
              name="major"
              type="text"
              placeholder="Indtast uddannelse"
              list="majors"
              className="border-b-2 outline-none border-oldman rounded h-10"
            />
            <datalist id="majors">
              <option value="multimedie" />
              <option value="islam" />
              <option value="kristendom" />
            </datalist>
          </div>
          <div className="flex flex-col w-80">
            <p>Vælg semester</p>
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
          <div className="flex flex-col w-80">
            <p>Vælg stand</p>
            <div className="flex flex-wrap gap-2 pb-14">
              <ToggleFilter title="Helt ny" />
              <ToggleFilter title="God, men brugt" />
              <ToggleFilter title="Slidt" />
              <ToggleFilter title="Skrevet i" />
            </div>
          </div>
          <BigButton color="green" content="Filtrer bøger" />
          <BigButton color="grey" content="Nulstil filtre" />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
