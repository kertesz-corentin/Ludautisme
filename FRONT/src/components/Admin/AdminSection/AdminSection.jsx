import React from 'react';
import PropTypes from 'prop-types';
import './adminsection.scss';

const AdminSection = ({ title, data }) => {
    return (
        <section className='section'>
            <h1 className="section-title">Tableau de bord - {title}</h1>
            <button>Ajouter {title}</button>
            datagrid
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
