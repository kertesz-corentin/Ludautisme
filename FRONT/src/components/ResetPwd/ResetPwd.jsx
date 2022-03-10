import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './resetpwd.scss';
import { TextField,Box,Button } from '@mui/material';
import { Typography } from '@mui/material';



const ResetPwd = ({className, ...rest}) => {
    const [passworldValue, setPassworldValue] = useState()


    function handleChangePassworld(event) {
        setPassworldValue(event.target.value)
        console.log(`new pwd`, event.target.value)
    }
    function handleSubmit (event) {
        event.preventDefault()
        console.log(`envoi du nouveau mot de passe`, passworldValue)
        const password = {
            password:passwordValue
        }
        const response = await api.post('/login/forgot-password',mail)
        console.log(response);
    }
//Rendre le formulaire controlable
   return (
    <Box className="resetpwd" component="form" onSubmit={handleSubmit}>
        <Typography className='modal-header-title'>
                            Veuillez entrer votre nouveau mot de passe
        </Typography>
        <TextField
            id='outlined'
            label='Passworld'
            name='Passworld'
            type='string'
            className="modal-inputs-item"
            value= {passworldValue}
            onChange={(event) => handleChangePassworld(event, passworldValue)}
        >
        </TextField>
        <Button
            type='submit'
            onSubmit={handleSubmit}
            className="modal-footer-submit"
            variant="contained"
        >
            Valider
        </Button>
    </Box>

   );
};

ResetPwd.propTypes = {
    className: PropTypes.string,
};
ResetPwd.defaultProps = {
    className: '',
};
export default React.memo(ResetPwd);
