import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Typography, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './adminmodal.scss';

const AdminModal = ({name, fields, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('coucou');
    }

    const date = new Date();

    return (
        <div>
            <Button onClick={handleOpen}>Ajouter {name}</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box className='modal' component='form' onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Ajouter un {name}
                        </Typography>
                        <Button
                            className='modal-header-close'
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="modal-inputs">
                        {fields.map((field) => {
                            return (
                                <TextField
                                    key={field.id}
                                    id='outlined'
                                    label={field.headerName}
                                    className="modal-inputs-item"
                                >
                                </TextField>
                            )
                        })}

                        <TextField
                            id='outlined'
                            value={date}
                            disabled
                            className="modal-inputs-item"
                        >

                        </TextField>
                    </div>
                    <div className="modal-footer">
                        <Button type='submit' className="modal-footer-submit">Valider</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

AdminModal.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    fields: PropTypes.shape({
        field: PropTypes.string.isRequired,
        headerName: PropTypes.string.isRequired,
    }).isRequired,
};
AdminModal.defaultProps = {
    className: '',
};
export default React.memo(AdminModal);
