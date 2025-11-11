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
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('');
    const [openWarningModal, setWarningOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [openModale, setOpenModale] = React.useState(false);
    const [currentBooking, setCurrentBooking] = React.useState();
    const [listArticle, setListArticle] = React.useState([]);

    const handleSearch = () => setSearch(true);

    const handleClose = () => {
        setWarningOpenModal(false);
        setModalMessage("");
        setOpenModale(true);
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
            let user = response.data[0];
            // get active booking of this user if exist 
            const activeBooking = await api.get(`/customer/booking/active/${user.id}`);

            // get articles if booking exist
            if (activeBooking?.data) {
                setCurrentBooking(activeBooking.data[0])
                if (activeBooking.data[0]?.borrowed_articles) {
                    setListArticle(activeBooking.data[0]?.borrowed_articles)
                }
            }
            setUser(response.data);
            // on vérifie la cotisation et la caution de l'adhérent 
            if (!user.cotisation_expiration || (!user.caution_expiration && user.id_status !== 4)) {
                // s'il manque les données on demande la mise a jour de la fiche
                setModalMessage(`La fiche de l'adhérent ne contient pas d'information sur sa cotisation et sa caution, merci de la mettre à jour`);
                setWarningOpenModal(true);
            } else if (user.cotisation_status === false || user.caution_status === false) {
                let confirmOpen = false;
                if (user.cotisation_status === false && user.caution_status === false) {
                    confirmOpen = true;
                    setModalMessage(`La cotisation et la caution de l'adhérent sont expirée depuis le ${moment(user.cotisation_expiration).format('DD/MM/YYYY')}`);
                } else if (user.cotisation_status === false) {
                    confirmOpen = true;
                    setModalMessage(`La cotisation de l'adhérent est expirée depuis le ${moment(user.cotisation_expiration).format('DD/MM/YYYY')}`);
                } else if (user.id_status !== 4) {
                    confirmOpen = true;
                    setModalMessage(`La caution de l'adhérent est expirée depuis le ${moment(user.caution_expiration).format('DD/MM/YYYY')}`);
                } else {
                    setOpenModale(true);
                }

                if (confirmOpen) {
                    setWarningOpenModal(true);
                }
            } else {
                setOpenModale(true);
            }
        } else {
            toast.error(response.data.message);
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value)
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

                    {search && (
                        <Button
                            type='submit'
                            className="booking-search-element"
                            variant="outlined"
                        >
                            Valider
                        </Button>
                    )}
                    <Modal
                        open={openWarningModal}
                        onClose={handleClose}
                    >
                        <Box className="delete-modal">
                            <div className="delete-modal-header">
                                <Typography className='delete-modal-header-title'>

                                </Typography>
                            </div>
                            <div className="delete-modal-inputs">
                                <Alert variant="outlined"
                                    severity="info">
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

                    <AddBookingModal user={user} params={params} getBookings={getBookings} updateOneBooking={updateOneBooking} open={openModale} setOpen={setOpenModale} currentBooking={currentBooking} setCurrentBooking={setCurrentBooking} listArticle={listArticle} setListArticle={setListArticle}/>
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
