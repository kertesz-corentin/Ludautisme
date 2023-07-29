import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './resetpwd.scss';
import { TextField, Box, Button } from '@mui/material';
import api from '../../../../requests/index';
import Logo from '../../../../public/logo.png';
import { toast } from 'react-toastify';


const ResetPassword = ({ className, ...rest }) => {

    const [passwordValue] = useState();
    const { token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passwordValue = data.get('password');
        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+-€])(?=.{8,})');

        const newPassword = {
            token: token,
            password: passwordValue
        }

        if (regex.test(passwordValue)) {
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
    //Rendre le formulaire controlable
    return (
        <div className="pwd-container">
            <Box className="resetpwd" component="form" onSubmit={handleSubmit}>

                <div className="header-logo">
                    <img src={Logo} className="header-logo-img" alt="Logo" />
                </div>

                <h1>Veuillez entrer votre nouveau mot de passe</h1>
                <TextField
                    id='outlined'
                    label='password'
                    name='password'
                    type='string'
                    className="modal-inputs-item"
                    value={passwordValue}
                >
                </TextField>
                <p>
                    Votre mot de passe doit respecter les règles suivantes
                </p>
                <ul class="password_limit">
                    <li>8 caractères minimum</li>
                    <li>Une majuscule</li>
                    <li>Une minuscule</li>
                    <li>Un chiffre et une lettre</li>
                    <li>Un des caractères spéciaux suivants: ! @ $ % + - & # ^ €</li>
                </ul>
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
