// import { query,addDoc, collection,where,getDocs, doc,getDoc,setDoc, updateDoc,increment} from 'firebase/firestore';
// import React,{useState} from 'react'
// import { FloatingLabel,Form,Row,Col,Container,Button } from 'react-bootstrap';
// import { DataBase } from '../FirebaseInit';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const StudentsAdd = () => {
//     const [Regno,setRegno]=useState();
//     const [Name,setName]=useState();
//     const [Fname,setFname]=useState();
//     const [Mname,setMname]=useState();
//     const [Ystd,setYstd]=useState();
//     const [Branch,setBranch]=useState();
//     const [Sphn,setSphn]=useState();
//     const [Phn,setPhn]=useState();
//     const [Gphn,setGphn]=useState();
//     const [Block,setBlock]=useState();
//     const [Floor,setFloor]=useState('');
//     const [Room,setRoom]=useState('');
//     const [Fee,setFee]=useState();
//     const colref=collection(DataBase,'Students');
//     const[uDat,setUdat]=useState([]);
//     let id=Block+Room+Floor

//     function tst(e) {
//       toast.success(e, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });
//     }

//     function dng(e) {
//       toast.error(e, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });
//     }
//     async function ra() {
//       const docRef = doc(DataBase, "Rooms", id);
//       const docSnap = await getDoc(docRef);
//       let r=docSnap.data().Vac
//     const colref=collection(DataBase,'Students');
//       if(r){
//         const f = await setDoc(doc(colref,Regno), {Regno,Name})
//         .then(tst('Student Added Sucessfully')).catch(err=>dng(err))
//         const data = {Vac: increment(-1)};
//         updateDoc(docRef, data).then(e => {
//           console.log(e.data());
//         })
//         .catch(error => {
//             console.log(error);
//         })
//       }
//       else{
//         alert('Room Filled')
//       }
//     }
//     //     async function add(e){
//     //   // e.preventDefault();
//     //   // // if()
//     //   //   addDoc(colref,{Regno,Name,Fname,Mname,Ystd,Branch,Sphn,Phn,Gphn,Block,Room,Fee,Due:Fee})
//     //   //   .then(tst('Success'))
//     //   //   .catch(err=>dng(err))
//     //   //   setBlock('')
//     //   //   setFname('')
//     //   //   setBranch('')
//     //   //   setGphn('')
//     //   //   setMname('')
//     //   //   setName('')
//     //   //   setRegno('')
//     //   //   setRoom('')
//     //   //   setFee('')
//     // const docRef = await setDoc(doc(colref,Regno), {Regno,Name,Fname,Mname,Ystd,Branch,Sphn,Phn,Gphn,Block,Room,Fee:parseInt(Fee),Due:parseInt(Fee)})
//     // .then(tst('Student Added Sucessfully')).catch(err=>dng(err))
//     // }

//   return (
//     <div>
//       <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       />
//         <Container>
//             <br />
//             <h1>Add Students 📚</h1>
//             <hr width='50%'/>
//         <Row sm={1} md={2} xs={1}>
//             <Col>
//         <FloatingLabel controlId="floatingInput" label="Reg.No" className="mb-3">
//         <Form.Control type="text" placeholder="name@example.com" onChange={e=>setRegno(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//       <Col>
//       <FloatingLabel controlId="floatingPassword" label="Name" className="mb-3">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setName(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//         <Col>
//         <FloatingLabel controlId="floatingPassword" label="Father Name" className="mb-3">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setFname(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//       <Col>
//         <FloatingLabel controlId="floatingPassword" label="Mother Name" className="mb-3">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setMname(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//         </Row>
//         <br />
//         <Row>
//         <Col>
//         <FloatingLabel controlId="floatingPassword" label="Year Of Joininng">
//         <Form.Control type="number" placeholder="Password" onChange={e=>setYstd(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//       <Col>
//         <FloatingLabel controlId="floatingPassword" label="Branch">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setBranch(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//         </Row>
//         <br />
//         <Row>
//         <Col>
//         <FloatingLabel controlId="floatingPassword" label="Student Phone Number">
//         <Form.Control type="number" placeholder="Password" onChange={e=>setSphn(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//       <Col>
//         <FloatingLabel controlId="floatingPassword" label="Parent Phone Number">
//         <Form.Control type="number" placeholder="Password" onChange={e=>setPhn(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//       <Col>
//         <FloatingLabel controlId="floatingPassword" label="Guardian Phone Number (Optional)">
//         <Form.Control type="number" placeholder="Password" onChange={e=>setGphn(e.target.value)} required/>
//       </FloatingLabel>
//       </Col>
//         </Row>
//         <br />
//         <h1>Room Allotment 🛋️</h1>
//         <hr width='50%'/>
//         <Row md={3} xs={1}>
//         <Col style={{marginBottom:'10px'}}>
//         <FloatingLabel controlId="floatingSelect" label="Block">
//       <Form.Select aria-label="Floating label select example" onChange={e=>setBlock(e.target.value)} >
//         <option disabled selected>------------------</option>
//         <option value="1">Block-1</option>
//         <option value="2">Block-2</option>
//       </Form.Select>
//     </FloatingLabel>
//       </Col>
//       <Col style={{marginBottom:'10px'}}>
//         <FloatingLabel controlId="floatingPassword" label="Floor">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setFloor(e.target.value)}/>
//       </FloatingLabel>
//       </Col>
//       <Col style={{marginBottom:'10px'}}>
//         <FloatingLabel controlId="floatingPassword" label="Room">
//         <Form.Control type="text" placeholder="Password" onChange={e=>setRoom(e.target.value)}/>
//       </FloatingLabel>
//       </Col >
//       <Col style={{marginBottom:'10px'}}>
//       <FloatingLabel controlId="floatingPassword" label="Total Fee">
//         <Form.Control type="number" placeholder="Password" onChange={e=>setFee(e.target.value)}/>
//       </FloatingLabel>
//       </Col>
//         </Row>
//         {/* <center><Button size='lg' style={{marginTop:'7px'}} onClick={chk}>regno</Button></center> */}
//         <center><Button size='lg' style={{marginTop:'7px'}} onClick={ra}>Add To Room</Button></center>
//       </Container>
//     </div>
//   )
// }   

// export default StudentsAdd;


import React,{useState,useEffect} from 'react'
import { DataBase, Storage } from '../FirebaseInit'
import {Row,Col,Table,Container,Form,FloatingLabel,Button} from 'react-bootstrap'
import { collection, query, where, getDoc, addDoc,doc,setDoc,increment,updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { v4 } from 'uuid';
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';
const StudentAdd = () => {
    const [Regno,setRegno]=useState();
    const [Name,setName]=useState();
    const [Fname,setFname]=useState();
    const [Mname,setMname]=useState();
    const [Ystd,setYstd]=useState();
    const [Branch,setBranch]=useState();
    const [Sphn,setSphn]=useState();
    const [Phn,setPhn]=useState();
    const [Gphn,setGphn]=useState();
    const [Block,setBlock]=useState();
    const [Floor,setFloor]=useState('');
    const [Room,setRoom]=useState('');
    const [Fee,setFee]=useState();
    const colref=collection(DataBase,'Students');
    const[uDat,setUdat]=useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    let id=Block+Floor+Room

    async function ra() {

        const df = doc(colref, Regno);
        const ds = await getDoc(df);
        if (ds.exists()) {
        dng('Student Exist Already')
        } else {
        const docRef = doc(DataBase, "Rooms", id);
        const docSnap = await getDoc(docRef);
        let r=docSnap.data().Vac
        if(r){
          const f = await setDoc(doc(colref,Regno), {Regno,Name,Fname,Mname,Ystd,Branch,Sphn,Phn,Gphn,Block,Floor,Room,imageUrls,Fee:parseInt(Fee),Due:parseInt(Fee)})
          .then(console.log('Student Added Sucessfully')).catch(err=>console.log(err))
          const data = {Vac: increment(-1)};
          updateDoc(docRef, data).then(tst('Student Added Sucessfully'))
          .catch(e=>{dng('Error Occured').then( console.log(e))})
        }
        else{
          dng('Room Filled')
        }
    }
      }

      const uploadFile = async() => {
        if (imageUpload == null) return;
        const imageRef = ref(Storage, `images/${imageUpload.name + v4()}`);
        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls(url);
          })
          ra();
        })
      };
      

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

  return (
    <div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}
      closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <br />
        <Container>
            <h1>Add Students 🏘️</h1>
            <hr />
            <Row md={2} sm={1} xs={1} xxl={2}>
                <Col>
                <FloatingLabel controlId="floatingInput" label="Regno" className="mb-3" >
                    <Form.Control type="text" placeholder="Enter Block"  onChange={e=>setRegno(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="Leave a comment here" onChange={e=>setName(e.target.value)}/>
                </FloatingLabel>
                </Col><Col>
                <FloatingLabel controlId="floatingTextarea" label="Father Name" className="mb-3">
                    <Form.Control type="text" placeholder="Leave a comment here" onChange={e=>setFname(e.target.value)}/>
                </FloatingLabel>
                </Col><Col>
                <FloatingLabel controlId="floatingTextarea" label="Mother name" className="mb-3">
                    <Form.Control type="text" placeholder="Leave a comment here" onChange={e=>setMname(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Year Of Joining" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setYstd(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Branch" className="mb-3">
                    <Form.Control type="text" placeholder="Leave a comment here" onChange={e=>setBranch(e.target.value)}/>
                </FloatingLabel>
                </Col></Row>
                <Row md={3}>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Student Phone Number" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setSphn(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Parent Phone Number" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setPhn(e.target.value)}/>
                </FloatingLabel>
                </Col><Col>
                <FloatingLabel controlId="floatingTextarea" label="Guardian Phone Number" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setGphn(e.target.value)}/>
                </FloatingLabel>
                </Col>
            </Row>
            <h1>Room Allotment 🪴🛋️</h1>
            <hr />
            <Row>
            <Col>
                <FloatingLabel controlId="floatingTextarea" label="Block" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setBlock(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Floor" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setFloor(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Room" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" onChange={e=>setRoom(e.target.value)}/>
                </FloatingLabel>
                </Col>
            </Row>               
             <h1>Additional Information ℹ️</h1>
                <hr />
            <Row md={3} sm={1}>
                <Col md={6}>
                <div className='d-inline'>
                <label for="formFileLg" className="form-label">Upload Image</label>
                <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={e=>{
                    setImageUpload(e.target.files[0]);
                    }} />
                {/* <Button className='m-2' onClick={uploadFile}>Upload Image</Button> */}
                </div>
                </Col>
                <Col>
                    <label for="fromimg" className='form-label'>Enter Fee</label>
                <FloatingLabel controlId="floatingTextarea" label="Fee" className="mb-3">
                    <Form.Control type="number" placeholder="Enter Fee Amount" onChange={e=>setFee(e.target.value)}/>
                </FloatingLabel>
                </Col>
            </Row>
            <Row><Col><center><Button variant='primary' onClick={uploadFile}>Add Room</Button></center></Col></Row>
        </Container>
    </div>
  )
}

export default StudentAdd;