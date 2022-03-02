import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import classnames from 'classnames';

import './loginuser.scss';

const LoginUser = ({
    mailValue,
    passwordValue,
    onInputsChange,
    onSubmit,
    className, ...rest}) => {

    const [isOpen, setIsOpen] = useState(false);

    const onToggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (event, inputName) => {
        onInputsChange(inputName, event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    }

   return (
       <div
            className={classnames('loginuser', className)}
            {...rest}
         >
        <button
        className={classnames('loginuser-btnopen', { 'loginuser-btnopen--isopen': isOpen })}
        type="button"
        onClick={onToggleOpen}
      >
        <AccountCircle fontSize="large" />
      </button>
      {isOpen && (
        <form className="loginuser-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={mailValue}
            onChange={(event) => handleInputChange(event, 'mail')}
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={passwordValue}
            onChange={(event) => handleInputChange(event, 'password')}
          />
          <button className="loginuser-submit" type="submit">
            Se connecter
          </button>
        </form>
      )}

        </div>
   );
};

LoginUser.propTypes = {
    className: PropTypes.string,
    mailValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onInputsChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onToggleOpen: PropTypes.func.isRequired,

};
LoginUser.defaultProps = {
    className: '',
};
export default React.memo(LoginUser);
