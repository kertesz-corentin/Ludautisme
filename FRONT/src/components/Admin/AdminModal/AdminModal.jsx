import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './adminmodal.scss';
import { userSchema } from '../../../Schemas'

const AdminModal = ({name, fields, path, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {}
        for (var entrie of data.entries()) {
            const prop = entrie[0];
            const value = entrie[1];
            user[prop]=value;
         }
        console.log('user', user);

        const response = await api.post(path, user);
        console.log('response', response);
        if(response.status === 200) {
            console.log('data', response.data);
            handleClose();
        }

    }

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

                    {/* {Object.keys(userSchema).map((field) => { */}
                    {fields.map((field) => {
                            return (
                                <TextField
                                    key={field.field}
                                    id='outlined'
                                    label={field.headerName}
                                    name={field.field}
                                    type={field.type}
                                    className="modal-inputs-item"
                                >
                                </TextField>
                            )
                        })}
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
