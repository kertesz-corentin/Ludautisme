import React from 'react';
import PropTypes from 'prop-types';
import './modifypasswordmodal.scss';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../../../../requests';
import { useNavigate } from "react-router-dom";
import AlertMessage from '../../Reusable/AlertMessage/AlertMessage';

const ModifyPasswordModal = ({ className, ...rest }) => {

    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlePasswordSubmit(event) {
        event.preventDefault();
        const newPassword = {
            password: passwordValue
        }
        if (regex.test(passwordValue)) {
            if (!user.token) {
                const response = api.resetPassword('/login/reset-password', newPassword);
                if (response.status === 200) {
                    navigate('/');
                } else {
                    console.error(response.data);
                }
                handleClose()
            } else {
                api.put(`/customer/user/${user.id}`, newPassword);
                setSeverity("success");
                setAlertMessage("Mot de passe changé");
                handleClose();
            }
        } else {
            setSeverity("error");
            setAlertMessage('Le mot de passe ne respecte pas les règles de sécurité');
        }
        
    }


    function handlePasswordChange(event) {
        setPasswordValue(event.target.value)
        console.log(`Password`, event.target.value)
    }

    const [passwordValue, setPasswordValue] = useState()

    return (

        <div>
            <Button className='ModifyPasswordModal-button' variant="outlined" onClick={handleClickOpen}>
                Modifier mon mot de passe
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Valider</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer votre nouveau mot de passe
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={passwordValue}
                        onChange={(event) => handlePasswordChange(event, passwordValue)}
                    />
                </DialogContent>
                <DialogContent>
                    <p>
                        Votre mot de passe doit respecter les règles suivantes
                    </p>
                    <ul class="password_limit">
                        <li>8 caractères minimum</li>
                        <li>Une majuscule</li>
                        <li>Une minuscule</li>
                        <li>Un chiffre et une lettre</li>
                        <li>Un des caractères spéciaux suivants: ! @ # $ % ^ & </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePasswordSubmit}>Valider</Button>
                </DialogActions>
                <DialogActions>
                {alertMessage && severity && (
                    <AlertMessage
                        message={alertMessage}
                        severity={severity}
                    >
                    </AlertMessage>
                )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

ModifyPasswordModal.propTypes = {
    className: PropTypes.string,
};
ModifyPasswordModal.defaultProps = {
    className: '',
};
export default React.memo(ModifyPasswordModal);
