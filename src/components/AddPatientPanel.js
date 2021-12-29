import "../localSCSS/addpatientpanel.scss";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import axios from "axios";
const AddPatientPanel = ({ panelIn,setPanelIn, token,defaultName, defaultSex, defaultAge, defaultHeight, defaultWeight,defaultId, submitUrl,refrash,submitName}) => {
    const [name, setName] = useState(defaultName);
    const [sex, setSex] = useState(defaultSex);
    const [age, setAge] = useState(defaultAge);
    const [height, setHeight] = useState(defaultHeight);
    const [weight, setWeight] = useState(defaultWeight);
    const [quit, setQuit] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        const postdata = {
            "id" : defaultId,
            "name": name ? name: defaultName,
            "sex" : sex ? sex : defaultSex,
            "age" : age ? age : defaultAge,
            "height": height? height :defaultHeight,
            "weight": weight? weight: defaultWeight,
        }
        axios({
          method: "POST",
          url:  submitUrl,
          data: postdata,
          headers: {
            'Authorization': "MRI " + token
          } 
        }).then((res) => {
            Quit()
            refrash()
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    const Quit = () => {
        setQuit(true);
        setPanelIn(false);
        setTimeout(()=>{
            setQuit(false);
        }, 1000);
        setName('');
        setSex('');
        setAge('');
        setHeight('');
        setWeight('');
    }
    return (
        <div className={`add-patient-panel ${panelIn && "fade-in"} ${quit && "fade-out"}`}>
            <div className={`panel ${panelIn && "panel-in"} ${quit && "panel-out"}`}>
                <FontAwesomeIcon icon={faTimesCircle} className="close" onClick={Quit}/>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-control">
                        <label >姓名</label>
                        <input type="text" placeholder={defaultName ? defaultName : "name"} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div> 
                    <div className="form-control"> 
                        <label >性别</label>
                        <input type="text" placeholder={defaultSex ? defaultSex : "sex"} value={sex} onChange={(e)=>{setSex(e.target.value)}}/>
                    </div>
                    <div className="form-control">
                        <label >年龄</label>
                        <input type="text" placeholder={defaultAge ? defaultAge : "age"} value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                    </div>
                    <div className="form-control">
                        <label >身高</label>
                        <input type="text" placeholder={defaultHeight ? defaultHeight : "height"} value={height} onChange={(e)=>{setHeight(e.target.value)}}/>
                    </div>
                    <div className="form-control">
                        <label >体重</label>
                        <input type="text" placeholder={defaultWeight ? defaultWeight : "weight"} value={weight} onChange={(e)=>{setWeight(e.target.value)}}/>
                    </div>
                    <div className="form-control-submit">
                        <input className="submit" type="submit" value={submitName}/>
                    </div>
                </form>
            
            </div>
        </div>
    )
}


AddPatientPanel.defaultProps = {
    defaultName: '',
    defaultAge: '',
    defaultSex: '',
    defaultHeight: '',
    defaultWeight: '',
    defaultId: '',
    submitName: "按钮",
}
export default AddPatientPanel
