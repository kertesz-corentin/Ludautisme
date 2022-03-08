import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modifypassworldmodal.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';

const ModifyPassworldModal = ({className, ...rest}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passwordValue, setPasswordValue]= useState();

    function handlePasswordSubmit(event){
        event.preventDefault();
        console.log(`New Password to send Back`)
    }

    function handlePasswordChange (event) {
        setPasswordValue(event.target.value)
        console.log(`Password`, event.target.value)
    }

    return (
      <div>
        <Button onClick={handleOpen}>Modifier mon mot de passe</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modifypassworldmodal">
            <form>
                <TextField
                    label= "Entrez ici votre nouveau mot de passe"
                    type="text"
                    value= {passwordValue}
                    onChange={(event) => handlePasswordChange(event, passwordValue)}
                />
                <Button className="loginuser-submit" type="submit" onSubmit= {handlePasswordSubmit}>
                    Valider
                </Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
};

ModifyPassworldModal.propTypes = {
    className: PropTypes.string,
};
ModifyPassworldModal.defaultProps = {
    className: '',
};
export default React.memo(ModifyPassworldModal);
