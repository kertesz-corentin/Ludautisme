import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid';
import './adminsection.scss';

const AdminSection = ({ title, rows, columns, path, initialState, children }) => {

    return (
        <section className='section'>
            <div className="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            {children}
            <div className="section-element">
                <div className="section-element-grid" style={{ height: 500, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        disableSelectionOnClick
                        localeText= {frFR.components.MuiDataGrid.defaultProps.localeText}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState = {initialState}
                    />
                </div>
            </div>
        </section>
    );
};

AdminSection.propTypes = {
    className: PropTypes.string,
};
AdminSection.defaultProps = {
    className: '',
};
export default React.memo(AdminSection);
