import React, { useState, useEffect } from "react";

const SearchBar = ({ søgeFunktion }) => {
  return (
    <input
      type="text"
      id="search"
      placeholder="Søg"
      className="bg-gray-200 pl-10 h-7 rounded-full w-full"
      onChange={(e) => søgeFunktion(e)}
    />
  );
};

export default SearchBar;
