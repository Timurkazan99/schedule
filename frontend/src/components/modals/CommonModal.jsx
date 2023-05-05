import React from 'react';
import {Modal} from "react-bootstrap";
import {onHide} from "../../store/reducers/UiSlice";
import {useDispatch, useSelector} from "react-redux";
import FormEmployee from "./FormEmployee.jsx";
import FormLocation from "./FormLocation.jsx";
import FormTemplate from "./FormTemplate.jsx";
import FormShift from "./FormShift.jsx";
import CommonFooter from "./CommonFooter.jsx";
import InfoFooter from "./InfoFooter.jsx";
import DownloadSchedule from "./DownloadSchedule.jsx";
import DownloadAttendance from "./DownloadAttendance.jsx";
import DownloadFooter from "./DownloadFooter.jsx";
import FormAttendance from "./FormAttendance.jsx";
import {useTranslation} from "react-i18next";

const modalMap = {
  'addUser': {
    Component: FormEmployee,
    Footer: () => (<CommonFooter nameButton="add"/>),
  },
  'editUser': {
    Component: () => (<FormEmployee edit/>),
    Footer: () => (<CommonFooter delButton={true} nameButton="edit" />),
  },
  'addLocation': {
    Component: FormLocation,
    Footer: () => (<CommonFooter nameButton="add" />),
  },
  'editLocation': {
    Component: () => (<FormLocation edit/>),
    Footer: () => (<CommonFooter delButton={true} nameButton="edit" />),
  },
  'addTemplate': {
    Component: FormTemplate,
    Footer: () => (<CommonFooter nameButton="add" />),
  },
  'editTemplate': {
    Component: () => (<FormTemplate edit/>),
    Footer: () => (<CommonFooter delButton={true} nameButton="edit" />),
  },
  'infoTemplate': {
    Component: () => (<FormTemplate edit fixed/>),
    Footer: () => (<InfoFooter type='template'/>),
  },
  'createShift': {
    Component: FormShift,
    Footer: () => (<CommonFooter nameButton="add" />),
  },
  'editShift': {
    Component: () => (<FormShift edit/>),
    Footer: () => (<CommonFooter delButton={true} nameButton="edit" freeShiftBtn={true} />),
  },
  'infoShift': {
    Component: () => (<FormShift edit fixed/>),
    Footer: () => (<InfoFooter type='shift'/>),
  },
  'downloadSchedule': {
    Component: () => (<DownloadSchedule/>),
    Footer: DownloadFooter,
  },
  'downloadAttendance': {
    Component: () => (<DownloadAttendance/>),
    Footer: () => (<CommonFooter nameButton="download" />),
  },
  'changePeriod': {
    Component: () => (<FormAttendance/>),
    Footer: () => (<CommonFooter nameButton="calculate" />),
  }
};

const defModal = {
  Component: () => (<></>),
  Footer: () => (<></>)
}

const CommonModal = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date.selected);
  const modalName = useSelector((state) => state.ui.modalName);
  const {Component, Footer } = modalMap[modalName] ?? defModal;
  const { t } = useTranslation('translation', { keyPrefix: 'modal'});

  return (
    <Modal
      show={modalName !== ''}
      onHide={() => dispatch(onHide())}
      centered
    >
      <Modal.Header closeButton>
        <h5>{t(modalName, {date})}</h5>
      </Modal.Header>
      <Modal.Body>
        <Component />
      </Modal.Body>
      <Modal.Footer>
        <Footer />
      </Modal.Footer>
    </Modal>
  );
};

export default CommonModal;