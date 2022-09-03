import React, { useState, useEffect } from 'react';
import './adminusers.scss';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import { Box } from '@mui/material';
import { userSchema } from '../../../Schemas';
import { useDispatch } from 'react-redux';
import { UsersList } from '../../../store/features/Admin/Users/UsersList';

const AdminUsers2 = ({}) => {
    const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     dispatch();
    // },[
    //     dispatch
    // ]);

    return (
        <Box style={{position : 'absolute',height:'100%',width:'100%'}}>
            <Box>{UsersList()}</Box>
            <AdminDataGrid
                rows={[{id:'1'}]}
                schema={userSchema}
                />
        </Box>
    )
}

export default React.memo(AdminUsers2);
