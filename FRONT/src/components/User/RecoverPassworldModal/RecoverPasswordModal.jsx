import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
//import './modifypassworldmodal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {requestGetNewPassword} from '../../../requests/requestsUser/recoverpassword'

const RecoverPasswordModal = ({className, ...rest}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };



  function handleMailChange (event) {
    setMailValue(event.target.value)
    console.log(`Mail`, event.target.value)
}

const handleMailSubmit = async(event) => {
    event.preventDefault();
        const mail = {
            mail:mailValue
        }
        console.log(`Mail where send newPassword`, mail)
        handleClose()
}

const [mailValue, setMailValue]= useState()

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
            Mot de passe oublié ?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Valider</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrer votre mail pour recevoir votre nouveau mot de passe
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mon adresse mail"
            type="password"
            fullWidth
            variant="standard"
            value= {mailValue}
            onChange={(event) => handleMailChange(event, mailValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMailSubmit}>Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

RecoverPasswordModal.propTypes = {
    className: PropTypes.string,
};
RecoverPasswordModal.defaultProps = {
    className: '',
};
export default React.memo(RecoverPasswordModal);

