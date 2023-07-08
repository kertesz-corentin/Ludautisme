import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

// import requests
import api from '../../../requests';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import BookingUserChoice from '../BookingUserChoice/BookingUserChoice';
import UpdateBookingModal from '../UpdateBookingModal/UpdateBookingModal';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';
import { bookingSchema } from '../../../Schemas';

// import mui components
import { IconButton, ToggleButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';

import './adminbookings.scss';

const AdminBookings = ({ className, ...rest }) => {
    const [bookings, setBookings] = useState([]);
    const [history, setHistory] = useState(false);

    const [alertMessage, setAlertMessage] = useState();

    const getBookings = async () => {
        try {
            let response = null;
            if(!bookings.length) {
                response = await api.get('/admin/booking/ligth');
            } else {
                response = history ? await api.get('/admin/booking/ligth') : await  api.get('/admin/booking');
            }
            
            const data = await response.data;
            if (response.status === 200) {
                setBookings(data);
            }
        }
        catch (err) {
            setAlertMessage(err.response.data.message);
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

            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "edit":
                        config.renderCell = (params) => (
                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <UpdateBookingModal params={params} getBookings={getBookings} />
                            </IconButton>
                        );
                        break;
                    case "closed":
                        config.renderCell = (params) => (

                            <ToggleButton
                                color= 'success'
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                    const id = Number(params.row.id);
                                    await api.post(`/admin/booking/close/${id}`, { [prop]: !params.value });
                                    await getBookings();
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
                        );
                        break;
                    case "delivered":
                        config.renderCell = (params) => (
                            <ToggleButton
                                color= 'success'
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                    const id = Number(params.row.id)
                                    await api.post(`/admin/booking/deliver/${id}`, { [prop]: !params.value });
                                    await getBookings();
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
                        );
                        break;
                    case "date":
                        config.renderCell = (params) => (
                            moment(params.value).format('DD/MM/YYYY')
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
            {alertMessage && (
                <AlertMessage message={alertMessage} />
            )}
            <AdminSection
                title="Réservations"
                rows={bookings}
                columns={columnBuilder}
                path={'/admin/booking'}
                link="https://docs.google.com/document/d/1Xwl1SRZjGDQndHXfwGLWEyNPRm_r0EqEbTvD9P-a63c/edit?usp=sharing"
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id_user: false,
                            id_permanency: false,
                            overdue: false,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'date_permanency', sort: 'desc' }],
                    }
                }}
                children={[<BookingUserChoice
                    setHistory={setHistory}
                    checked={history}
                    getBookings = {getBookings} />]}
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
