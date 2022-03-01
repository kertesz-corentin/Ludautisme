import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './usermyaccount.scss';
import MenuUser from '../MenuUser/MenuUser';
import Permanency from '../../Permanency/Permanency';

const UserMyAccount = ({className, ...rest}) => {
   return (
       <div> Bienvenue Michel
            <Permanency/>
            <div
                    className={classnames('home-user', className)}
                    {...rest}
                >
                    <MenuUser/>

            </div>
        </div>
   );
};

UserMyAccount.propTypes = {
    className: PropTypes.string,
};
UserMyAccount.defaultProps = {
    className: '',
};
export default React.memo(UserMyAccount);
