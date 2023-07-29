import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import materiel ui components
import { IconButton, Modal, Typography, Box, Button, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import './deletearticlemodal.scss';
import api from '../../../requests';

const DeleteArticleModal = ({params, closed, delivered, className,getBookings, ...rest}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleDelete = async () => {
        const response = await toast.promise(
            api.delete(`/admin/booking/article/${params.row.id}`), 
            {
                pending: `Suppression de l'article`,
                error: 'Erreur lors de la suppression'
            }
        )

        if(response.status === 200){
            toast.success("Article supprimé");
            getBookings();
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div>
            {!closed && (
                <IconButton onClick={handleOpen}>
                    {/* {`# ${params.value}`} */}
                    <DeleteIcon />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="delete-modal">
                    <div className="delete-modal-header">
                        <Typography className='delete-modal-header-title'>
                            Suppression article
                        </Typography>
                        <Button
                            className='delete-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="delete-modal-inputs">
                        <Alert variant="outlined"
                            severity="error">
                                Etes-vous sûr de vouloir supprimer l'article de la liste ?
                        </Alert>
                    </div>
                    <div className="delete-modal-footer">
                        <Button
                            type='button'
                            onClick={handleDelete}
                            className="delete-modal-footer-submit"
                            variant="contained"
                        >
                            Supprimer
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

DeleteArticleModal.propTypes = {
    className: PropTypes.string,
};
DeleteArticleModal.defaultProps = {
    className: '',
};
export default React.memo(DeleteArticleModal);
