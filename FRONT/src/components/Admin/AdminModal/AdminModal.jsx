import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Typography, Modal, Button } from '@mui/material';
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
                    <Typography className='modal-title'>
                        Ajouter un {name}
                    </Typography>
                    {fields.map((field) => {
                        console.log('field :', field.headerName)
                        return (
                            <TextField key={field.id} id='outlined' label={field.headerName}>

                            </TextField>
                        )
                    })}
                    <TextField id='outlined' value={date} disabled>

                    </TextField>
                    <Button type='submit'>Valider</Button>
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
