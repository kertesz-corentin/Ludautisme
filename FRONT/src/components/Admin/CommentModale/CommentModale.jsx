import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import materiel ui components
import { IconButton, Modal, Box, Chip, Button } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import './commentmodale.scss';
import api from '../../../requests';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';
import { commentSchema } from '../../../Schemas';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import EditCommentModale from '../EditCommentModal/EditCommentModal';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const CommentModale = ({ params, closed, ...rest }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [comments, setComments] = useState([]);

    const path = `/admin/articles/comment/${params.id}`;

    const getComment = async () => {
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

    useEffect(() => {
        getComment();
    }, []);

    const handleValid = async (commentId) => {
        try {
            const option = {
                'validated': true
            }
            const response = await api.put(`/admin/articles/comment/${commentId}`, option);
            if (response.status === 200) {
                toast.success("Commentaire validé")
                getComment();
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await toast.promise(
                api.delete(`/admin/articles/comment/${id}`),
                {
                    pending: `Suppression de la réservation`,
                    error: 'Erreur lors de la suppression'
                }
            );
            if (response.status === 200) {
                getComment();
                toast.success("Commentaire supprimé")
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleAdd = async (comment, id) => {
        try {
            let option = {
                'comment': comment
            }
            const response = await toast.promise(
                api.post(`/admin/articles/comment/${params.id}`, option),
                {
                    pending: `Ajout de la réservation`,
                    error: "Erreur lors de l'ajout"
                }
            );
            if (response.status === 200) {
                getComment();
                toast.success("Commentaire ajouté")
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleUpdate = async (comment, commentId) => {
        try {
            const option = {
                'comment': comment
            }
            const response = await toast.promise(
                api.put(`/admin/articles/comment/${commentId}`, option),
                {
                    pending: `Suppression de la réservation`,
                    error: 'Erreur lors de la suppression'
                }
            );
            if (response.status === 200) {
                getComment();
                toast.succes("Commentaire mis à jour")
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
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
                            <IconButton onClick={() => handleDelete(params.id)}>
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
                                callBack={handleUpdate}
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
                                            handleValid(params.row.id);
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
        <div>
            {!closed && (
                <IconButton onClick={handleOpen}>
                    {/* {`# ${params.value}`} */}
                    <CommentIcon />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="comment-modal">
                    <section
                        // className={classnames('articles', className)}
                        {...rest}
                    >
                        <div className='comment-modal-header'>
                            <h2>Liste des commentaires</h2>
                            <Button
                                className='comment-modal-header-close'
                                onClick={handleClose}
                                variant="outlined"
                            >
                                <CloseIcon />
                            </Button>
                        </div>

                        <div>
                            <EditCommentModale
                                button={<Button
                                    variant="outlined"
                                    style={{ margin: '10px' }}
                                >
                                    Ajouter
                                </Button>}
                                title={"Ajout commentaire"}
                                callBack={handleAdd}
                            />
                        </div>
                        <div className="articles-grid" style={{ width: '100%' }}>
                            <DataGrid
                                autoHeight
                                getRowId={(row) => row.id}
                                rows={comments}
                                columns={columnsBuilder}
                                disableRowSelectionOnClick
                                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}

                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id_article: false,
                                            id_user: false
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
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
};

CommentModale.propTypes = {
    className: PropTypes.string,
};
CommentModale.defaultProps = {
    className: '',
};
export default React.memo(CommentModale);
