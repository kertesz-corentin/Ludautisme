import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton, Select, FormControl, InputLabel, MenuItem }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Articles from '../../Articles/Articles';
import AddModal from '../../Articles/AddModal/AddModal';

import './updatereferencemodal.scss';

const UpdateReferenceModal = ({params, categories, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState(params.row.id_maincat);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const reference = {
            'name': data.get('name'),
            'description': data.get('description'),
            'valorisation': data.get('valorisation'),
            'main_category': data.get('main_category'),
        };
        console.log('reference', reference)
        const response = await api.put(`/admin/references/${params.row.id}`, reference);
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);

    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setCategory(event.target.value);
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
                            Edition Référence
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
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.description}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.valorisation}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <FormControl fullWidth>
                            <InputLabel id="maincategory-label">Catégorie</InputLabel>
                            <Select
                                labelId="maincategory-label"
                                id="main_category"
                                name="main_category"
                                label="Catégorie"
                                type='string'
                                onChange={handleChange}
                                value={category}
                            >
                            {categories.map((category) => {
                                return (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="updatereference-modal-footer">
                        <Button
                            type='submit'
                            className="updatereference-modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>

                    </div>
                    <div className="updatereference-modal-articles">
                        <Articles params={params} children={<AddModal reference={params.row.id} />} />
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
