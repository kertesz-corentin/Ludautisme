import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './loginuser.scss';

const LoginUser = ({
    mailValue,
    passwordValue,
    isOpen,
    onInputsChange,
    onSubmit,
    onToggleOpen,
    className, ...rest}) => {

    const [isButtonDisable, setIsButtonDisable] = useState(true);

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
          <input
            className="loginuser-input"
            type="email"
            placeholder="Email"
            value={mailValue}
            onChange={(event) => handleInputChange(event, 'mail')}
          />
          <input
            className="loginuser-input"
            type="password"
            placeholder="Mot de passe"
            value={passwordValue}
            onChange={(event) => handleInputChange(event, 'password')}
          />
          <button className="loginuser-submit" type="submit" disabled={isButtonDisable}>
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
    isOpen: true,
};
export default React.memo(LoginUser);
