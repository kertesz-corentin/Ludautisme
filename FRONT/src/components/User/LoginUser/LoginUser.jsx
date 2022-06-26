import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import api from '../../../requests/index';
import './loginuser.scss';
import {useNavigate} from "react-router-dom";
import LoginForm from '../LoginForm/LoginForm';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import MenuUser from '../MenuUser/MenuUser'

export default function SignIn() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

    //Open submit form
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenLogin = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleCloseLogin = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //Get local storage user info
    const user = JSON.parse(localStorage.getItem('user'));
    const [userToken, setUserToken] = useState ();
    const [userId, setUserId] = useState ();

    if (user && !userToken && !userId){
        setUserToken(user.token) ;
        setUserId(user.id);
    }

//Use to disconnect reset token
    function handleDisconnectClick (event) {
        api.logout();
        handleCloseLogin();
        navigate('/');
        window.location.reload();
    }

  return (

      <Box className="loginuser">
        <ButtonUnstyled
            className = "loginuser-button"
            variant="contained"
            onClick={handleOpenLogin}
            >
            <AccountCircle className = {isOpen ? 'hidden' : ''} fontSize="large" />
        </ButtonUnstyled>
        <Popover
            sx={{ marginTop: "5px",
                 borderBottomLeftRadius : "10px"}}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseLogin}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
            <Box className = "loginuser-popover">
            {!userToken ?
                <LoginForm handleCloseLogin = {handleCloseLogin}/>
                :
                <Box>
                <MenuUser display="login" handleCloseLogin={handleCloseLogin}/>
                <Button
                onClick= {handleDisconnectClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                >
                    Se Déconnecter
                </Button>
                </Box>
            }
        </Box>
        </Popover>
      </Box>
  );
}


