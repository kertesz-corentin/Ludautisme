import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import react components
import BookingArticles from '../BookingArticles/BookingArticles';

// import material ui components
import { TextField, Box, Typography, Modal, Button, IconButton, Chip }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import './updatebookingmodal.scss';

const UpdateBookingModal = ({params, className, ...rest}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [closed, setClosed] = useState(params.row.closed);
    const [delivered, setDelivered] = useState(params.row.delivered);
    const [overdue, setOverdue] = useState(params.row.overdue);

    const [articles, setArticles] = useState(params.row.borrowed_articles);

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleClose();
        // const data = new FormData(event.currentTarget);

        // const reference = {
        //     'name': data.get('name'),
        //     'description': data.get('description'),
        //     'valorisation': data.get('valorisation'),
        //     'main_category': data.get('main_category'),
        // };
        // console.log('reference', reference)
        // const response = await api.put(`/admin/references/${params.row.id}`, reference);
        // if(response.status === 200) {
        //     handleClose();
        // }
        // console.log('response', response);
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                {/* {`# ${params.value}`} */}
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="update-modal" component="form" onSubmit={handleSubmit}>
                    <div className="update-modal-header">
                        <Typography className='update-modal-header-title'>
                            D??tails R??servation
                        </Typography>
                        <Button
                            className='update-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className="update-modal-inputs">
                        <TextField
                            id='outlined'
                            name='first_name'
                            type='string'
                            disabled
                            defaultValue={params.row.first_name}
                            className="update-modal-inputs-item"
                            sx={{mb: 2}}
                        >

                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={params.row.last_name}
                            className="update-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={params.row.email}
                            className="update-modal-inputs-item"
                            sx={{mb: 2}}
                        >
                        </TextField>
                    </div>
                    <div className="update-modal-status">
                        {delivered && (
                            <Chip
                            variant='contained'
                            label='D??livr??e'
                            className="update-modal-status--item"
                            />
                        )}
                        {overdue && (
                            <Chip
                            variant='contained'
                            color='secondary'
                            label='Retard'
                            className="update-modal-status--item"
                            />
                        )}
                        {closed && (
                            <Chip
                            variant='contained'
                            label='Cl??tur??e'
                            className="update-modal-status--item"
                            />
                        )}
                    </div>
                    {!closed && !delivered && (
                        <div className="updatebook-modal-articles--add">
                            <Box className='article-search' component="form" onSubmit>
                                <TextField
                                    id='outlined'
                                    label='n?? article'
                                    name='number'
                                    type='number'
                                    className="article-search-item"
                                >
                                </TextField>

                                <Button
                                type='submit'
                                className="article-search-submit"
                                variant="outlined"
                                >
                                    Ajouter ?? la liste
                                </Button>
                            </Box>
                        </div>
                    )}
                    <div class="update-modal-articles">
                        <div className="update-modal-articles--book">
                            <BookingArticles  list={params.row.borrowed_articles} closed={closed} delivered={delivered} />
                        </div>
                    </div>
                    <div className="update-modal-footer">
                    {!closed && (
                        <Button
                            type='submit'
                            className="update-modal-footer-submit"
                            variant="contained"
                        >
                            Valider
                        </Button>
                    )}
                    </div>
                </Box>
            </Modal>

        </div>
    );
};

UpdateBookingModal.propTypes = {
    className: PropTypes.string,
};
UpdateBookingModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateBookingModal);
