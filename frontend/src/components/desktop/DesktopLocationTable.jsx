import React, {useContext} from 'react';
import {Button, Table} from "react-bootstrap";
import {batch, useDispatch, useSelector} from "react-redux";
import {getTemplates, getUserById,} from "../../store/selectors";
import {actions as templateAction} from "../../store/reducers/TemplateSlice";
import {actions as locationAction} from "../../store/reducers/LocationSlice";
import {onShow} from "../../store/reducers/UiSlice";
import {Context} from "../ContextProvider.jsx";
import {useTranslation} from "react-i18next";

const DesktopLocationTable = ({locations}) => {
  const dispatch = useDispatch();
  const {logined: {isAdmin, id}} = useContext(Context);
  const user = useSelector(state => getUserById(state, id));
  const templates = useSelector(getTemplates);
  const isActive = (locationId) => isAdmin && user && (user?.locations?.includes(locationId) || user?.locations === null);
  const { t } = useTranslation('translation', { keyPrefix: 'locations'});

  const onClick = (name, template = null, location = null) => {
    batch(() => {
      dispatch(templateAction.setSelected(template));
      dispatch(locationAction.setSelected(location));
      dispatch(onShow(name));
    });
  };

  return (
    <Table hover>
      <thead>
      <tr>
        <th>{t('nameLabel')}</th>
        <th>{t('colorLabel')}</th>
        <th>{t('addressLabel')}</th>
        <th>{t('templateLabel')}</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {locations.map((location) => (
        <tr
          key={location.id}
        >
          <td>{location.name}</td>
          <td><div className="colorSample" style={{background: location.color}}></div></td>
          <td>{location.address}</td>
          <td>
            {templates.filter((template) => template.locationId === location.id).map((template) => {
              const modal = isActive(location.id) ? 'editTemplate' : 'infoTemplate';
              return (
                <Button
                  key={template.id}
                  className="me-2"
                  style={{background: location.color}}
                  onClick={() => onClick(modal, template.id, location.id)}
                >
                  {template.name}
                </Button>)
            }
            )}
          </td>
          <td>
            {
              isActive(location.id) &&
                <Button
                  onClick={() => onClick('addTemplate', null, location.id)}
                >
                  {t('addTemplate')}
                </Button>
            }
          </td>
          <td>
            {
              isActive(location.id) &&
                <Button
                  onClick={() => onClick('editLocation', null, location.id)}
                >
                  {t('edit')}
                </Button>
            }
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default DesktopLocationTable;