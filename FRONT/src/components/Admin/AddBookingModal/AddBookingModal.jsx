import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';

// import react components
import BookingArticles from '../BookingArticles/BookingArticles';
import { articleSchema } from '../../../Schemas';

// import material ui components
import { Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';

import './addbookingmodal.scss';

const AddBookingModal = ({user, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const [articleId, setArticleId] = useState([]);
    const [listArticle, setListArticle] = useState([]);

    const handleSubmitBooking = async (event) => {
        event.preventDefault();
        const listIds = {
            "artIds": articleId
        }

        console.log('id', listIds);
        const response = await api.post(`/admin/booking/add/${user[0].id}`, listIds);
        if(response.status === 200){
            handleClose();
            console.log('Réservation validée');
        }

    }

    // creat a function to add an article in bookingList on creation
    const handleSubmitSearch = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const article_number = (data.get('number'));
        // on récupère les données de l'article avant insertion dans le state
        const settings = {
            number: article_number
        }
        const response = await api.post(`admin/articles/search`, settings)
        const newArticle = await response.data;

        setListArticle(state => [...state, newArticle[0]]);
        setArticleId(state => [...state, newArticle[0].id]);
    }

    // create a function to delete an article in booking creation
    const handleDelete = (id) => {
        console.log('article à supprimer', id);
        const newList = listArticle.filter((params) => params.id !== id)

        setListArticle(newList);
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
            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
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
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={user[0].last_name}
                            className="addbook-modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={user[0].email}
                            className="addbook-modal-inputs-item"
                        >
                        </TextField>
                    </div>

                    <div className="addbook-modal-articles">
                        <div className="addbook-modal-articles--add">
                            <Box className='article-search' component="form" onSubmit={handleSubmitSearch}>
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
                        <div className="addbook-modal-articles--book">
                            <div className="articles-grid" style={{ height: 325, width: '100%'}}>
                                <DataGrid
                                    getRowId={(row) => row.id}
                                    rows={listArticle}
                                    columns={columnsBuilder}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
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
                                            },
                                        },
                                        sorting: {
                                            sortModel: [{field: 'number', sort: 'asc'}],
                                        },
                                        filter: {
                                            filterModel: {
                                                items: [
                                                    {columnField: 'archived', value: false},
                                                    {columnField: 'available', value: true},
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
                        <Button
                            onClick={handleSubmitBooking}
                            className="addbook-modal-footer-submit"
                            variant='outlined'
                            color='primary'
                        >
                            Valider la réservation
                        </Button>
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
