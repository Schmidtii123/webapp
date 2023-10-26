import React from "react";

const FilterModal = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    props.onFilterChange({ [name]: value });
  };
  return (
    <div className="pt-20 w-screen">
      <div className="flex w-full relative justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute  left-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p className="text-lg font-bold">Filter</p>
      </div>
      <div className="flex flex-col w-80 m-auto">
        <label htmlFor="">Sorter efter</label>
        <select onChange={handleInputChange} name="sort">
          <option value="highToLow">Pris: lav til høj</option>
          <option value="lowToHigh">Pris: høj til lav</option>
        </select>
        <label htmlFor="">Vælg uddannelse</label>
        <input type="text" placeholder="Indtast uddannelse" list="majors" />
        <datalist id="majors">
          <option value="multimedie" />
          <option value="islam" />
          <option value="kristendom" />
        </datalist>
      </div>
      <div>
        <p>Semester</p>
      </div>
    </div>
  );
};

export default FilterModal;
