import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../../config/firebase"
import {doc, setDoc } from 'firebase/firestore'
import Error from '../error'
import { useNavigate } from 'react-router-dom';


const SingUp = () => {
  const [UserName,SetUserName]=useState("")
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
 
  const SignUpHandler= (e)=>{
    e.preventDefault()
    UserName!=""&&Email!=""&&Password!=""?
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((response) => {
      // console.log(response) 
      const user = response.user;
      localStorage.setItem("User-Info",user.uid)
     async function signup(){
        const Ref = doc(db, "UserS", `${user.uid}`);
      await setDoc(Ref, {
        UserName:UserName,
        pass:Password
      })
      }
      signup()
      // ...
      Navigate('/todo')
    })
    .catch((error) => {
      const errorMessage = error.message;
      SetErr(errorMessage)
      // ..
    })
    :SetErr("Please fill all the filleds");
    SetUserName('')
    SetEmail('')
    SetPassword('')
  }

  return (
    <div className='mt-5 mx-2'>
      <h1 className='text-center mb-2'>SignUp Page</h1>
      <Form className='form-control container d-flex flex-column'>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter User Name" onChange={(e)=>SetUserName(e.target.value)} value={UserName}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>SetEmail(e.target.value)} value={Email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>SetPassword(e.target.value)} value={Password} />
        <Form.Text className="text-muted">
        <Error text={Err} />
        </Form.Text>
      </Form.Group>
      <div><Button variant="primary" type="submit" onClick={SignUpHandler}>
        Submit
      </Button></div>
    </Form>
    </div>
  )
}

export default SingUp