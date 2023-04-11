import React,{ useEffect, useState }from 'react';
import PropTypes from 'prop-types';
import './usermyaccount.scss';
import Permanency from '../../Reusable/Permanency/Permanency';
import { TextField, Button, Typography, Box } from '@mui/material';
import api from '../../../../requests';
import ModifyPasswordModal from '../ModifyPasswordModal/ModifyPasswordModal';

//Prochaine étape, coder la requete pour envoyer les infos à l'api


const UserMyAccount = ({
    className,
     ...rest
    }) => {

    const [userInfos,setUserInfos] = useState();
    const [modifyBtn, setModifyBtn]=  useState(false);

//This const get id, role  from API when user is logged
    const user= JSON.parse(localStorage.getItem('user'));

//This function takes id, role and token, send them to API in order to get back every user's infos
 async function requestGetDatasOneUser ()  {
        const  response = await api.get(`/customer/user/${user.id}`);
        if (response.status === 200){
            setUserInfos(response.data);
        } else {
            console.error(response.data);
        }
    }

    const handleClickModifyBtn = () => {
        setModifyBtn(!modifyBtn)
    }

    const handleChange = (event) => {
        let tempUser = {...userInfos};
        tempUser[event.target.id] = event.target.value;
        setUserInfos(tempUser);
    }

    //Set schema with expected data props from api and label name to display
    const userSchema = {
            first_name:   'Prénom',
            last_name:   'Nom',
            adress_number:   'Numéro de rue',
            adress_street:   'Nom de rue',
            adress_zipcode:  'Code Postal',
            adress_city:   'Ville',
            email:   'Mail',
            phone:   'Telephone',
    }
    async function handleSubmit (event) {
        event.preventDefault();
        const data = new FormData (event.currentTarget.closest('form'));

        //Create new empty object
        const newDatas = {};

        //Fill it
        Object.keys(userSchema).forEach((prop)=>{
            newDatas[prop] = data.get(prop);
        });

        //Send It
        const response = await api.put(`/customer/user/${user.id}`, newDatas)
        //Handle response
        if (response.status === 200){
            setModifyBtn(!modifyBtn)
        } else {
            console.error(response.data);
        }
    }


    // Each time page is loading, want to call requestGetDatasOneUser
    useEffect(() => {requestGetDatasOneUser()},[]);

   return (
                <Box className= "home-user">
                <Permanency display="inline"/>
                            {userInfos &&
                            <Box className="loginuser-form" component="form" noValidate sx={{ mt: 1 }}>
                                <Typography className="home-user-welcome"> Bienvenue <span className="home-user-welcome-span">{userInfos.first_name}</span></Typography>
                                {
                                    Object.keys(userInfos).map((prop,index) => {

                                    return (
                                    (userSchema[prop]) ?
                                        <TextField
                                            key={prop}
                                            id={prop}
                                            name={prop}
                                            className = "loginuser-textfield"
                                            disabled={!modifyBtn}
                                            label= {userSchema[prop]}
                                            type="text"
                                            value= {userInfos[prop]}
                                            onChange={(event)=>{handleChange(event)}}
                                            />
                                        : null
                                        )
                                    })
                                }


                            {modifyBtn ?
                            <>
                                <ModifyPasswordModal/>
                                <Button  variant="contained" className="loginuser-submit" onClick={handleSubmit}>
                                    Valider
                                </Button>
                            </>
                            :
                            <Button variant="outlined" className="loginuser-submit" onClick={handleClickModifyBtn}>
                                Modifier
                            </Button>
                            }
                        </Box>
                        }

                </Box>
   );
};

UserMyAccount.propTypes = {
    className: PropTypes.string,
};
UserMyAccount.defaultProps = {
    className: '',
};
export default React.memo(UserMyAccount);
