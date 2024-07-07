import React,{useEffect} from 'react'
import { Alert,Container,Card,Button,Row,Col } from 'react-bootstrap'
import Logo from './rooms1.png'
import Logo1 from './Inventory.png'
import Logo2 from './Maintaince.png'
import Logo3 from './Student.png'
import Logo4 from './due.jpg'
import Logo5 from './ktch.jpg'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  let nav=useNavigate();
  function tst() {
    toast.success('Login Success!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  // useEffect(() => {
  //   tst()
  // }, [])
  
  return (
    <div>
       <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
        <Container>
            <br />
        <Alert variant="success">
      <Alert.Heading>Welcome, nice to see you</Alert.Heading>
      <p>
        Utlize this software to it's max potentional. This Web site can help you in keeping your reocrds safe and access across the authorized users.
      </p>
      <hr />
      <p className="mb-0">
        This website is made user to friendly. 
      </p>
    </Alert>
    <h3>Accessibility </h3>
    <hr />
    <Row>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo} height='210px'/>
      <Card.Body>
        <Card.Title>Rooms</Card.Title>
        <Card.Text>
          Vist here to manage the rooms and its contents like vacency, Capacity and also add new Rooms
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/AddRooms')}}>Check Rooms</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo1} />
      <Card.Body>
        <Card.Title>Manage Inventory</Card.Title>
        <Card.Text>
          Vist here to manage the Inventory and its contents like add reocrds, Capacity and also add new items
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/Inventory')}}>Check Inventory</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo2} height='170px'/>
      <Card.Body>
        <Card.Title>Mainataince Records</Card.Title>
        <Card.Text>
          Vist here to manage the Mainataince Records and its contents like add records,update,delete theam and also keep track of maintaince
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/maintaince')}}>Check Maintaince</Button>
      </Card.Body>
    </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo3} height='170px'/>
      <Card.Body>
        <Card.Title>Add Students</Card.Title>
        <Card.Text>
          This Can be helpful to manage the students by adding students information directly to DataBase.Student Info Can be stored and managed easily 
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/StudentsAdd')}}>Check Students</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo4} height='190px'/>
      <Card.Body>
        <Card.Title>Due Finder</Card.Title>
        <Card.Text>
          This Can be helpful to manage the students Due by showing the dues of students information directly from the DataBase
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/AllStudents')}}>Check Due Finder</Button>
      </Card.Body>
    </Card>
      </Col>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Logo5} height='190px'/>
      <Card.Body>
        <Card.Title>Kitchen Inventory</Card.Title>
        <Card.Text>
          Manage kitchen inventory from here .This can help in and lead to maintain the better records about the usage of the ingredients.
        </Card.Text>
        <Button variant="primary" onClick={()=>{nav('/kitchen')}}>Check Kitchen</Button>
      </Card.Body>
    </Card>
      </Col>
    </Row>
    </Container>
    </div>
  )
}

export default Home