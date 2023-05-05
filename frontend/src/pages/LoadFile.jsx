import React, {useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {uploadFile} from "../http/shiftApi";
import UploadShiftForm from "../components/UploadShiftForm.jsx";

const LoadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [shifts, setShifts] = useState(null);

  return (
    <Card>
      <Card.Header
        className="d-flex"
      >
        <Form.Control
          type="file"
          accept=".xlsx"
          onChange={({target}) => setSelectedFile(target.files[0])}
        />
        <Button
          onClick={async () => {
            const {result} = await uploadFile(selectedFile);
            setShifts(result);
          }}
        >
          Загрузить
        </Button>
      </Card.Header>
      <Card.Body>
        {
          shifts && shifts.map((shift) => (
            <UploadShiftForm shift={shift}/>
          ))
        }
      </Card.Body>
    </Card>
  );
};

export default LoadFile;