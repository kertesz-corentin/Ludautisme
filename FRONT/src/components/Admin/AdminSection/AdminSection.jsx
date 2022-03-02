import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import './adminsection.scss';

const AdminSection = ({ title }) => {
    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'firstname', headerName: 'First Name', editable: true},
        {field: 'email', headerName: 'Email', editable: true},
    ];

    const rows = [
        {id: 1, firstname: 'Toto', email:'toto@email.com'},
        {id: 2, firstname: 'Titi', email:'titi@email.com'},
        {id: 3, firstname: 'Tata', email:'tata@email.com'}
    ]
    return (
        <section className='section'>
            <div class="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            <div class="section-element">
                <button className="section-element-add">Ajouter {title}</button>
            </div>
            <div class="section-element">
                <div className="section-element-grid" style={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        checkboxSelection
                        disableSelectionOnClick
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
