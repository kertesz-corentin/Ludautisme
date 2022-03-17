import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import logo from '../public/logo.png';
import './footer.scss';
import facebookLogo from '../public/icones/Logo-Facebook.png';

const Footer = ({className, ...rest}) => {
   return (
       <footer
            className={classnames('footer', className)}
            {...rest}
         >   <div className='footer-left'>
             <img className="footer-logo" src={logo} alt="logo lud'autisme" />
             <p>Lud'Autisme© - 2022 </p>
             </div>
             <nav>
             <label  for="togglefooter">☰</label>
            <input type="checkbox" id="togglefooter" />
             <div className='footer-mid'>
                <a className="footer-texte" href="/mentions légales">Mentions légales</a>
                <a className="footer-texte"href="politique de confidentialité">Politique de confidentialité</a>

             <a href="https://fr-fr.facebook.com/pages/category/Community/Ludautisme-344242315626617/" target="_blank" rel="noreferrer"><img className="footer-facebook-logo"src={facebookLogo} alt="logo facebook" /></a>
             </div>
             </nav>
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
