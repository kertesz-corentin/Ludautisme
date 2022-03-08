import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './usefulllinks.scss';

const UsefullLinks = ({className, ...rest}) => {
   return (
    <div            className={classnames('UsefullLinks', className)}
    {...rest}
 >
UsefullLinks
</div>
   );
};

UsefullLinks.propTypes = {
    className: PropTypes.string,
};
UsefullLinks.defaultProps = {
    className: '',
};
export default React.memo(UsefullLinks);
