import React,{useState,useEffect} from 'react'
import{Card,Button,Row,Col,Container,FloatingLabel,Form,Modal} from 'react-bootstrap';
import Logo from './Student.png'
import { DataBase } from "../FirebaseInit";
import { getDocs,collection,doc,updateDoc,deleteDoc,increment,getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Reveal from 'react-reveal/Reveal';

const AllStudentsData = () => {
    const [Data, setData] = useState([])
    const [Regno,setRegno]=useState('');
    const [Name,setName]=useState('');
    const [Fname,setFname]=useState('');
    const [Mname,setMname]=useState('');
    const [Ystd,setYstd]=useState('');
    const [Branch,setBranch]=useState('');
    const [Sphn,setSphn]=useState();
    const [Phn,setPhn]=useState();
    const [Gphn,setGphn]=useState();
    const [Block,setBlock]=useState('');
    const [Floor,setFloor]=useState('');
    const [Room,setRoom]=useState('');
    const [Fee,setFee]=useState();
    const [Chg,setChg]=useState(false);
    const [Id, setId] = useState();
    const [uData,setuData]=useState([]);
    const [modalShow, setModalShow] = useState(false);

    const colref=(collection(DataBase,'Students'));
    function Edit() {
            const upref=doc(DataBase,'Students',Regno)
             updateDoc(upref,{Regno,Name,Fname,Mname,Ystd,Branch,Sphn,Phn,Gphn,Block,Room,Fee,})
            .then(()=>{tst('Update Success')})
            .catch(err=>console.log(err))
            setBlock('')
        setFname('')
        setBranch('')
        setGphn('')
        setMname('')
        setName('')
        setRegno('')
        setRoom('')
        setFee('')
        setChg(false)
    }

    function tst(e) {
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
      
    useEffect(() => {
       fet()
        // colref.where('Regno','==','L21CS196').get().then((snapshot)=>{
        //   snapshot.docs.forEach(doc => {
        //     console.log(doc)
        //   });
        // })

      }, [])

      function fet() {
        getDocs(colref)
        .then(res=>{
          const movs=res.docs.map(doc=>({
            data:doc.data(),
            id:doc.id,
          }))
          setData(movs)
        })
      }

      async function info() {
        const docRef = doc(DataBase, "Students",Regno);
        const docSnap = await getDoc(docRef);
        setuData(docSnap.data());
        }

      const Del=async() =>{
        let r=Block+Floor+Room
        const delref=doc(DataBase,'Students',Regno)
        const docRef = doc(collection(DataBase,'Rooms'),r);
        const data = {Vac: increment(1)};
        await deleteDoc(delref)
        await updateDoc(docRef, data).then(()=>{
          tst('Deleted Completed!')
          fet()
        })
        
        .catch(err=>console.log(err.message))
       }

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
                Student Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Regno:{uData.Regno}</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
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
            {/* {Chg?<><Row>
            <Col>
        <FloatingLabel
        controlId="floatingInput"
        label="Reg.No"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" value={Regno} onChange={e=>setRegno(e.target.value)}/>
      </FloatingLabel>
      </Col>
      <Col>
      <FloatingLabel controlId="floatingPassword" label="Name">
        <Form.Control type="text" placeholder="Password"  value={Name} onChange={e=>setName(e.target.value)}/>
      </FloatingLabel>
      </Col>
      </Row>
      <Row>
        <Col>
        <FloatingLabel controlId="floatingPassword" label="Father Name">
        <Form.Control type="text" placeholder="Password" value={Fname} onChange={e=>setFname(e.target.value)}/>
      </FloatingLabel>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingPassword" label="Mother Name">
        <Form.Control type="text" placeholder="Password" value={Mname} onChange={e=>setMname(e.target.value)}/>
      </FloatingLabel>
      </Col>
        </Row>
        <br />
        <Row>
        <Col>
        <FloatingLabel controlId="floatingPassword" label="Year Of Joininng">
        <Form.Control type="text" placeholder="Password" value={Ystd} onChange={e=>setYstd(e.target.value)}/>
      </FloatingLabel>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingPassword" label="Branch">
        <Form.Control type="text" placeholder="Password" value={Branch} onChange={e=>setBranch(e.target.value)}/>
      </FloatingLabel>
      </Col>
        </Row>
        <br />
        <Row>
        <Col>
        <FloatingLabel controlId="floatingPassword" label="Student Phone Number">
        <Form.Control type="number" placeholder="Password" value={Sphn} onChange={e=>setSphn(e.target.value)}/>
      </FloatingLabel>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingPassword" label="Parent Phone Number">
        <Form.Control type="text" placeholder="Password" value={Phn} onChange={e=>setPhn(e.target.value)}/>
      </FloatingLabel>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingPassword" label="Guardian Phone Number (Optional)">
        <Form.Control type="text" placeholder="Password" value={Gphn} onChange={e=>setGphn(e.target.value)}/>
      </FloatingLabel>
      </Col>
        </Row>
        <br />
        <Row>
        <Col>
                <FloatingLabel controlId="floatingTextarea" label="Block" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" value={Block} onChange={e=>setBlock(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Floor" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" value={Floor} onChange={e=>setFloor(e.target.value)}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingTextarea" label="Room" className="mb-3">
                    <Form.Control type="number" placeholder="Leave a comment here" value={Room} onChange={e=>setRoom(e.target.value)}/>
                </FloatingLabel>
                </Col>
        </Row>
         <br /><center><Button onClick={Edit}>Update Student</Button> <Button type='reset' onClick={()=>{
           setBlock('')
           setFname('')
           setBranch('')
           setGphn('')
           setMname('')
           setName('')
           setRegno('')
           setRoom('')
           setFee('')
           setChg(false)
         }}>Clear Data</Button></center> <br /></>:<></>} */}
         <Row md={2} xs={1} sm={1} lg={3} xl={4}>
       {Data.map(e=>
       <Col md={3}><Card style={{ width: '18rem',marginLeft:'1rem' }} key={e.id}>
       <Card.Img variant="top" src={e.data.imageUrls} />
       <Card.Body>
         <Card.Title>{e.data.Regno}</Card.Title>
         <Card.Text>
          Name: {e.data.Name} <br />
          Branch: {e.data.Branch} <br />
          Block: {e.data.Block} <br />
          Room No: {e.data.Room} <br />
          Phone No: {e.data.Sphn}   <br />
          Parent No: {e.data.Phn} <br />
         </Card.Text>
         <Button variant="outline-info" onClick={()=>{
            setId(e.id)
            setBlock(e.data.Block)
            setBranch(e.data.Branch)
            setFee(e.data.Fee)
            setFname(e.data.Fname)
            setGphn(e.data.Gphn)
            setMname(e.data.Mname)
            setName(e.data.Name)
            setPhn(e.data.Phn)
            setRegno(e.data.Regno)
            setRoom(e.data.Room)
            setSphn(e.data.Sphn)
            setYstd(e.data.Ystd)
            setFloor(e.data.Floor)
            setRoom(e.data.Room)
            setModalShow(true)
            info();
            // setChg(true)
        }}
         >Edit Data</Button>&nbsp;&nbsp;&nbsp;
           <Button variant='outline-danger' onClick={()=>{
            setBlock(e.data.Block)
            setFloor(e.data.Floor)
            setRoom(e.data.Room)
            setRegno(e.id)
            Del()
            }}>Delete Student</Button> 
       </Card.Body>
     </Card> <br /></Col>
        )}
        </Row>       
        </Container>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default AllStudentsData