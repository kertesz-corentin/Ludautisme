import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import materiel ui components
import { Modal, Box, Button, TextField } from '@mui/material';

import './editcommentmodal.scss';
import CloseIcon from '@mui/icons-material/Close';

const EditCommentModale = ({ button, callBack, comment, commentId, title, params, closed, ...rest }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
    }, []);

    const handleCallback = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const data = new FormData(event.currentTarget);
        let comment = data.get('commentaire');
        callBack(comment, commentId);

        setTimeout(() => {
            handleClose();
          }, "2000");
    }

    return (
        <div>
            {!closed && (
                <div onClick={handleOpen}>
                    {button}
                </div>

            )}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <section
                    {...rest}
                    style={{ width: '100%' }}
                >
                    <Box className="edit-modal" component="form" onSubmit={handleCallback}>
                        <div className='edit-modal-header'>
                            <h2>{title}</h2>
                            <Button
                                className='edit-modal-header-close'
                                onClick={handleClose}
                                variant="outlined"
                                style={{ margin: '10px' }}
                            >
                                <CloseIcon />
                            </Button>
                        </div>

                        <div className='edit-modal-body'>
                            <TextField
                                id='outlined'
                                label='Commentaire'
                                name='commentaire'
                                type='string'
                                fullWidth
                                multiline
                                className="updatereference-modal-inputs-item"
                                defaultValue={comment}
                                sx={{ mb: 2 }}
                            >
                            </TextField>
                            <Button
                                type='submit'
                                className="updatereference-modal-footer-submit"
                                variant="contained"
                            >
                                Valider
                            </Button>
                        </div>
                    </Box>
                </section>
            </Modal>

        </div>
    );
};

EditCommentModale.propTypes = {
    className: PropTypes.string,
};
EditCommentModale.defaultProps = {
    className: '',
};
export default React.memo(EditCommentModale);
