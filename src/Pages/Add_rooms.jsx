// import {FloatingLabel,Form,Row,Col,Button} from 'react-bootstrap'
// import image from './roomsadd.jpg'
// import './styles.css'
// import db from '../firebase';
// import { collection,addDoc} from 'firebase/firestore';
// import React, { useState } from "react";

// const Add_rooms = () => {
//     const [Block,setBlock]=useState();
//     const [Floor,setFloor]=useState();
//     const [Room,setRoom]=useState();
//     const [Cap,setCap]=useState();
//     const collref=collection(db,'Rooms')

//    const  myStyle={
//     backgroundImage: `url(${image})`,
//     height:'100vh',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     };

// const submit = (e) => {
//     e.preventDefault();
//     addDoc(collref,{Block,Floor,Room,Capacity:Cap})
//     .then(res=>console.log(res))
//     .catch(err=>console.log(err))
//     setBlock("");
//     setCap(0);
//     setRoom(0)
//     setFloor("")
//   };


//   return (
//     <div>
//         <div className='gd'>
//     <Row>
//         <Col>
//     <FloatingLabel
//         controlId="floatingInput"
//         label="Block"
//         className="mb-3"
//       >
//         <Form.Control type="email" placeholder="name@example.com" />
//       </FloatingLabel>
//       </Col>
//       <Col>
//       <FloatingLabel controlId="floatingPassword" label="Floor">
//         <Form.Control type="text" placeholder="Password" />
//       </FloatingLabel>
//       </Col>
//       </Row>
//       <Row>
//       <Col>
//       <FloatingLabel controlId="floatingPassword" label="Room Number">
//         <Form.Control type="Number" placeholder="Password" />
//       </FloatingLabel>
//       </Col>
//       <Col>
//       <FloatingLabel controlId="floatingPassword" label="Capacity">
//         <Form.Control type="number" placeholder="Password" />
//       </FloatingLabel>
//       </Col>
//       </Row>
//       <br />
// <center><Button className='justify-content-center' onClick={submit}>Add Room</Button></center>
//     </div>
//     </div>
//   )
// }

// export default Add_rooms

import { addDoc, collection, doc,getDocs,deleteDoc,getDoc,where, query,onSnapshot ,setDoc} from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { DataBase, RealtimeDB } from '../FirebaseInit';
import {Card,Row,Col,Form,FloatingLabel,Container,Button,Modal,Nav,Alert} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import room from "../img/room.gif";
import { child, get, ref,set } from 'firebase/database';


const Add_rooms = () => {
    const [Block,setBlock]=useState('');
  const [chg, setchg] = useState(true);

    const [Floor,setFloor]=useState('');
    const [Room,setRoom]=useState('');
    const [Cap,setCap]=useState();
    const [Data,setData]=useState([]);
    const [uData,setUdata]=useState([]);
    const colref=collection(DataBase,'Rooms');
    const [modalShow, setModalShow] = useState(false);
    let id=Block+Floor+Room

    async function submit(e){
      e.preventDefault();
      const refs="Rooms/"
      set(ref(RealtimeDB,refs+id),{Block,Floor,Room,Cap:parseInt(Cap),Vac:parseInt(Cap)})
      .then(tst('Saved Successfully'))
      .catch(e=>tst(e))
    }
//   async function submit(e) {
//     e.preventDefault()
//           const q = query(collection(DataBase, 'Rooms'), where('Room', "==",Room),where('Block', "==",Block),where('Floor', "==",Floor),);
//     const querySnapshot = await getDocs(q);
//     if(querySnapshot.size){
//         dng('Room Exist Alredy')
//     } else{
//         add()
//     }
// }

// async function add() {
//     const docRef = await setDoc(doc(colref,id), {Block,Floor,Room,Cap:parseInt(Cap),Vac:parseInt(Cap)},id);
//     // const docRef=colref.doc(id).set({ Block,Floor,Room,Cap:parseInt(Cap),Vac:parseInt(Cap)})
//       tst('Room Added')
//       roomdata()
// }

    function tst(e) {
      toast.success(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    function dng(e) {
      toast.error(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    //Room Info
    async function info(id) {
      const docRef = doc(DataBase, "Rooms",id);
      const docSnap = await getDoc(docRef);
      setUdata(docSnap.data());
      }

    function Del(id) {
      const delref=doc(DataBase,'Rooms',id)
      deleteDoc(delref)
      .then(e=>{
        dng('Room Deleted')
        roomdata()
      })
      .catch(err=>console.log(err.message))
     }

     //getData For Rooms
     useEffect(() => {
       return async() => {
        roomdata()
       }
     }, [])

     //Room Fetching
     async function roomdata(e) {

      try {
        const roomsRef = collection(DataBase, 'Rooms');
        const snapshot = await getDocs(roomsRef);
        if (!snapshot.empty) {
          const roomsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() // Spread operator to include all document fields
          }));
          setData(roomsData);
          console.log(roomsData); // Set the state with fetched data
        } else {
          console.log('No rooms found in Firestore.'); // Handle the case with no data
        }
      } catch (error) {
        console.error('Error fetching room data:', error); // Handle errors
      }

      
      // get(ref(RealtimeDB,'Rooms/')).then(
      //   (snapshot)=>{
      //     if(snapshot.exists()){
      //       console.log(snapshot.val())
      //       snapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
      //       // const movs=snapshot.val().map(doc=>({
      //       //                 data:doc.data(),
      //       //                 id:doc.id,
      //       //               }))
      //                     // setData(snapshot)
      //     }
      //   }
      //   )
      }
    //     const q = query(colref);
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //     const movs=querySnapshot.docs.map(doc=>({
    //               data:doc.data(),
    //               id:doc.id,
    //             }))
    //             setData(movs)
    //     });
     
     function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
           <h3>Room Information</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5> Block: {uData.Block}  || Floor: {uData.Floor} || Room: {uData.Room}</h5>
            <hr width='50%'/>
            <h6> Capacity: {uData.Cap}  || 
             Vacency: {uData.Vac}</h6> <br />
            <h5>Room Mates:</h5>
            <hr/>
            <p>

            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }    

  return (
<div className=' m-5'>
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
    <Container className=''>
    <Nav fill   variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="#" onClick={()=>{setchg(true)}}>Add Rooms</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="#1" onClick={()=>{setchg(false)}}>View Rooms</Nav.Link>
      </Nav.Item>
    </Nav>
      {chg ?<>
        <Container className='p-5'>
    <div>
    <h1>Add Rooms 🚪</h1>
        <hr width='50%'/>
        <Row md={2} className="justify-content-sm-center">
          <Col md={6}>
        <FloatingLabel controlId="floatingPassword" label="Block" className='m-2'>
        <Form.Control type="number" placeholder="Block" value={Block} onChange={e=>setBlock(e.target.value)}/>
      </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Floor" className='m-2'> 
        <Form.Control type="number" placeholder="Password" value={Floor} onChange={e=>setFloor(e.target.value.toString())}/>
      </FloatingLabel>
        {/* <br /> */}
        <FloatingLabel controlId="floatingPassword" label="Room" className='m-2'>
        <Form.Control type="number" placeholder="Password" value={Room} onChange={e=>setRoom(e.target.value.toString())}/>
      </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Capacity" className='m-2'>
        <Form.Control type="number" placeholder="Password" value={Cap} onChange={e=>setCap(e.target.value.toString())}/>
      </FloatingLabel> <br />
      <Alert variant='warning'>Note: If Room Alredy Exist the System Will Update the Data</Alert>
      </Col>
      <Col><img src={room} alt="" style={{height:'50vh',width:'100%'}}/></Col>
      </Row>
      {/* <br /> */}
      {/* <center>  <Button onClick={chkref}>Add room</Button></center> */}
      {/* <center>  <Button onClick={s}>Create</Button></center> */}
      <center>  <Button onClick={submit}>Create</Button></center>

    </div></Container>
      </>:<>
      <Row md={3} xs={1} sm={1} className="m-4">
       {Data.map(e=>
       <Col key={e.id}><Card border="warning" style={{ width: '20rem',marginRight:'1rem' }} md={6} xs={12}>
       <Card.Header style={{backgroundColor:'#F7ECDE'}}>Block: {e.Block}</Card.Header>
       <Card.Body>
         <Card.Title>Room No: {e.Room}</Card.Title>
         <Card.Text>
           Floor : {e.Floor} <br /> 
           Capacity : {e.Cap} <br />
           <br />
           <Button variant='outline-warning'  onClick={() => {
            setModalShow(true)
            info(e.id);
          }}>Visit Room</Button> &nbsp;&nbsp;&nbsp;
           {/* <Button variant='outline-info' onClick={(e)=>{
            setId(e.id)
            setCap(e.data.Cap)
            setFloor(e.data.Floor)
            setRoom(e.data.Room)

           }}>Edit Room</Button>&nbsp;&nbsp;&nbsp; */}
           <Button variant='outline-danger' onClick={()=>{Del(e.id)}}>Delete Room</Button>
         </Card.Text>
       </Card.Body>
     </Card> <br /></Col>
        )}
        </Row>
      </>}
    </Container>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Add_rooms;


{/* <div>
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
  <h1>Add Rooms 🚪</h1>
  <hr width='50%'/>
  <Row md={2} className="justify-content-sm-center">
  <Col>
  <FloatingLabel controlId="floatingPassword" label="Block">
  <Form.Control type="text" placeholder="Block" value={Block} onChange={e=>setBlock(e.target.value)}/>
</FloatingLabel>
</Col>
<Col>
  <FloatingLabel controlId="floatingPassword" label="Floor">
  <Form.Control type="text" placeholder="Password" value={Floor} onChange={e=>setFloor(e.target.value.toString())}/>
</FloatingLabel>
</Col>
  </Row>
  <br />
  <Row>
  <Col>
  <FloatingLabel controlId="floatingPassword" label="Room">
  <Form.Control type="text" placeholder="Password" value={Room} onChange={e=>setRoom(e.target.value.toString())}/>
</FloatingLabel>
</Col>
<Col>
  <FloatingLabel controlId="floatingPassword" label="Capacity">
  <Form.Control type="text" placeholder="Password" value={Cap} onChange={e=>setCap(e.target.value.toString())}/>
</FloatingLabel>
</Col>
</Row>
<br />
{/* <center>  <Button onClick={chkref}>Add room</Button></center> */}
{/* <center>  <Button onClick={submit}>Create</Button></center>
  <br />
  <h1>All Rooms 🛋️</h1>
<hr />
  <Row md={3} xs={1} sm={1}>
 {Data.map(e=>
 <Col key={e.id}><Card border="warning" style={{ width: '20rem',marginRight:'1rem' }} md={6} xs={12}>
 <Card.Header style={{backgroundColor:'#F7ECDE'}}>Block: {e.data.Block}</Card.Header>
 <Card.Body>
   <Card.Title>Room No: {e.data.Room}</Card.Title>
   <Card.Text>
     Floor : {e.data.Floor} <br /> 
     Capacity : {e.data.Cap} <br />
     <br />
     <Button variant='outline-warning'  onClick={() => {
      setModalShow(true)
      info(e.id);
    }}>Visit Room</Button> &nbsp;&nbsp;&nbsp; */}
     {/* <Button variant='outline-info' onClick={(e)=>{
      setId(e.id)
      setCap(e.data.Cap)
      setFloor(e.data.Floor)
      setRoom(e.data.Room)

     }}>Edit Room</Button>&nbsp;&nbsp;&nbsp; */}
//      <Button variant='outline-danger' onClick={()=>{Del(e.id)}}>Delete Room</Button>
//    </Card.Text>
//  </Card.Body>
// </Card> <br /></Col>
//   )}
//   </Row>
//   </Container>
//   <MyVerticallyCenteredModal
//   show={modalShow}
//   onHide={() => setModalShow(false)}
// />
// </div> */}