import React from 'react'
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const NotLogin = ({notLogin, setNotLogin}) => {
    const navigate = useNavigate();
    return (
        <>
          <Collapse in={notLogin}>
                <Alert
                severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setNotLogin(false);
                    }}
                    >
                    <FontAwesomeIcon icon={faTimesCircle}/>
                    </IconButton>
                }
                sx={{ width: '76vw' }}
                >
                    <AlertTitle>Error</AlertTitle>
                    尚未登录 - <strong style={{cursor: "pointer"}} onClick={()=>{navigate('/login');}}>立即登录</strong>
                </Alert>
            </Collapse>  
        </>
    )
}

export default NotLogin
