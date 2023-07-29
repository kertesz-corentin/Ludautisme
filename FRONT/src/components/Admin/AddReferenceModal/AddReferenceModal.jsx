import React, { useState} from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';
import { toast } from 'react-toastify';

// import react components

// import material ui components
import { TextField, Box, Typography, Modal, Button, FormControl, InputLabel, Select, MenuItem }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './addreferencemodal.scss';

const AddReferenceModal = ({categories, tags, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState('');
    const [tag, setTags] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const reference = {
            'name': data.get('name'),
            'description': data.get('description'),
            'valorisation': data.get('valorisation'),
            'main_category': data.get('main_category'),
        };

        const response = await toast.promise(
            api.post('/admin/references', reference), 
            {
                pending: 'Création de la référence',
                error: 'Erreur lors de la création'
            }
        );

        if(response.status === 200) {
            toast.success("Référence créée");
        } else {
            toast.error(response.data.message);
        }
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    }
    const handleChangeTag = (event) => {
        setTags(event.target.value);
    }

    return (
        <div className="addreference-modal--open">
            <Button onClick={handleOpen} variant='outlined'>Ajouter référence</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="addreference-modal" component="form" onSubmit={handleSubmit}>
                    <div className="addreference-modal-header">
                        <Typography className='addreference-modal-header-title'>
                            Nouvelle Référence
                        </Typography>
                        <Button
                            className='addreference-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="addreference-modal-inputs">
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='name'
                            type='string'
                            className="addreference-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="addreference-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='textarea'
                            className="addreference-modal-inputs-item"
                            sx={{mb: 2}}
                            fullWidth
                            multiline
                        >
                        </TextField>
                        <FormControl fullWidth>
                            <InputLabel id="maincategory-label">Catégorie</InputLabel>
                            <Select
                                labelId="maincategory-label"
                                id="main_category"
                                name="main_category"
                                label="Catégorie"
                                onChange={handleChange}
                                value={category}
                                style={{marginBottom: "16px"}}
                            >
                            {categories.map((category) => {
                                return (
                                    <MenuItem value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="tags-label">Catégories secondaires</InputLabel>
                            <Select
                                labelId="tags-label"
                                id="tags"
                                name="tags"
                                label="Catégories secondaires"
                                type='string'
                                onChange={handleChangeTag}
                                value={tag}
                                multiple
                            >
                                {tags.map((category) => {
                                    return (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="addreference-modal-footer-submit"
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
