import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './paypal.scss';

const Paypal = ({className, ...rest}) => {
   return (
       <div className={classnames('paypal', className)}
            {...rest}>
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







// <div id="smart-button-container">
//       <div style="text-align: center;">
//         <div id="paypal-button-container"></div>
//       </div>
//     </div>
//   <script src="https://www.paypal.com/sdk/js?client-id=AUbfcdEUn8ObFYYdgNpiFJjjqwxFtFSM3ovn-PDCoaqMrZ17C8GIOOHsHYjFE2V4GPi_IhmIE6Uvnh6A&enable-funding=venmo&currency=EUR" data-sdk-integration-source="button-factory"></script>
//   <script>
//     function initPayPalButton() {
//       paypal.Buttons({
//         style: {
//           shape: 'rect',
//           color: 'gold',
//           layout: 'vertical',
//           label: 'donate',

//         },

//         createOrder: function(data, actions) {
//           return actions.order.create({
//             purchase_units: [{"amount":{"currency_code":"EUR","value":1,"breakdown":{"item_total":{"currency_code":"EUR","value":1}}},"items":[{"name":"item name","unit_amount":{"currency_code":"EUR","value":1},"quantity":"1","category":"DONATION"}]}]
//           });
//         },

//         onApprove: function(data, actions) {
//           return actions.order.capture().then(function(orderData) {

//             // Full available details
//             console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

//             // Show a success message within this page, e.g.
//             const element = document.getElementById('paypal-button-container');
//             element.innerHTML = '';
//             element.innerHTML = '<h3>Thank you for your payment!</h3>';

//             // Or go to another URL:  actions.redirect('thank_you.html');

//           });
//         },

//         onError: function(err) {
//           console.log(err);
//         }
//       }).render('#paypal-button-container');
//     }
//     initPayPalButton();
//   </script>
