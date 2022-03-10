import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './paypal.scss';
const Paypal = ({className, ...rest}) => {
   return (
       <div className={classnames('paypal', className)}
            {...rest}>
                    <div className="application">


        </div>



                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations"/>
                    <input type="hidden" name="business" value="ludautisme@gmail.com"/>
                    <input type="hidden" name="lc" value="FR"/>
                    <input type="hidden" name="item_name" value="Lud'Autisme"/>
                    <input type="hidden" name="no_note" value="0"/>
                    <input type="hidden" name="currency_code" value="EUR"/>
                    <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest"/>
                    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !"/>
                    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1"/>
                </form>

                {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post"> <input type="hidden" name="cmd" value="_cart"/>
                <input type="hidden" name="business" value="ludautisme@gmail.com"/>
                <input type="hidden" name="item_name" value="hat"/>
                <input type="hidden" name="item_number" value="123"/>
                <input type="hidden" name="amount" value="15.00"/>
                <input type="hidden" name="first_name" value="John"/>
                <input type="hidden" name="last_name" value="Doe"/>
                <input type="hidden" name="address1" value="9 Elm Street"/>
                <input type="hidden" name="address2" value="Apt 5"/>
                <input type="hidden" name="city" value="Berwyn"/>
                <input type="hidden" name="state" value="PA"/>
                <input type="hidden" name="zip" value="19312"/>
                <input type="hidden" name="night_phone_a" value="610"/>
                 <input type="hidden" name="night_phone_b" value="555"/>
                 <input type="hidden" name="night_phone_c" value="1234"/>
                 <input type="hidden" name="email" value="ludautisme@gmail.com"/>
                 <input type="image" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" alt="PayPal - The safer, easier way to pay online"/> </form> */}

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






