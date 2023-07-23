import React from 'react';
import PropTypes from 'prop-types';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

// import requests
import api from '../../../requests';

// import react components
import { articleSchema } from '../../../Schemas';

// import material ui components
import { Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';

import './addbookingmodal.scss';

const AddBookingModal = ({ user, className, getBookings, updateOneBooking, ...rest }) => {
    const [open, setOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();

    const handleOpen = async () => {
        // get active booking of this user if exist 
        let activeBooking = await api.get(`/customer/booking/active/${user[0].id}`);

        // get articles if booking exist
        if (activeBooking.data) {
            setCurrentBooking(activeBooking.data[0])
            if (activeBooking.data[0]?.borrowed_articles) {
                setListArticle(activeBooking.data[0]?.borrowed_articles)
            }   
        }
        // séparer la listes pour l'affichage et la liste pour envoyer a réserver

        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setListArticle([]);
        setArticleId([]);
        setCurrentBooking(null);
        setAlertMessage(null);
        setSeverity(null);
    }

    const [articleId, setArticleId] = React.useState([]);
    const [listArticle, setListArticle] = React.useState([]);
    const [currentBooking, setCurrentBooking] = React.useState();

    const inputRef = React.useRef(null);

    const handleSubmitBooking = async (event) => {
        event.preventDefault();
        const listIds = {
            "artIds": articleId
        }

        if (currentBooking) {
            articleId.forEach(async (id, index) => {
                let options = {
                    articleNumber: id, 
                    bookingId: currentBooking.id
                }
                const response = await api.put(`/admin/booking/${user[0].id}`, options);

                if (response.status === 200) {
                    if (index + 1 === articleId.length) {
                        setSeverity("success");
                        setAlertMessage("Réservation réussi");
                        updateOneBooking(response.data.newBookingConfirm.id);
                        setTimeout(() => { handleClose() }, 5000);
                    }
                } else {
                    setSeverity("error");
                    setAlertMessage(`${response.data.message}`);
                    return;
                }
            })

        } else {
            const response = await api.post(`/admin/booking/add/${user[0].id}`, listIds);
            if (response.status === 200) {
                setSeverity("success");
                setAlertMessage("Réservation réussi");

                updateOneBooking(response.data.newBookingConfirm.id);
                setTimeout(() => { handleClose() }, 5000);
            } else {
                setSeverity("error");
                setAlertMessage(`${response.data.message}`);
            }
        }
    }

    const handleDeliveredBooking = async (event) => {
        event.preventDefault();

        const listIds = {
            "artIds": articleId
        }

        if (currentBooking) {
            articleId.forEach(async (id, index) => {
                let options = {
                    articleNumber: id, 
                    bookingId: currentBooking.id
                }
                const response = await api.put(`/admin/booking/${user[0].id}`, options);
                if (response.status === 200) {
                    if (index + 1 === articleId.length) {
                        setSeverity("success");
                        setAlertMessage("Réservation réussi");
                        updateOneBooking(response.data.newBookingConfirm.id);
                        setTimeout(() => { handleClose() }, 5000);
                    }
                } else {
                    setSeverity("error");
                    setAlertMessage(`${response.data.message}`);
                    return;
                }
            })
        } else {
            const booking = await api.post(`/admin/booking/add/${user[0].id}`, listIds);

            if (booking.status === 200) {
                const response = await api.post(`/admin/booking/deliver/${booking.data.newBookingConfirm.id}`);
                if (response.status === 200) {
                    setSeverity("success");
                    setAlertMessage("Réservation réussi");
                    updateOneBooking(response.data.newBookingConfirm.id);
                    setTimeout(() => { handleClose() }, 5000);
                } else {
                    setSeverity("error");
                    setAlertMessage(`${response.data.message}`);
                }
            } else {
                setSeverity("error");
                setAlertMessage(`${booking.data.message}`);
            }
        }
    }

    // creat a function to add an article in bookingList on creation
    const handleSubmitSearch = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const article_number = (data.get('number'));

        if (articleId.includes(Number(article_number))) {
            setSeverity("error");
            setAlertMessage("article déjà présent dans la réservation");
        } else {
            // on récupère les données de l'article avant insertion dans le state
            const settings = {
                number: article_number
            }
            const response = await api.post(`admin/articles/search`, settings)
            const newArticle = await response.data;

            if (newArticle.length) {
                setListArticle(state => [...state, newArticle[0]]);
                setArticleId(state => [...state, newArticle[0].id]);
                inputRef.current.value = "";

                setSeverity(null);
                setAlertMessage(null);
            } else {
                setSeverity("error");
                setAlertMessage(newArticle.message);
            }
        }
    }

    // create a function to delete an article in booking creation
    const handleDelete = (id) => {
        const newList = listArticle.filter((params) => params.id !== id)
        setListArticle(newList);

        const newArticleList = articleId.filter((art) => art !== id)
        setArticleId(newArticleList)
    }

    const columnsBuilder = (() => {
        const columns = [];
        Object.keys(articleSchema).forEach(prop => {
            const propElt = articleSchema[prop];
            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
            };
            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "delete":
                        config.renderCell = (params) => (

                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                                key={params.id}
                            >
                                <DeleteIcon onClick={() => handleDelete(params.id)} />
                            </IconButton>
                        );
                        break;

                    default:
                        break;
                }
            }
            columns.push(config);
        });
        return columns;
    })();

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
            >
                Continuer
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="addbook-modal">
                    <div className="addbook-modal-header">
                        <Typography className='addbook-modal-header-title'>
                            Nouvelle Réservation
                        </Typography>
                        <Button
                            className='addbook-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="addbook-modal-inputs">
                        <TextField
                            id='outlined'
                            name='first_name'
                            type='string'
                            disabled
                            defaultValue={user[0].first_name}
                            className="addbook-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={user[0].last_name}
                            className="addbook-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={user[0].email}
                            className="addbook-modal-inputs-item"
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                    </div>

                    <div className="addbook-modal-articles">
                        <div className="addbook-modal-articles--add">
                            <Box className='article-search'
                                component="form"
                                onSubmit={(e) => {
                                    e.stopPropagation();
                                    handleSubmitSearch(e)
                                }}>
                                <TextField
                                    id='outlined'
                                    inputRef={inputRef}
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
                        <div className="addbook-modal-articles--book">
                            <h2>Liste des articles</h2>
                            <div className="articles-grid" style={{ width: '100%' }}>
                                <DataGrid
                                    autoHeight
                                    getRowId={(row) => row.id}
                                    rows={listArticle}
                                    columns={columnsBuilder}
                                    disableSelectionOnClick
                                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                    components={{
                                        Toolbar: GridToolbar,
                                    }}
                                    initialState={{
                                        columns: {
                                            columnVisibilityModel: {
                                                id: false,
                                                origin: false,
                                                created_at: false,
                                                main_category: false,
                                                valorisation: false,
                                                archived: false,
                                                delivered: false,
                                                closed: false,
                                                id_ref: false,
                                                id_booking: false,
                                                date_buy: false,
                                                nb_prolongation: false,
                                                id_permanency: false,
                                                id_user: false,
                                                returned:false,
                                                description: false,
                                                prolonge: false
                                            },
                                        },
                                        sorting: {
                                            sortModel: [{ field: 'number', sort: 'asc' }],
                                        },
                                        filter: {
                                            filterModel: {
                                                items: [
                                                    { columnField: 'archived', value: false },
                                                    { columnField: 'available', value: true },
                                                ]
                                            }
                                        }
                                    }}
                                >
                                </DataGrid>
                            </div>
                        </div>
                    </div>
                    <div className="addbook-modal-footer">
                        {alertMessage && severity && (
                            <AlertMessage
                                message={alertMessage}
                                severity={severity}
                            >
                            </AlertMessage>
                        )}
                        <div className="addbook-modal-footer-button">
                            <Button
                                onClick={handleSubmitBooking}
                                className="addbook-modal-footer-submit"
                                variant='outlined'
                                color='primary'
                            >
                                Valider
                            </Button>
                            <Button
                                onClick={handleDeliveredBooking}
                                className="addbook-modal-footer-submit"
                                variant='outlined'
                                color='success'
                            >
                                Valider et délivrer
                            </Button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

AddBookingModal.propTypes = {
    className: PropTypes.string,
};
AddBookingModal.defaultProps = {
    className: '',
};
export default React.memo(AddBookingModal);
