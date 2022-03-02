import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import axios from 'axios';
import './adminusers.scss';

const AdminUsers = ({className, ...rest}) => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/users');
            const data = await response.data;
            console.log('response', response);
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
        {field: 'member_number', headerName: 'n°adhérent', width: 100},
        {field: 'first_name', headerName: 'Prenom', editable: true, width: 125},
        {field: 'last_name', headerName: 'Nom', editable: true, width: 125},
        {field: 'email', headerName: 'Email', editable: true, width: 200},
        {field: 'phone', headerName: 'Telephone', editable: true, width: 200},
        {field: 'adress_number', headerName: 'n°', editable: true, width: 50},
        {field: 'adress_street', headerName: 'Rue', editable: true, width: 200},
        {field: 'adress_zipcode', headerName: 'Code Postal', editable: true, width: 125},
        {field: 'adress_city', headerName: 'Ville', editable: true, width: 200},
        {field: 'created_at', headerName: 'Membre depuis', editable: true, width: 100},
    ]

    const rows = [
        {
            id: 1,
            member_number: 1,
            first_name: 'Xavier',
            last_name: 'LEPLATRE',
            email: 'test@mail.com',
            phone: '06 xx xx xx xx',
            adress_number: '1',
            adress_street: 'rue de la Liberté',
            adress_zipcode: '75000',
            adress_city: 'PARIS',
            created_at: '01-01-2022',
        }
    ]

    // const rowData = users.map(user => {
    //     return {
    //         id: user.id,
    //         phone: user.phone,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         adress_number: user.adress_number,
    //         adress_street: user.adress_street,
    //         adress_zipcode: user.adress_zipcode,
    //         adress_city: user.adress_city,
    //         cotisation_status: user.cotisation_status,
    //         cotisation_expiration : user.cotisation_expiration,
    //         caution_status: user.caution_status,
    //         caution_expiration : user.caution_expiration,
    //         created_at: user.created_at,
    //     }
    // })
    return (
        <div
                className={classnames('adminusers', className)}
                {...rest}
            >
                <AdminSection title="Adhérent" rows={rows} columns={columnsData} />
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
