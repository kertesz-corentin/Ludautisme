import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './paypal.scss';
import PaypalButton from '../public/icones/paypalicon.png'


const Paypal = ({className, ...rest}) => {
   return (
       <div className={classnames('paypal', className)}
            {...rest}>
                    <div className="application">


        </div>



                <form className="PaypalButton" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations"/>
                    <input type="hidden" name="business" value="ludautisme@gmail.com"/>
                    <input type="hidden" name="lc" value="FR"/>
                    <input type="hidden" name="item_name" value="Lud'Autisme"/>
                    <input type="hidden" name="no_note" value="0"/>
                    <input type="hidden" name="currency_code" value="EUR"/>
                    <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest"/>
                    <input className='paypalButton-icon' type="image" src={PaypalButton}name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !"></input>
                </form>
        </div>
   );
};

Paypal.propTypes = {
    className: PropTypes.string,
};
Paypal.defaultProps = {
    className: '',
};
export default React.memo(Paypal);
