import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Popover } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import api from '../../../../requests/index';
import RecoverPasswordModal from '../RecoverPasswordModal/RecoverPasswordModal';
import './loginform.scss'
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const LoginForm = ({ handleCloseLogin, ...rest }) => {
    const navigate = useNavigate();

    const [recover, setRecover] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleRecover = () => {
        setRecover(!recover);
    }

    //Submit user connection form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const response = await api.login(email, password, "user");

        if (response.status === 200) {
            navigate('/user/account')
            handleCloseLogin();
        } else {
            toast.error(response.data.message);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box className="loginForm">
            {!recover ?
                <>
                    <Typography sx={{ textAlign: "center" }} component="h1" variant="h6" className="loginForm-connect-typo"> Se connecter </Typography>
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
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                margin="normal"
                                required
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                label="Mot de passe"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>}
                            />
                        </FormControl>
                        <Button
                            className="loginForm-submit"
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            SE CONNECTER
                        </Button>
                        <Button variant="outlined" onClick={handleRecover}>
                            Mot de Passe oublié
                        </Button>
                        <Button onClick={handleClick}>
                            Pas encore de compte?
                        </Button>
                        <Popover
                            sx={{ borderRadius: 8, marginTop: "25px" }}
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
                            <Typography sx={{ p: 2, borderRadius: 8 }}>
                                Venez nous rencontrer lors d'une permanence pour le créer ensemble!
                            </Typography>
                        </Popover>
                    </Box>
                </>
                :
                <>
                    <RecoverPasswordModal />
                </>
            }
        </Box>
    )
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
LoginForm.defaultProps = {
    className: '',
};
export default React.memo(LoginForm);
