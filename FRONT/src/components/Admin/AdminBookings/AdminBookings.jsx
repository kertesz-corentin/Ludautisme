import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { toast } from 'react-toastify';

// import requests
import api from '../../../requests';

// import react components
import AdminSection from '../AdminSection/AdminSection';
import BookingUserChoice from '../BookingUserChoice/BookingUserChoice';
import UpdateBookingModal from '../UpdateBookingModal/UpdateBookingModal';
import { bookingSchema } from '../../../Schemas';
import { useGridApiRef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';

// import mui components
import { IconButton, ToggleButton } from '@mui/material';
import { GridCheckIcon } from '@mui/x-data-grid';

import './adminbookings.scss';

const AdminBookings = ({ className, ...rest }) => {
    const [bookings, setBookings] = useState([]);
    const [history, setHistory] = useState(false);

    const apiRef = useGridApiRef();

    const getBookings = async () => {
        try {
            let response = null;
            if (!bookings.length) {
                response = await toast.promise(
                    api.get('/admin/booking/ligth'),
                    {
                        pending: `Récupération des réservations`,
                        error: 'Erreur lors de la récupération'
                    }
                );
            } else {
                let url = history ? '/admin/booking/ligth' : '/admin/booking';
                response = await toast.promise(
                    api.get(url),
                    {
                        pending: `Récupération des réservations`,
                        error: 'Erreur lors de la récupération'
                    }
                )
            }

            if (response.status === 200) {
                setBookings(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    const updateOneBooking = async (id) => {
        try {
            let response = await toast.promise(
                api.get(`/admin/booking/${id}`),
                {
                    pending: `Mise a jour de la réservation`,
                    error: 'Erreur lors de la mise à jour'
                }
            )
            console.log(response);
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
    const deleteOneRow = async (id) => {
        apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
    }

    useEffect(() => {
        getBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                <UpdateBookingModal params={params} getBookings={getBookings} updateOneBooking={updateOneBooking} deleteOneRow={deleteOneRow} />
                            </IconButton>
                        );
                        break;
                    case "closed":
                        config.renderCell = (params) => (
                            <ThemeProvider theme={theme}>
                                <ToggleButton
                                    color='success'
                                    value={params.value}
                                    selected={params.value}
                                    onChange={async () => {
                                        const id = Number(params.row.id);
                                        await api.post(`/admin/booking/close/${id}`, { [prop]: !params.value });
                                        await updateOneBooking(params.row.id);
                                    }}
                                    aria-label={`${prop}-${params.row.id}`}
                                >
                                    <GridCheckIcon />
                                </ToggleButton>
                            </ThemeProvider>
                        );
                        break;
                    case "delivered":
                        config.renderCell = (params) => (
                            <ThemeProvider theme={theme}>
                                <ToggleButton
                                    color='success'
                                    value={params.value}
                                    selected={params.value}
                                    onChange={async () => {
                                        const id = Number(params.row.id)
                                        await api.post(`/admin/booking/deliver/${id}`, { [prop]: !params.value });
                                        await updateOneBooking(params.row.id)
                                    }}
                                    aria-label={`${prop}-${params.row.id}`}
                                >
                                    <GridCheckIcon />
                                </ToggleButton>
                            </ThemeProvider>
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
            <AdminSection
                title="Réservations"
                apiRef={apiRef}
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
                    getBookings={getBookings}
                    updateOneBooking={updateOneBooking} />]}
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
