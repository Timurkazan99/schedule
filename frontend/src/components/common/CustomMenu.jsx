import React from 'react';
import FilterByLocation from "../FilterByLocation.jsx";
import {useSelector} from "react-redux";
import {getLocation} from "../../store/selectors";

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const locations = useSelector(getLocation);
    return (
      <div
        ref={ref}
        style={{...style, paddingLeft: '2px', paddingRight: '2px', overflowY: 'auto', minHeight: '0px', maxHeight: '250px'}}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FilterByLocation locations={locations} />
      </div>
    );
  },
);

export default CustomMenu;