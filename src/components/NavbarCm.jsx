import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
const dbColl = collection(db, "UserS")


const NavbarCm = () => {
  const [Bollen, SetBollen] = useState(true)
  const [Refresh, SetRefresh] = useState(false)
  const [USerName, SetUserName] = useState("")
  const User = localStorage.getItem("User-Info")
  const Navigate = useNavigate()

  useEffect(
    () => {
      if (!User) {

      } else {
        async function TakeTodo() {
          const querySnapshot = await getDocs(dbColl);
          querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("User-Info")) {
              SetUserName(doc.data().UserName)
            }
          })
        }
        TakeTodo()
      }
    },[]
  )

  useEffect(
    () => {
      window.location.pathname === "/" || window.location.pathname === "/signup" ? SetBollen(false) :
        localStorage.getItem("User-Info") ? SetBollen(true) : SetBollen(false)
    }
    , [Refresh])

  const LogoutHandler = () => {
    localStorage.removeItem("User-Info")
    Navigate('/')
    SetRefresh(!Refresh)

  }

  const LogInHandler = () => {
    Navigate('/')
  }

  const SignUpHandler = () => {
    Navigate('/signup')
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container fluid>
          <h1 className='white' style={{ color: 'white' }}>ToDo Application</h1>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            {
              Bollen === false ? (<><Button variant="outline-warning mx-2" onClick={LogInHandler}>LogIn</Button>
                <Button variant="outline-warning" onClick={SignUpHandler}>SignUp</Button></>) : (<><Badge bg="secondary m-3 text-capitalize">{USerName}</Badge>
                  <Button variant="outline-warning" onClick={LogoutHandler}>Log Out</Button></>)
            }


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarCm