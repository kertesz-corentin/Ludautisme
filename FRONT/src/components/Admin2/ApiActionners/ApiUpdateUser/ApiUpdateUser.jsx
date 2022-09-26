import React, { useState, useEffect,useRef } from 'react';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';
import {FormControlLabel,Checkbox,TextField,Button } from '@mui/material/';
import { useGetUsersQuery, apiSlice } from '../../../store/api/apiSlice.js';

const apiUpdateUser = ({id,body}) => {
    const [updateUser, response] = apiSlice.useUpdateOneMutation();

    const handleUpdate = () =>{
        console.log('update action',updateUser({id,body}));
        console.log('update reponse',response);
    }

    return (
        <Button onClick={handleUpdate}>VALIDER</Button>
    )
}

export default React.memo(apiUpdateUser);
