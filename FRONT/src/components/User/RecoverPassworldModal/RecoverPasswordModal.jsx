import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
//import './modifypassworldmodal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField , Typography} from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {requestGetNewPassword} from '../../../requests/requestsUser/recoverpassword'
import api from '../../../requests';



const RecoverPasswordModal = ({className, ...rest}) => {


  function handleMailChange (event) {
    setMailValue(event.target.value)
    console.log(`Mail`, event.target.value)
}

const handleMailSubmit = async(event) => {
    event.preventDefault();
        const mail = {
            email:mailValue,
            url:window.location.origin
        }
        console.log(`Mail where send newPassword`, mail);
        const response = await api.post('/login/forgot-password',mail)
        console.log(response);

}

const [mailValue, setMailValue]= useState()

  return (
    <Box component="form" onSubmit={handleMailSubmit} noValidate sx={{ mt: 1 }}>
         <Typography>
            Veuillez entrer votre mail pour recevoir votre nouveau mot de passe
          </Typography>
        <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Mot de passe"
                type="string"
                fullWidth
                variant="standard"
                value= {mailValue}
                onChange={(event) => handleMailChange(event, mailValue)}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            >
                Envoyer le mot de passe
            </Button>
    </Box>
    );
};

RecoverPasswordModal.propTypes = {
    className: PropTypes.string,
};
RecoverPasswordModal.defaultProps = {
    className: '',
};
export default React.memo(RecoverPasswordModal);

