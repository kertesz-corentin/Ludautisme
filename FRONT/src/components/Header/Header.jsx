import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './header.scss';

const Header = ({className, ...rest}) => {
   return (
       <header
            className={classnames('header', className)}
            {...rest}
         >

        </header>
   );
};

Header.propTypes = {
    className: PropTypes.string,
};
Header.defaultProps = {
    className: '',
};
export default React.memo(Header);
