import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

// import material ui components
import TextField from '@mui/material/TextField';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import './adminpermanency.scss';

const AdminPermanency = ({className, ...rest}) => {
    const [beginTime, setBeginTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    console.log(('time', beginTime));
    return (
        <div className="adminpermanency">
            <h2 className="adminpermanency-title">Prochaine permanence</h2>
            <div className="adminpermanency-element">
                <LocalizationProvider dateAdapter={AdapterDateMoment}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date de début"
                        value={beginTime}
                        onChange={(newValue) => {
                        setBeginTime(newValue);
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="adminpermanency-element">
                <LocalizationProvider dateAdapter={AdapterDateMoment}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date de fin"
                        value={endTime}
                        onChange={(newValue) => {
                        setEndTime(newValue);
                        }}
                    />
                </LocalizationProvider>
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
