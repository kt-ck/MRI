import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRedo, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import "../localSCSS/patient.scss";
import axios from "axios";
import AddPatientPanel from "./AddPatientPanel";
import { useNavigate } from 'react-router-dom';
import { InputGroup, FormControl, Button,DropdownButton, Dropdown } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotLogin from "./NotLogin";
const Patient = ({ token }) => {
    const [PatientList, setPatientList] = useState([]);
    const [filtername, setFiltername] = useState("选择筛选条件");
    const [filteritem, setFilteritem] = useState("");
    const [showAddPatientPanel, setShowAddPatientPanel] = useState(false);
    const [patientModify, setPatientModify] = useState(false);
    const [patient, setPatient] = useState({});
    const [notLogin, setNotLogin] = useState(false);
    const navigate = useNavigate();
    const getPatient = () => {
        axios({
            method: "POST",
            url:  "/host/api/patients/get",
            data: {
                
            },
            headers: {
              'Authorization': "MRI " + token
            } 
          }).then((res) => {
              setPatientList(res.data.data);
          }).catch((err) => {
              console.log(err.response.status)
              if(err.response.status === 422){
                setNotLogin(true);
              }
          })
      }
    useEffect(()=>{
      getPatient();
    },[])

    const redo = () => {
        getPatient();
    }
    const Search = () => {
        if(filtername === "选择筛选条件"){
            return
        }
        let con_key = "id";
        switch(filtername){
            case "姓名":con_key = "name"; break;
            case "性别":con_key = "sex"; break;
            case "年龄":con_key = "age"; break;
            case "身高":con_key = "height"; break;
            case "体重":con_key = "weight"; break;
        }
        console.log(typeof(filteritem))
        if(con_key === "id" || con_key === "height" || con_key === "weight"){
            if(filteritem.search(/[\d.]*/) === -1){
                return
            }
        }
        console.log(con_key)
        axios({
            url:  "/host/api/patients/get",
            method:"post",
            data: {
                key: con_key,
                value: filteritem
            },
            headers:{
                Authorization: "MRI " + token
            }
        }).then((res)=>{
            setPatientList(res.data.data);
        }).catch((err)=>{
            console.log(err)
            if(err.response.status === 422){
                setNotLogin(true);
              }
        })
    }

    const onDelete = (id) => {
        axios({
            url:  "/host/api/patients/delete",
            method:"post",
            data: {
                id
            },
            headers:{
                Authorization: "MRI " + token
            }
        }).then((res)=>{
            getPatient()
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 422){
                setNotLogin(true);
              }
        })
    }

    const onModify = (id, name, sex, age, height, weight) => {
        setPatientModify(true);
        setPatient({id,name, sex, age, height, weight});
        console.log(patient);
    }

    return (
        <div className="container patient-panel">
            <NotLogin notLogin={notLogin} setNotLogin={setNotLogin} />
            <div className="header">
                <div className="search">
                    <InputGroup className="mb-3">
                    <DropdownButton
                    variant="outline-secondary"
                    title={filtername}
                    id="input-group-dropdown-1"
                    >
                        <Dropdown.Item onClick={()=>setFiltername("id")}>id</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setFiltername("姓名")}>姓名</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setFiltername("年龄")}>年龄</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setFiltername("性别")}>性别</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setFiltername("身高")}>身高</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setFiltername("体重")}>体重</Dropdown.Item>
                    </DropdownButton>
                        <FormControl
                            placeholder="输入筛选内容"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={filteritem}
                            onChange={(e)=>setFilteritem(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={Search}>
                          搜索
                        </Button>
                    </InputGroup>
                </div>
                <div className="icon">
                    <Tooltip title="添加病人" placement="top">
                      <IconButton>
                         <FontAwesomeIcon icon={faPlus} className="operation" onClick={()=>{setShowAddPatientPanel(true)}}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="刷新" placement="top">
                      <IconButton>
                        <FontAwesomeIcon icon={faRedo} className="operation" onClick={redo}/>
                      </IconButton>
                    </Tooltip>
                    <Button variant="link" onClick={()=>{navigate(`/patient/log/${-1}`);}}>所有检查记录</Button>
                </div>
            </div>
            <AddPatientPanel 
              panelIn={showAddPatientPanel} 
              setPanelIn={setShowAddPatientPanel} 
              token={token} 
              submitUrl="/host/api/patients/add" 
              submitName="添加"
              refrash={getPatient}
            />
            <AddPatientPanel 
              defaultName={patient["name"]} 
              defaultSex={patient["sex"]} 
              defaultAge={patient["age"]} 
              defaultHeight={patient["height"]} 
              defaultId={patient["id"]} 
              defaultWeight={patient["weight"]} 
              panelIn={patientModify} 
              setPanelIn={setPatientModify} 
              token={token} 
              submitUrl="/host/api/patients/modify" 
              refrash={getPatient}
              submitName="修改"
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>身高</th>
                        <th>体重</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        PatientList.map((patient, index)=>(
                            <tr key={index}>
                              <td>{patient["id"]}</td>
                              <td>{patient["name"]}</td>
                              <td>{patient["sex"]}</td>
                              <td>{patient["age"]}</td>
                              <td>{patient["height"]}</td>
                              <td>{patient["weight"]}</td>
                              <td>
                                  {/* <Link to={{path :"/patient/log", query:{patientId: patient["id"]}}}>查看记录</Link> */}
                                  <Button variant="link" onClick={()=>{navigate(`/patient/log/${patient["id"]}`);}}>查看记录</Button>
                                  <Button variant="link" onClick={()=>onDelete(patient["id"])}>删除</Button>
                                  <Button variant="link" onClick={()=>onModify(patient["id"],patient["name"], patient["sex"], patient["age"],patient["height"],patient["weight"])}>修改</Button>
                              </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {
               PatientList.length === 0 && (
                <span className="showErr">没有数据</span> 
               )
            }
        </div>
    )
}

export default Patient
