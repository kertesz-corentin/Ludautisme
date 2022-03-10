import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './articles.scss';
import { DataGrid, frFR, GridToolbar, GridCheckIcon } from '@mui/x-data-grid';
import { articleSchema } from '../../Schemas';
import { ToggleButton } from '@mui/material';
import api from '../../requests';

const Articles = ({params, children, className, ...rest}) => {

    const [articles, setArticles] = useState([]);

    const getReferenceWithArticles = async () => {
        try {
            const response = await api.get(`/admin/references/${params.row.id}`);
            const data = await response.data;
            setArticles(data.articles);
            console.log('articles', data);
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
                <h2>Détails des articles</h2>
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
                            }
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
