import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './usermyaccount.scss';
import MenuUser from '../MenuUser/MenuUser';
import Permanency from '../../Permanency/Permanency';
import { TextField } from '@mui/material';

const UserMyAccount = ({
    className,
     ...rest
    }) => {

    const [firstNameValue,setFirstNameValue] = useState('Michel');
    const [lastNameValue,setLastNameValue] = useState('Michel');
    const [addressValue,setAdressValue] = useState('France');
    const [mailValue,setMailValue] = useState('michel@michel');
    const [phoneValue,setPhoneValue] = useState('0000000000');
    const [passwordValue, setPasswordValue]= useState('coucou');

    function handleSubmit (event) {
        event.preventDefault()
        const newUserDatas = {firstNameValue,lastNameValue,addressValue,mailValue,phoneValue,passwordValue}
            console.log(`Voila les données à envooyer au back:`, newUserDatas)
    }
    function handleFirstNameChange (event) {
        setFirstNameValue(event.target.value)
        console.log(`Firstname`, event.target.value)
    }
    function handleLastNameChange (event) {
        setLastNameValue(event.target.value)
        console.log(`LastName`, event.target.value)
    }
    function handleAdressChange (event) {
        setAdressValue(event.target.value)
        console.log(`Adresse`, event.target.value)
    }
    function handleMailChange (event) {
        setMailValue(event.target.value)
        console.log(`Mail`, event.target.value)
    }
    function handlePhoneChange (event) {
        setPhoneValue(event.target.value)
        console.log(`Phone`, event.target.value)
    }
    function handlePasswordChange (event) {
        setPasswordValue(event.target.value)
        console.log(`Password`, event.target.value)
    }

   return (
       <div > Bienvenue Michel
         <Permanency/>
                <div className= "home-user">
                <MenuUser/>
                    <form className="loginuser-form" onSubmit={handleSubmit}>
                        <TextField
                            label= "Nom"
                            type="text"
                            value= {firstNameValue}
                            onChange={(event) => handleFirstNameChange(event, firstNameValue)}
                        />
                        <TextField
                            label= "Prénom"
                            type="text"
                            value= {lastNameValue}
                            onChange={(event) => handleLastNameChange(event, lastNameValue)}
                        />
                        <TextField
                            label= "Adresse"
                            type="text"
                            value= {addressValue}
                            onChange={(event) => handleAdressChange(event, addressValue)}
                        />
                        <TextField
                            label= "Mail"
                            type="text"
                            value= {mailValue}
                            onChange={(event) => handleMailChange(event, 'mail')}
                        />
                        <TextField
                            label= "telephone"
                            type="text"
                            value= {phoneValue}
                            onChange={(event) => handlePhoneChange(event, phoneValue)}
                        />
                        <TextField
                            label="Mot de passe"
                            type="password"
                            value={passwordValue}
                            onChange={(event) => handlePasswordChange(event, passwordValue)}
                        />
                        <button className="loginuser-submit" type="submit" onSubmit= "handleSubmit">
                            Valider
                        </button>
                    </form>
                </div>
        </div>
   );
};

UserMyAccount.propTypes = {
    className: PropTypes.string,
};
UserMyAccount.defaultProps = {
    className: '',
};
export default React.memo(UserMyAccount);
