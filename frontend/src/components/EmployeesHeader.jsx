import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {onShow} from "../store/reducers/UiSlice";
import {getUsers} from "../store/selectors";
import useDebounce from "../hooks/useDebounce";
import {useDispatch, useSelector} from "react-redux";
import Field from "./common/Field.jsx";
import {useTranslation} from "react-i18next";

const EmployeesHeader = ({isAdmin, setResults}) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  useEffect(() => {
    setResults(users);
  }, [users])

  useEffect(() => {
      if (debouncedSearchTerm) {
        const filtredUsers = users.filter(({name}) => name.toLowerCase().match(debouncedSearchTerm.toLowerCase()));
        setResults(filtredUsers);
      } else {
        setResults(users);
      }
    },
    [debouncedSearchTerm]
  );

  const onClick = () => dispatch(onShow('addUser'));

  return (
    <>
      <Field
        label={t('find')}
        className="me-2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        isAdmin &&
          <Button
            onClick={onClick}
          >
            {t('add')}
          </Button>
      }
    </>
  );
};

export default EmployeesHeader;