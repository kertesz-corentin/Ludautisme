import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import react components
import DeleteArticleModal from '../DeleteArticleModal/DeleteArticleModal';
import { articleSchema } from '../../../Schemas';

// import material ui components
import { IconButton } from '@mui/material';
import { DataGrid, frFR, GridToolbar } from '@mui/x-data-grid';

import './bookingarticles.scss';

const BookingArticles = ({list, closed, className, ...rest}) => {

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
            if (propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "delete":
                        config.renderCell = (params) => (
                            <IconButton
                                value={params.value}
                                aria-label={`${prop}-${params.row.id}`}
                            >
                                <DeleteArticleModal params={params} closed={closed} />
                            </IconButton>
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
            <div className="articles-grid" style={{ height: 325, width: '100%'}}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={list}
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
                                id: false,
                                origin: false,
                                created_at: false,
                                main_category: false,
                                valorisation: false,
                                archived: false,
                                delivered: false,
                                closed: false,
                                id_ref: false,
                                id_booking: false,
                                date_buy: false,
                                nb_prolongation: false,
                                id_permanency: false,
                                id_user: false,
                            },
                        },
                        sorting: {
                            sortModel: [{field: 'number', sort: 'asc'}],
                        },
                        filter: {
                            filterModel: {
                                items: [
                                    {columnField: 'archived', value: false},
                                    {columnField: 'available', value: true},
                                ]
                            }
                        }
                    }}
                >

                </DataGrid>
            </div>
        </section>
   );
};

BookingArticles.propTypes = {
    className: PropTypes.string,
};
BookingArticles.defaultProps = {
    className: '',
};
export default React.memo(BookingArticles);
