import React, { useEffect } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import { userSchema } from '../../../Schemas';
import users from '../../../store/features/Admin/UsersList';
import store from '../../../store';
import { useGetUsersQuery } from '../../../store/api/apiSlice.js';

const AdminUsers2 = () => {
    const getUsers = useGetUsersQuery(); //Mandatory on top-level for useEffect usage
    store.dispatch(users.actions.handleFetch(getUsers)); //First loading only, fetch an store api
    
    const buttons = [
        [{label : 'ajouter',
        action : 'action'} ]
    ]

    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(users.actions.handleFetch(getUsers));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);




    
    return (
        <div className = 'adminUser'>
            <AdminDashboardMenu title='Adhérents' store={store.getState().users} buttons={buttons}/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        rows={store.getState().users.users}
                        schema={userSchema}
                        />
                </div>
                        <AdminDetails schema={userSchema} 
                                    //   titleOverride={'Surcharge'}
                        />
            </div>
        </div>
    )
}

export default React.memo(AdminUsers2);
