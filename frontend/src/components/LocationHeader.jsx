import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onShow} from "../store/reducers/UiSlice";
import useDebounce from "../hooks/useDebounce";
import {getLocation} from "../store/selectors";
import Field from "./common/Field.jsx";
import {useTranslation} from "react-i18next";

const LocationHeader = ({isAdmin, setResults}) => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const onClick = () => dispatch(onShow('addLocation'));
  const { t } = useTranslation('translation', { keyPrefix: 'locations'})

  useEffect(() => {
    setResults(locations);
  }, [locations])

  useEffect(() => {
      if (debouncedSearchTerm) {
        const filtredUsers = locations.filter(({name}) => name.toLowerCase().match(debouncedSearchTerm.toLowerCase()));
        setResults(filtredUsers);
      } else {
        setResults(locations);
      }
    },
    [debouncedSearchTerm]
  );

  return (
    <>
      <Field
        label={t('find')}
        className="me-2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        isAdmin &&
        <Button onClick={onClick}>
          {t('add')}
        </Button>
      }
    </>
  );
};

export default LocationHeader;