import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './articles.scss';
import { DataGrid, frFR, GridToolbar, GridCheckIcon } from '@mui/x-data-grid';
import { articleSchema } from '../../../Schemas';
import { ToggleButton, Button, Modal, Box } from '@mui/material';
import api from '../../../requests';
import { toast } from 'react-toastify';
import CommentModale from '../CommentModale/CommentModale';
import moment from 'moment';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';
import CloseIcon from '@mui/icons-material/Close';
import { historySchema } from '../../../Schemas';

const Articles = ({ params, children, name, className, articles, setArticles, getReferenceWithArticles, ...rest }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [history, setHistorys] = React.useState([]);

    const handleToogle = async (artcileId, value, prop) => {
        // toggle boolean value 
        value = value ? false : true;

        let response = null;
        switch (prop) {
            case "available":
                // if value if true, delete article from his actual booking, otherwise just update is available value 
                if (value) {
                    response = await api.post(`/admin/booking/return/${artcileId}`);
                } else {
                    let option = {
                        "available": false
                    }
                    response = await api.put(`/admin/articles/${artcileId}`, option);
                }
                break;
            case "archived":
                // for archived prop only update article 
                let option = {
                    "archived": value
                }
                response = await api.put(`/admin/articles/${artcileId}`, option);
                break;
            default:
                break;
        }
        if (response.status === 200) {
            getReferenceWithArticles();
        } else {
            toast.error(response.data.message);
        }
    }

    const handleHistory = async () => {
        let response = await api.get(`/admin/articles/history/${params.row.id}`);
        if (response.status === 200) {
            setHistorys(response.data);
            handleOpen();
            toast.success("Historique récupéré")
        } else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        getReferenceWithArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columnsBuilder = (() => {
        const columns = [];
        Object.keys(articleSchema).forEach(prop => {
            const propElt = articleSchema[prop];

            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
            }
            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
                    case "toggle":
                        config.renderCell = (params) => (
                            <ThemeProvider theme={theme}>
                                <ToggleButton
                                    value={params.value} P
                                    selected={params.value}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleToogle(params.row.id, params.value, params.field);
                                    }}
                                    aria-label={`${prop}-${params.row.id}`}
                                >
                                    <GridCheckIcon />
                                </ToggleButton>
                            </ThemeProvider>
                        );
                        break;
                    case "comment":
                        config.renderCell = (params) => (
                            <CommentModale
                                params={params}
                            />
                        );
                        break;
                    case "date":
                        config.renderCell = (params) => (
                            moment(params.value).format('DD/MM/YYYY')
                        );
                        break;
                    case "button":
                        config.renderCell = (params) => (
                            <Button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleHistory();
                                }}
                            >
                                historique
                            </Button>
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

    const historyColumnsBuilder = (() => {
        const columns = [];

        Object.keys(historySchema).forEach((prop, index) => {
            const propElt = historySchema[prop];

            const config = {
                type: propElt.type,
                field: prop,
                headerName: propElt.label,
                width: propElt.width,
                id: index
            }

            if (propElt.gridDisplay !== "normal") {
                switch (propElt.gridDisplay) {
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
        <section
            className={classnames('articles', className)}
            {...rest}
        >
            <div>
                <h2>Liste des articles</h2>
            </div>
            {children}
            <div className="articles-grid" style={{ width: '100%' }}>
                <DataGrid
                    autoHeight
                    getRowId={(row) => row.id}
                    rows={articles}
                    columns={columnsBuilder}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                created_at: false,
                                id_ref: false,
                                id: false,
                                id_article: false,
                                name_ref: false,
                                delivered: false,
                                closed: false,
                                nb_prolongation: false,
                                id_booking: false,
                                id_permanency: false,
                                id_user: false,
                                main_category: false,
                                valorisation: false,
                                description: false,
                                returned: false,
                                prolonge: false,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'number', sort: 'asc' }],
                        }
                    }}
                >
                </DataGrid>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box className="comment-modal-history">
                        <section
                            // className={classnames('articles', className)}
                            {...rest}
                        >
                            <div className='comment-modal-header'>
                                <h2>Historique des emprunts</h2>
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
                                    rows={history}
                                    columns={historyColumnsBuilder}
                                    disableRowSelectionOnClick
                                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                    initialState={{
                                        columns: {
                                            columnVisibilityModel: {
                                                id: false
                                            },
                                        },
                                    }}
                                >
                                </DataGrid>
                            </div>
                        </section>
                    </Box>
                </Modal>
            </div>
        </section>
    );
};

Articles.propTypes = {
    className: PropTypes.string,
};
Articles.defaultProps = {
    className: '',
};
export default React.memo(Articles);
