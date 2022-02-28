import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './loginadmin.scss';
import TextField from '@mui/material/TextField';


const LoginAdmin = ({
    className,
     ...rest
    }) => {

        const [mailValue,setMailValue] = useState('');
        const [passwordValue, setPasswordValue]= useState('')
        function handleMailChange (event) {
            setMailValue(event.target.value)
            console.log(`Mail`, event.target.value)
        }
        function handlePasswordChange (event) {
            setPasswordValue(event.target.value)
            console.log(`password`, event.target.value)
        }
        function handleSubmit (event) {
            event.preventDefault();
            const userDatas = {mailValue, passwordValue}
            console.log(userDatas)
        }
   return (
       <div
            className={classnames('login-admin', className)}
            {...rest}
         >
         <h1>LOGIN ADMIN</h1>
        <form className="settings-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value= {mailValue}
            onChange={handleMailChange}
          />
          <TextField
            type="password"
            label="Mot de passe"
            value={passwordValue}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="settings-submit" onSubmit= {handleSubmit} >
            Se connecter
          </button>
        </form>

        </div>
   );
};

LoginAdmin.propTypes = {
    className: PropTypes.string,
};
LoginAdmin.defaultProps = {
    className: '',
};
export default React.memo(LoginAdmin);
