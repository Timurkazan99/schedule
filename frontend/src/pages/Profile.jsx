import React, {useContext, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {Context} from "../components/ContextProvider.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import MyShifts from "../components/MyShifts.jsx";


const Profile = () => {
  const {logined: {id}, device, isAdmin} = useContext(Context);
  const [myShifts, setMyShifts] = useState([]);

  return (
    <Container>
      <Card className="shadow">
        <Card.Body>
          <ProfileForm isMobile={device.isMobile} userId={id} setMyShifts={setMyShifts}/>
        </Card.Body>
        <MyShifts shifts={myShifts} isAdmin={isAdmin} isMobile={device.isMobile}/>
      </Card>
    </Container>
  );
};

export default Profile;