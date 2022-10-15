import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import './todo.css';
import { db } from '../../config/firebase';
import { collection, doc, getDocs, deleteDoc, updateDoc,addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import NavbarCm from '../NavbarCm';
const dbColl1 = collection(db, "ToDoS")



const ToDo = () => {
  <NavbarCm boolen={true}/>
  const [Text, SetText] = useState("")
  const [Data, SetData] = useState([])
  const [IndexNum, SetIndexNum] = useState("")
  const [UpdateText, SetUpdateText] = useState("")
  const [Refresh, SetRefresh] = useState(false)
  const User = localStorage.getItem("User-Info")
  const Navigate = useNavigate()

  useEffect(
    () => {
      if (!User){
        Navigate("/")
      }
      else{
        async function TakeTodo() {
          const arr = []
          const querySnapshot = await getDocs(dbColl1);
          querySnapshot.forEach((doc) => {
            if(doc.data().uid===localStorage.getItem("User-Info")){
              arr.unshift({
                id: doc.id,
                val: doc.data().todoVal
              })
            }
          });
          SetData([...arr])
        }
        TakeTodo()
      }
    }, [Refresh]
  )


  const ADD = async () => {
    if (Text.trim() != "") {
       await addDoc(dbColl1, {
        todoVal:Text,
        uid:localStorage.getItem("User-Info")
      });
      // console.log("hello")
      Data.push(Text)
      SetText("")
      SetRefresh(!Refresh)
    }
    else {
      console.log("please fill data")
    }
  }

  const Edit = (ind) => {
    SetIndexNum(ind)
    console.log('update')
  }
  const UpdateToDo = async (ind) => {
    if (UpdateText.trim()!="") {
      const idc = Data[ind].id
    const dbRef = doc(dbColl1, idc)
    Data.splice(ind, 1, { val: UpdateText, id: idc })
    await updateDoc(dbRef, {
      todoVal: Data[ind].val
    })
    SetData([...Data])
    SetIndexNum("")
    console.log('update')
  }else{
    console.log("please fill data")
  }
    SetUpdateText('')
  }
  const Del = async (ind) => {
    const idn = Data[ind].id
    const delRef = doc(dbColl1, idn)
    await deleteDoc(delRef)
    Data.splice(ind, 1)
    SetData([...Data])
    console.log('update')
  }
  return (
    <>
      <div className='container'>
        <input type="text" className='form-control form-group my-3' onChange={(e) => { SetText(e.target.value) }} value={Text} placeholder="Enter Your Todo" autoFocus={true} />
        <Button variant="success" onClick={() => ADD()} className="mb-2">Add ToDo</Button>
      </div>

      {
        Data.map((Val, Ind) => {
          return (
            <div key={Ind} className="d-flex justify-content-center center-ToDo">
              <div className='ToDoShow'>
                {
                  IndexNum === Ind ?
                    (<>
                      <input type="text" className='form-control form-group my-3' onChange={(e) => { SetUpdateText(e.target.value) }} value={UpdateText} autoFocus={true} />
                      <Button variant="info" onClick={() => UpdateToDo(Ind)} className="mb-2">Update ToDo</Button></>
                    ) :
                    (<Alert variant="success" className='container d-flex justify-content-between align-items-center'>
                      {Val.val}
                      <div className='d-flex'><Button variant="warning" className='ms-2' onClick={() => Edit(Ind)}>Edit</Button>
                        <Button variant="danger" className='ms-2' onClick={() => Del(Ind)}>Delete</Button></div>
                    </Alert>)
                }
              </div>
            </div>
          )
        })
      }

    </>
  )
}

export default ToDo