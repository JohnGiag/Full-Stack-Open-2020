import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      Seacrh: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
