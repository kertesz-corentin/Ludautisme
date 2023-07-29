import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests';

// import react components
import { toast } from 'react-toastify';

// import material ui components
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, FormGroup }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './updateusermodal.scss';

const UpdateUserModal = ({params, className, getUsers, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false);
    }
    const [cotisationChecked, setCotisationChecked] = useState(params.row.cotisation_status);
    const [cautionChecked, setCautionChecked] = useState(params.row.caution_status);
    const [archivedChecked, setArchivedChecked] = useState(params.row.archived);
    const [role, setRole] = useState(false)
    const [idRole, setIdRole] = useState(params.row.id_role)

    const admin = () => {
        if(params.row.id_role === 2){
            setRole(true)
        }
    }

    useEffect(() => {
        admin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            'id_role': idRole,
        };
        const response = await toast.promise(
            api.put(`/admin/users/${params.row.id}`, user), 
            {
                pending: `Mise a jour de l'utilisateur`,
                error: 'Erreur lors de la mise a jour'
            }
        );

        if(response.status === 200) {
            toast.success("Utilisateur mis a jour");
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
        if(event.target.checked === false){
            setIdRole(1)
        }
        else {
            setIdRole(2)
        }
        setRole(event.target.checked)
    }

    const handleDelete = async () => {
        const response = await toast.promise(
            api.delete(`/admin/users/${params.row.id}`), 
            {
                pending: `Suppression de l'utilisateur`,
                error: 'Erreur lors de la suppression'
            }
        );
        if(response.status === 200) {
            toast.success("Utilisateur supprimé");
            getUsers();
        } else {
            toast.error(response.statusText);
        }
    }

    return (
        <div className="updateuser">
            <Box onClick={handleOpen}>
                <EditIcon />
            </Box>
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
                            type='string'
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
                            placeholder= 'ex: 75000'
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
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
                            <FormControlLabel control={<Checkbox name='id_role' checked={role} onChange={handleRole} />} label="Admin" />
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
