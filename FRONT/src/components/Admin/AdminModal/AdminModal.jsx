import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Typography, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './adminmodal.scss';
import schemas from '../../../Schemas/Schemas'

const AdminModal = ({name, fields, request, token, className, ...rest}) => {
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
        console.log(user,request);
        const response = await request(user, token);
        console.log(response);
        if(response.status === 200) {
            console.log(response);
            handleClose();
        }

    }


    const date = new Date();
    const {user} = schemas();

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

                    {Object.keys(user).map((field) => {
                            console.log(user[field].label);
                            return (
                                <TextField
                                    key={field}
                                    id='outlined'
                                    label={field}
                                    name={field}
                                    className="modal-inputs-item"
                                    required
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
