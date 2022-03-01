import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import logo from '../public/logo.png';
import './footer.scss';
import facebookLogo from '../public/facebookLogo.png';

const Footer = ({className, ...rest}) => {
   return (
       <footer
            className={classnames('footer', className)}
            {...rest}
         >
             <img className="footer-logo" src={logo} alt="logo lud'autisme" />
             <div className="footer-texte">
                <a href="/mentions légales">mentions légales</a><br />
                <a href="politique de confidentialité">politique de confidentialité</a><br />
                <p>Lu'Autisme 2022 - Tous droits réservés</p>
             </div>
             <a href="https://fr-fr.facebook.com/pages/category/Community/Ludautisme-344242315626617/" target="_blank" rel="noreferrer"><img className="footer-facebook-logo"src={facebookLogo} alt="logo facebook" /></a>
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
