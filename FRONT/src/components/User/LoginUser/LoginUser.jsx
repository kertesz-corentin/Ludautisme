import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import classnames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../requests/index';
import './loginuser.scss';
import {useNavigate} from "react-router-dom";
// import AccountMenu from '../AccountMenu/AccountMenu';
import RecoverPassworldModal from '../RecoverPassworldModal/RecoverPasswordModal';
import AlertMessage from '../../AlertMessage/AlertMessage';
import LoginForm from '../LoginForm/LoginForm';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import MenuUser from '../MenuUser/MenuUser'



const theme = createTheme();
export default function SignIn() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onToggleOpen = () => {
      setIsOpen(!isOpen)
  }

  const closeLoginMenu = () =>{
      setIsOpen(false);
  }

  const [alertMessage, setAlertMessage] = useState();

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
        setIsOpen(!isOpen)
        navigate('/')
    }

// Use to recover password
    function handleForgetPassword () {
        console.log(`Envoyer le mot de passe`)
    }

  return (

      <Box className="loginuser">
        <ButtonUnstyled
            className = "loginuser-button"
            variant="contained"
            onClick={handleOpenLogin}
            >
            <AccountCircle className = {isOpen && 'hidden'}fontSize="large" />
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


