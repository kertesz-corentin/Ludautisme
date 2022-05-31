import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import './resetpwd.scss';
import { TextField,Box,Button } from '@mui/material';
import { Typography } from '@mui/material';
import api from '../../requests/index';
import { useNavigate } from 'react-router';


const ResetPwd = ({className, ...rest}) => {
    const [passwordValue, setpasswordValue] = useState()
    const navigate = useNavigate();
    const { token } = useParams();
    console.log(token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passwordValue = data.get('password');
        console.log(`envoi du nouveau mot de passe`, passwordValue);

        const newPassword = {
            token:token,
            password:passwordValue
        }
        console.log(newPassword);
        const response = await api.resetPassword('/login/reset-password',newPassword);
        if (response.status === 200){
            navigate('/');
        }
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
            label='password'
            name='password'
            type='string'
            className="modal-inputs-item"
            value= {passwordValue}
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
