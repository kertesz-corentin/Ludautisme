import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'date-fns'

import api from '../../../requests';
import { toast } from 'react-toastify';

// import material ui components
import { Chip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isAfter } from 'date-fns';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './adminpermanency.scss';
import { Button } from '@mui/material';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

const AdminPermanency = ({ className, ...rest }) => {
    const [date, setDate] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [isDefined, setIsDefined] = useState(false);

    const getActivePermanency = async () => {
        const response = await api.get('/admin/permanency/active');
        const activePermanency = response.data;
        if (response.status === 200) {
            (activePermanency[0].next_date)
                ? setDate(activePermanency[0].next_date)
                : setDate(new Date());
            (activePermanency[0].next_date) && setIsDefined(true);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleChangeDate = (event) => {
        if (new Date(event) >= new Date()) {
            setDate(new Date(event));
        } else {
            setAlertMessage({
                message: 'Erreur'
            });
            setTimeout(() => { setAlertMessage() }, 1500);
        }
    }

    const setPermanencyDate = async () => {
        if (date) {
            date.setHours(date.getHours() + 2);
            const newDate = {
                'next_date': dayjs(date)
            }
            const response = await api.patch('/admin/permanency/next', newDate);

            if (response.data === '') {
                setIsDefined(true);
                setAlertMessage({
                    message: 'Succès',
                    severity: 'success'
                });
                setTimeout(() => { setAlertMessage() }, 1000);
            } else {
                toast.error(response.data.message);
            }
        }
    }

    const closePermanency = async () => {
        let clean = await api.put('/admin/booking');
        if (clean.status === 200) {
            let close = await api.get('/admin/permanency/active/close');
            if (close.status === 200) {
                toast.success("permanence cloturé");
                setDate();
                setIsDefined(false);
            } else {
                toast.error("erreur de cloture de permanence");
            }
        } else {
            toast.error("erreur de néttoyage des réservations non prises");
        }

    }

    React.useEffect(() => {
        getActivePermanency();
    }, [isDefined]);

    return (
        <div className="adminpermanency">
            <h2 className="adminpermanency-title">Prochaine permanence</h2>
            <div className="adminpermanency-element">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <DatePicker
                        slotProps={{
                            textField: {
                                sx: {
                                    width: '180px'
                                }
                            }
                        }}
                        format='DD/MM/YYYY'
                        label="Sélectionner une date"
                        value={dayjs(date)}
                        onChange={(event) => handleChangeDate(event)}
                    />
                </LocalizationProvider>
            </div>
            {(!isDefined) ?
                <Chip label="Non définie" color="error" />
                : <Chip label="Publiée" color="success" />}
            <div className='adminpermanency-button'>
                {alertMessage ?
                    <>
                        <AlertMessage
                            message={alertMessage.message}
                            severity={alertMessage.severity}
                        >
                        </AlertMessage>
                    </>
                    :
                    (isAfter(new Date(), date) && isDefined) ?
                        <>
                            <Button
                                variant='outlined'
                                onClick={closePermanency}
                            >
                                cloturer
                            </Button>
                        </>
                        :
                        <Button
                            variant='outlined'
                            onClick={setPermanencyDate}
                        >
                            modifier
                        </Button>
                }
            </div>
        </div>
    );
};

AdminPermanency.propTypes = {
    className: PropTypes.string,
};
AdminPermanency.defaultProps = {
    className: '',
};
export default React.memo(AdminPermanency);
