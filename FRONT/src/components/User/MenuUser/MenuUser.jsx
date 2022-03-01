import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './menuUser.scss';

const MenuUser = ({className, ...rest}) => {
   return (
       <div
            className={classnames('menuUser', className)}
            {...rest}
         >
            Menu user
        </div>
   );
};

MenuUser.propTypes = {
    className: PropTypes.string,
};
MenuUser.defaultProps = {
    className: '',
};
export default React.memo(MenuUser);
