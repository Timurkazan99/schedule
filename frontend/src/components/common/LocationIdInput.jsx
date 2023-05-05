import React, {useState, useEffect} from 'react';
import {FloatingLabel, Form} from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import {useTranslation} from "react-i18next";

const LocationIdInput = ({selectedLocation, setSelectedLocation, locations}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(locations);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  useEffect(() => {
      if (debouncedSearchTerm) {
        const filtredLocations = locations.filter(({name}) => name.toLowerCase().match(debouncedSearchTerm.toLowerCase()));
        setResults(filtredLocations);
      } else {
        setResults(locations);
      }
    },
    [debouncedSearchTerm]
  );

  return (
    <>
        {
          (selectedLocation.length > 0) && (
            <div className="tags-input mb-2">
              <ul id="tags">
                {selectedLocation.map(({name, id}, i) => (
                  <li key={i} className="tag">
                    <span className='tag-title'>
                      {name}
                    </span>
                    <span
                      className='tag-close-icon'
                      onClick={() => setSelectedLocation(selectedLocation.filter((location) => location.id !== id))}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        <FloatingLabel label={t('location')}>
          <Form.Control
            name='selectedLocation'
            aria-autocomplete='none'
            autoComplete='off'
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              if (!isHover){
                setIsFocus(false)
              }
            }}
          />
        </FloatingLabel>
        {
          isFocus && (
            <div
              className="shadow"
              style={{maxHeight: '250px', overflowY: 'auto'}}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {
                results.map((location) => (
                  <div
                    key={location.id}
                    className="suggestion"
                    onClick={() => {
                      setSelectedLocation([...selectedLocation, location])
                    }}
                  >
                    <span>{location.name}</span>
                  </div>
                ))
              }
            </div>
          )
        }
    </>
  );
};

export default LocationIdInput;