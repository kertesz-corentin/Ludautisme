import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './resetpwd.scss';
import { Box, Button, TextField } from '@mui/material';
import api from '../../../../requests/index';
import Logo from '../../../../public/logo.png';
import { toast } from 'react-toastify';
import PasswordChecklist from "react-password-checklist";


const ResetPassword = ({ className, ...rest }) => {

    const { token } = useParams();
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [validPassword, setValidPassword] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passwordValue = data.get('password');

        const newPassword = {
            token: token,
            password: passwordValue
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
                        <TextField
                            id='outlined'
                            label='Mot de passe'
                            name='member_number'
                            type='password'
                            className="updateuser-modal-inputs-item"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={e => setPassword(e.target.value)}
                        >
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id='outlined'
                            label='Confirmation mot de passe'
                            name='member_number'
                            type='password'
                            className="updateuser-modal-inputs-item"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={e => setPasswordAgain(e.target.value)}
                        >
                        </TextField>
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
