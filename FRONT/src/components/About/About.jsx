import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
import Permanency from '../Permanency/Permanency';
import Contact from '../Contact/Contact';
import Button from '@mui/material/Button';
import Paypal from '../Paypal/Paypal';

const About = ({className, ...rest}) => {
    const [checkout, setCheckOut] = useState(false);
   return (
        <div className={classnames('practicalinformations', className)}
        {...rest}>

            <div className="présentation">
                PRESENTATION
                <Permanency />
            </div>

            <div className="contact">
                <Contact />
            </div>

            <div className="don">
            <div className="App">
      {checkout ? (
        <Paypal />
      ) : (
        <button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </button>
      )}
    </div>
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
