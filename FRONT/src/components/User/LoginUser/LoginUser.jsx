import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import classnames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { requestLoginUser } from '../../../requests/requestsUser/login';
import './loginuser.scss';
import { getLocalBearerToken } from '../../../requests';
import { removeBearerToken } from '../../../requests';
import {useNavigate} from "react-router-dom";
import AccountMenu from '../AccountMenu/AccountMenu';




const theme = createTheme();
export default function SignIn() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onToggleOpen = () => {
      setIsOpen(!isOpen)
  }

    //Use to send Datas
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData (event.currentTarget);
    const email = data.get('email');
    const password =  data.get ('password');
    const response = await requestLoginUser(email,password);
    console.log(`response`, response);
    if(response.status === 200) {
        navigate('/user/account')
    }
    else{navigate('/')}
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const userToken = getLocalBearerToken();
    console.log(`Voila le userToken`, userToken);

//Use to disconnect reset token
    function handleDisconnectClick (event) {
        removeBearerToken()
        console.log(`should disconnect`,)
        setIsOpen(!isOpen)
        navigate('/')
    }

  return (
    <div className="loginuser">
    {!userToken ?
        <button
        className={classnames('loginuser-btnopen', { 'loginuser-btnopen--isopen': isOpen })}
        type="button"
        onClick={onToggleOpen}
      >
{/* when user connect or not make differents render */}
        { isOpen  ?
                 <CloseIcon fontSize="large"/>
                 :

                 <AccountCircle fontSize="large" />
                 }
      </button>
      :
       ""}

        {!userToken
            ?
                <div>
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
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <SentimentSatisfiedAltIcon/>
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Se connecter<Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                        // eslint-disable-next-line no-console
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
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                            Mot de passe oublié
                                            </Link>
                                        </Grid>
                                        <Grid item xs>
                                            <Link href="#" variant="body2" onClick={handleClick}>
                                            Pas Encore de compte?
                                            </Link>
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                                }}
                                            >
                                                <Typography sx={{ p: 2 }}>Venez nous rencontrer lors d'une permanence pour le faire ensemble!</Typography>
                                            </Popover>
                                        </Grid>
                                    </Grid>
                                </Box>
                                </Box>
                            </Container>

                        </ThemeProvider>
                    )}
                </div>
            :   <div>
                    <AccountMenu/>
                </div>
        }
    </div>
  );
}


