import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api, { getLocalBearerToken } from '../../../requests';
import { addUser } from '../../../requests/requestsAdmin/crudUsers';

import './adminusers.scss';

const AdminUsers = ({className, ...rest}) => {
    const [users, setUsers] = useState([]);
    const adminToken = getLocalBearerToken();


    const getUsers = async () => {
        try {
            const response = await api.get('/admin/users', {
                headers: {
                    Authorization: `bearer ${adminToken}`
                }
            });
            const data = await response.data;

            setUsers(data);

        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columnsData = [
        {field: 'member_number', headerName: 'n°adhérent', width: 125},
        {field: 'first_name', headerName: 'Prenom', width: 125},
        {field: 'last_name', headerName: 'Nom', width: 125},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone', headerName: 'Telephone', width: 200},
        {field: 'adress_number', headerName: 'n°', width: 50},
        {field: 'adress_street', headerName: 'Rue', width: 200},
        {field: 'adress_zipcode', headerName: 'Code Postal', width: 125},
        {field: 'adress_city', headerName: 'Ville', width: 200},
    ]

    const rowData = users.map(user => {
        return {
            id: user.id,
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            adress_number: user.adress_number,
            adress_street: user.adress_street,
            adress_zipcode: user.adress_zipcode,
            adress_city: user.adress_city,
            cotisation_status: user.cotisation_status,
            cotisation_expiration : user.cotisation_expiration,
            caution_status: user.caution_status,
            caution_expiration : user.caution_expiration,
            created_at: user.created_at,
        }
    })

    return (
        <div
            className={classnames('adminusers', className)}
            {...rest}
        >
            <AdminSection
                title="Adhérent"
                rows={rowData}
                columns={columnsData}
                request={addUser}
                token={adminToken}
            />
        </div>

    );
};

AdminUsers.propTypes = {
    className: PropTypes.string,
};
AdminUsers.defaultProps = {
    className: '',
};
export default React.memo(AdminUsers);
