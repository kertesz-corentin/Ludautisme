import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton, Chip }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Articles from '../../Articles/Articles';
import AddModal from '../../Articles/AddModal/AddModal';
import BookingArticles from '../BookingArticles/BookingArticles';

import './updatebookingmodal.scss';

const UpdateBookingModal = ({params, className, ...rest}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const [closed, setClosed] = useState(params.row.closed);
    const [delivered, setDelivered] = useState(params.row.delivered);
    console.log('params', params.row);
    // console.log("detail_Réservation", params.row.articles);
    // console.log('params', params);

    const handleSubmit = async (event) => {
        event.preventDefault();
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

    const getArticles = async () => {
        console.log(params.row.borrowed_articles);

        // const settings = {
        //     'id': params.row.id
        // }
        // const response = await api.post(`/admin/articles/search`, settings);
        // const data = await response.data;
        // console.log("data articles",data);
        // setArticles(data);
        // if(response.status === 200) {
        //     handleClose();
        // }
    }

    const handleChange = (event) => {
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <div>
            <IconButton onClick={handleOpen}>
                {`# ${params.value}`}
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="update-modal" component="form" onSubmit={handleSubmit}>
                    <div className="update-modal-header">
                        <Typography className='update-modal-header-title'>
                            Détails Réservation
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
                        >

                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={params.row.last_name}
                            className="update-modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={params.row.email}
                            className="update-modal-inputs-item"
                        >
                        </TextField>
                    </div>
                    <div className="update-modal-status">
                            {closed && (
                                <Chip
                                variant='contained'
                                label='Délivrée'
                                className="update-modal-status--item"
                            />
                            )}
                            {delivered && (
                                <Chip
                                variant='contained'
                                label='Clôturée'
                                className="update-modal-status--item"
                            />
                            )}
                        </div>
                        {/*<TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="modal-inputs-item"
                            defaultValue={params.row.valorisation}
                        >
                        </TextField>
                        <FormControl fullWidth>
                            <InputLabel id="maincategory-label">Catégorie</InputLabel>
                            <Select
                                labelId="maincategory-label"
                                id="main_category"
                                name="main_category"
                                label="Catégorie"
                                type='string'
                                onChange={handleChange}
                                value={category}
                            >
                            {categories.map((category) => {
                                return (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                            </Select>
                        </FormControl> */}
                    {/* </div> */}
                    <div className="update-modal-footer">
                        <Button
                            type='submit'
                            className="update-modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>

                    </div>
                    <div class="update-modal-articles">
                        <div className="update-modal-articles--book">
                            <BookingArticles  list={params.row.borrowed_articles} />
                        </div>
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