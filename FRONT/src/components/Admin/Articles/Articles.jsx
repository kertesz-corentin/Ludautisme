import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './articles.scss';
import { DataGrid, frFR, GridToolbar, GridCheckIcon } from '@mui/x-data-grid';
import { articleSchema } from '../../../Schemas';
import { ToggleButton } from '@mui/material';
import api from '../../../requests';
import AlertMessage from '../../Front-Office/Reusable/AlertMessage/AlertMessage';

const Articles = ({ params, children, name, className, ...rest }) => {

    const [articles, setArticles] = useState([]);
    const [alertMessage, setAlertMessage] = React.useState();
    const [severity, setSeverity] = React.useState();

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
                        "available": value
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
            setSeverity("error");
            setAlertMessage(`${response.data.message}`);
        }
    }

    useEffect(() => {
        getReferenceWithArticles();
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
                            <ToggleButton
                                value={params.value} P
                                selected={params.value}
                                onChange={() => {
                                    handleToogle(params.row.number, params.value, params.field);
                                }}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <GridCheckIcon />
                            </ToggleButton>
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
            <div className="articles-grid" style={{ height: 300, width: '100%' }}>
                <DataGrid
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

                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'number', sort: 'asc' }],
                        }
                    }}
                >
                </DataGrid>
                <div>
                    {alertMessage && severity && (
                        <AlertMessage
                            message={alertMessage}
                            severity={severity}
                        >
                        </AlertMessage>
                    )}
                </div>
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
