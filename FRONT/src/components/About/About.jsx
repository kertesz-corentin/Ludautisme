import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';

const About = ({className, ...rest}) => {
   return (
       <div
            className={classnames('about', className)}
            {...rest}
         >

         </div>
   );
};

About.propTypes = {
    className: PropTypes.string,
};
About.defaultProps = {
    className: '',
};
export default React.memo(About);

