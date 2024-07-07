import React from 'react'
import {Button,Nav,Navbar,Offcanvas,Container,Form,NavDropdown,Row,Col} from 'react-bootstrap';
import Login from './Pages/Login'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import {useAuthState } from 'react-firebase-hooks/auth';
import AddRooms from './Pages/Add_rooms';
import {auth} from './FirebaseInit'
import { signOut } from 'firebase/auth';
import StudentsAdd from './Pages/StudentsAdd';
import Students from './Pages/Students';
import Inventory from './Pages/Inventory';
import Mainataince from './Pages/Maintaince';
import Kitchen from './Pages/Kitchen'
import Home from './Pages/Home';
import AllStudentsData from './Pages/AllStudentsData';
import Kitcheninv from './Pages/KitchenInv';
// import Tst from './testphase';
// import RoomAddTest from './RoomAddTest';
// import DashBoard from "./Test/Home";
import Nf from "./img/404.jpg";


const App = () => {
    const [user] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
      }
  return (
  <div>
   <Router>
   {user &&<>  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to='/' style={{color:'white',textDecoration:'none'}}>Dormitory Automation</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link ><Link to='/Inventory' style={{color:'#808080',textDecoration:'none'}}>Inventory</Link></Nav.Link>
            <Nav.Link ><Link to='/maintaince' style={{color:'#808080',textDecoration:'none'}}>Maintaince</Link></Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to='/AddRooms' style={{color:'black',textDecoration:'none'}}> Rooms</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/StudentsAdd' style={{color:'black',textDecoration:'none'}}>Add Students</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/AllStudents' style={{color:'black',textDecoration:'none'}}>All Students</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Water Level [Beta]
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link><Link to='/DueFinder' style={{color:'#808080',textDecoration:'none'}}>Due Finder</Link></Nav.Link>
          {/* <Nav.Link><Link to='/Kitchen' style={{color:'#808080',textDecoration:'none'}}>Kitchen</Link></Nav.Link> */}
          <NavDropdown title="Kitchen" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to='/Kitchen' style={{color:'black',textDecoration:'none'}}>Add Items To Kitchen</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to='/KitchenInv' style={{color:'black',textDecoration:'none'}}>View Kitchen</Link></NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>}
        <Routes>
          {user && <><Route path='/AllStudents' element={<AllStudentsData/>}/>
          <Route path='/maintaince' element={<Mainataince/>}/>
          <Route path='/Inventory' element={<Inventory/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/kitchen' element={<Kitchen/>}/>
          <Route path='/KitchenInv' element={<Kitcheninv/>}/>
          <Route path='/StudentsAdd' element={<StudentsAdd/>}/>
          <Route path='/DueFinder' element={<Students/>}/>
            {/* <Route path='/Dash' element={<DashBoard/>}/> */}
            <Route path='/AddRooms' element={<AddRooms/>}/></>}
            {!user && <>
              <Route path='/' element={<Login/>}/>
            {/* <Route path='/test' element={<Tst/>}/>
            <Route path='/troom' element={<RoomAddTest/>}/> */}
            </>}
            
           {/* <Route path='*' element={<Link to='./'><img src={Nf} alt="" style={{height:'100vh',width:'100%'}}/></Link>}/> */}

           <Route path='*' element={<h1 style={{textAlign:'center',marginTop:'20%'}}>😔404 Looks Likes You Are Not Authorized <Link to='./'>Go Home</Link> </h1>}/>
        </Routes>
    </Router>
  </div>
  )
}

export default App