import '../localSCSS/login.scss';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";
const Login = ({ onLogin, isLogin, getInfo, onLogout, onNavchange, setLogin }) => {
    const [greenboxstate, setgreenboxstate] = useState(0);
    const [goright, setgoright] = useState(false);
    const [goleft, setgoleft] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [err_email, seterr_email] = useState(false);
    const [loginErr, setLoginErr] = useState(false);
    const [errText, setErrText] = useState("")
    const navigate = useNavigate();
    const greenBoxOnClick = (e)=>{
        if (greenboxstate === 0){
            setgoright(true);
            setgoleft(false);
        }else{
            setgoleft(true);
            setgoright(false);
        }
        setgreenboxstate(1 - greenboxstate)
    }
    const Login = (e)=>{
        e.preventDefault()
        const data = {
            email,
            password
        }
        console.log(data)
        axios.post("/host/api/login", data)
          .then((res)=>{
            console.log(res.data)
            onLogin(res.data.user.email, res.data.user.name, res.data.user.password, res.data.token);
            setLogin(true);
            navigate('/patient');
            onNavchange(1);
          })
          .catch((err)=>{
            setLoginErr(true);
            console.log(err.response);
            setErrText(err.response.data.msg);
          })    
    }
    const Logon = (e) => {
        e.preventDefault()
        const data = {
            name,
            email,
            password
        }
        console.log(data)
        axios.post("/host/api/register", data)
          .then((res)=>{
            greenBoxOnClick()
          })
          .catch((err)=>{
            console.log(err)
            if(err.response.status === 409){
                seterr_email(true);
            }
          })
    }
    return (
        <div className="container container_login" >
          <Collapse in={loginErr}>
                <Alert
                severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setLoginErr(false);
                    }}
                    >
                    <FontAwesomeIcon icon={faTimesCircle}/>
                    </IconButton>
                }
                sx={{ width: '76vw' }}
                >
                    <AlertTitle>Error</AlertTitle>
                    {errText}
                </Alert>
            </Collapse>
          { 
            !isLogin?(
                <div className="login-box">
                    <div className={`green-box ${goright &&"green-box-go-right"} ${goleft && "green-box-go-left"}`}>
                    {
                        greenboxstate === 0 ? (
                            <div className={`${goright &&"lefttext-go-left"} ${goleft && "lefttext-go-right"}`}>
                                <section className="green-box-section">
                                    <h1>MRI软件系统</h1>
                                    <p>没有账号? 马上注册</p>
                                </section>
                                <button className="green-box-btn" onClick={greenBoxOnClick}>注册</button>
                            </div>
                        ): (
                            <div className={`${goright &&"righttext-go-left"} ${goleft && "righttext-go-right"}`}>
                                <section className="green-box-section">
                                    <h1>MRI软件系统</h1>
                                    <p>已经有账号? 马上登录</p>
                                </section>
                                <button className="green-box-btn" onClick={greenBoxOnClick}>登录</button>
                            </div>
                        )
                    }
                    </div>

                    <div className={`login-box-container ${greenboxstate === 0 && "login"}`}>
                    {
                        greenboxstate === 0?(
                        <>
                            <h3>登录</h3>
                            <form onSubmit={Login}>
                                <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                                <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                                <input type="submit" value="登录"/>
                            </form>
                        </>
                        ):(
                        <>
                            <h3>注册</h3>
                            <form onSubmit={Logon}>
                                <input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
                                {err_email && <><span className="err">邮箱已经被注册</span><br/></>}
                                <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                                <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                                <input type="submit" value="注册"/>
                            </form>
                        </>
                        )
                    }
                    </div>
                </div>
            ):(
              <>
                <div className='info'>
                    <div className='title'>
                        用户名
                    </div>
                    <div className='content'>
                       {getInfo().name}
                    </div>
                </div>
                <div className='info'>
                    <div className='title'>
                        邮箱
                    </div>
                    <div className='content'>
                       {getInfo().email}
                    </div>
                </div>
                <Button variant="success" className="quit-btn" onClick={onLogout}>退出登录</Button>
              </>
            )
          }
        </div>
    )
}

export default Login
