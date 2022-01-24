import "../localSCSS/ImgProcess.scss";
import { AccessAlarmOutlined,ZoomIn, ZoomOut,RotateLeft,RotateRight, Straighten, FolderOpen,Search, CancelPresentation} from "@mui/icons-material";
import { InputGroup, Button, FormControl,ListGroup } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
const ImgProcess = ({ token }) => {
    const toolIcon = [{
        "label": "放大",
        "icon" : <ZoomIn />
    },{
        "label": "缩小",
        "icon" : <ZoomOut />
    },{
        "label": "测量角度",
        "icon" : <AccessAlarmOutlined />
    },{
        "label": "左转",
        "icon" : <RotateLeft />
    },{
        "label": "右转",
        "icon" : <RotateRight />
    },{
        "label": "测量距离",
        "icon" : <Straighten />
    },{
        "label": "功能1",
        "icon" : <AccessAlarmOutlined />
    },{
        "label": "功能2",
        "icon" : <AccessAlarmOutlined />
    },{
        "label": "功能3",
        "icon" : <AccessAlarmOutlined />
    },{
        "label": "打开",
        "icon": <FolderOpen />
    }]
    const [dcmFileNameList, setDcmFileNameList] = useState([]);
    const [dcmShowList, setDcmShowList] = useState([]);
    const [ShowNameSet, setShowNameSet] = useState(new Set());
    // const ShowNameSet = new Set()
    useEffect(() => {
      const getDcmFileList = () => {
        axios({
            method: 'post',
            url: '/host/api/imgProcess/getDcmFile',
            headers: {
                'Authorization': "MRI " + token 
            }
        }).then((res)=>{
            // console.log(res.data.data)
            setDcmFileNameList(res.data.data["files"])
          }).catch((err)=>{
            console.log(err)
          })
      }
      const getDcmImg = () => {
          axios({
              method: 'post',
              url: '/host/api/imgProcess/getDcmImg',
              headers: {
                'Authorization': "MRI " + token 
              }
          }).then((res) => {
              console.log(res.data.data);
          }).catch((err) => {
              console.log(err);
          })
      };
      getDcmFileList();
      getDcmImg();
      
    }, []);
    const getTargetXprFile = (item) => {
        item["xpr_name"] = item["xpr_name"].split(".")[0] + ".png"
        console.log(item["xpr_name"]);
        console.log(ShowNameSet.has(item["xpr_name"]));
        if(!ShowNameSet.has(item["xpr_name"])){
            dcmShowList.push(item)
            setDcmShowList([...dcmShowList])
            ShowNameSet.add(item["xpr_name"])
            setShowNameSet(new Set([...ShowNameSet]))
        }
    }
    const deleteDcmShow = (delItem) => {
        let temp = []
        dcmShowList.forEach((item)=>{
            if(item["xpr_name"] !== delItem["xpr_name"]){
                temp.push(item)
            }
        })
        setDcmShowList(temp)
        ShowNameSet.delete(delItem["xpr_name"])
        setShowNameSet(ShowNameSet)
    }
    return (
        <div className="container flex-main-center">
            <div className="panel">
                <div className="imgpanel">
                    {
                        dcmShowList.map((item) => (
                          <div className="dcm-img">
                            <Button variant="outline-secondary" className="dcm-img-close" onClick={()=>deleteDcmShow(item)}>
                              <CancelPresentation />
                            </Button>
                            <img src={`/host/api/imgProcess/mri-img?person=${item["part"]}&file=${item["xpr_name"]}`} alt={`${item["xpr_name"]}`}/>
                          </div>
                        ))
                    }
                </div>
                <div className="toolBox">
                    { toolIcon.map((item, index)=>{
                        return (
                        
                            <div className={`icon${index} icon-center`}>
                                <Tooltip title={item["label"]}>
                                    <Button variant="outline-secondary" className="icon-btn">
                                    {item["icon"]}
                                    </Button>
                                </Tooltip>
                            </div>
                        
                        )
                    })}
                    
                    <div className="searchBar">
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="search..."
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            <Search />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="list-group">
                        <ListGroup>
                            {
                                dcmFileNameList.map((item) => (
                                    <ListGroup.Item className="list-item" onClick={()=>getTargetXprFile(item)}>  
                                        {item["xpr_name"]} 
                                    </ListGroup.Item>
                                ))
                            }
                        
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgProcess
