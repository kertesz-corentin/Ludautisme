import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AdminSection from '../AdminSection/AdminSection';
import './adminreferences.scss';

const AdminArticles = ({className, ...rest}) => {
   return (
       <div
            className={classnames('adminreferences', className)}
            {...rest}
         >
            <AdminSection title="Référence" />
        </div>
   );
};

AdminArticles.propTypes = {
    className: PropTypes.string,
};
AdminArticles.defaultProps = {
    className: '',
};
export default React.memo(AdminArticles);
