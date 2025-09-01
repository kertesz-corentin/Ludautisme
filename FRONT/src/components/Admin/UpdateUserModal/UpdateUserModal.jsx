import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import requests
import api from '../../../requests';

// import react components
import { toast } from 'react-toastify';

// import material ui components
import { TextField, Box, Typography, Modal, Button, Checkbox, FormControlLabel, FormGroup, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import fr from 'date-fns/locale/fr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './updateusermodal.scss';

const UpdateUserModal = ({ params, className, getUsers, updateOneUser, ...rest }) => {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(params.row.id_status);
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false);
    }
    const [archivedChecked, setArchivedChecked] = useState(params.row.archived);
    const [role, setRole] = useState(false)
    const [idRole, setIdRole] = useState(params.row.id_role)

    const admin = () => {
        if (params.row.id_role === 2) {
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
            'archived': data.get('archived'),
            'social_reason': data.get('social_reason'),
            'id_role': idRole,
            'id_status': Number(data.get('user_status')),
            'comment': data.get('comment')
        };

        if (user['id_status'] === 5) {
            toast.error("Ajoutez un status à votre utilisateur");
            return;
        }
        const response = await toast.promise(
            api.put(`/admin/users/${params.row.id}`, user),
            {
                pending: `Mise a jour de l'utilisateur`,
                error: 'Erreur lors de la mise a jour'
            }
        );

        if (response.status === 200) {
            toast.success("Utilisateur mis a jour");
            updateOneUser(params.row.id);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleUpdateDate = async (event, statusKey, dateKey) => {

        let input = dayjs(event, "YYYY") // year in your date
        let now = dayjs(dayjs(new Date()), "YYYY") // current year
        let savedDate = dayjs(event).format();

        let yearCountDiff = now.diff(input, 'year');
        let status = true;
        if (yearCountDiff >= 1) status = false;

        const user = {
            [statusKey]: status,
            [dateKey]: savedDate
        };

        const response = await toast.promise(
            api.put(`/admin/users/${params.row.id}`, user),
            {
                pending: `Mise a jour de l'utilisateur`,
                error: 'Erreur lors de la mise a jour'
            }
        );

        if (response.status === 200) {
            toast.success("Utilisateur mis a jour");
            updateOneUser(params.row.id);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleArchivedCheck = (event) => {
        setArchivedChecked(event.target.checked)
    }

    const handleRole = (event) => {
        if (event.target.checked === false) {
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
        if (response.status === 200) {
            toast.success("Utilisateur supprimé");
            getUsers();
        } else {
            toast.error(response.statusText);
        }
    }

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

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
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Email'
                            name='email'
                            type='email'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.email}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Raison sociale'
                            name='social_reason'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.social_reason}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Prénom'
                            name='first_name'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.first_name}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='last_name'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.last_name}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Téléphone'
                            name='phone'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.phone}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='n° de rue'
                            name='adress_number'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_number}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Nom de rue'
                            name='adress_street'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_street}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Code Postal'
                            name='adress_zipcode'
                            placeholder='ex: 75000'
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_zipcode}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id='outlined'
                            label='Ville'
                            name='adress_city'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            defaultValue={params.row.adress_city}
                            sx={{ mb: 2 }}
                        />
                        <FormGroup
                            sx={{
                                display: 'flex',
                                width: '40%',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='user_status'
                                value={status}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Particulier</MenuItem>
                                <MenuItem value={2}>Professionel</MenuItem>
                                <MenuItem value={3}>AESH</MenuItem>
                                <MenuItem value={4}>Structure</MenuItem>
                                <MenuItem value={5}>Sans Status</MenuItem>
                            </Select>
                        </FormGroup>
                        <TextField
                            id='outlined'
                            label='Commentaire'
                            name='comment'
                            type='string'
                            className="updateuser-modal-inputs-item"
                            multiline
                            defaultValue={params.row.comment}
                            sx={{
                                mb: 2,
                                marginTop: '1rem'
                            }}
                        />
                        <FormGroup
                            sx={{
                                display: 'flex',
                                width: '40%',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <FormControlLabel control={<Checkbox name='archived' checked={archivedChecked} onChange={handleArchivedCheck} />} label="Archivé" />
                            <FormControlLabel control={<Checkbox name='id_role' checked={role} onChange={handleRole} />} label="Admin" />
                        </FormGroup>
                    </div>
                    <div style= {{display: "flex", justifyContent: 'space-around', maxWidth: "1000px", width: "100%"}}>
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginTop: '1rem'
                                }}
                            >
                                {params.row.cotisation_status ? <Chip color="success" label={`Cotisation du ${moment(params.row.cotisation_expiration).format('DD/MM/YYYY')} valable`} icon={<DoneIcon />} /> : params.row.cotisation_expiration ? <Chip color="error" icon={<ClearIcon />} label={`cotisation expirée depuis le : ${moment(params.row.cotisation_expiration).format('DD/MM/YYYY')}`} /> : <Chip color="error" icon={<ClearIcon />} label={`Pas de cotisation`} />}
                                <LocalizationProvider dateAdapter={AdapterDayjs} locale={fr}>
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        label="Sélectionner une date"
                                        value={dayjs(params.row.cotisation_expiration)}
                                        onChange={(event) => handleUpdateDate(event, 'cotisation_status', 'cotisation_expiration')}
                                        slotProps= {{textField: {sx: {
                                                marginTop: '1rem'
                                            }}}}
                                    />
                                </LocalizationProvider>
                            </FormGroup>
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginTop: '1rem'
                                }}
                            >
                                {params.row.caution_status ? <Chip color="success" label={`Caution du ${moment(params.row.caution_expiration).format('DD/MM/YYYY')} valable`} icon={<DoneIcon />} /> : params.row.caution_expiration ? <Chip color="error" icon={<ClearIcon />} label={`Caution expirée depuis le : ${moment(params.row.caution_expiration).format('DD/MM/YYYY')}`} /> : <Chip color="error" icon={<ClearIcon />} label={`Pas de caution`} />}

                                <LocalizationProvider dateAdapter={AdapterDayjs} locale={fr}>
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        label="Sélectionner une date"
                                        value={dayjs(params.row.caution_expiration)}
                                        onChange={(event) => handleUpdateDate(event, 'caution_status', 'caution_expiration')}
                                        slotProps= {{textField: {sx: {
                                                marginTop: '1rem'
                                            }}}}
                                    />
                                </LocalizationProvider>
                            </FormGroup>
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginTop: '1rem'
                                }}
                            >
                                {params.row.convention_status ? <Chip color="success" label={`Convention du ${moment(params.row.convention_expiration).format('DD/MM/YYYY')} valable`} icon={<DoneIcon />} /> : params.row.convention_expiration ? <Chip color="error" icon={<ClearIcon />} label={`Convention expirée depuis le : ${moment(params.row.convention_expiration).format('DD/MM/YYYY')}`} /> : <Chip color="error" icon={<ClearIcon />} label={`Pas de convention`} />}
                                <LocalizationProvider dateAdapter={AdapterDayjs} locale={fr}>
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        label="Sélectionner une date"
                                        value={dayjs(params.row.convention_expiration, 'DD/MM/YYYY')}
                                        onChange={(event) => handleUpdateDate(event, 'convention_status', 'convention_expiration')}
                                        slotProps= {{textField: {sx: {
                                                marginTop: '1rem'
                                            }}}}
                                    />
                                </LocalizationProvider>
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
