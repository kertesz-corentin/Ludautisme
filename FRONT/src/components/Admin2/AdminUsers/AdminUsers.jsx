import React, { useState, useEffect } from 'react';
import './adminusers.scss';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import { Box } from '@mui/material';
import { userSchema } from '../../../Schemas';
import { useDispatch } from 'react-redux';
import users from '../../../store/features/Admin/Users/UsersList';
import store from '../../../store';
import { useGetUsersQuery } from '../../../store//api/apiSlice.js';
import CircularProgress from '@mui/material/CircularProgress';

const AdminUsers2 = ({}) => {
    const dispatch = useDispatch(); 
    const getUsers = useGetUsersQuery(); //Mandatory for useEffect usage
    store.dispatch(users.actions.handleFetch(getUsers));
    
    useEffect(()=>{
        //getUsers.refetch();
        //store.dispatch(users.actions.handleFetch(getUsers));
    },[]);

    return (
        <Box style={{position : 'absolute',height:'100%',width:'100%'}}>
            {(store.getState().users.status === 'pending')&& <CircularProgress sx={{position:'fixed',bottom:'25px',right:'25px'}} />}
            {/* <Box>{JSON.stringify(store.getState().users.status)}</Box> */}
            {/* <Box>{JSON.stringify(store.getState().users.users)}</Box> */}
            <AdminDataGrid
                rows={store.getState().users.users}
                schema={userSchema}
                />
        </Box>
    )
}

export default React.memo(AdminUsers2);
