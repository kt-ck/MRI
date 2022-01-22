import "../localSCSS/MRIControls.scss";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon, IconButton } from "@mui/material";
const StartToScan = ({ token, scanParam, setScanParam}) => {
    const [xprFile, setXprFile] = useState(scanParam["xprFile"]);
    const [param, setParam] = useState(scanParam["param"]);
    const deleteXprFile = (itemname) => {
        let temp = []
        scanParam["xprFile"].forEach((item)=>{
            if(item["name"] !== itemname){
                temp.push(item);
            } 
        })
        scanParam["xprFile"] = temp
        setScanParam(scanParam)
        setXprFile(temp)
    }
    return (
        <>
          <div className="container">
            <div className="row row-h-100">
                <h5>扫描所需的所有参数及文件，确认无误后开始扫描</h5>
            </div>
            <div className="row row-center">
                <div className="paramBlock">
                    <span>
                        参数列表
                    </span>
                    {
                        param && param.length > 0 ? (
                            <ListGroup>
                            { param.map((item)=>(
                                    <ListGroup.Item>
                                        <div className="item">
                                            <span>{item["name"]}</span>
                                            <IconButton>
                                              <DeleteIcon className="delete-icon"/>
                                            </IconButton>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup> 
                        ):(
                            <div className="no-data">No Data</div>
                        )
                    }
                    
                </div>
                <div className="paramBlock">
                    <span>
                        Xpr文件
                    </span>
                    {xprFile && xprFile.length > 0 ? (
                        <ListGroup>
                        { xprFile.map((item)=>(
                                <ListGroup.Item>
                                    <div className="item">
                                        <span>{item["name"]}</span>
                                        <IconButton onClick={()=>{deleteXprFile(item["name"]);}}>
                                          <DeleteIcon className="delete-icon" />
                                        </IconButton>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ): (
                        <div className="no-data">No Data</div>
                    )
                    }
                </div>
                
            </div>
          </div>
        </>
    )
}

export default StartToScan
