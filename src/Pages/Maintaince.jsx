import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Form,FloatingLabel,Button,Table} from 'react-bootstrap'
import { DataBase } from '../FirebaseInit';
import { collection, getDocs,addDoc,deleteDoc,doc, updateDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Mainataince = () => {

    const [Data,setData]=useState([]);
    const [Item,SetItem]=useState(null);
    const [Quantity,SetQuantity]=useState();
    const [Id,setId]=useState();
    const [Chg,setChg]=useState(true);
    const [Description,setDescription]=useState(null);
    var date= new Date();
    date=date.toDateString()
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

    const ref=collection(DataBase,'Maintaince');

    function fetchD() {
      getDocs(ref)
        .then(res=>{
            const movs=res.docs.map(doc=>({
              data:doc.data(),
              id:doc.id,
            }))
            setData(movs)
           console.log(movs.length)
        })
    }
    useEffect(() => {
        fetchD();
    }, [])
    
    const submit=(e)=>{
        e.preventDefault();
        addDoc(ref,{Item,Price:parseInt(Quantity),date,Description})
        .then(()=>{tst('Item Added To Inventory')})
        .catch(err=>console.log(err))
        SetItem('')
        setDescription('')
        SetQuantity(1)
        
    }

    const updateData = () => {
      const upref=doc(DataBase,'Maintaince',Id)
      if(Item==null && Description ==null){alert('Error')}
      else{
       updateDoc(upref,{Item,Price:Quantity,Description})
      .then(tst('Item Updated To Inventory'))
      .catch(err=>console.log(err))
      SetItem('');
      SetQuantity('')
      setId('')
      setDescription('')
      setChg(true)}
    
    };

   function Del(id) {
    const delref=doc(DataBase,'Maintaince',id)
    deleteDoc(delref)
    .then(()=>{tst('Item Deleted From Inventory!')})
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
            <h1>Maintaince 🔧</h1>
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
      <FloatingLabel controlId="floatingPassword" label="price">
        <Form.Control type="number" placeholder="Password" value={Quantity}  onChange={e=>{
          if(parseInt(e.target.value)<0){SetQuantity(1)}
          else{SetQuantity(e.target.value)}
          }} min='1' OnlyNumber="true"/>
      </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col>
                <FloatingLabel controlId="floatingTextarea2" label="Description" >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={Description}
          onChange={e=>setDescription(e.target.value)}
        />
      </FloatingLabel>
                </Col>
            </Row>
            <br />
            <center>{Chg?<Button onClick={submit}>Add To Maintaince</Button>:<Button onClick={updateData}>Update Data</Button>}</center>
           <br />
           <h1>Maintaince History <span onClick={fetchD}>🔃</span></h1>
           <hr />
           <Table striped bordered hover>
            <thead>
            <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Date</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            
       {Data.map(e=><tr key={e.id}>
            <td>{e.data.Item}</td>
            <td>{e.data.Description}</td>
            <td>{e.data.date.toString()}</td>
            <td>{e.data.Price}</td>
            <td><Button  onClick={() => {
              setId(e.id) 
              SetItem(e.data.Item)
              SetQuantity(e.data.Price)
              setDescription(e.data.Description)
              setChg(false)
              }} variant="light"> ✏️</Button></td>
            <td > <Button variant="light" onClick={()=>{Del(e.id)}}> 🗑️</Button></td>
            </tr>
        )}
       
        </tbody>
        </Table>
        </Container>
    </div>
  )
}


export default Mainataince;



    
 