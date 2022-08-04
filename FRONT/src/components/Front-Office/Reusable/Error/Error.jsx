import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './error.scss';
import Error404 from '../../../../public/icones/404-error.png'

const Error = ({className, ...rest}) => {
   return (
       <div
            className={classnames('error', className)}
            {...rest}
         >
             <h2 className='error-title'>
             Désolé, cette page n’existe pas (erreur 404)
             </h2>
             <a className='clay button' class="clay button" href="/">Retour à l'accueil</a>
             <img className='error-404' src={Error404} alt="error 404" />
        </div>



   );
};

Error.propTypes = {
    className: PropTypes.string,
};
Error.defaultProps = {
    className: '',
};
export default React.memo(Error);
