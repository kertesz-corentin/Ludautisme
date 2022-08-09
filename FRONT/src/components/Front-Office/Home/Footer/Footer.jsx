import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import logo from '../../../../public/logo.png';
import './footer.scss';
import facebookLogo from '../../../../public/icones/Logo-Facebook.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Footer = ({className, ...rest}) => {

    const [isActive,setIsActive] = React.useState();

    const pages = {
        test1:{ url: '/notice', display: 'Mentions légales' },
        test2:{ url: '/privacy', display: 'Politique de confidentialité' },
    };

    const handleActive = (event) => {
        setIsActive(event);
    };

   return (
       <footer
            className={classnames('footer', className)}
            {...rest}
         >
         <div className='footer-container'>
          <div className='footer-left'>
             <img className="footer-logo" src={logo} alt="logo lud'autisme" />
             <p>Lud'Autisme© - 2022 </p>
             </div>
             <div className='footer-right'>
                {
                    Object.keys(pages).map((page)=>(
                        <Link
                                key={page}
                                className={(isActive === page) ? 'header-link header-link--isActive' : 'header-link'}
                                to={pages[page].url}
                                onClick={() => { handleActive(page); }}
                            >
                                <Button

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {pages[page].display}
                                </Button>
                            </Link>
                    ))
                }

             <a href="https://fr-fr.facebook.com/pages/category/Community/Ludautisme-344242315626617/" target="_blank" rel="noreferrer"><img className="footer-facebook-logo"src={facebookLogo} alt="logo facebook" /></a>
             </div>
             </div>
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
