import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { Button, Box, TextField } from '@mui/material';
import AddBookingModal from '../AddBookingModal/AddBookingModal';
import classnames from 'classnames';
import './bookinguserchoice.scss';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

const BookingUserChoice = ({articles, params, className, ...rest}) => {
    const [search, setSearch] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('');
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();


    const handleSearch = () => setSearch(true);

    const handleSubmit = async (event) => {
        // on vérifie que l'adhérent existe et on retourne true ou false
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const memberNumber = Number(data.get('member_number'));

        const response = await api.post('admin/users/search', {member_number: `${memberNumber}`})
        const searchUser = await response.data;

        if(response.status === 200) {
            setUser(searchUser);
            setUserExist(true);
        } else {
            setSeverity("error");
            setAlertMessage(`${response.data.message}`);
        }
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
        setUserExist(false);
    }

    return (
        <div
            className={classnames('booking', className)}
            {...rest}
        >
            <Button onClick={handleSearch} variant='outlined'>Ajouter réservation</Button>
            {alertMessage && severity && (
                    <AlertMessage
                        message={alertMessage}
                        severity={severity}
                    >
                    </AlertMessage>
                )}
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

                {!userExist && search &&(
                    <Button
                    type='submit'
                    className="booking-search-element"
                    variant="outlined"
                    >
                        Valider
                    </Button>
                )}

                {userExist && search && (
                        <AddBookingModal user={user} params={params} />
                )}

            </Box>
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
