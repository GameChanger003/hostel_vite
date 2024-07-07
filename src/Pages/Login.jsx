import React,{useState} from 'react'
import {FloatingLabel,Form,Row,Col,Button,Alert,Toast,Container} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import Logo from "./logo.jpg";
import hst from "../img/hst.gif";
import {auth} from '../FirebaseInit';
import { signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {useAuthState,useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const Login = () => {
  const [user,setUser]=useState();
    const [number,setNumber]=useState();
    const [error,seterror]=useState();
    let nav=useNavigate();
    const login=async()=>{
       await signInWithEmailAndPassword(auth,user,number)
       .then(e=>{
        console.log(e)
        nav('/')
        
      })
       .catch(e=>seterror(e))

      }

    const logout = () => {
        signOut(auth);
      }

  return (
    // <><br />
    //     <Row className="justify-content-center">
    //       <img src={Logo} alt="..." style={{height:'250px',width:'350px'}}/>
    //     </Row>
    // <Row className="justify-content-md-center">
    //      <center><h1>Login</h1></center>
    //     </Row>
    //     <br />
    //    <Row className="justify-content-md-center"><Col md={4}>{error && <Alert variant={'danger'}>{error.message}</Alert> }</Col></Row>
    //     <Row className="justify-content-md-center">
    //             <Col md={4}>
    //                 <FloatingLabel controlId="floatingInputGrid" label="User Name">
    //                 <Form.Control type="email" placeholder="name@example.com" value={user} onChange={e=>setUser(e.target.value)} style={{backgroundcolor:"transperent"}}/>
    //                 </FloatingLabel>
    //             </Col>
    //             </Row>
    //             <br />
    //     <Row className="justify-content-md-center">
    //             <Col md={4}>
    //                 <FloatingLabel controlId="floatingInputGrid" label="Passcode">
    //                 <Form.Control type="password" placeholder="name@example.com" value={number} onChange={e=>setNumber(e.target.value)}/>
    //                 </FloatingLabel>
    //             </Col>
    //         </Row>
    //         <br />
    //         <Row className="justify-content-center">
    //        <Col md={1} xs={6}><center><Button onClick={login}>Login</Button></center></Col>
    //        <Col md={1} xs={6}><Button onClick={logout}>Logout</Button></Col>
    //         </Row>

    <div className='p-5'>
    <div  style={{overflow:'-moz-hidden-unscrollable',border:'0px solid black'}}>
        <Row md={2}>
            <Col md={6}>
            {/* <div style={{ backgroundImage:`url(${hst})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",}}> */}
            <img src={hst} alt="Img" className="d-block w-100" style={{height:'80%',objectFit:'contain'}}/>
            {/* <div style={{
                paddingTop:'35%',
                paddingLeft:'20px'
            }} >
               <h1 style={{color:'#E4DCCF'}}><span style={{fontSize:'90px'}}> R.V.R & J.C, </span> <br /> Dormitory Manager</h1>
            </div>
                </div> */}
            </Col>
            <Col md={5} style={{}}>
                <Container className='p-3'>
                <center><img src={Logo} alt="" height='150px'/></center>
                <center><h1 style={{color:'#2E4F4F'}}>R.V.R & J.C<br />Dormitory Manager</h1></center><br />
                <h2 style={{color:'#0E8388'}}>Login</h2>
                <hr/>
                <p className=''>Welcome back, please login to get started!</p>
                {/* <br /> */}
             <Col md={10}>{error && <Alert variant={'danger'}>{error.message.slice(22,error.message.length-2)}</Alert> }</Col>
                <Row>
            <Col md={10}>
                <FloatingLabel controlId="floatingInputGrid" label="User Name">
                <Form.Control type="email" placeholder="name@example.com" value={user} onChange={e=>setUser(e.target.value)} style={{backgroundcolor:"transperent"}}/>
                </FloatingLabel>
            </Col>
            </Row>
            <br />
             <Row>
            <Col md={10}>
                <FloatingLabel controlId="floatingInputGrid" label="Passcode">
                <Form.Control type="password" placeholder="name@example.com" value={number} onChange={e=>setNumber(e.target.value)}/>
                </FloatingLabel>
            </Col>
        </Row>
        <br />
        <Button onClick={login}>Login</Button>
        </Container>
            </Col>
        </Row>
    </div>
</div>
  )
}

export default Login