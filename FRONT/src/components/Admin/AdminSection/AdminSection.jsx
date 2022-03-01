import React from 'react';
import PropTypes from 'prop-types';
import './adminsection.scss';

const AdminSection = ({ title, data }) => {
    return (
        <section className='section'>
            <div class="section-element">
                <h1 className="section-element-title">Tableau de bord - {title}</h1>
            </div>
            <div class="section-element">
                <button className="section-element-add">Ajouter {title}</button>
            </div>
            <div class="section-element">
                <div className="section-element-grid">datagrid</div>
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
