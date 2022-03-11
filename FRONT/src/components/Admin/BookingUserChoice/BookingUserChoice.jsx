import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddBookingModal from '../AddBookingModal/AddBookingModal';
import classnames from 'classnames';
import './bookinguserchoice.scss';

const BookingUserChoice = ({articles, className, ...rest}) => {
    const [search, setSearch] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [user, setUser] = useState([]);

    const handleSearch = () => setSearch(true);

    const handleSubmit = async (event) => {
        // on vérifie que l'adhérent existe et on retourne true ou false
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const memberNumber = Number(data.get('member_number'));

        console.log('value', memberNumber);

        const response = await api.post('admin/users/search', {member_number: `${memberNumber}`})
        const searchUser = await response.data;

        if(response.status === 200) {
            console.log('response-member', searchUser);
            setUser(searchUser);
            setUserExist(true);

        }
    }

    return (
        <div
            className={classnames('booking', className)}
            {...rest}
        >
            <Button onClick={handleSearch}>Ajouter réservation</Button>
            <Box className='booking-search' component="form" onSubmit={handleSubmit}>
                {search && (
                    <TextField
                        id='outlined'
                        label='n° Adhérent'
                        name='member_number'
                        type='number'
                        className="modal-inputs-item"
                    >
                    </TextField>
                )}

                {!userExist && search &&(
                    <Button
                    type='submit'
                    className="modal-footer-submit"
                    variant="outlined"
                    >
                        Valider
                    </Button>
                )}

                {userExist && search && (
                        <AddBookingModal user={user} articles={articles} />
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
