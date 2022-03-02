import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './adminsection.scss';

const AdminSection = ({ title, rows, columns }) => {
    const showModal = () => {
        console.log('showModal');
    };

    return (
        <section className='section'>
            <div className="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            <div className="section-element">
                <button className="section-element-add">Ajouter {title}</button>
            </div>
            <div className="section-element">
                <div className="section-element-grid" style={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        SelectionOnClick
                        editMode="cell"
                        onRowClick={showModal}
                        components={{
                            Toolbar: GridToolbar,
                        }}
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
