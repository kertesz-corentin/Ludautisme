import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './adminhome.scss';

const AdminHome = ({isLogged, className, ...rest}) => {
    return (
        <div
            className={classnames('adminhome', className)}
            {...rest}
         >
            Accueil
        </div>
    );
};

AdminHome.propTypes = {
    isLogged: PropTypes.bool,
};
AdminHome.defaultProps = {
    isLogged: false,
};
export default React.memo(AdminHome);
