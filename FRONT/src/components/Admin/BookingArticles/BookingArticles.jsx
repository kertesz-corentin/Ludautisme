import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './bookingarticles.scss';
import { DataGrid, frFR, GridToolbar, GridCheckIcon } from '@mui/x-data-grid';
import { articleSchema } from '../../../Schemas';

const BookingArticles = ({articles, className, ...rest}) => {

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
            <div className="articles-grid" style={{ height: 350, width: '100%'}}>
                <DataGrid
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
                                id: false,
                                created_at: false,
                                id_ref: false,
                                archived: false,
                            },
                        },
                        sorting: {
                            sortModel: [{field: 'id', sort: 'asc'}],
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
