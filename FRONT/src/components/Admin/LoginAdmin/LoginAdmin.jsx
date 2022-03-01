import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './loginadmin.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const LoginAdmin = ({
    className,
     ...rest
    }) => {

        const [mailValue,setMailValue] = useState('');
        const [passwordValue, setPasswordValue]= useState('');
        const [isAbble,setIsAbble] = useState(false);

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
         <h1 className= 'title'>LOGIN ADMIN</h1>
        <form className="admin-form" onSubmit= {handleSubmit} >
          <TextField
            className= "input-admin"
            label="Email"
            type="email"
            value= {mailValue}
            onChange={handleMailChange}
          />
          <TextField
            className= "input-admin"
            type="password"
            label="Mot de passe"
            value={passwordValue}
            onChange={handlePasswordChange}
          />
          { mailValue !== ''&& passwordValue !== ''
            ?
            <Button variant="contained" className= "submit-admin" type= "submit" onSubmit= {handleSubmit} endIcon={<SendIcon />}  >
                Se Connecter
            </Button>
            :
            <Button variant="contained" className= "submit-admin" type= "submit" onSubmit= {handleSubmit} endIcon={<SendIcon />} disabled >
                Se Connecter
            </Button>
          }
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
