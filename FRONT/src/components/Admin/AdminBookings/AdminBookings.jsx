import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import requests
import api from '../../../requests';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import BookingUserChoice from '../BookingUserChoice/BookingUserChoice';
import UpdateBookingModal from '../UpdateBookingModal/UpdateBookingModal';
import { bookingSchema } from '../../../Schemas';

// import mui components
import { IconButton, ToggleButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';

import './adminbookings.scss';


const AdminBookings = ({className, ...rest}) => {
    const [bookings, setBookings] = useState([]);
    const [articles, setArticles] = useState([]);

    const getBookings = async() => {
        try {
            const response = await api.get('/admin/booking');
            const data = await response.data;
            setBookings(data);
        }
        catch (err) {
            console.error (err);
        }
    }

    const getAllArticles = async () => {
        try {
            const response = await api.get('/admin/articles');
            const data = await response.data;
            setArticles(data);
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getBookings();
        getAllArticles();
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
                                <UpdateBookingModal params={params} />
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
                title="Réservations"
                rows={bookings}
                columns={columnBuilder}
                path={'/admin/booking'}
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
                children={<BookingUserChoice />}
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
