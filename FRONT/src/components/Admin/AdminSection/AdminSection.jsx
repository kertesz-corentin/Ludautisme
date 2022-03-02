import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import './adminsection.scss';

<<<<<<< HEAD
const AdminSection = ({ title, rows }) => {

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Prenom'},
        {field: 'email', headerName: 'Email'},
        {field: 'phone', headerName: 'Telephone'}
    ]

=======
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
>>>>>>> 39ab1e53b80b914b9c858d402fdc68372c47155e
    return (
        <section className='section'>
            <div className="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            <div className="section-element">
                <button className="section-element-add">Ajouter {title}</button>
            </div>
<<<<<<< HEAD
            <div className="section-element">
=======
            <div class="section-element">
>>>>>>> 39ab1e53b80b914b9c858d402fdc68372c47155e
                <div className="section-element-grid" style={{ height: 400, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
<<<<<<< HEAD
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        SelectionOnClick

=======
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        checkboxSelection
                        disableSelectionOnClick
>>>>>>> 39ab1e53b80b914b9c858d402fdc68372c47155e
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
