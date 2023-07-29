import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../requests';
import { Button, Typography, Box, TextField, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './addmodal.scss';
import { toast } from 'react-toastify';

const AddModal = ({reference, className, getReferenceWithArticles, ...rest}) => {
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

        const response = await api.post('/admin/references/article', article)
        if(response.status === 200) {
            toast.success("Article ajouté");
            getReferenceWithArticles();
            handleClose();
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="addarticle-modal--open">
            <Button
                onClick={handleOpen}
                variant='outlined'
            >
                Ajouter article
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="addarticle-modal" component="form" onSubmit={handleSubmit}>
                    <div className="addarticle-modal-header">
                        <Typography className='addarticle-modal-header-title'>
                            Nouveau article
                        </Typography>
                        <Button
                            className='addarticle-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="addarticle-modal-inputs">
                        <TextField
                            id='outlined'
                            label='n° article'
                            name='number'
                            type='number'
                            className="addarticle-modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Origine'
                            name='origin'
                            type='string'
                            className="addarticle-modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='date_buy'
                            type='date'
                            className="addarticle-modal-inputs-item"
                        >
                        </TextField>
                    </div>
                    <div className="addarticle-modal-footer">
                        <Button
                            type='submit'
                            className="addarticle-modal-footer-submit"
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
