import React, { useState, useEffect } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import { userSchema } from '../../../Schemas';
import users from '../../../store/features/Admin/Users/UsersList';
import store from '../../../store';
import { useGetUsersQuery } from '../../../store/api/apiSlice.js';

const AdminUsers2 = ({}) => {
    const getUsers = useGetUsersQuery(); //Mandatory on top-level for useEffect usage
    store.dispatch(users.actions.handleFetch(getUsers)); //First loading only, fetch an store api

    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
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
