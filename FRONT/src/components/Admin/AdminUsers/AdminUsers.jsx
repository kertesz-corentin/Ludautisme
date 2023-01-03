import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import requests
import api from '../../../requests/index';

// import react components
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';
import AdminSection from '../AdminSection/AdminSection';
import AddUserModal from '../AddUserModal/AddUserModal';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
import { userSchema } from '../../../Schemas';

// import material ui components
import { ToggleButton, IconButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';

import './adminusers.scss';

const AdminUsers = ({className, ...rest}) => {
    const [users, setUsers] = useState([]);

    const [alertMessage, setAlertMessage] = useState();

    // config path for api route
    const path = '/admin/users';

    const getUsers = async () => {
        try {
            const response = await api.get(path);
            const data = await response.data;
            if(response.status === 200){
                setUsers(data);
            }
        }
        catch (err) {
            setAlertMessage(err.response.data.message)
            console.error(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(userSchema).forEach(prop => {
            const propElt = userSchema[prop];
            const config = {
                type: propElt.type,
                field:prop,
                headerName:propElt.label,
                width: propElt.width};

            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "toggle":
                        config.renderCell = (params) => (
                            <ToggleButton
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                    await api.put(`${path}/${params.row.id}`, {[prop] : !params.value});
                                    getUsers();
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
                    );
                    break;
                    case "edit":
                        config.renderCell = (params) => (

                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <UpdateUserModal params={params} />
                            </IconButton>
                    );
                    break;

                    default:
                    break;
                }
            }
            columns.push(config);
        });
        return columns;
    })();

    return (
        <div
            className={classnames('adminusers', className)}
            {...rest}
        >
            {alertMessage && (
                <AlertMessage message={alertMessage} />
            )}
            <AdminSection
                title="Adhérents"
                rows={users}
                columns={columnBuilder}
                path={path}
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        // Hide columns <column name>, the other columns will remain visible
                        id_role: false,
                        cotisation_expiration: false,
                        caution_expiration: false,
                      },
                    },
                    sorting: {
                        sortModel: [{ field: 'member_number', sort: 'asc' }],
                    },
                }}
                children={<AddUserModal />}
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
