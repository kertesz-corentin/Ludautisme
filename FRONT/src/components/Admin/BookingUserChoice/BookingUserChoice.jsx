import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { Button, Box, TextField, Switch, FormControlLabel } from '@mui/material';
import AddBookingModal from '../AddBookingModal/AddBookingModal';
import classnames from 'classnames';
import './bookinguserchoice.scss';
import { toast } from 'react-toastify';

const BookingUserChoice = ({ articles, params, className, setHistory, checked, getBookings, updateOneBooking, ...rest }) => {
    const [search, setSearch] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('');
    
    const handleSearch = () => setSearch(true);

    const handleSubmit = async (event) => {
        // on vérifie que l'adhérent existe et on retourne true ou false
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const memberNumber = Number(data.get('member_number'));

        const response = await api.post('admin/users/search', { member_number: `${memberNumber}` })
        const searchUser = await response.data;

        if (response.status === 200) {
            setUser(searchUser);
            setUserExist(true);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value)
        setUserExist(false);
    }

    const handleSwitchHistory = (event) => {
        setHistory(event.target.checked);
        getBookings();
    };

    return (
        <div
            className={classnames('booking', className)}
            {...rest}
        >
            <div className={classnames('booking-button', className)}>
                <Button onClick={handleSearch} variant='outlined'>Ajouter réservation</Button>

                <Box className='booking-search' component="form" onSubmit={handleSubmit}>
                    {search && (
                        <TextField
                            id='outlined'
                            label='n° Adhérent'
                            name='member_number'
                            type='number'
                            value={value}
                            onChange={handleChange}
                            className="booking-search-element"
                        >
                        </TextField>
                    )}

                    {!userExist && search && (
                        <Button
                            type='submit'
                            className="booking-search-element"
                            variant="outlined"
                        >
                            Valider
                        </Button>
                    )}

                    {userExist && search && (
                        <AddBookingModal user={user} params={params} getBookings={getBookings} updateOneBooking={updateOneBooking}/>
                    )}

                </Box>
            </div>
            <FormControlLabel control={<Switch checked={checked} onChange={handleSwitchHistory} inputProps={{ 'aria-label': 'controlled' }} />} label="Historique complet" />
        </div>
    );
};

BookingUserChoice.propTypes = {
    className: PropTypes.string,
};
BookingUserChoice.defaultProps = {
    className: '',
};
export default React.memo(BookingUserChoice);
