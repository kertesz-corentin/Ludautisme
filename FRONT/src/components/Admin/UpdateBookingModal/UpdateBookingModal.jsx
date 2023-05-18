import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';

// import react components
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

// import react components
import BookingArticles from '../BookingArticles/BookingArticles';

// import material ui components
import { TextField, Box, Typography, Modal, Button, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './updatebookingmodal.scss';

const UpdateBookingModal = ({ params, className, getBookings, ...rest }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAlertMessage(null);
        setSeverity(null);
    }

    const [closed, setClosed] = useState(params.row.closed);
    const [delivered, setDelivered] = useState(params.row.delivered);
    const [overdue, setOverdue] = useState(params.row.overdue);
    const [returnArticle, setReturnArticle] = React.useState([]);

    const [alertMessage, setAlertMessage] = useState();
    const [severity, setSeverity] = useState();

    const handleDelete = async () => {
        const response = await api.delete(`/admin/booking/${params.row.id}`);
        if (response.status === 200) {
            getBookings();
            handleClose();
        } else {
            setAlertMessage(response.statusText);
            setSeverity("error");
            setTimeout(() => { setAlertMessage(); setSeverity() }, 2000);
        }
    }

    const handleAddArticle = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const article_number = (data.get('number'));

        // on récupère les données de l'article avant insertion dans le state
        const settings = {
            number: article_number
        }
        const response = await api.post(`admin/articles/search`, settings)
        const newArticle = response.data;

        if (response.status !== 200) {
            setSeverity("error");
            setAlertMessage(`${response.data.message}`);
        } else if (!newArticle[0].available) {
            setSeverity("error");
            setAlertMessage("Article indisponible");
        } else {
            const settings = {
                articleNumber: article_number,
                bookingId: params.row.id
            }
            const addResponse = await api.put(`/admin/booking/article/${params.row.member_number}`, settings);

            if (addResponse.status === 200) {
                getBookings();

                setSeverity();
                setAlertMessage();
            } else {
                setSeverity("error");
                setAlertMessage(`${addResponse.data.message}`);
            }
        }
    }

    const handleReturn = async () => {

        if (returnArticle.length) {
            const options = {
                return_article: returnArticle
            }
            const articles = await api.put(`admin/booking/return/${params.row.id}`, options);
            if (articles.status === 200) {
                setSeverity("success");
                setAlertMessage("Articles rendu");
                getBookings();
            } else {
                setSeverity("error");
                setAlertMessage(`${articles.data.message}`);
            }
        } else {
            setSeverity("error");
            setAlertMessage("Auncun articles selectionnées");
        }

    }
    const handleProlong = async (row) => {
        let userId = params.row.member_number;
        const options = {
            prolong_article: row.number
        }
        const response = await api.post(`admin/booking/article/${userId}`, options);

        if (response.status === 200) {
            console.log(response);
            setSeverity("success");
            setAlertMessage("Article prolongé");
            getBookings();
        } else {
            setSeverity("error");
            setAlertMessage(`${response.data.message}`);
            getBookings();
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                {/* {`# ${params.value}`} */}
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="update-modal">
                    <div className="update-modal-header">
                        <Typography className='update-modal-header-title'>
                            Détails Réservation
                        </Typography>
                        <Button
                            className='update-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="update-modal-inputs">
                        <TextField
                            id='outlined'
                            name='first_name'
                            type='string'
                            disabled
                            defaultValue={params.row.first_name}
                            className="update-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >

                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={params.row.last_name}
                            className="update-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={params.row.email}
                            className="update-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                    </div>
                    <div className="update-modal-status">
                        {delivered && (
                            <Chip
                                variant='contained'
                                label='Délivrée'
                                className="update-modal-status--item"
                            />
                        )}
                        {overdue && (
                            <Chip
                                variant='contained'
                                color='secondary'
                                label='Retard'
                                className="update-modal-status--item"
                            />
                        )}
                        {closed && (
                            <Chip
                                variant='contained'
                                label='Clôturée'
                                className="update-modal-status--item"
                            />
                        )}
                    </div>
                    {!closed && (
                        <div className="updatebook-modal-articles--add">
                            <Box className='article-search' component="form" onSubmit={handleAddArticle}>
                                <TextField
                                    id='outlined'
                                    label='n° article'
                                    name='number'
                                    type='number'
                                    className="article-search-item"
                                >
                                </TextField>

                                <Button
                                    type='submit'
                                    className="article-search-submit"
                                    variant="outlined"
                                >
                                    Ajouter à la liste
                                </Button>
                            </Box>
                        </div>
                    )}
                    <div className="update-modal-articles">
                        <div className="update-modal-articles--book">
                            <BookingArticles
                                list={params.row.borrowed_articles}
                                closed={closed}
                                delivered={delivered}
                                getBookings={getBookings}
                                setReturnArticle={setReturnArticle}
                                handleProlong={handleProlong}
                            />
                        </div>
                    </div>
                    <div className="update-modal-footer">
                        <Button
                            onClick={() => handleReturn()}
                            className="addbook-modal-footer-submit"
                            variant='outlined'
                        >
                            Rendre la sélection
                        </Button>
                        {(!delivered && !closed) && (
                            <Button
                                onClick={handleDelete}
                                className="update-modal-footer-submit"
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                            >
                                Supprimer
                            </Button>
                        )}
                    </div>
                    {alertMessage && (
                        <AlertMessage message={alertMessage} severity={severity} />
                    )}
                </Box>
            </Modal>

        </div>
    );
};

UpdateBookingModal.propTypes = {
    className: PropTypes.string,
};
UpdateBookingModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateBookingModal);
