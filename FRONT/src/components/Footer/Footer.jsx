import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './footer.scss';

const Footer = ({className, ...rest}) => {
   return (
       <footer
            className={classnames('footer', className)}
            {...rest}
         >

        </footer>
   );
};

Footer.propTypes = {
    className: PropTypes.string,
};
Footer.defaultProps = {
    className: '',
};
export default React.memo(Footer);
