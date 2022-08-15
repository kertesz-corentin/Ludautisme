import React from 'react';
import PropTypes from 'prop-types';
//import './modifypassworldmodal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField , Typography} from '@mui/material';
import { useState } from 'react';
import AlertMessage from '../../Reusable/AlertMessage/AlertMessage';
import api from '../../../../requests';

const RecoverPasswordModal = ({className, ...rest}) => {

    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();

  function handleMailChange (event) {
    setMailValue(event.target.value)
}

const handleMailSubmit = async(event) => {
    event.preventDefault();
        const mail = {
            email:mailValue,
            url:window.location.origin
        }
        const response = await api.post('/login/forgot-password',mail)

        if (response.status === 200) {
            setSeverity("success");
            setAlertMessage("email envoyé");

        } else {
            setSeverity("error");
            setAlertMessage(`${response.data}`);
        }
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
                label="Email"
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
                Envoyer le mail
            </Button>
            {alertMessage && severity && (
                    <AlertMessage
                        message={alertMessage}
                        severity={severity}
                    >
                    </AlertMessage>
                )}
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

