import Sidebar from "./components/Sidebar";
import { faBox, faBook, faCube, faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/Home";
import ImgProcess from "./components/ImgProcess";
import Login from "./components/Login";
import MRIControl from "./components/MRIControl";
import Patient from "./components/Patient";
import PatientLog from "./components/PatientLog";
import { useState } from "react"


function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [sidebarMenu, setSidebarMenu] = useState([{
    "id": 0,
    "name": "MRI应用",
    "icon": faBox,
    "url": "/"
  },{
    "id": 1,
    "name": "病人管理模块",
    "icon": faBook,
    "url": "/patient"
  },{
    "id": 2,
    "name": "MRI控制",
    "icon": faCube,
    "url": "/MRIControl"
  },{
    "id": 3,
    "name": "图像浏览模块",
    "icon": faImage,
    "url": "/imgProcess"
  },{
    "id": 4,
    "name": "登录/注册",
    "icon": faUser,
    "url": "/login"
  }])
  const [navid, setNavid] = useState(0)
  const onChange = (navid)=>{
    setNavid(navid)
  }
  const onLogin = (email, name, password, token) => {
    setEmail(email);
    setName(name);
    setPassword(password);
    setToken(token);
    setSidebarMenu(sidebarMenu.map((menu)=>menu.id === 4? {...menu, name}: menu));
  }

  const onLogout = () => {
    setToken("");
    setEmail("");
    setName("");
    setPassword("");
    setSidebarMenu(sidebarMenu.map((menu)=>menu.id === 4? {...menu, name: "登录/注册"}: menu))
  }

  const getInfo = ()=>{
    return {
      email,
      name,
      password,
    }
  }
  const [login, setLogin] = useState(false);
  return (
    <div>
      <Router>
        <Sidebar sidebarMenu={sidebarMenu} navid={navid} onChange={onChange}/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/patient" element={<Patient token={token}/>}></Route> */}
          <Route path="/patient" element={<Patient token={token}/>}></Route>
          <Route path="/patient/log/:id" element={<PatientLog token={token}/>}></Route>
          <Route path="/MRIControl" element={<MRIControl token={token} login={login}/> }></Route>
          <Route path="/imgProcess" element={<ImgProcess token={token} login={login}/>}></Route>
          <Route path="/login" element={<Login onLogin={onLogin} isLogin={token !== ""} getInfo={getInfo} onLogout={onLogout} onNavchange={onChange} setLogin={setLogin}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
