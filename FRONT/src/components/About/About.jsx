import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
import Paypal from '../Paypal/Paypal'

const About = ({className, ...rest}) => {
   return (
       <div
            className={classnames('about', className)}
            {...rest}
         >
             <Paypal />

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

