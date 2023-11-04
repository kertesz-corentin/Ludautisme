import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { Button, Box, TextField, Switch, FormControlLabel, Modal, Typography, Alert } from '@mui/material';
import AddBookingModal from '../AddBookingModal/AddBookingModal';
import classnames from 'classnames';
import './bookinguserchoice.scss';
import { toast } from 'react-toastify';
import moment from 'moment';

const BookingUserChoice = ({ articles, params, className, setHistory, checked, getBookings, updateOneBooking, ...rest }) => {
    const [search, setSearch] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSearch = () => setSearch(true);

    const handleClose = () => {
        setUserExist(true);
        setOpenModal(false);
        setModalMessage("");
    }
    const handleSubmit = async (event) => {
        // on vérifie que l'adhérent existe et on retourne true ou false
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const memberNumber = Number(data.get('member_number'));

        const response = await toast.promise(
            api.post('admin/users/search', { member_number: `${memberNumber}` }),
            {
                pending: `Recherche de l'utilisateur`,
                error: 'Erreur lors de la recherche'
            }
        );

        if (response.status === 200) {
            // on vérifie la cotisation et la caution de l'adhérent 
            if (!response.data[0].cotisation_expiration || !response.data[0].caution_expiration) {
                // s'il manque les données on demande la mise a jour de la fiche
                setModalMessage(`La fiche de l'adhérent ne contient pas d'information sur sa cotisation et sa caution, merci de la mettre à jour`);
                setOpenModal(true);
            } else if (response.data[0].cotisation_status === false || response.data[0].caution_status === false) {
                if (response.data[0].cotisation_status === false && response.data[0].caution_status === false) {
                    setModalMessage(`La cotisation est la caution de l'hadhérent sont expirée depuis le ${moment(response.data[0].cotisation_expiration).format('DD/MM/YYYY')}`);
                } else if (response.data[0].cotisation_status === false) {
                    setModalMessage(`La cotisation de l'hadhérent est expirée depuis le ${moment(response.data[0].cotisation_expiration).format('DD/MM/YYYY')}`);
                } else {
                    setModalMessage(`La caution de l'hadhérent est expirée depuis le ${moment(response.data[0].caution_expiration).format('DD/MM/YYYY')}`);
                }
                setOpenModal(true);
            } else {
                setUserExist(true);
            }

            setUser(response.data);
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
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                    >
                        <Box className="delete-modal">
                            <div className="delete-modal-header">
                                <Typography className='delete-modal-header-title'>
                                    
                                </Typography>
                            </div>
                            <div className="delete-modal-inputs">
                                <Alert variant="outlined"
                                    severity="error">
                                    {modalMessage}
                                </Alert>
                            </div>
                            <div className="delete-modal-footer">
                                <Button
                                    type='button'
                                    onClick={handleClose}
                                    className="delete-modal-footer-submit"
                                    variant="contained"
                                >
                                    Ok
                                </Button>
                            </div>
                        </Box>
                    </Modal>

                    {userExist && search && (
                        <AddBookingModal user={user} params={params} getBookings={getBookings} updateOneBooking={updateOneBooking} />
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
