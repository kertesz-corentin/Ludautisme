import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Typography, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './adminmodal.scss';

const AdminModal = ({name, fields, request, token, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const response = await request(data, token)
        if(response.status === 200) {
            console.log(data);
            handleClose();
        }

    }

    const date = new Date();

    return (
        <div>
            <Button onClick={handleOpen}>Ajouter {name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Ajouter un {name}
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
                        {fields.map((field) => {
                            return (
                                <TextField
                                    key={field.id}
                                    id='outlined'
                                    label={field.headerName}
                                    name={field.field}
                                    className="modal-inputs-item"
                                    required
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

AdminModal.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    fields: PropTypes.shape({
        field: PropTypes.string.isRequired,
        headerName: PropTypes.string.isRequired,
    }).isRequired,
    request: PropTypes.func.isRequired,
};
AdminModal.defaultProps = {
    className: '',
};
export default React.memo(AdminModal);
