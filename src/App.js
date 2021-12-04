import Sidebar from "./components/Sidebar";
import { faBox, faBook, faCube, faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/Home";
import ImgProcess from "./components/ImgProcess";
import Login from "./components/Login";
import MRIControl from "./components/MRIControl";
import Patient from "./components/Patient";
import { useState, useEffect } from "react"


function App() {
  const sidebarMenu = [{
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
    "name": "图像处理模块",
    "icon": faImage,
    "url": "/imgProcess"
  },{
    "id": 4,
    "name": "登录/注册",
    "icon": faUser,
    "url": "/login"
  }]

  const [navid, setNavid] = useState(0)
  const onChange = (navid)=>{
    setNavid(navid)
  }
  return (
    <div>
      <Router>
        <Sidebar sidebarMenu={sidebarMenu} navid={navid} onChange={onChange}/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/patient" element={<Patient/>}></Route>
          <Route path="/MRIControl" element={<MRIControl/>}></Route>
          <Route path="/imgProcess" element={<ImgProcess/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
