import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toast } from 'react-toastify';

// import requests
import api from '../../../requests/index';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import AddUserModal from '../AddUserModal/AddUserModal';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
import { userSchema } from '../../../Schemas';

// import material ui components
import { ToggleButton, IconButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';
import moment from 'moment';

import './adminusers.scss';

const AdminUsers = ({ className, ...rest }) => {
    const [users, setUsers] = useState([]);

    const apiRef = useGridApiRef();

    // config path for api route
    const path = '/admin/users';

    const getUsers = async () => {
        try {
            const response = await api.get(path);
            if (response.status === 200) {
                setUsers(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const updateOneUser = async (id) => {
        try {
            let response = await toast.promise(
                api.get(`/admin/users/${id}`),
                {
                    pending: `Mise a jour de l'utilisateur`,
                    error: 'Erreur lors de la mise à jour'
                }
            )
            if (response.status === 200) {
                let data = response.data[0];
                if (data) {
                    apiRef.current.updateRows([data]);
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(userSchema).forEach(prop => {
            const propElt = userSchema[prop];
            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width};

            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "toggle":
                        config.renderCell = (params) => (
                            <ThemeProvider theme={theme}>
                                <ToggleButton
                                    value={params.value}
                                    selected={params.value}
                                    onChange={async () => {
                                        let options = {
                                            [prop]: !params.value
                                        };
                                        if (prop === "cotisation_status" && params.value === true) {
                                            options = {
                                                [prop]: !params.value,
                                                cotisation_expiration: moment(Date.now()).format()
                                            }
                                        } else if ( prop === "caution_status" && params.value === true){
                                            options = {
                                                [prop]: !params.value,
                                                caution_status: moment(Date.now()).format()
                                            }
                                        }

                                        await api.put(`${path}/${params.row.id}`, options);
                                        getUsers();
                                    }}
                                    aria-label={`${prop}-${params.row.id}`}
                                >
                                    <GridCheckIcon />
                                </ToggleButton>
                            </ThemeProvider>
                        );
                        break;
                    case "edit":
                        config.renderCell = (params) => (

                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <UpdateUserModal params={params} getUsers={getUsers} updateOneUser={updateOneUser} />
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
            <AdminSection
                title="Adhérents"
                rows={users}
                columns={columnBuilder}
                apiRef={apiRef}
                path={path}
                link="https://docs.google.com/document/d/1cT8aMNb0chMp2M6to9Tkjl0EjgfojzS3MJ1WSJEAAho/edit?usp=sharing"
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            // Hide columns <column name>, the other columns will remain visible
                            id_role: false,
                            cotisation_expiration: false,
                            caution_expiration: false,
                            name: false
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'member_number', sort: 'asc' }],
                    },
                }}
                buttonList={[<AddUserModal getUsers={getUsers} updateOneUser={updateOneUser} users={users} />]}
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
