import React from 'react';
import PropTypes from 'prop-types';
import AdminMenu from '../AdminMenu/AdminMenu';
import './adminpage.scss';

const AdminPage = ({ children }) => {
    return (
        <main className='adminpage'>
            <AdminMenu />
            {children}
        </main>
    );
};

AdminPage.propTypes = {
    className: PropTypes.string,
};
AdminPage.defaultProps = {
    className: '',
};
export default React.memo(AdminPage);
