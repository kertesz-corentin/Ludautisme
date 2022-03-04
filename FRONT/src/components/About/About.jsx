import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
import Permanency from '../Permanency/Permanency';
import Contact from '../Contact/Contact';
import Button from '@mui/material/Button';

const About = ({className, ...rest}) => {
   return (
        <div className={classnames('practicalinformations', className)}
        {...rest}>

            <div className="présentation">
                PRESENTATION
            </div>

            <div className="contact">
                <Contact />
            </div>

            <div className="don">
                <Button className="don-paypal" variant="contained">Faire un don</Button>
            </div>












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
