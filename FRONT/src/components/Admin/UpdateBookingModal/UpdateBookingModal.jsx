import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton, Select, FormControl, InputLabel, MenuItem }  from '@mui/material';
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
    const [articles, setArticles] = useState([]);

    // console.log("detail_Réservation", params.row.articles);
    console.log('params', params);
    // console.log('articles', articles);

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

        const settings = {
            id_booking: params.row.id
        }
        const response = await api.post(`/admin/articles/search`, settings);
        const data = await response.data;
        console.log("data articles",data);
        setArticles(data);
        if(response.status === 200) {
            handleClose();
        }
        console.log('response', response);
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
                <Box className="modal" component="form" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <Typography className='modal-header-title'>
                            Détails Réservation
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
                        <TextField
                            id='outlined'
                            name='first_name'
                            type='string'
                            disabled
                            defaultValue={params.row.first_name}
                            className="modal-inputs-item"
                        >

                        </TextField>
                        <TextField
                            id='outlined'
                            name='last_name'
                            type='string'
                            disabled
                            defaultValue={params.row.last_name}
                            className="modal-inputs-item"
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            name='email'
                            type='string'
                            disabled
                            defaultValue={params.row.email}
                            className="modal-inputs-item"
                        >
                        </TextField>
                    </div>
                    {/*<div className="modal-inputs">
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='name'
                            type='string'
                            className="modal-inputs-item"
                            defaultValue={params.row.name}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            className="modal-inputs-item"
                            defaultValue={params.row.description}
                        >
                        </TextField>
                        <TextField
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
                    <div className="modal-footer">
                        <Button
                            type='submit'
                            className="modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>

                    </div>
                    <div class="modal-articles">
                        <div className="modal-articles--book">
                            <BookingArticles  articles={articles} />
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
