import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import api from '../../../requests';
import { bookingSchema } from '../../../Schemas';

import './adminbookings.scss';
import { IconButton, ToggleButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GridCheckIcon } from '@mui/x-data-grid';

const AdminBookings = ({className, ...rest}) => {
    const [bookings, setBookings] = useState([]);

    const path='/admin/booking';

    const getBookings = async() => {
        try {
            const response = await api.get(path);
            const data = await response.data;
            setBookings(data);
            console.log('bookings', bookings);
        }
        catch (err) {
            console.error (err);
        }
    }

    useEffect(() => {
        getBookings();
    }, [])

    const columnBuilder = (() => {
        const columns = [];
        Object.keys(bookingSchema).forEach(prop => {
            const propElt = bookingSchema[prop];
            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
            };

            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "edit":
                        config.renderCell = (params) => (
                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <EditIcon />
                            </IconButton>
                        );
                    break;
                    case "toggle":
                        config.renderCell = (params) => (
                            <ToggleButton
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                    // const response = await api.put(`/admin/users/${params.row.id}`, {[prop] : !params.value});
                                    // const newData = await getUsers();
                                    // setUsers(newData.data);
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
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
            className={classnames('adminbookings', className)}
            {...rest}
        >
            <AdminSection
                title="Réservation"
                rows={bookings}
                columns={columnBuilder}
                path={path}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id_user: false,
                            id_permanency: false,
                        },
                    },
                    sorting: {
                        sortModel: [{field: 'id', sort: 'asc'}],
                    }
                }}
                children
            />
        </div>
    );
};

AdminBookings.propTypes = {
    className: PropTypes.string,
};
AdminBookings.defaultProps = {
    className: '',
};
export default React.memo(AdminBookings);
