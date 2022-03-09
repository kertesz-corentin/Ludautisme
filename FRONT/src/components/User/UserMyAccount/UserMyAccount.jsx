import React,{ useEffect, useState }from 'react';
import PropTypes from 'prop-types';

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
import api from '../../../requests';


//Prochaine étape, coder la requete pour envoyer les infos à l'api


const UserMyAccount = ({
    className,
     ...rest
    }) => {
// Each time page is loading, want to call requestGetDatasOneUser
    useEffect(() => {requestGetDatasOneUser()},[])

//This const get id, role  from API when user is logged
    const userAllDatas= JSON.parse(localStorage.getItem('user'));
    console.log(`Données de l'utilisateur`, userAllDatas)

//This function takes id, role and token, send them to API in order to get back every user's infos
 async function requestGetDatasOneUser ()  {
        console.log(`fonction qui envoi l'id, le rôle `)
        const  response = await api.get(`/customer/user/${userAllDatas.id}`)
        console.log(`expected user's datas`, response.data)
        setFirstNameValue (response.data.first_name)
        setLastNameValue (response.data.last_name)
        setMailValue (response.data.email)
        setPhoneValue (response.data.phone)
        setAdressNumberValue(response.data.adress_number)
        setAdressStreetValue(response.data.adress_street)
        setAdressZipCodeValue(response.data.adress_zipcode)
        setAdressCityValue(response.data.adress_city)
        setPassworldValue(response.data.password)
    }

    const [firstNameValue,setFirstNameValue] = useState();
    const [lastNameValue,setLastNameValue] = useState();
    const [addressNumberValue,setAdressNumberValue] = useState();
    const [addressStreetValue,setAdressStreetValue] = useState();
    const [addressZipCodeValue,setAdressZipCodeValue] = useState();
    const [addressCityValue,setAdressCityValue] = useState();
    const [mailValue,setMailValue] = useState();
    const [phoneValue,setPhoneValue] = useState();
    const [passworldValue, setPassworldValue]= useState();
        // Here i create ButtonModify's state in order to make appear differents elements ( <span><TableContainre> OR <form><TextField>)
        //This state will be modify when clicking ButtonModify with function names handleClickModifyBtn.
    const [modifyBtn, setModifyBtn]=  useState(true);

    function handleClickModifyBtn() {
        setModifyBtn(!modifyBtn)
        console.log(modifyBtn)
    }
    async function handleSubmit (event) {
        event.preventDefault()
        const newUserDatas = {
         first_name:   firstNameValue,
         last_name:   lastNameValue,
         adress_number:   addressNumberValue,
         adress_street:   addressStreetValue,
         adress_zipcode:   addressZipCodeValue,
         adress_city:   addressCityValue,
         email:   mailValue,
         phone:   phoneValue,
         password:   passworldValue
        }
// Ici c'est la requête pour envoyer les données modifiés au back, problème pour le moment je recois une erreur 500.
        const response = await api.put(`/customer/user/${userAllDatas.id}`, newUserDatas)
        setModifyBtn(!modifyBtn)
        console.log(modifyBtn)
        console.log(`Voila les données à envoyer au back:`, newUserDatas)
        console.log(response)
    }
    function handleFirstNameChange (event) {
        setFirstNameValue(event.target.value)
        console.log(`Firstname`, event.target.value)
    }
    function handleLastNameChange (event) {
        setLastNameValue(event.target.value)
        console.log(`LastName`, event.target.value)
    }
    function handleAdressNumberChange (event) {
        setAdressNumberValue(event.target.value)
        console.log(`AdresseNumber`, event.target.value)
    }
    function handleAdressStreetChange (event) {
        setAdressStreetValue(event.target.value)
        console.log(`AdresseStreet`, event.target.value)
    }
    function handleAdressZipCodeChange (event) {
        setAdressZipCodeValue(event.target.value)
        console.log(`AdresseZipCode`, event.target.value)
    }
    function handleAdressCityChange (event) {
        setAdressCityValue(event.target.value)
        console.log(`AdresseCity`, event.target.value)
    }
    function handleMailChange (event) {
        setMailValue(event.target.value)
        console.log(`Mail`, event.target.value)
    }
    function handlePhoneChange (event) {
        setPhoneValue(event.target.value)
        console.log(`Phone`, event.target.value)
    }
    function handlePassworldChange (event) {
        setPassworldValue(event.target.value)
        console.log(`Password`, event.target.value)
    }
    function createData(label, content) {
        return {label, content };
      }

      const rows = [
        createData('Prénom:', firstNameValue),
        createData('Nom:', lastNameValue ),
        createData('Numéro de rue:', addressNumberValue ),
        createData('Nom de rue:', addressStreetValue ),
        createData('Code Postale:', addressZipCodeValue ),
        createData('Ville:', addressCityValue ),
        createData('Mail:', mailValue),
        createData('Telephone:', phoneValue),
        createData('Mot de passe:', passworldValue),
      ];

   return (
       <div > Bienvenue {firstNameValue}
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
                                        key={row.label}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                            {row.label}
                                            </TableCell>
                                        <TableCell align="right">{row.content}</TableCell>
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
                                label= "Nom:"
                                type="text"
                                value= {firstNameValue}
                                onChange={(event) => handleFirstNameChange(event, firstNameValue)}
                            />
                            <TextField
                                label= "Prénom:"
                                type="text"
                                value= {lastNameValue}
                                onChange={(event) => handleLastNameChange(event, lastNameValue)}
                            />
                            <TextField
                                label= "Numéro de rue:"
                                type="text"
                                value= {addressNumberValue}
                                onChange={(event) => handleAdressNumberChange(event, addressNumberValue)}
                            />
                            <TextField
                                label= "Nom de rue:"
                                type="text"
                                value= {addressStreetValue}
                                onChange={(event) => handleAdressStreetChange(event, addressStreetValue)}
                            />
                            <TextField
                                label= "Code Postale:"
                                type="text"
                                value= {addressZipCodeValue}
                                onChange={(event) => handleAdressZipCodeChange(event, addressZipCodeValue)}
                            />
                            <TextField
                                label= "Ville"
                                type="text"
                                value= {addressCityValue}
                                onChange={(event) => handleAdressCityChange(event, addressCityValue)}
                            />
                            <TextField
                                label= "Mail"
                                type="text"
                                value= {mailValue}
                                onChange={(event) => handleMailChange(event, mailValue)}
                            />
                            <TextField
                                label= "telephone"
                                type="text"
                                value= {phoneValue}
                                onChange={(event) => handlePhoneChange(event, phoneValue)}
                            />
                            <TextField
                                label= "mot de passe"
                                type="passworld"
                                value= {passworldValue}
                                onChange={(event) => handlePassworldChange(event, passworldValue)}
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
