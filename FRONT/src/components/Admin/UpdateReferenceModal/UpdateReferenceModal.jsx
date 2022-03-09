import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton, Select, FormControl, InputLabel, MenuItem }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import './updatereferencemodal.scss';

const UpdateReferenceModal = ({params, categories, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState('');
    const [articles, setArticles] = useState([]);

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
        const response = await api.put(`/admin/references/${params.row.id}`, reference)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const getReferenceWithArticles = async () => {
        try {
            const response = await api.get(`/admin/references/${params.row.id}`);
            const data = await response.data;
            setArticles(data);
            console.log('articles', data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getReferenceWithArticles();
    }, [])

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
                            Edition Référence
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
                            label='Catégorie Actuelle'
                            type='string'
                            className="modal-inputs-item"
                            defaultValue={params.row.maincategory}
                            disabled
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
                            >
                            {categories.map((category) => {
                                return (
                                    <MenuItem value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
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
