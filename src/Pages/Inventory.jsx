import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Form,FloatingLabel,Button,Table} from 'react-bootstrap'
import { DataBase } from '../FirebaseInit';
import { collection, getDocs,addDoc,deleteDoc,doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventory = () => {

    const [Data,setData]=useState([]);
    const [Item,SetItem]=useState();
    const [Quantity,SetQuantity]=useState();
    const [Remain,SetRemain]=useState();
    const [left, setleft] = useState();
    const [Id,setId]=useState();
    const [Chg,setChg]=useState(true);
    var date= new Date();

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

    const ref=collection(DataBase,'Inventory');
    useEffect(() => {
        getd();
    }, [])
  // }, [ref])

  function getd() {
    getDocs(ref)
        .then(res=>{
            const movs=res.docs.map(doc=>({
              data:doc.data(),
              id:doc.id,
            }))
            setData(movs)
        })
  }
    
    const submit=(e)=>{
        e.preventDefault();
        addDoc(ref,{Item,Quantity:parseInt(Quantity),left:parseInt(Quantity),date})
        .then(()=>{tst('Data Submited Success!')})
        .catch(err=>console.log(err))
        SetItem('')
        SetQuantity(1)
        SetRemain('')
        getd();
    }

    const updateData = () => {
      const upref=doc(DataBase,'Inventory',Id)
      if(Remain<=left && left>0 && left-Remain<=Quantity && Remain>0){
       updateDoc(upref,{Item,Quantity,left:left-Remain})
      .then(()=>{tst('Update Submission Success!')})
      .catch(err=>console.log(err))
      SetItem('');
      SetQuantity('')
      setId('')
      SetRemain('')
      setChg(true)
      getd()
    }
      else{
        console.log(dng('Error Occured'))
      }
    };

   function Del(id) {
    console.log('first')
    const delref=doc(DataBase,'Inventory',id)
    deleteDoc(delref)
    .then(()=>{
      tst('Deletion Success')
      getd()
    })
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
            <br />
            <h1>Inventory 🏬</h1>
            <hr width='50%'/>
            <Row>
                <Col>
                <FloatingLabel
        controlId="floatingInput"
        label="Item Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" value={Item} onChange={e=>SetItem(e.target.value)}/>
      </FloatingLabel></Col>
      <Col>
      <FloatingLabel controlId="floatingPassword" label="Quantity">
        <Form.Control type="number" placeholder="Password" value={Quantity}  onChange={e=>SetQuantity(e.target.value)}/>
      </FloatingLabel>
                </Col>
              {!Chg?  <>
                <Col>
      <FloatingLabel controlId="floatingPassword" label="left">
        <Form.Control type="number" placeholder="Password" value={left}  onChange={e=>SetQuantity(e.target.value)}/>
      </FloatingLabel>
                </Col>
              <Col>
      <FloatingLabel controlId="floatingPassword" label="Used">
        <Form.Control type="number" placeholder="Password"  onChange={e=>SetRemain(e.target.value)}/>
      </FloatingLabel>
                </Col></>:<></>}
            </Row>
            <center>{Chg?<Button onClick={submit}>Add To Inventory</Button>:<><Button onClick={updateData}>Update Inventory</Button>&nbsp;&nbsp;&nbsp;<Button variant='danger' onClick={()=>{
              setChg(true)
              SetItem('')
              setleft('')
            }}>Cancel Changes</Button></>}</center>
           <br />
           <h1>Inventory Items 📃</h1>
           <hr />
           <Table striped>
            <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Remaining</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            
       {Data.map(e=><tr key={e.id}>
            <td>{e.data.Item}</td>
            <td>{e.data.Quantity}</td>
            <td>{e.data.left}</td>
            <td><Button onClick={() => {
              setId(e.id) 
              SetItem(e.data.Item)
              SetQuantity(e.data.Quantity)
              setleft(e.data.left)
              setChg(false)
              }} variant='outline-success'> ✏️</Button></td>
            <td> <Button variant='outline-danger' onClick={()=>{Del(e.id)}}>🗑️</Button></td>
            </tr>
        )}
       
        </tbody>
        </Table>
 
        </Container>
    </div>
  )
}


export default Inventory;



    
 