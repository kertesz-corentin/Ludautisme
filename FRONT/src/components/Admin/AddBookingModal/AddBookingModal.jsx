import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../requests';
import BookingArticles from '../BookingArticles/BookingArticles';
import Articles from '../../Articles/Articles';
import './addbookingmodal.scss';

const AddBookingModal = ({user, allArticles, bookArticles, params, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const booking = {
            // 'name': data.get('name'),
            // 'description': data.get('description'),
            // 'valorisation': data.get('valorisation'),
            // 'main_category': data.get('main_category'),
        };

        console.log('booking', booking);
        const response = await api.post('/admin/references', booking)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    console.log('user', user[0]);
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
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Nouvelle Réservation
                        </Typography>
                        <Button
                            className='modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="modal-inputs">
                        <TextField
                            id='outlined'
                            name='first_name'
                            type='string'
                            disabled
                            defaultValue={user[0].first_name}
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={user[0].last_name}
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={user[0].email}
                            className="modal-inputs-item"
                        >
                        </TextField>
                    </div>
                    <div className="modal-articles">
                        <div className="modal-articles--book">
                            <BookingArticles  articles={allArticles} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="modal-footer-submit"
                            variant="contained"
                        >
                            Valider
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
