import React,{useState,useEffect} from 'react'
import { DataBase } from '../FirebaseInit'
import {Row,Col,Table,Container,Form,FloatingLabel,Button} from 'react-bootstrap'
import { collection,getDocs,deleteDoc,doc,updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Students = () => {
    const ref=collection(DataBase,'Students');
    const [Data, setData] = useState([]);
    const [Id,setId]=useState();
    const [regno,setRegno]=useState();
    const [Chg,setChg]=useState(false);
    const [Amt,setAmt]=useState();
    const [Due,setDue]=useState();
    const [rem,setrem]=useState();

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
    useEffect(() => {
        getDocs(ref)
        .then(res=>{
            const movs=res.docs.map(doc=>({
              data:doc.data(),
              id:doc.id,
            }))
            setData(movs)
        })
    }, [ref])

    const updateData = () => {
        const upref=doc(DataBase,'Students',Id)
        if(rem<=Due && Due>=0){
         updateDoc(upref,{Due:(Due-rem)})
        .then(tst('Updation Success'))
        .catch(err=>console.log(err))
        setAmt('');
        setId('')
        setChg(false)}
        else{
          alert('Over')
        }
      };

    function Del(id) {
        const delref=doc(DataBase,'Students',id)
        deleteDoc(delref)
        .then(tst('Deletion Excess'))
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
                <FloatingLabel controlId="floatingPassword" label="Reg.No">
        <Form.Control type="text" placeholder="Password" value={regno} disabled/>
      </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingPassword" label="Paid Amount">
        <Form.Control type="number" placeholder="Password" onChange={e=>{setrem(e.target.value)}}/>
      </FloatingLabel>
                </Col>
                <Col><Button onClick={updateData}>Update Due</Button></Col>
            </Row>:<></>}
            <br />
            <Table striped bordered hover variant="info">
      <thead>
        <tr>
          <th>Reg.No</th>
          <th>First Name</th>
          <th>Total Fee</th>
          <th>Due Amount</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {Data.map(e=><tr key={e.id}>
            <td>{e.data.Regno}</td>
            <td>{e.data.Name}</td>
            <td>{e.data.Fee}</td>
            <td>{e.data.Due}</td>
            <td><Button onClick={() => {
              setId(e.id) 
              setRegno(e.data.Regno)
              setDue(e.data.Due)
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

export default Students