import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';

// import react components
import { toast } from 'react-toastify';

// import react components
import BookingArticles from '../BookingArticles/BookingArticles';

// import material ui components
import { TextField, Box, Typography, Modal, Button, IconButton, Chip, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './updatebookingmodal.scss';

const UpdateBookingModal = ({ params, className, updateOneBooking, getBookings, deleteOneRow, ...rest }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const [closed] = useState(params.row.closed);
    const [delivered] = useState(params.row.delivered);
    const [overdue] = useState(params.row.overdue);
    const [returnArticle, setReturnArticle] = React.useState([]);

    const [notAvailableOpen, setNotAvailableOpen] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');
    const [currentArticle, setCurrentArticle] = React.useState();
    const [noAvailableStatus, setNoAvailableStatus] = React.useState();

    const handleNotAvailableClose = () => {
        setModalMessage("")
        setNotAvailableOpen(false);
    }

    const addToReturnList = (value) => {
        console.log(value);
        setReturnArticle(value);
    }
    const handleFreeAndAdd = async () => {
        let response = null;
        switch (noAvailableStatus) {
            // just non available
            case 1:
                let option = {
                    "available": true
                }
                response = await api.put(`/admin/articles/${currentArticle.id}`, option);
                break;
            // in booking not delivered
            case 2:
                response = await api.delete(`/admin/booking/article/${currentArticle.id}`);
                break;
            // in booking delivered
            case 3:
                response = await api.post(`/admin/booking/return/${currentArticle.id}`);
                break;
            default:
                toast.error("Cas d'article indisponible non géré");
                return;
        }

        if (response.status === 200) {
            const settings = {
                number: currentArticle.number
            }
            const updatedArticle = await api.post(`admin/articles/search`, settings);

            if (updatedArticle.status === 200) {
                setCurrentArticle(updatedArticle.data[0]);
                
                const settings = {
                    articleNumber: updatedArticle.number,
                    bookingId: params.row.id
                }
                const addResponse = await api.put(`/admin/booking/article/${params.row.member_number}`, settings);
    
                if (addResponse.status === 200) {
                    updateOneBooking(params.row.id);
                } else {
                    toast.error(addResponse.data.message);
                }
                toast.success("Article libéré et ajouté");
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error(response.data.message);
        }

        setModalMessage("");
        setNotAvailableOpen(false);
    }

    const handleDelete = async () => {

        const response = await toast.promise(
            api.delete(`/admin/booking/${params.row.id}`),
            {
                pending: `Suppression de la réservation`,
                error: 'Erreur lors de la suppression'
            }
        );

        if (response.status === 200) {
            toast.success("réservation supprimé");
            deleteOneRow(params.row.id);
        } else {
            toast.error(response.statusText);
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
        const newArticle = response.data[0];
        setCurrentArticle(newArticle);

        if (response.status !== 200) {
            toast.error(response.data.message);
        } else if (!newArticle.available) {
            let booking = await api.get(`admin/booking/article/${newArticle.id}`);
            let bookingData = booking.data[0];

            let userName = `${bookingData?.first_name} ${bookingData?.last_name}`;

            if (!bookingData) {
                setNoAvailableStatus(1);
                setModalMessage("Cet article n'est pas disponible mais dans aucune réservation");
            } else if (!bookingData.delivered) {
                setNoAvailableStatus(2);
                setModalMessage(`Cet article est réservé par ${userName}, il est déconseillé de le prêter a une autre personne`);
            } else {
                let permDate = new Date(bookingData.perm_date);
                const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setNoAvailableStatus(3);
                setModalMessage(`Cet article est dans la réservation de ${userName} du ${permDate.toLocaleString('fr-FR', dateOptions)}`)
            }

            setNotAvailableOpen(true);
        } else {
            const settings = {
                articleNumber: article_number,
                bookingId: params.row.id
            }
            const addResponse = await api.put(`/admin/booking/article/${params.row.member_number}`, settings);

            if (addResponse.status === 200) {
                updateOneBooking(params.row.id);
            } else {
                toast.error(addResponse.data.message);
            }
        }
    }

    const handleReturn = async () => {
        console.log(returnArticle);
        if (returnArticle.length) {
            const options = {
                return_article: returnArticle
            }
            const articles = await api.put(`admin/booking/return/${params.row.id}`, options);
            if (articles.status === 200) {
                toast.success("Articles rendu");
                updateOneBooking(params.row.id);
            } else {
                toast.error(articles.data.message);
            }
        } else {
            toast.error("Auncun articles selectionnées");
        }
    }
    const handleProlong = async (row) => {
        let userId = params.row.member_number;
        const options = {
            prolong_article: row.number
        }
        const response = await api.post(`admin/booking/article/${userId}`, options);

        if (response.status === 200) {
            toast.success("Article prolongé");
            updateOneBooking(params.row.id);
        } else {
            toast.error(response.data.message);
            updateOneBooking(params.row.id);
        }

        let notReturnedArticle = false; 
        for (const art of params.row.borrowed_articles) {
            if (!art.returned) notReturnedArticle = true;
        }

        if (!notReturnedArticle) {
            const closeResponse = await api.post(`admin/booking/close/${params.row.id}`, options);
            if(closeResponse.status === 200) {
                updateOneBooking(params.row.id);
            } else {
                toast.error(closeResponse.data.message);
            }
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
                                setReturnArticle={addToReturnList}
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
                </Box>
            </Modal>
            <Modal open={notAvailableOpen} onClose={handleNotAvailableClose} >
                <Box className="delete-modal">
                    <div className="delete-modal-header">
                        <Typography className='delete-modal-header-title'>
                            Article non disponible
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
                            onClick={handleFreeAndAdd}
                            className="addbook-modal-footer-submit"
                            variant="contained"
                            style={{ marginRight: '10px' }}
                        >
                            Rendre disponible et ajouter
                        </Button>
                        <Button
                            type='button'
                            onClick={handleNotAvailableClose}
                            className="addbook-modal-footer-submit"
                            variant="contained"
                            color='error'
                        >
                            Ne pas ajouter
                        </Button>
                    </div>
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
