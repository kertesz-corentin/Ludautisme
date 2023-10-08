import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import './updateCategoryModal.scss';
import { TextField, Box, Typography, Modal, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const UpdateReferenceModal = ({ params, categories, className, getMainCategories, ...rest }) => {
    const [open, setOpen] = React.useState(false)
    // const [mainChecked, setMainChecked] = React.useState(params.row.caution_status);
    const handleOpen = async () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const reference = {
            'name': data.get('name'),
            'description': data.get('description')
        };
        const response = await toast.promise(
            api.put(`/admin/categorie/${params.row.id}`, reference), 
            {
                pending: 'Mise a jour de la catégorie',
                error: 'Erreur lors de la mise a jour'
            }
        );
        
        if (response.status === 200) {
            toast.success("Catégorie mise à jour");
            getMainCategories();
        } else {
            toast.error(response.data.message);
        }
    }

    const handleDelete = async () => {
        const response = await toast.promise(
            api.delete(`/admin/categorie/${params.row.id}`), 
            {
                pending: 'Suppression a jour de la catégorie',
                error: 'Erreur lors de la mise a jour'
            }
        );
        if (response.status === 200) {
            toast.success("Catégorie supprimé");
            getMainCategories();
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="updatereference">
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="updatereference-modal" component="form" onSubmit={handleSubmit}>
                    <div className="updatereference-modal-header">
                        <Typography className='updatereference-modal-header-title'>
                            Edition catégorie
                        </Typography>
                        <Button
                            className='updatereference-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="updatereference-modal-inputs">
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='name'
                            type='string'
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.name}
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            fullWidth
                            multiline
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.description}
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        {/* <FormControlLabel control={<Checkbox name='caution_status' checked={mainChecked} onChange={handleMainChecked}/>} label="Principale" /> */}

                    </div>
                    <div className="updatereference-modal-footer">
                        <Button
                            type='submit'
                            className="updatereference-modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>
                        <Button
                                onClick={handleDelete}
                                className="update-modal-footer-submit"
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
