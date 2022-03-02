import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import './adminsection.scss';

const AdminSection = ({ title, rows }) => {

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Prenom'},
        {field: 'email', headerName: 'Email'},
        {field: 'phone', headerName: 'Telephone'}
    ]

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
