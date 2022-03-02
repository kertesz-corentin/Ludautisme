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
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
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

    const rowData = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
    })
    return (
        <div
                className={classnames('adminusers', className)}
                {...rest}
            >
                <AdminSection title="Adhérent" rows={rowData} />
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
