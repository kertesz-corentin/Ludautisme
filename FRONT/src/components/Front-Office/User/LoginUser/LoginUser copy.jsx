import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
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



const theme = createTheme();
export default function SignIn() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onToggleOpen = () => {
      setIsOpen(!isOpen)
  }

  const [alertMessage, setAlertMessage] = useState();


    //Submit user connection form
  const handleSubmit = async(event) => {
    event.preventDefault();
        const data = new FormData (event.currentTarget);
        const email = data.get('email');
        const password =  data.get ('password');
        const response = await api.login(email,password,"user");

        if(response.status === 200) {
            navigate('/user/account')
            setIsOpen(!isOpen)
        } else {
            setAlertMessage(response.data.message);
            console.error(response);
        }
  };

    //Open submit form
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
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
        window.location.reload()
    }

// Use to recover password
    function handleForgetPassword () {
    }

  return (
            <button
        className={classnames('loginuser', {'loginuser-btnopen--isopen': isOpen })}
        type="button"
        onClick={onToggleOpen}
      >

     USER NOT CONNECTED */}
     <Box className={classnames('login-container','clay', { 'loginuser-isActive': isOpen })}>
         <button
         className={classnames('loginuser', {'loginuser-btnopen--isopen': isOpen })}
         type="button"
         onClick={onToggleOpen}
       >
 {/* when user connect or not make differents render */}
             <AccountCircle className = {isOpen && 'hidden'}fontSize="large" />
       </button>
 {/* Here even is this condition looks useless, she's not and delete her will make a secound btn appears whe user not connected. */}
         {!userToken
             ?
                 <Box>
                     {isOpen && (
                         <ThemeProvider theme={theme}>
                             <Container component="main" maxWidth="xs">
                                 <CssBaseline />
                                     <Box
                                     sx={{
                                         marginTop: 1,
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'center',
                                     }}
                                     >
                                         <Typography component="h1" variant="h6">
                                             Se connecter<Popover
                                                 id={id}
                                                 open={open}
                                                 anchorEl={anchorEl}
                                                 onClose={handleClose}
                          eslint-disable-next-line no-console
                                                 anchorOrigin={{
                                                 vertical: 'bottom',
                                                 horizontal: 'left',
                                                 }}
                                             >
                                 <Typography sx={{ p: 2 }}>Venez nous rencontrer lors d'une permanence pour le faire ensemble!</Typography>
                                 </Popover>
                                 </Typography>
                                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                     <TextField
                                     margin="normal"
                                     required
                                     fullWidth
                                     id="email"
                                     label="Adresse email"
                                     name="email"
                                     autoComplete="email"
                                     autoFocus
                                     />
                                     <TextField
                                     margin="normal"
                                     required
                                     fullWidth
                                     name="password"
                                     label="Mot de passe"
                                     type="password"
                                     id="password"
                                     autoComplete="current-password"
                                     />
                                     <Button
                                     type="submit"
                                     fullWidth
                                     variant="contained"
                                     sx={{ mt: 1, mb: 2 }}
                                     >
                                     Se connecter
                                     </Button>
                                     <Grid container className= "gridContainer">
                                         <Grid item xs>
                                         <RecoverPassworldModal/>
                                         </Grid>
                                         <Grid item xs>
                                             <Button onClick={handleClick}>
                                             Pas encore de compte?
                                             </Button>
                                             <Popover
                                                 sx={{ borderRadius: 8}}
                                                 id={id}
                                                 open={open}
                                                 anchorEl={anchorEl}
                                                 onClose={handleClose}
                                                 anchorOrigin={{
                                                 vertical: 'bottom',
                                                 horizontal: 'left',
                                                 }}
                                             >
                                                 <Typography  sx={{ p: 2, borderRadius: 8}}>Venez nous rencontrer lors d'une permanence pour le faire ensemble!</Typography>
                                             </Popover>
                                         </Grid>
                                     </Grid>
                                     {alertMessage && (
                                         <AlertMessage
                                             message={alertMessage}
                                         >
                                         </AlertMessage>
                                     )}
                                 </Box>
                                 </Box>
                             </Container>

                         </ThemeProvider>
                     )}
                 </Box>
      :
             <button
         className={classnames('loginuser-btnopen', { 'loginuser-isConnect': isOpen || userToken })}
         type="button"
         onClick={onToggleOpen}
       >
         { isOpen  ?
                  <CloseIcon fontSize="large"/>
                  :
                  <AccountCircle fontSize="large" />
                  }
       </button>
         }
         <Box >
                     {(isOpen && userToken) &&  (
                         <ThemeProvider theme={theme}>
                             <Container component="main" maxWidth="xs">
                                 <CssBaseline />
                                     <Box
                                     sx={{
                                         marginTop: 1,
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'center',
                                     }}
                                     >

                                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                 <Grid container className= "gridContainer">
                                         <Grid item xs>
                                             <Link href="/user/account" variant="body2">
                                             Mon Compte
                                             </Link>
                                         </Grid>
                                         <Grid item xs>
                                             <Link href="/user/bookings" variant="body2" onClick={handleClick}>
                                             Mes réservations
                                             </Link>

//                                         </Grid>
//                                     </Grid>
//                                     <Button
//                                     onClick= {handleDisconnectClick}
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={{ mt: 1, mb: 2 }}
//                                     >
//                                     Se Déconnecter
//                                     </Button>

//                                 </Box>
//                                 </Box>
//                             </Container>

//                         </ThemeProvider>
//                     )}
//                 </Box>
//     </Box>
//   :
//   <Box className={classnames('loginuser', { 'loginuser-isConnect': isOpen })}>

//             <button
//         className={classnames('loginuser-btnopen', { 'loginuser': isOpen || userToken })}
//         type="button"
//         onClick={onToggleOpen}
//       >
//         { isOpen  ?
//                  <CloseIcon fontSize="large"/>
//                  :
//                  <AccountCircle fontSize="large" />
//                  }
//       </button>

//         <div >
//                     {(isOpen && userToken) &&  (
//                         <ThemeProvider theme={theme}>
//                             <Container component="main" maxWidth="xs">
//                                 <CssBaseline />
//                                     <Box
//                                     sx={{
//                                         marginTop: 1,
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center',
//                                     }}
//                                     >

//                                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                                 <Grid container className= "gridContainer">
//                                         <Grid item xs>
//                                             <Link href="/user/account" variant="body2">
//                                             Mon Compte
//                                             </Link>
//                                         </Grid>
//                                         <Grid item xs>
//                                             <Link href="/user/bookings" variant="body2" onClick={handleClick}>
//                                             Mes réservations
//                                             </Link>

//                                         </Grid>
//                                     </Grid>
//                                     <Button
//                                     onClick= {handleDisconnectClick}
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={{ mt: 1, mb: 2 }}
//                                     >
//                                     Se Déconnecter
//                                     </Button>

//                                 </Box>
//                                 </Box>
//                             </Container>

//                         </ThemeProvider>
//                     )}
//                 </div>
//     </Box>
  );
}


