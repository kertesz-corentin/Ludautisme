import React, { useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, FormControl, InputLabel, Select, MenuItem }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { referenceSchema } from '../../../Schemas';

import './addreferencemodal.scss';

const AddReferenceModal = ({categories, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);
    const [category, setCategory] = useState('');

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

    const handleChange = (event) => {
        setCategory(event.target.value);
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
