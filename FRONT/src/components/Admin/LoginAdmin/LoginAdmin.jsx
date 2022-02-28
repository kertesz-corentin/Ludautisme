import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './loginadmin.scss';


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
            className={classnames('loginadmin', className)}
            {...rest}
         >
         <h1>LOGIN ADMIN</h1>
        <form className="settings-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="settings-input"
            value= {mailValue}
            onChange={handleMailChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="settings-input"
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
