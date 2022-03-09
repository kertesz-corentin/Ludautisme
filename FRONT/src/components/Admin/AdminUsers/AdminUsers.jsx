import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api from '../../../requests/index';
import { userSchema } from '../../../Schemas';
import { ToggleButton, IconButton } from '@mui/material';
import AddUserModal from '../AddUserModal/AddUserModal';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
// import {CheckIcon} from '@material-ui/icons';
import './adminusers.scss';
import { GridCheckIcon } from '@mui/x-data-grid';

const AdminUsers = ({className, ...rest}) => {
    const [users, setUsers] = useState([]);

    // config path for api route
    const path = '/admin/users';

    const getUsers = async () => {
        try {
            const response = await api.get('/admin/users');
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

    console.log("schemas",userSchema);
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
                                    const response = await api.put(`/admin/users/${params.row.id}`, {[prop] : !params.value});
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

    console.log("colbuild",columnBuilder);


    return (
        <div
            className={classnames('adminusers', className)}
            {...rest}
        >
            <AdminSection
                title="Adhérent"
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
                        sortModel: [{ field: 'id', sort: 'asc' }],
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
