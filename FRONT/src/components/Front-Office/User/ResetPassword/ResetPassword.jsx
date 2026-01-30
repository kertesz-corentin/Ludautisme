import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './resetpwd.scss';
import { Box, Button } from '@mui/material';
import api from '../../../../requests/index';
import Logo from '../../../../public/logo.png';
import { toast } from 'react-toastify';
import PasswordChecklist from "react-password-checklist";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';


const ResetPassword = ({ className, ...rest }) => {

    const { token } = useParams();
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPassword = {
            token: token,
            password
        }

        if (validPassword) {
            const response = await toast.promise(
                api.resetPassword('/login/reset-password', newPassword),
                {
                    pending: `Changement du mot de passe`,
                    error: 'Erreur lors du changement'
                }
            );
            if (response.status === 200) {
                toast.success("Mot de passe changé");
            } else {
                toast.error(`changement impossible`);
            }
        } else {
            toast.error('Le mot de passe ne respecte pas les règles de sécurité');
        }

    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    //Rendre le formulaire controlable
    return (
        <div className="pwd-container">
            <Box className="resetpwd" component="form" onSubmit={handleSubmit}>

                <div className="header-logo">
                    <img src={Logo} className="header-logo-img" alt="Logo" />
                </div>

                <h1>Veuillez entrer votre nouveau mot de passe</h1>
                <form>
                    <div>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                margin="normal"
                                required
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                label="Mot de passe"
                                sx={{ mb: 2 }}
                                onChange={e => setPassword(e.target.value)}
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
                    </div>
                    <div>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="password">Confirmation mot de passe</InputLabel>
                            <OutlinedInput
                                margin="normal"
                                required
                                name='member_number'
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                label="Confirmation mot de passe"
                                sx={{ mb: 2 }}
                                onChange={e => setPasswordAgain(e.target.value)}
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

                    </div>

                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={8}
                        value={password}
                        valueAgain={passwordAgain}
                        messages={{
                            minLength: "8 caractères minimum",
                            specialChar: "Au moins un caractère spécial",
                            number: "Au moins un chiffre",
                            capital: "Au moins une majuscule",
                            match: "Les deux mots de passe correspondent",
                        }}
                        onChange={(isValid) => { setValidPassword(isValid) }}
                    />
                </form>
                <Button
                    type='submit'
                    onSubmit={handleSubmit}
                    className="modal-footer-submit"
                    variant="contained"
                >
                    Valider
                </Button>
            </Box>
        </div>
    );
};

ResetPassword.propTypes = {
    className: PropTypes.string,
};
ResetPassword.defaultProps = {
    className: '',
};
export default React.memo(ResetPassword);
