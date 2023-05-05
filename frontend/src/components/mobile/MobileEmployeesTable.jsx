import React, {useContext} from 'react';
import {batch, useDispatch} from "react-redux";
import {Accordion} from "react-bootstrap";
import {Context} from "../ContextProvider.jsx";
import {actions as userActions} from "../../store/reducers/UserSlice";
import {onShow} from "../../store/reducers/UiSlice";
import CustomToggle from "../common/CustomToggle.jsx";
import CustomButton from "../common/CustomButton.jsx";
import {useTranslation} from "react-i18next";


const MobileEmployeesTable = ({users}) => {
  const dispatch = useDispatch();
  const {logined: {isAdmin}} = useContext(Context);
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  const onClick = (e, user) => {
    e.stopPropagation()
    batch(() => {
      dispatch(userActions.setSelected(user));
      dispatch(onShow( 'editUser'));
    })
  };

  return (
    <Accordion>
      {users.map((user) => (
        <Accordion.Item
          key={user.id}
          eventKey={user.id}
        >
          <Accordion.Header
            as={() => (
              <CustomToggle eventKey={user.id}>
                <span>{user.name} {user.surname}</span>
                {
                  isAdmin &&
                    <CustomButton
                      onClick={(e) => onClick(e, user.id)}
                      icon='edit'
                    />
                }
              </CustomToggle>
            )}
          />
          <Accordion.Body style={{whiteSpace: 'pre-wrap'}}>
            {t('description', user)}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};



export default MobileEmployeesTable;