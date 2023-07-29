import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import requests
import api from '../../../requests';

// import material ui components
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, FormGroup }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './addusermodal.scss';

const AddUserModal = ({getUsers, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false);
    }
    const [cotisationChecked, setCotisationChecked] = useState(false);
    const [cautionChecked, setCautionChecked] = useState(false);
    const [archivedChecked, setArchivedChecked] = useState(false);
    const [role, setRole] = useState(1)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('id_role' === true)){
            setRole(2);
        }
        const user = {
            'member_number': Number(data.get('member_number')),
            'email': data.get('email'),
            'first_name': data.get('first_name'),
            'last_name': data.get('last_name'),
            'phone': data.get('phone'),
            'adress_number': data.get('adress_number'),
            'adress_street': data.get('adress_street'),
            'adress_zipcode': Number(data.get('adress_zipcode')),
            'adress_city': data.get('adress_city'),
            'cotisation_status': cotisationChecked,
            'caution_status': cautionChecked,
            'archived': archivedChecked,
            'id_role': role,
        };

        const response = await toast.promise(
            api.post('/admin/users', user), 
            {
                pending: `Création de l'utilisateur`,
                error: 'Erreur lors de la création'
            }
        );
        console.log(response);
        if(response.status === 200) {
            toast.success("Adhérent créée");
            getUsers();
        } else {
            toast.error(response.data.message);
        }

    }

    const handleCotisationCheck = (event) => {
        setCotisationChecked(event.target.checked)
    }

    const handleCautionCheck = (event) => {
        setCautionChecked(event.target.checked)
    }

    const handleArchivedCheck = (event) => {
        setArchivedChecked(event.target.checked)
    }

    const handleRole = (event) => {
        if(event.target.checked === true){
            setRole(2)
        }
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
                            type='string'
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
                            placeholder= 'ex: 75000'
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
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
                            <FormControlLabel control={<Checkbox name='cotisation_status' onChange={handleCotisationCheck} />} label="Cotisation" />
                            <FormControlLabel control={<Checkbox name='caution_status' onChange={handleCautionCheck} />} label="Caution" />
                            <FormControlLabel control={<Checkbox name='archived' onChange={handleArchivedCheck} />} label="Archivé" />
                            <FormControlLabel control={<Checkbox name='id_role' onChange={handleRole} />} label="Admin" />
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
