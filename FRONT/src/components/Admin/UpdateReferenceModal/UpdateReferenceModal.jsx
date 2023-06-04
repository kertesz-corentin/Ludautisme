import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { TextField, Box, Typography, Modal, Button, IconButton, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Articles from '../Articles/Articles';
import AddModal from '../Articles/AddModal/AddModal';
import ReferenceSwiper from '../../Front-Office/MaterialLibrary/MaterialLibraryComponents/ReferenceSwiper/ReferenceSwiper';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

import './updatereferencemodal.scss';

const UpdateReferenceModal = ({ params, categories, tags, className, ...rest }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = async () => {
        setOpen(true)
        let pictureResponse = await api.get(`/admin/picture/${params.row.id}`);
        setPicture(pictureResponse.data);
    };

    const handleClose = () => {
        setSeverity(null);
        setAlertMessage(null);
        setOpen(false);
    }
    const [category, setCategory] = useState(params.row.id_maincat);
    const [picture, setPicture] = useState([]);
    const [currentPicture, setCurrentPicture] = useState();
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();
    const [articles, setArticles] = useState([]);
    const [tag, setTags] = useState(params.row.tag.map((t) => {return t.id}));

    const getReferenceWithArticles = async () => {
        try {
            const settings = {
                "id_ref": params.row.id,
            }
            const response = await api.post(`/admin/articles/search`, settings);
            setArticles(response.data);
        }
        catch (err) {
            console.error(err);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const reference = {
            'name': data.get('name'),
            'description': data.get('description'),
            'valorisation': data.get('valorisation'),
            'main_category': data.get('main_category'),
            'tags': data.get('tags')
        };
        const response = await api.put(`/admin/references/${params.row.id}`, reference);
        if (response.status === 200) {
            handleClose();
        }
    }
    // delete one picture
    const handleDelete = async (event) => {
        let deleteResponse = await api.delete(`/admin/picture/${currentPicture}`);

        if (deleteResponse.status === 200) {
            let pictureResponse = await api.get(`/admin/picture/${params.row.id}`);
            setPicture(pictureResponse.data);

            setSeverity("success");
            setAlertMessage("Image supprimé");
        } else {
            setSeverity("error");
            setAlertMessage(`${deleteResponse.data.message}`);
        }
    }
    // upload one picture 
    const handleUpload = async ({ target }) => {
        let file = target.files[0];

        if (file) {
            try {
                const formData = new FormData();
                formData.append("picture", file);
                formData.append("refId", params.row.id);
                formData.append("main", false);
                formData.append("title", file.name);
                formData.append("description", "");

                let response = await api.post('/admin/picture', formData, true);
                if (response.status === 200) {
                    let pictureResponse = await api.get(`/admin/picture/${params.row.id}`);
                    setPicture(pictureResponse.data);

                    setSeverity("success");
                    setAlertMessage("Image ajouté");
                } else {
                    setSeverity("error");
                    setAlertMessage(`${response.data.message}`);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
    // set one picture as main picture
    const handleMain = async () => {
        let obj = { main: true };

        const response = await api.put(`/admin/picture/${currentPicture}`, obj);
        
        if (response.status === 200) {
            let pictureResponse = await api.get(`/admin/picture/${params.row.id}`);
            setPicture(pictureResponse.data);

            setSeverity("success");
            setAlertMessage("Image principale changé");
        } else {
            setSeverity("error");
            setAlertMessage(`${response.data.message}`);
        }
    }
    // archive one reference with all this article
    const handleArchive = async () => {
        try {
            const response = await api.delete(`/admin/references/${params.row.id}`);
             if (response.status === 200) {
                    getReferenceWithArticles();
                    setSeverity("success");
                    setAlertMessage(response.data.message);
                } else {
                    setSeverity("error");
                    setAlertMessage("Erreur lors de l'archivage");
                }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleSwipperChange = (event) => {
        setCurrentPicture(event);
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const handleChangeTag = (event) => {
        console.log(event.target.value);
        setTags(event.target.value);
    }

    return (
        <div className="updatereference">
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="updatereference-modal" component="form" onSubmit={handleSubmit}>
                    <div className="updatereference-modal-header">
                        <Typography className='updatereference-modal-header-title'>
                            Edition Référence
                        </Typography>
                        <Button
                            className='updatereference-modal-header-close'
                            onClick={handleClose}
                            variant="contained"
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <ReferenceSwiper
                        refId={params.row.id}
                        pictures={picture}
                        gridSize={400}
                        setCurrentPicture={handleSwipperChange}
                    />
                    <div className="updatereference-modal-inputs">
                        <Button
                            className="updatereference-modal-footer-submit"
                            variant="contained"
                            onClick={handleDelete}
                        >
                            supprimer
                        </Button>
                        <input
                            accept=".jpg,.jpeg,.png, .webp"
                            className="updatereference-modal-footer-submit"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleUpload}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                className="updatereference-modal-footer-submit">
                                Ajouter
                            </Button>
                        </label>
                        <Button
                            className="updatereference-modal-footer-submit"
                            variant="contained"
                            onClick={handleMain}
                        >
                            photo principale
                        </Button>
                    </div>
                    <div>
                        {alertMessage && severity && (
                            <AlertMessage
                                message={alertMessage}
                                severity={severity}
                            >
                            </AlertMessage>
                        )}
                    </div>
                    <div className="updatereference-modal-inputs">
                        <TextField
                            id='outlined'
                            label='Nom'
                            name='name'
                            type='string'
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.name}
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Valorisation'
                            name='valorisation'
                            type='number'
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.valorisation}
                            sx={{ mb: 2 }}
                        >
                        </TextField>
                        <TextField
                            id='outlined'
                            label='Description'
                            name='description'
                            type='string'
                            fullWidth
                            multiline
                            className="updatereference-modal-inputs-item"
                            defaultValue={params.row.description}
                            sx={{ mb: 2 }}
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
                                style={{marginBottom: "16px"}}
                            >
                                {categories.map((category) => {
                                    return (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="tags-label">Catégories secondaires</InputLabel>
                            <Select
                                labelId="tags-label"
                                id="tags"
                                name="tags"
                                label="Catégories secondaires"
                                type='string'
                                onChange={handleChangeTag}
                                value={tag}
                                multiple
                            >
                                {tags.map((category) => {
                                    console.log(category)
                                    return (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="updatereference-modal-footer">
                        <Button
                            type='submit'
                            className="updatereference-modal-footer-submit"
                            variant="contained"
                        >
                            Mettre à jour
                        </Button>
                        <Button
                                variant="contained"
                                color='error'
                                component="span"
                                className="updatereference-modal-footer-submit"
                                onClick={handleArchive}>
                                Archiver
                            </Button>
                    </div>
                    <div className="updatereference-modal-articles">
                        <Articles 
                        params={params}
                        articles={articles}
                        setArticles={setArticles}
                        getReferenceWithArticles={getReferenceWithArticles}
                        children={<AddModal reference={params.row.id} />} />
                    </div>
                </Box>
            </Modal>

        </div>
    );
};

UpdateReferenceModal.propTypes = {
    className: PropTypes.string,
};
UpdateReferenceModal.defaultProps = {
    className: '',
};
export default React.memo(UpdateReferenceModal);
