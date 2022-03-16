import React, { useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, IconButton, FormGroup }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { userSchema } from '../../../Schemas';

import './updateusermodal.scss';

const UpdateUserModal = ({params, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    const [cotisationChecked, setCotisationChecked] = useState(params.row.cotisation_status);
    const [cautionChecked, setCautionChecked] = useState(params.row.caution_status);
    const [archivedChecked, setArchivedChecked] = useState(params.row.archived);

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
        const response = await api.put(`/admin/users/${params.row.id}`, user)
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
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

    const handleDelete = async () => {
        const response = await api.delete(`/admin/users/${params.row.id}`)
        if(response.status === 200) {
            handleClose();
        }
    }

    return (
        <div className="updateuser">
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="updateuser-modal" component="form" onSubmit={handleSubmit}>
                    <div className="updateuser-modal-header">
                        <Typography className='updateuser-modal-header-title'>
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
                    <div className="updateuser-modal-inputs">
                        <TextField
                            id='outlined'
                            label='n° adhérent'
                            name='member_number'
                            type='number'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.member_number}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Email'
                            name='email'
                            type='email'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.email}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Prénom'
                            name='first_name'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.first_name}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='last_name'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.last_name}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Téléphone'
                            name='phone'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.phone}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='n° de rue'
                            name='adress_number'
                            type='number'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_number}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Nom de rue'
                            name='adress_street'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_street}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Code Postal'
                            name='adress_zipcode'
                            type='number'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_zipcode}
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Ville'
                            name='adress_city'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_city}
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
                            <FormControlLabel control={<Checkbox name='cotisation_status' checked={cotisationChecked} onChange={handleCotisationCheck} />} label="Cotisation" />
                            <FormControlLabel control={<Checkbox name='caution_status' checked={cautionChecked} onChange={handleCautionCheck} />} label="Caution" />
                            <FormControlLabel control={<Checkbox name='archived' checked={archivedChecked} onChange={handleArchivedCheck} />} label="Archivé" />
                        </FormGroup>
                    </div>
                    <div className="updateuser-modal-footer">
                        <Button
                            type='submit'
                            className="updateuser-modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>
                        {archivedChecked && (
                            <Button
                                onClick={handleDelete}
                                className="updateuser-modal-footer-submit"
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                            >
                                Supprimer
                            </Button>
                        )}

                    </div>
                </Box>
            </Modal>

        </div>
    );
};

UpdateUserModal.propTypes = {
    className: PropTypes.string,
};
UpdateUserModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateUserModal);
