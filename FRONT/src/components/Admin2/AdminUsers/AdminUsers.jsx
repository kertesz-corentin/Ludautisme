import React, { useEffect } from 'react';
import './adminusers.scss';
import AdminDashboardMenu from '../AdminDashboardMenu/AdminDashboardMenu';
import AdminDataGrid from '../AdminDatagrid/AdminDatagrid';
import AdminDetails from '../AdminDetails/AdminDetails';
import { userSchema } from '../../../Schemas';
// import users from '../../../store/features/Admin/UsersList';
import store from '../../../store';
import {actions} from '../../../store/reducers';
import { useGetUsersQuery, apiSlice } from '../../../store/api/apiSlice.js';
import {useSelector} from 'react-redux';
const AdminUsers2 = () => {
    const getUsers = useGetUsersQuery(); //Mandatory on top-level for useEffect usage
    const { details, users } = useSelector(state => state); //Redux state

    store.dispatch(actions.users.handleFetch(getUsers)); //First loading only, fetch an store api


    const buttons = [
        [{label : 'ajouter',
        action : 'action'} ]
    ]

    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.users.handleFetch(getUsers));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        getUsers.refetch(); //Make a refetch clear apiSlice cache
        store.dispatch(actions.users.handleFetch(getUsers));//Read refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[details]);

    
    return (
        <div className = 'adminUser'>
            <AdminDashboardMenu title='Adhérents' store={store.getState().users} buttons={buttons}/>
            <div className = 'dashcontainer'>
                <div className = 'dash-grid'>
                    <AdminDataGrid
                        rows={users.users}
                        schema={userSchema}
                        reducer='users'
                        submitAction = 'useUpdateOneMutation'
                        />
                </div>
                        {(Object.keys(details.content).length > 0)&&<AdminDetails schema={userSchema} 
                                    //   titleOverride={'Surcharge du titre'}
                        />}
            </div>
        </div>
    )
}

export default React.memo(AdminUsers2);
