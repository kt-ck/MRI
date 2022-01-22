import "../localSCSS/MRIControls.scss";
import { useState } from 'react'
import TextRunning from "./TextRunning";
import Button from '@mui/material/Button';
const MRIFinalPanel = ({token}) => {
  const panelstatus = ["正在扫描", "暂停扫描", "停止扫描", "保存图片"]
  const [statusCode, setStatusCode] = useState(0);
  const [isrunning, setIsrunning] = useState(true);
  const [runningInfo, setRunningInfo] = useState("NULL");
  const StopScan = () => {
      setStatusCode(1);
      setIsrunning(false);
  }
  const EndScan = () => {
      setStatusCode(2);
      setIsrunning(false);
  }
  const SaveImg = () => {
      setStatusCode(3);
      setIsrunning(true);
  }
  const ContainueScan = () =>{
      setStatusCode(0);
      setIsrunning(true)
  }
  return (
      <div className="container">
          <div className="row row-center">
              <div className="status-panel">
                  <div className="screen">
                      <div className="screen-row">
                        {panelstatus[statusCode]}
                        {isrunning && <TextRunning />}
                      </div>
                      <div className="screen-row">
                        <span>Info:{runningInfo}</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="row row-center row-w-500">
            {
                statusCode === 1 ? (
                    <Button variant="contained" onClick={ContainueScan}>继续扫描</Button> 
                ):(
                    <Button variant="contained" onClick={StopScan}>暂停扫描</Button>
                )
            }
            
            <Button variant="contained" onClick={EndScan}>停止扫描</Button>
            <Button variant="contained" onClick={SaveImg}>保存图片</Button>
          </div>
      </div>
  )
};

export default MRIFinalPanel;
