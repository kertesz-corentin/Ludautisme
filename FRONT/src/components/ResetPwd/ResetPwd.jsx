import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './resetpwd.scss';
import { TextField,Box,Button } from '@mui/material';
import { Typography } from '@mui/material';


const ResetPwd = ({className, ...rest}) => {
    function handleSubmit () {
        console.log(`envoi du nouveau mot de passe`)
    }
   return (
    <Box className="resetpwd" component="form" onSubmit={handleSubmit}>
        <Typography className='modal-header-title'>
                            Veuillez entrer votre nouveau mot de passe
        </Typography>
        <TextField
            id='outlined'
            label='Password'
            name='Password'
            type='string'
            className="modal-inputs-item"
        >
        </TextField>
        <Button
            type='submit'
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
