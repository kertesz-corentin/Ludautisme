import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'date-fns'
import frLocale from 'date-fns/locale/fr';

import api from '../../../requests';

// import material ui components
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

import './adminpermanency.scss';
import { Button } from '@mui/material';
import { isAfter } from 'date-fns';
import AlertMessage from '../../AlertMessage/AlertMessage';

const AdminPermanency = ({className, ...rest}) => {
    const [date, setDate] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const getActivePermanency = async () => {
        const response = await api.get('/admin/permanency/active');
        const activePermanency = await response.data;
        console.log('permanence', activePermanency[0].next_date)
        if(response.status === 200){
            setDate(format(new Date(activePermanency[0].next_date), 'yyyy-MM-dd', {timeZone: 'Europe/Paris'}));
        }
        else {
            console.log(response.data)
        }
    }

    const handleChangeDate = (event) => {
        if (new Date(event)>new Date()){
        setDate(format(new Date(event), 'yyyy-MM-dd', {timeZone: 'Europe/Paris'}));
        } else {

            setAlertMessage({
                message : 'Erreur'});
            setTimeout(()=>{setAlertMessage()},500);
        }
    }

    const setPermanencyDate = async () => {
        if (date){
            const newDate = {
                'next_date': date
            }
            console.log(newDate);
            const response = await api.patch('/admin/permanency/next', newDate);

            if(response.data === ''){
                console.log(response);
                setAlertMessage({
                    message : 'Succès',
                    severity : 'success'});
                setTimeout(()=>{setAlertMessage()},1000);
            }
            else {
                console.log(response.data)
            }
        }
    }

    React.useEffect(() => {
        getActivePermanency();
    }, [setDate])

    console.log('date', date);

    return (
        <div className="adminpermanency">
            <h2 className="adminpermanency-title">Prochaine permanence</h2>
            <div className="adminpermanency-element">
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                    <DatePicker
                        label="Sélectionner une date"
                        value={date}
                        onChange={(event) => handleChangeDate(event)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
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
                 <>
                <Button
                    variant='outlined'
                    onClick={setPermanencyDate}
                >
                    modifier
                </Button>
                </>
                }
            </div>
            {/* <div className="adminpermanency-element">
                <LocalizationProvider dateAdapter={AdapterDateMoment}>
                    <StaticDateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        label="Date de fin"
                        value={endTime}
                        onChange={date2 => setEndTime(date2)}
                    />
                </LocalizationProvider>
            </div> */}
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
