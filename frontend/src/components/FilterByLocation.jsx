import React from 'react';
import FilterItem from "./FilterItem.jsx";

const FilterByLocation = ({locations}) => {
  return (
    <>
      <ul>
        {locations.map((location) => (
            <FilterItem
              key={location.id}
              name={location.name}
              filterName="location"
              id={location.id}
              color={location.color}
            />
          )
        )}
      </ul>
    </>
  );
};

export default FilterByLocation;