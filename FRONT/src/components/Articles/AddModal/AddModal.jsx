import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { Button, Typography, Box, TextField, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classnames from 'classnames';
import './addmodal.scss';

const AddModal = ({reference, className, ...rest}) => {
    const [article, setArticle] = useState('');
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const article = {
            'number': data.get('number'),
            'origin': data.get('origin'),
            'date_buy': data.get('date_buy'),
            'id_ref': `${reference}`,
        };
        console.log('addArticle', article);
        console.log('reference', article);
        const response = await api.post('/admin/references/article', article)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Ajouter article</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Nouveau article
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
                            label='n° article'
                            name='number'
                            type='number'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Origine'
                            name='origin'
                            type='string'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='date_buy'
                            type='date'
                            className="modal-inputs-item"
                        >
                        </TextField>
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

AddModal.propTypes = {
    className: PropTypes.string,
};
AddModal.defaultProps = {
    className: '',
};
export default React.memo(AddModal);
