import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Error from '../error'
const Login = () => {
  const [Email,SetEmail]=useState("")
  const [Password,SetPassword]=useState("")
  const [Err,SetErr]=useState("")
  const User = localStorage.getItem("User-Info") 
  const Navigate = useNavigate()
  

  useEffect(
    ()=>{
      if (User){
        Navigate("/todo")
      }
    }
  )

  const LoginHandler = (e) =>{
    e.preventDefault()
    Email!=""&&Password!=""?
    signInWithEmailAndPassword(auth, Email, Password)
  .then((response) => {
    // Signed in 
    // console.log(response) 
      const user = response.user;
      localStorage.setItem("User-Info",user.uid)
    // ...
    Navigate('/todo')
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
    SetErr(errorMessage);
    // ..
  }):SetErr("Please fill all the filleds");
  SetEmail('')
  SetPassword('')
  }


  return (
    <div className='mt-5 mx-2'>
      <h1 className='text-center mb-2'>Login Page</h1>
      <Form className='form-control container d-flex flex-column'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>SetEmail(e.target.value)} value={Email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>SetPassword(e.target.value)} value={Password}/>
      </Form.Group>
      <Form.Text className="text-muted">
        <Error text={Err} />
        </Form.Text>
      <div><Button variant="primary" type="submit" onClick={LoginHandler}>
        Submit
      </Button></div>
    </Form>
    </div>
  )
}

export default Login