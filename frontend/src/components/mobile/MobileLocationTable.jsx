import React, {useContext}  from 'react';
import {batch, useDispatch, useSelector} from "react-redux";
import {Context} from "../ContextProvider.jsx";
import {getTemplates, getUserById,} from "../../store/selectors";
import {onShow} from "../../store/reducers/UiSlice";
import {Accordion, Button} from "react-bootstrap";
import {actions as templateAction} from "../../store/reducers/TemplateSlice";
import {actions as locationAction} from "../../store/reducers/LocationSlice";
import CustomToggle from "../common/CustomToggle.jsx";
import CustomButton from "../common/CustomButton.jsx";
import {useTranslation} from "react-i18next";

const MobileLocationTable = ({locations}) => {
  const dispatch = useDispatch();
  const {logined: {isAdmin, id}} = useContext(Context);
  const user = useSelector(state => getUserById(state, id));
  const templates = useSelector(getTemplates);
  const isActive = (locationId) => isAdmin && user && user?.locations?.includes(locationId);
  const { t } = useTranslation('translation', { keyPrefix: 'locations'});

  const onClick = (name, template = null, location = null) => {
    batch(() => {
      dispatch(templateAction.setSelected(template));
      dispatch(locationAction.setSelected(location));
      dispatch(onShow(name));
    });
  };

  return (
    <Accordion>
      {locations.map((location) => (
        <Accordion.Item
          eventKey={location.id}
          key={location.id}
        >
          <Accordion.Header
            as={() => (
              <CustomToggle eventKey={location.id}>
                <span>{location.name}</span>
                {
                  isActive(location.id) &&
                    <CustomButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onClick('editLocation', null, location.id)
                      }}
                      icon='edit'
                    />
                }
              </CustomToggle>
            )}
          />
          <Accordion.Body style={{whiteSpace: 'pre-wrap'}}>
            <span>{t('description', location.name)}</span>
            <div className="d-flex">
              <span>{t('colorLabel')}</span><div style={{background: location.color, borderRadius: '50%', height: '20px', width: '20px', marginLeft: '4px'}}/>
            </div>
            <div className="d-flex">
              <span>{t('template')}</span>
              {
                isActive(location.id) &&
                  <CustomButton
                    onClick={() => onClick('addTemplate', null, location.id)}
                    icon='create' style={{marginTop: '.125em'}}
                  />
              }
            </div>
            <div className="d-flex mt-2">
              {templates.filter((template) => template.locationId === location.id).map((template) => {
                const modal = isActive(location.id) ? 'editTemplate' : 'infoTemplate'
                return (
                  <Button
                    key={template.id}
                    className="me-2"
                    style={{background: location.color}}
                    onClick={() => onClick(modal, template.id, location.id)}
                  >
                    {template.name}
                  </Button>
                )
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MobileLocationTable;