import React, { useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { referenceSchema } from '../../../Schemas';

import './updatereferencemodal.scss';

const UpdateReferenceModal = ({params, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const reference = {
            'name': data.get('name'),
            'description': data.get('description'),
            'valorisation': data.get('valorisation'),
            'main_categpry': data.get('main_category'),
        };

        console.log('reference', reference);
        const response = await api.put(`/admin/references/${params.row.id}`, reference)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    const handleDelete = async () => {
        const response = await api.delete(`/admin/references/${params.row.id}`)
        if(response.status === 200) {
            handleClose();
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Edition Adhérent
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
                            defaultValue={params.row.name}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            className="modal-inputs-item"
                            defaultValue={params.row.description}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="modal-inputs-item"
                            defaultValue={params.row.valorisation}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Catégorie'
                            name='main_category'
                            type='number'
                            className="modal-inputs-item"
                            defaultValue={params.row.main_category}
                        >
                        </TextField>


                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>

                        <Button
                            onClick={handleDelete}
                            className="modal-footer-submit"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            Supprimer
                        </Button>

                    </div>
                </Box>
            </Modal>

        </div>
    );
};

UpdateReferenceModal.propTypes = {
    className: PropTypes.string,
};
UpdateReferenceModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateReferenceModal);
