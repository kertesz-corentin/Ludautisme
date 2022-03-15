import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../requests';
import BookingArticles from '../BookingArticles/BookingArticles';
import Articles from '../../Articles/Articles';
import './addbookingmodal.scss';

const AddBookingModal = ({user, params, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const [articleId, setArticleId] = useState([]);
    const [listArticle, setListArticle] = useState([]);

    const handleSubmitBooking = async (event) => {
        event.preventDefault();

        console.log('Validation réservation');
    }

    const handleSubmitSearch = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const article_number = Number(data.get('number'));
        // on récupère les données de l'article avant insertion dans le state
        const settings = {
            number: article_number
        }
        const response = await api.post(`admin/articles/search`, settings)
        const newArticle = await response.data;

        setListArticle(state => [...state, newArticle[0]]);
        setArticleId(state => [...state, newArticle[0].id]);
    }
    console.log('IDarticle', articleId);
    console.log('Listarticle', listArticle);
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
                                {/* {search && ( */}
                                    <TextField
                                        id='outlined'
                                        label='n° article'
                                        name='number'
                                        type='number'
                                        className="article-search-item"
                                    >
                                    </TextField>
                                {/* )}

                                {articleExist && search &&( */}
                                    <Button
                                    type='submit'
                                    className="article-search-submit"
                                    variant="outlined"
                                    >
                                        Ajouter à la liste
                                    </Button>
                                {/* )} */}

                            </Box>
                        </div>
                        <div className="addbook-modal-articles--book">
                            <BookingArticles  list={listArticle} idArticles={articleId} />
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
