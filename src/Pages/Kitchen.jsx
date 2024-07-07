import React,{useState,useEffect} from 'react'
import {Row,Col,Container,Form,FloatingLabel,Button,} from 'react-bootstrap'
import ktch from './ktch.png'
import { DataBase } from '../FirebaseInit';
import { addDoc, collection, doc,getDocs,deleteDoc,getDoc,query, where} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Kitchen = () => {
    const [Data,setData]=useState([]);
    const [Item,SetItem]=useState();
    const [Quantity,SetQuantity]=useState();
    const [Price,setPrice]=useState();
    const colref=(collection(DataBase,'Kitchen'));

    function tst() {
        toast.success('Added to Kitchen!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    const submit=(e)=>{
        e.preventDefault();
        addDoc(colref,{Item,Quantity:parseFloat(Quantity),Price:parseFloat(Price),Rem:parseFloat(Quantity)})
        .then(()=>{tst()})
        .catch(err=>console.log(err))
        SetItem('')
        setPrice('')
        SetQuantity('')
    }
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
            <h1 style={{color:'#18978F'}}>Kitchen 🍇</h1>
            <hr  width='50%'/>
            <Row>
                <Col md={6}>
                <Row md={12}>
                <Col md={9}><FloatingLabel controlId="floatingPassword" label="Item">
                    <Form.Control type="text" placeholder="Item" onChange={e=>SetItem(e.target.value)}/>
                </FloatingLabel></Col>
                </Row>
                <br />
                <Row>
                <Col md={9}><FloatingLabel controlId="floatingPassword" label="Quantity in Kg's">
                    <Form.Control type="number" placeholder="Password" onChange={e=>SetQuantity(e.target.value)}/> 
                </FloatingLabel></Col>
                </Row>
                <br />
                <Row>
                <Col md={9}><FloatingLabel controlId="floatingPassword" label="Price">
                    <Form.Control type="number" placeholder="Password" onChange={e=>setPrice(e.target.value)}/>
                </FloatingLabel></Col>
                </Row>
                <br />
                    <Button variant='outline-success' onClick={submit}>Add To Kitchen</Button>
                </Col>
                <Col>
                    <img src={ktch} alt="" height='80%' width='100%'/>
                </Col>
            </Row>
                
        </Container>
    </div>
  )
}

export default Kitchen;