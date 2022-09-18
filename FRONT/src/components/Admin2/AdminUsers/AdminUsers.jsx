import React, { useState, useEffect } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import { Box } from '@mui/material';
import { userSchema } from '../../../Schemas';
import { useDispatch } from 'react-redux';
import users from '../../../store/features/Admin/Users/UsersList';
import store from '../../../store';
import { useGetUsersQuery } from '../../../store//api/apiSlice.js';
import CircularProgress from '@mui/material/CircularProgress';
import { DriveEta } from '@mui/icons-material';

const AdminUsers2 = ({}) => {
    const dispatch = useDispatch(); 
    const getUsers = useGetUsersQuery(); //Mandatory for useEffect usage
    store.dispatch(users.actions.handleFetch(getUsers)); //First loading only, fetch an store api

    useEffect(()=>{
        getUsers.refetch(); //Make a refetch cleare apiSlice cache
        store.dispatch(users.actions.handleFetch(getUsers));//Read refetch
    },[]);

    return (
        <div className = 'adminUser'>
            <AdminDashboardMenu/>
            <div className = 'userTest'>
                {/* <Box>Menu {(store.getState().users.status === 'pending')&& <CircularProgress/>}</Box>          */}
                <AdminDataGrid
                    rows={store.getState().users.users}
                    schema={userSchema}
                    />
            </div>
        </div>
    )
}

export default React.memo(AdminUsers2);
