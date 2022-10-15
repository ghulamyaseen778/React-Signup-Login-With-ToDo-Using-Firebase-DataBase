import './App.css';
import ToDo from './components/todo';
import { Route, Routes} from "react-router-dom";
import NavBarCmp from './components/NavbarCm';
import SignUp from './components/signup';
import Login from './components/login';
function App() {
  return (
    <>
    <NavBarCmp/>
    <Routes>
      <Route path='/' element={<Login/>} ></Route>
      <Route path='/signup' element={<SignUp/>} ></Route>
      <Route path='/Todo' element={<ToDo/>} ></Route>
    </Routes></>

  );
}

export default App;
