import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests/index';

// import react components
import AdminPermanency from '../AdminPermanency/AdminPermanency';
import AdminHomeCard from '../AdminHomeCard/AdminHomeCard';
import Container from '@mui/material/Container';
import { Fab, Chip, Button, IconButton, Modal, TextField, Box, Typography } from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { toast } from 'react-toastify';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';
import { commentSchema } from '../../../Schemas';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCommentModale from '../EditCommentModal/EditCommentModal';
import CloseIcon from '@mui/icons-material/Close';

import './adminhome.scss';

const AdminHome = ({ isLogged, className, ...rest }) => {
    const [bookings, setBookings] = useState([]);
    const [overdueBookings, setOverdueBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [references, setReferences] = useState([]);
    const [comments, setComments] = useState([]);

    // domment modal variables
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [submitType, setSubmitType] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState("");
    const [modalId, setModalId] = useState(null);

    const allBookings = async () => {
        const response = await api.get('/admin/booking');
        if (response.status === 200) {
            setBookings(response.data.length);
        } else {
            toast.error(response.data.message);
        }
    }

    const delayBookings = async () => {
        const response = await api.post('/admin/booking/search', { overdue: true });
        if (response.status === 200) {
            setOverdueBookings(response.data.length);
        } else {
            toast.error(response.data.message);
        }
    }

    const allUsers = async () => {
        const response = await api.get('/admin/users');
        if (response.status === 200) {
            setUsers(response.data.length);
        } else {
            toast.error(response.data.message);
        }
    }

    const allReferences = async () => {
        const response = await api.get('/admin/references');
        if (response.status === 200) {
            setReferences(response.data.length);
        } else {
            toast.error(response.data.message);
        }
    }

    const getComment = async () => {
        const path = `/admin/articles/comment/novalid`;
        try {
            const response = await api.get(path);
            if (response.status === 200) {
                setComments(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    const updateComment = async () => {
        const path = `/admin/articles/comment/novalid`;
        try {
            const response = await api.get(path);
            console.log(response);
            if (response.status === 200) {
                setComments(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleValidComment = async (commentId) => {
        setModalTitle("Valider commentaire");
        setMessage("Une confirmation de validation va être envoyé au créateur du commentaire, vous pouvez lui rajouter un message ci-dessous");
        setButtonTitle("Valider");
        setModalId(commentId);
        setSubmitType("valid");
        setOpen(true);

    }

    const handleDeleteComment = async (commentId) => {
        setModalTitle("Supprimer commentaire");
        setMessage("Une notification de rejet du commentaire va être envoyé au créateur du commentaire, vous poulez lui ajouter un message ci-dessous");
        setButtonTitle("Supprimer");
        setModalId(commentId);
        setSubmitType("delete");
        setOpen(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitType) {
            const data = new FormData(event.currentTarget);
            let object = {
                message: data.get('message'),
                type: submitType
            };

            let validMessage = "";
            if (submitType === "valid") {
                validMessage = "Commentaire validé";
            } else if (submitType === "delete") {
                validMessage = "Commentaire supprimé";
            }

            let response = await api.patch(`/admin/articles/comment/${modalId}`, object);
            if (response) {
                if(response.status === 200) {
                    toast.success(validMessage);
                    await updateComment();
                    handleClose();
                } else {
                    toast.error(response.data.message);
                }
            }
        }
    }

    const handleClose = async () => {
        setOpen(false);
        setMessage("");
        setSubmitType(null);
        setModalTitle("");
        setButtonTitle("");
        setModalId(null);
    }

    useEffect(() => {
        allBookings();
        delayBookings();
        allUsers();
        allReferences();
        getComment();
    }, [])

    const columnsBuilder = (() => {
        const columns = [];
        Object.keys(commentSchema).forEach(prop => {
            const propElt = commentSchema[prop];
            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
            };
            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "delete":
                        config.renderCell = (params) => (
                            <IconButton
                                onClick={(e) => {
                                    handleDeleteComment(params.row.id);
                                }}>
                                {/* {`# ${params.value}`} */}
                                <DeleteIcon />
                            </IconButton>
                        );
                        
                        break;
                    case "edit":
                        config.renderCell = (params) => (
                            <EditCommentModale
                                button={<EditIcon />}
                                title={"Modification commentaire"}
                                comment={params.row.comment}
                                callBack={null}
                                commentId={params.row.id}
                            />
                        );
                        break
                    case "validate":
                        config.renderCell = (params) => (
                            <div>
                                {params.value
                                    ? <Chip label="Validé" color="success" />
                                    : <Button
                                        variant="contained"
                                        onClick={(e) => {
                                            handleValidComment(params.row.id);
                                        }}
                                    >
                                        valider
                                    </Button>
                                }
                            </div>
                        );
                        break;
                    case "date":
                        config.renderCell = (params) => (
                            moment(params.value).format('DD/MM/YYYY')
                        );
                        break;
                    default:
                        break;
                }
            }
            columns.push(config);
        });
        return columns;
    })();

    return (
        <><div
            className={classnames('adminhome', className)}
            {...rest}
        >
            <div className='adminhome-element'>
                <div className="adminhome-element-item">
                    <AdminPermanency />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Réservations'} data={bookings} status={'en cours'} tag='booking' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Réservations'} data={overdueBookings} status={'en retard'} tag='booking' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Adhérents'} data={users} status={'inscrits'} tag='user' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Références'} data={references} status={'enregistrées'} tag='reference' />
                </div>
            </div>
            <div>
                <h2 className='adminhome-title'>Commentaires en attente de validation</h2>
                <Container >

                    <DataGrid
                        autoHeight
                        getRowId={(row) => row.id}
                        rows={comments}
                        columns={columnsBuilder}
                        disableRowSelectionOnClick
                        disableColumnSelector
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}

                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    id_article: false,
                                    id_user: false,
                                    id: false,
                                    first_name: false,
                                    last_name: false,
                                    name: false
                                },
                            },
                            sorting: {
                                sortModel: [{ field: 'number', sort: 'asc' }],
                            },
                            filter: {
                                filterModel: {
                                    items: [
                                        { columnField: 'archived', value: false },
                                        { columnField: 'available', value: true },
                                    ]
                                }
                            }
                        }}
                    >
                    </DataGrid>
                </Container>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box className="addarticle-modal" component="form" onSubmit={handleSubmit}>
                        <div className='comment-modal-header'>
                            <div>
                                <Typography className='addarticle-modal-header-title'>
                                    {modalTitle}
                                </Typography>
                            </div>
                            <Button
                                className='comment-modal-header-close'
                                onClick={handleClose}
                                variant="outlined"
                            >
                                <CloseIcon />
                            </Button>
                        </div>
                        <div>
                            <Typography>
                                {message}
                            </Typography>
                        </div>
                        <TextField
                            id='outlined'
                            label='message'
                            name='message'
                            type='string'
                            fullWidth
                            multiline
                        >
                        </TextField>
                        <div className="addarticle-modal-footer">
                            <Button
                                type='submit'
                                className="addarticle-modal-footer-submit"
                                variant="contained"
                            >
                                {buttonTitle}
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
            <div className='help'>
                <Fab color="primary" aria-label="help" href="https://docs.google.com/document/d/1kofKMn2T7YS-YfCv9o4-zQC-8MhM0y4a0gy7X-PBWUU/edit?usp=sharing" target='_blank' size='small'>
                    <QuestionMarkOutlinedIcon color='' />
                </Fab>
            </div>
            <a href="https://docs.google.com/document/d/1K4pBXObkm-6A3bvy8fsh9MEBQd-raL6SB0wnO1e9q-s/edit?usp=sharing">Note de mise a jour</a>
        </>
    );
};

AdminHome.propTypes = {
    isLogged: PropTypes.bool,
};
AdminHome.defaultProps = {
    isLogged: false,
};
export default React.memo(AdminHome);
