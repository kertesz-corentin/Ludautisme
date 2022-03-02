import React,{ useState }from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './usermyaccount.scss';
import MenuUser from '../MenuUser/MenuUser';
import Permanency from '../../Permanency/Permanency';
import { TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
        // Here i create ButtonModify's state in order to make appear differents elements ( <span><TableContainre> OR <form><TextField>)
        //This state will be modify when clicking ButtonModify with function names handleClickModifyBtn.
    const [modifyBtn, setModifyBtn]=  useState(true);

    function handleClickModifyBtn() {
        setModifyBtn(!modifyBtn)
        console.log(modifyBtn)
    }
    function handleSubmit (event) {
        event.preventDefault()
        const newUserDatas = {firstNameValue,lastNameValue,addressValue,mailValue,phoneValue,passwordValue}
        setModifyBtn(!modifyBtn)
        console.log(modifyBtn)
        console.log(`Voila les données à envoyer au back:`, newUserDatas)
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
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
      const rows = [
        createData('Nom:', firstNameValue),
        createData('Prenom:', lastNameValue ),
        createData('Adresse:', addressValue ),
        createData('Mail:', mailValue),
        createData('Telephone:', phoneValue),
      ];

   return (
       <div > Bienvenue Michel
         <Permanency/>
                <div className= "home-user">
                <MenuUser/>
                { modifyBtn
                    ?
                        <span >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                    <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                            {row.name}
                                            </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <button className="loginuser-submit" type="click" onClick= {handleClickModifyBtn}>
                                    Modifier
                            </button>
                        </span>
                    :
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
                }

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
