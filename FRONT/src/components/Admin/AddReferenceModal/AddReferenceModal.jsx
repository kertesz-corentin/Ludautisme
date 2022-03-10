import React, { useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, FromGroup, FormGroup }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { referenceSchema } from '../../../Schemas';

import './addreferencemodal.scss';

const AddReferenceModal = ({className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const reference = {
            'name': data.get('name'),
            'description': data.get('description'),
            'valorisation': data.get('valorisation'),
            'main_category': data.get('main_category'),
        };

        console.log('reference', reference);
        const response = await api.post('/admin/references', reference)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Ajouter référence</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Nouvelle Référence
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
                            label='Nom'
                            name='name'
                            type='string'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='textarea'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Catégorie'
                            name='main_category'
                            type='number'
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

AddReferenceModal.propTypes = {
    className: PropTypes.string,
};
AddReferenceModal.defaultProps = {
    className: '',
};
export default React.memo(AddReferenceModal);
