import React, { useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, FromGroup, FormGroup }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { userSchema } from '../../../Schemas';

import './addusermodal.scss';

const AddUserModal = ({className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            'member_number': data.get('member_number'),
            'email': data.get('email'),
            'first_name': data.get('first_name'),
            'last_name': data.get('last_name'),
            'phone': data.get('phone'),
            'adress_number': data.get('adress_number'),
            'adress_street': data.get('adress_street'),
            'adress_zipcode': data.get('adress_zipcode'),
            'adress_city': data.get('adress_city'),
            'cotisation_status': data.get('cotisation_status'),
            'caution_status': data.get('caution_status'),
            'archived': data.get('archived'),
        };

        console.log('user', user);
        const response = await api.post('/admin/users', user)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
    }

    const handleCheckBoxChange = (event) => {
        setChecked(event.target.checked)
    }

    return (
        <div className="adduser-modal--open">
            <Button onClick={handleOpen} variant='outlined'>Ajouter adhérent</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="adduser-modal" component="form" onSubmit={handleSubmit}>
                    <div className="adduser-modal-header">
                        <Typography className='adduser-modal-header-title'>
                            Nouvel Adhérent
                        </Typography>
                        <Button
                            className='adduser-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="adduser-modal-inputs">
                        <TextField
                            id='outlined'
                            label='n° adhérent'
                            name='member_number'
                            type='number'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Email'
                            name='email'
                            type='email'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Prénom'
                            name='first_name'
                            type='string'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='last_name'
                            type='string'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Téléphone'
                            name='phone'
                            type='string'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='n° de rue'
                            name='adress_number'
                            type='number'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Nom de rue'
                            name='adress_street'
                            type='string'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Code Postal'
                            name='adress_zipcode'
                            type='number'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Ville'
                            name='adress_city'
                            type='string'
                            className="adduser-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <FormGroup
                            sx={{
                                display: 'flex',
                                width: '40%',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <FormControlLabel control={<Checkbox name='cotisation_status' onChange={handleCheckBoxChange} />} label="Cotisation" />
                            <FormControlLabel control={<Checkbox name='caution_status' onChange={handleCheckBoxChange} />} label="Caution" />
                            <FormControlLabel control={<Checkbox name='archived' onChange={handleCheckBoxChange} />} label="Archivé" />
                        </FormGroup>
                    </div>
                    <div className="adduser-modal-footer">
                        <Button
                            type='submit'
                            className="adduser-modal-footer-submit"
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

AddUserModal.propTypes = {
    className: PropTypes.string,
};
AddUserModal.defaultProps = {
    className: '',
};
export default React.memo(AddUserModal);
