import React from 'react';
import {addFilter, delFilter} from '../store/reducers/UiSlice'
import {useDispatch} from "react-redux";
import {Form} from "react-bootstrap";
import getFontColor from "../utils/getFontColor";

const FilterItem = (props) => {
  const dispatch = useDispatch();
  const fontColor = getFontColor(props.color);

  const onChange = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(props.id));
    } else {
      dispatch(delFilter(props.id));
    }
  };

  return (
    <li>
      <div className='filter-item' style={{background: props.color, color: fontColor}}>
        <Form.Label className="d-flex">
          <Form.Check type="checkbox" onChange={onChange}/>
          <span className="ms-1" style={{fontSize: '14px', whiteSpace: 'nowrap'}}>{props.name}</span>
        </Form.Label>
      </div>
      {props.children}
    </li>
  );
};

export default FilterItem;