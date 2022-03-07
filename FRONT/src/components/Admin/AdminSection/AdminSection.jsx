import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdminModal from '../AdminModal/AdminModal';
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
            <AdminModal name={title} fields={columns} />
            <div className="section-element">
                <div className="section-element-grid" style={{ height: 600, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        SelectionOnClick
                        editMode="cell"
                        onRowDoubleClick={showModal}
                        disableSelectionOnClick
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
