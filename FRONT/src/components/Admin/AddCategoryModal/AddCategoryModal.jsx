import React, { useState} from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';

// import react components
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

// import material ui components
import { TextField, Box, Typography, Modal, Button, FormGroup, FormControlLabel, Checkbox }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './addcategorymodal.scss';

const AddCategoryModal = ({className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false);
        setAlertMessage(null);
    }
    

    const [mainCat, setMainCat] = useState(false);

    const [alertMessage, setAlertMessage] = useState();

    const handleMainCatCheck = (event) => {
        setMainCat(event.target.checked)
    }

    const AddNewCategory = async (event) => {
        const data = new FormData(event.currentTarget);

        const addedCategory = {
            'name': data.get('name'),
            'description': data.get('description'),
            'main': mainCat,
        }

        const response = await api.post('/admin/categorie', addedCategory)
        if(response.status === 200) {
            console.log(response.data)
        }
        else {
            setAlertMessage(response.data.message);
        }
    }

    return (
        <div className="addreference-modal--open">
            <Button onClick={handleOpen} variant='outlined'>Ajouter Catégorie</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="addreference-modal" component="form" onSubmit={AddNewCategory}>
                    <div className="addreference-modal-header">
                        <Typography className='addreference-modal-header-title'>
                            Nouvelle Catégorie
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
                            label='Nom catégorie'
                            name='name'
                            type='string'
                            className="category-form-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            className="category-form-item"
                        >
                        </TextField>
                        <FormGroup className="category-form-item">
                            <FormControlLabel control={<Checkbox name='main' onChange={handleMainCatCheck} />} label="Principale" />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="addreference-modal-footer-submit"
                            variant="contained"
                        >
                            Valider
                        </Button>
                        {alertMessage && (
                            <AlertMessage message={alertMessage} />
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

AddCategoryModal.propTypes = {
    className: PropTypes.string,
};
AddCategoryModal.defaultProps = {
    className: '',
};
export default React.memo(AddCategoryModal);
