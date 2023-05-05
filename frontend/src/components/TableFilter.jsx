import React, {useEffect, useState} from 'react';
import FilterByLocation from "./FilterByLocation.jsx";
import {Card} from "react-bootstrap";
import {updateFilter} from '../store/reducers/UiSlice'
import useDebounce from "../hooks/useDebounce";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../store/selectors";
import "../styles/filter.scss"
import Field from "./common/Field.jsx";
import {useTranslation} from "react-i18next";


const TableFilter = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(locations);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'})

  useEffect(() => {
    setResults(locations);
  }, [locations])

  useEffect(() => {
      if (debouncedSearchTerm) {
        const filtredLocations = locations.filter(({name}) => name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase()));
        setResults(filtredLocations);
      } else {
        setResults(locations);
      }
      dispatch(updateFilter(results.map(({id}) => id)));
    },
    [debouncedSearchTerm]
  );

  return (
    <div className="filter">
      <Card className="shadow h-100">
        <Card.Header>
          <Field
            label={t('locationName')}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Card.Header>
        <Card.Body className="h-100" style={{overflowY: 'auto'}}>
          <FilterByLocation locations={results}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TableFilter;