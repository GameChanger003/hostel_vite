import React,{useState,useEffect} from 'react'
import { DataBase } from '../FirebaseInit'
import {Row,Col,Table,Container,Form,FloatingLabel,Button,Modal} from 'react-bootstrap'
import { collection,getDocs,deleteDoc,doc,updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Kitcheninv = () => {
    const ref=collection(DataBase,'Kitchen');
    const [Data, setData] = useState([]);
    const [Id, setId] = useState();
    const [Chg, setChg] = useState(false)
    const [Item,SetItem]=useState();
    const [Quantity,SetQuantity]=useState();
    const [Price,setPrice]=useState();
    const [Rem,setRem]=useState();
    const[usd,setUsd]=useState();
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        getDocs(ref)
        .then(res=>{
            const movs=res.docs.map(doc=>({
              data:doc.data(),
              id:doc.id,
            }))
            setData(movs)
        })
    }, [])

    function tst(e) {
      toast.info(e, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    function wrg(e) {
      toast.warning(e, {
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

    const updateData = () => {
        const upref=doc(DataBase,'Kitchen',Id)
        if(Rem>=usd && usd>0){
         updateDoc(upref,{Item,Quantity,Price,Rem:Math.abs(Rem-usd)})
        .then(tst('Update Success'))
        .catch(err=>console.log(err))
        setPrice('');
        SetItem('')
        SetQuantity('')
        setChg(false)
      }
        else{
            dng("Can't Process This Request")
        }
      };

    function Del(id) {
        const delref=doc(DataBase,'Kitchen',id)
        deleteDoc(delref)
        .then(wrg('Deleted'))
        .catch(err=>console.log(err.message))
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
          <h1>Student Due's 💸</h1>
          <hr width='50%'/>
          {Chg?
            <Row>
                <Col>
                <FloatingLabel controlId="floatingPassword" label="Item">
        <Form.Control type="text" placeholder="Password" value={Item} onChange={e=>SetItem(e.target.value)}/>
      </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingPassword" label="Price">
        <Form.Control type="number" placeholder="Password" value={Price} onChange={e=>{setPrice(e.target.value)}}/>
      </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingPassword" label="Quantity">
        <Form.Control type="text" placeholder="Password" value={Quantity} onChange={e=>SetQuantity(e.target.value)}/>
      </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingPassword" label="Used Quantity">
        <Form.Control type="number" placeholder="Password" onChange={e=>{setUsd(e.target.value)}}/>
      </FloatingLabel>
                </Col>
                <Col><Button onClick={updateData}>Update Due</Button></Col>
            </Row>:<></>}
            <br />
            <Table striped bordered hover variant="">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Quantity Left</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {Data.map(e=><tr key={e.id}>
            <td>{e.data.Item}</td>
            <td>{e.data.Quantity}</td>
            <td>{e.data.Price}</td>
            <td>{e.data.Rem}</td>
            <td><Button onClick={() => {
              setId(e.id) 
              setPrice(e.data.Price)
              setRem(e.data.Rem)
              SetQuantity(e.data.Quantity)
              SetItem(e.data.Item)
              setChg(true)
              }} variant='outline-success'> ✏️</Button></td>
            <td onClick={()=>{Del(e.id)}}><Button variant='outline-danger'>🗑️</Button></td>
            </tr>
        )}
      </tbody>
    </Table>
    </Container>
  
    </div>
  )
}

export default Kitcheninv;