import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './userhomepage.scss';
import MenuUser from '../MenuUser/MenuUser';
import Permanency from '../../Permanency/Permanency';

const UserHomePage = ({className, ...rest}) => {
   return (
       <div> Bienvenue sur la UserHomePage
            <div
                    className={classnames('home-user', className)}
                    {...rest}
                >
                    <MenuUser/>
                    <Permanency/>
            </div>
        </div>
   );
};

UserHomePage.propTypes = {
    className: PropTypes.string,
};
UserHomePage.defaultProps = {
    className: '',
};
export default React.memo(UserHomePage);
