import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './articles.scss';
import { DataGrid, frFR, GridToolbar, GridCheckIcon } from '@mui/x-data-grid';
import { articleSchema } from '../../Schemas';
import { ToggleButton } from '@mui/material';
import api from '../../requests';

const Articles = ({params, children, name, className, ...rest}) => {

    const [articles, setArticles] = useState([]);

    const getReferenceWithArticles = async () => {
        try {
            console.log("ref",params.row);
            const settings = {
                "id_ref":params.row.id,
            }
            const response = await api.post(`/admin/articles/search`,settings);
            const data = await response.data;
            console.log('article', data);
            setArticles(data);
        }
        catch (err) {
            console.error(err);
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
            if(propElt.gridDisplay !== "normal"){
                switch (propElt.gridDisplay){
                    case "toggle":
                        config.renderCell = (params) => (
                            <ToggleButton
                                value={params.value}
                                selected={params.value}
                                onChange={async () => {
                                    const response = await api.put(`/admin/articles/${params.row.id}`, {[prop] : !params.value});
                                    const newData = await getReferenceWithArticles();
                                    setArticles(newData.data);
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
            <div className="articles-grid" style={{ height: 300, width: '100%'}}>
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
                            },
                        },
                        sorting: {
                            sortModel: [{field: 'id', sort: 'asc'}],
                        }
                    }}
                >
                </DataGrid>
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
