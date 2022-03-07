import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './about.scss';
import Permanency from '../Permanency/Permanency';
import Contact from '../Contact/Contact';
import Button from '@mui/material/Button';
import Paypal from '../Paypal/Paypal';
import Logo from '../public/logo.png'

const About = ({className, ...rest}) => {
    const [checkout, setCheckOut] = useState(false);
   return (
        <div className={classnames('practicalinformations', className)}
        {...rest}>

            <div className="clay présentation-header">

            {/* <div
            className='clay présentation-header-perm'>

             <h2 className="permanency-title">
                Prochaine permanence
             </h2>
             <div className="permanency-inline">
                <div className="permanency-logo">
                    <img src="../public/icones/calendrier.png" alt="" />
                </div>
                <p className="permanency-date">
                    01/03/2022 <br />
                    8h00-12h00 <br />
                </p>
            </div>
            </div> */}

                <div className='présentation-header-perm'>
                    <Permanency />
                </div>



                <div className="présentation-header-local">
                    <img src={Logo} alt="local lud'autisme" />
                </div>

                <div className="présentation-header-adresse">
                    <p>
                        <h2>Venir aux permanences</h2>
                        Maison Pour Tous / Maison des Familles <br />
                        Place François Mitterrand<br />
                        29800 Landerneau<br />
                    </p>
                    <p>
                        <h2>Nous contacter</h2>
                        Siège social de Lud’Autisme<br />
                        8 rue traverse<br />
                        29800 Landerneau<br />
                        06 72 63 38 77 - 09 51 85 03 55<br />
                        ludautisme@gmail.com
                    </p>
                </div>

                <div className="présentation-header-map">
                <iframe title="ludo'map" className="contact-container-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.1474306172313!2d-4.257497284157107!3d48.45370073706886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4816b2c241a4e6ab%3A0xe04f55b4d36b897c!2sMaison%20Pour%20Tous%2FCentre%20Social!5e0!3m2!1sfr!2sfr!4v1646304683575!5m2!1sfr!2sfr" loading="lazy"></iframe>
                </div>

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
