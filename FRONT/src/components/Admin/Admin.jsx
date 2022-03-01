import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import './admin.scss';

const Admin = ({className, ...rest}) => {
   return (
       <div
            className={classnames('admin', className)}
            {...rest}
         >
        <MenuAdmin />
        </div>
   );
};

Admin.propTypes = {
    className: PropTypes.string,
};
Admin.defaultProps = {
    className: '',
};
export default React.memo(Admin);
