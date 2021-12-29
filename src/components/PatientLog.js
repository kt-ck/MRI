import "../index.scss";
import Table from "react-bootstrap/Table";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import "../localSCSS/patient.scss";
import "../localSCSS/patientLog.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from "@mui/lab";
import { TextField, Box } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotLogin from "./NotLogin";

const PatientLog = ({ token }) => {
    const { id } = useParams();
    const [recorderList, setRecorderList] = useState([]);
    const [calendarValue, setCalendarValue] = useState([null, null]);
    const [notLogin, setNotLogin] = useState(false);
    const navigate = useNavigate();
    const getRecorder = () =>{
        const postdata = id >= 0 ? {id} :{}; 

        axios({
            url:"/host/api/recorder",
            data:postdata,
            method: "post",
            headers: {
              'Authorization': "MRI " + token
            } 
        }).then((res) => {
            setRecorderList(res.data.data)
            console.log(res);
        }).catch((err) => {
            console.log(err);
            if(err.response.status === 422){
                setNotLogin(true);
              }
        })
    }
    const delelteLog = (recorderid) => {
        console.log(recorderid)
        axios({
            url: "/host/api/recorder/deleteLog",
            data: {recorderid},
            method: "post",
            headers: {
              'Authorization': "MRI " + token
            }
        }).then((res) => {
            getRecorder();
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 422){
                setNotLogin(true);
              }
        })

    }

    const filterByDate = ()=>{
        axios({
            url: "/host/api/recorder/filterByDate",
            data:{calendarValue},
            method: "post",
            headers: {
                'Authorization': "MRI " + token
            }
        }).then((res) => {
            setRecorderList(res.data.data)
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 422){
                setNotLogin(true);
              }
        })
    }
    useEffect(() => {
        getRecorder()
    }, [])
    return (
        <div className="container patient-panel">
            <NotLogin notLogin={notLogin} setNotLogin={setNotLogin} />
            <div className="header patientLog-header">
                <div className="search">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateRangePicker
                        startText="开始时间(00:00:00)"
                        endText="结束时间(00:00:00)"
                        value={calendarValue}
                        onChange={(newValue) => {
                            setCalendarValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                            </>
                        )}
                        />
                    </LocalizationProvider>
                    <Button variant="outline-primary" className="datePickerBtn" onClick={filterByDate}>筛选</Button>
                </div>
                <div className="icon">
                  <Tooltip title="返回病人列表">
                      <IconButton>
                        <FontAwesomeIcon icon={faBackward} className="operation" onClick={()=>{navigate("/patient")}}/>
                      </IconButton>
                  </Tooltip>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>病人编号</th>
                        <th>检查时间</th>
                        <th>结果保存路径</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recorderList.map((recorder)=>(
                            <tr>
                              <td>{recorder["id"]}</td>
                              <td>{recorder["patientid"]}</td>
                              <td>{recorder["time"]}</td>
                              <td>{recorder["path"]}</td>                  
                              <td>
                                  <Button variant="link" onClick={()=>{}}>查看图片</Button>
                                  <Button variant="link" onClick={()=>{delelteLog(recorder["id"])}}>删除</Button>
                              </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {recorderList.length === 0 && (<span>没有数据</span>)}
        </div>
    )
}

export default PatientLog
