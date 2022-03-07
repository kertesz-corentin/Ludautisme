import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './recoverpasswordmodal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {requestGetNewPassword} from '../../../requests/requestsUser/recoverpassword'

const RecoverPasswordModal = ({className, ...rest}) => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mailValue,setMailValue] = useState('');

  function handleMailChange (event) {
    setMailValue(event.target.value)
    console.log(`Mail`, event.target.value)
}

const handleMailSubmit = async(event) => {
    event.preventDefault()
    const data = new FormData (event.currentTarget);
    console.log(`A ENVOYER AU BACK`)
    const userMail = data.get('email')
    const response = await requestGetNewPassword(userMail)
    console.log(`Voila le mail où envoyer le nouveau mot de passe:`, userMail)
    console.log(`voila la  réponse de l'Api`, response.status)
}

  return (
    <div>
      <Button onClick={handleOpen}>Mot de passe oubliée?</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className = "recoverpasswordmodal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Entrez votre adresse mail pour réinitialiser votre mot de passe
          </Typography>
          <form className="mail-form" >
          <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                value={mailValue}
                onChange={(event) => handleMailChange(event, 'mail')}
                autoFocus
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit={handleMailSubmit}
                sx={{ mt: 1, mb: 2 }}
                >
                Nouveau mot de passe
                </Button>
            </form>
        </Box>
      </Modal>
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
