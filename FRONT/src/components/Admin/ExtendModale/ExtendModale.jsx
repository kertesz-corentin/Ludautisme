import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Modal, Box, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import { articleSchema } from '../../../Schemas';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import api from '../../../requests';
import './extendmodale.scss';

const ExtendModale = ({ params, closed, extendId, getExtend, ...rest }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setArticles([...params]);
    };
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleClose = () => setOpen(false);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
    }, []);


    const handleDelete = async () => {
        setOpenDelete(true);
    }

    const confirmDelete = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const data = new FormData(event.currentTarget);
        let message = data.get('commentaire');

        let response = await toast.promise(
            api.delete(`/admin/booking/extend/${extendId}`, {message}),
            {
                pending: 'Traitement en cours',
                error: 'Erreur de traitement'
            }
        )

        if (response.status === 200) {
            toast.success("Refus confirmé");
            getExtend();
            setOpenDelete(false);
            setOpen(false);
        } else {
            toast.error(response.data.message);
        }
    }

    const handleExtend = async () => {

        let body = {
            article_array: params.map((art) => art.id)
        }
        let response = await toast.promise(
            api.post(`/admin/booking/extend/${extendId}`, body),
            {
                pending: 'Prolongation en cours',
                error: 'Erreur lors de la prolongation'
            }
        )

        if (response.status === 200) {
            toast.success("Prolongation cofirmée");
            getExtend();
            setOpen(false);
        } else {
            toast.error(response.data.message);
        }
    }

    const columnsBuilder = (() => {
        const columns = [];
        Object.keys(articleSchema).forEach(prop => {
            const propElt = articleSchema[prop];

            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
            };
            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
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
                    <EditIcon />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="comment-modal">
                    <section>
                        <div className='comment-modal-header'>
                            <h2>Liste des articles</h2>
                            <Button
                                className='comment-modal-header-close'
                                onClick={handleClose}
                                variant="outlined"
                            >
                                <CloseIcon />
                            </Button>
                        </div>

                        <div className="articles-grid" style={{ width: '100%' }}>
                            <DataGrid
                                autoHeight
                                getRowId={(row) => row.id}
                                rows={articles}
                                columns={columnsBuilder}
                                disableRowSelectionOnClick
                                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                showToolbar
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id: false,
                                            id_article: false,
                                            origin: false,
                                            date_buy: false,
                                            available: false,
                                            returned: false,
                                            prolonge: false,
                                            archived: false,
                                            delivered: false,
                                            closed: false,
                                            created_at: false,
                                            nb_prolongation: false,
                                            id_booking: false,
                                            id_permanency: false,
                                            id_ref: false,
                                            id_user: false,
                                            comment: false,
                                            emplacement: false,
                                            description: false,
                                            valorisation: false
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
                        <div className="button-section">
                            <Button
                                onClick={handleExtend}
                                variant='contained'
                            >
                                valider
                            </Button>

                            <Button
                                onClick={handleDelete}
                                variant='contained'
                                color='warning'
                            >
                                refuser
                            </Button>
                        </div>

                    </section>
                </Box>
            </Modal>
            <Modal
                open={openDelete}
                onClose={handleClose}
                fullWidth   
            >
                <section
                    {...rest}
                    style={{ width: '100%' }}
                >
                <Box className="edit-modal" component="form" onSubmit={confirmDelete} fullWidth>
                        <div className='comment-modal-header'>
                            <Button
                                className='comment-modal-header-close'
                                onClick={handleCloseDelete}
                                variant="outlined"
                            >
                                <CloseIcon />
                            </Button>
                        </div>
                        Voulez vous laisser un message a l'hadérent ? 
                        <div className='edit-modal-body'>
                            <TextField
                                id='outlined'
                                label='Commentaire'
                                name='commentaire'
                                type='string'
                                fullWidth
                                multiline
                                className="updatereference-modal-inputs-item"
                            >
                            </TextField>
                            <Button
                                type='submit'
                                className="updatereference-modal-footer-submit"
                                variant="contained"
                                style={{ marginTop: '10px' }}
                            >
                                Valider
                            </Button>
                        </div>
                </Box>
                </section>
            </Modal>
        </div>
    )
}

ExtendModale.propTypes = {
    className: PropTypes.string,
};
ExtendModale.defaultProps = {
    className: '',
};
export default React.memo(ExtendModale);
