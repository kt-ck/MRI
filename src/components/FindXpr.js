import "../localSCSS/MRIControls.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form'
function FindXpr({token, setScanParam, scanParam}) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'part', headerName: '分类', width: 130 },
        { field: 'xpr_name', headerName: '序列名称', width: 180 }
      ];
    const table2Col = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: '名称', width: 130 },
      { field: 'lays', headerName: '层数', width: 130 },
      { field: 'state', headerName: '状态', width: 130 },
    ]
    const [rows, setRows] = useState([]);
    const [table2Row, setTable2Row] = useState([]);
    const [SelectXpr, setSelectXpr] = useState([]);
    const [xprInfoShow, setXprInfoShow] = useState(false)
    const handleClose = () => setXprInfoShow(false);
    const handleShow = () => setXprInfoShow(true);
    const readXpr = function() {
      axios({
          method: "POST",
          url:  "/host/api/mricontrol/readxpr",
          headers: {
          'Authorization': "MRI " + token 
          }
      }).then((res)=>{
          setRows(res.data.data["files"])
        }).catch((err)=>{
          console.log(err)
        })
    };
    const selectXpr = function(ids){
      console.log(ids)
      const selectedIDs = new Set(ids);
      const selectedRowData = rows.filter((row) =>
        selectedIDs.has(row.id)
      );
      const Table2 = selectedRowData.map((row)=>{
        return {"id": row.id, "name": row["xpr_name"], "lays": 9,"state": " "}
      })
      setTable2Row(Table2)
      if("xprFile" in scanParam){
        scanParam["xprFile"] = Table2
        setScanParam(scanParam)
      }else{
        setScanParam({...scanParam,"xprFile": Table2})
      }
    };
    const getXprInfo = function(rowInfo){
      console.log(rowInfo)
      axios({
        method: "POST",
        url:  "/host/api/mricontrol/getXprInfo",
        data: {
          "rowdata": rowInfo["row"]
        },
        headers: {
        'Authorization': "MRI " + token 
        }
      }).then((res)=>{
          console.log(res.data.data)
          handleShow();
        }).catch((err)=>{
          console.log(err)
        })
    }

    const xprUpload = (e) => {
      let num = e.target.files["length"]
      
      scanParam["xprFile"] = scanParam["xprFile"] || [];
      let temp = []
      for(let i = 0; i < num; ++i){
        // console.log(i)
        temp.push({"id":"NULL","name": e.target.files[i].name, "lays":  9, "state":""})
      }
      // console.log(scanParam["xprFile"])
      console.log(temp)
      scanParam["xprFile"] = scanParam["xprFile"].concat(temp)
    
      setScanParam(scanParam)
    }
    useEffect(() => {
        readXpr()
    }, [])
    return (
      <>
        <Offcanvas show={xprInfoShow} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
        <div className="FindXpr-container">
          <div className="row r-h-100">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>您可以选择已有的序列文件，也可以使用本地序列文件</Form.Label>
              <Form.Control 
                type="file" 
                onChange={xprUpload}
                multiple 
              />
            </Form.Group>
          </div>
          <div className="row">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={13}
              rowsPerPageOptions={[13]}
              checkboxSelection
              className="xprSelect"
              onSelectionModelChange={selectXpr}
              disableSelectionOnClick
              onRowClick={getXprInfo}
            />
            <DataGrid
              rows={table2Row}
              columns={table2Col}
              pageSize={13}
              rowsPerPageOptions={[13]}
              className="xprSelect"
            />
          </div>
        </div>
      </>
    )
}

export default FindXpr
