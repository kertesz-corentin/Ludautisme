import React, { useState, useEffect } from 'react';
import {Link,Box,Typography, Grid, TextField, Button, Popover} from '@mui/material';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import api from '../../../requests/index';
import RecoverPasswordModal from '../RecoverPassworldModal/RecoverPasswordModal';

const LoginForm = ({closeLoginMenu, ...rest}) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
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
            console.log(response);
            if(response.status === 200) {
                navigate('/user/account')
                closeLoginMenu();
            } else {
                setAlertMessage(response.data.message);
                console.error(response);
            }
    };

    return (
    <Box>
    {!recover ?
    <>
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
                <Button variant="outlined" onClick={handleRecover}>
                    Mot de Passe oublié
                </Button>
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
                </Grid>
            </Grid>

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
