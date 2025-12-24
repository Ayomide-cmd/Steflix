
import React from "react";
import "./FilterGroup.css";

const FilterGroup = ({ minRating, onFilter }) => {
  // ✅ Only show these options
  const ratings = [6, 7, 8];

  return (
    <ul className="movie_filter">
      {ratings.map((rate) => (
        <li
          key={rate}
          className={`movie_filter_item ${minRating === rate ? "active" : ""}`}
          onClick={() => onFilter(rate)}
        >
          {rate}+
        </li>
      ))}
    </ul>
  );
};

export default FilterGroup;
