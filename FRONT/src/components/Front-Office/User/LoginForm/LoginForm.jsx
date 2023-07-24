import React, { useState } from 'react';
import { Box,Typography, Grid, TextField, Button, Popover} from '@mui/material';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import api from '../../../../requests/index';
import RecoverPasswordModal from '../RecoverPasswordModal/RecoverPasswordModal';
import './loginform.scss'
import ButtonUnstyled  from '@mui/base/ButtonUnstyled';
import { toast } from 'react-toastify';

const LoginForm = ({handleCloseLogin, ...rest}) => {
    const navigate = useNavigate();

    const [recover, setRecover] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRecover = () =>{
        setRecover(!recover);
    }

    //Submit user connection form
    const handleSubmit = async(event) => {
        event.preventDefault();
            const data = new FormData (event.currentTarget);
            const email = data.get('email');
            const password =  data.get ('password');
            const response = await api.login(email,password,"user");

            if(response.status === 200) {
                navigate('/user/account')
                handleCloseLogin();
            } else {
                toast.error(response.data.message);
            }
    };

    return (
    <Box className="loginForm">
    {!recover ?
    <>
        <Typography sx={{textAlign : "center"}} component="h1" variant="h6" className="loginForm-connect-typo"> Se connecter </Typography>
        <Box className="loginForm-form" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                            className="loginForm-textfield"
                            margin="normal"
                            required
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            className="loginForm-textfield"
                            required
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            />
                            <ButtonUnstyled
                            className="loginForm-submit"
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            >
                                SE CONNECTER
                            </ButtonUnstyled>
            </Box>
            <Box>
            <Grid container className= "gridContainer">
                <Grid item xs>
                <Button variant="outlined" onClick={handleRecover}>
                    Mot de Passe oublié
                </Button>
                </Grid>
                <Grid item xs>
                    <Button onClick={handleClick}>
                        Pas encore de compte?
                    </Button>
                </Grid>

            </Grid>
            <Popover
                        sx={{ borderRadius: 8, marginTop: "25px"}}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                    >
                        <Typography  sx={{ p: 2, borderRadius: 8}}>
                                Venez nous rencontrer lors d'une permanence pour le créer ensemble!
                        </Typography>
            </Popover>

        </Box>
    </>
    :
    <>
        <RecoverPasswordModal/>
    </>
    }
    </Box>
    )};

LoginForm.propTypes = {
    className: PropTypes.string,
};
LoginForm.defaultProps = {
    className: '',
};
export default React.memo(LoginForm);
