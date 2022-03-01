import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './homeUser.scss';
import MenuUser from '../MenuUser/MenuUser';
import Permanency from '../../Permanency/Permanency';

const HomeUser = ({className, ...rest}) => {
   return (
       <div> Bienvenue Michel
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

HomeUser.propTypes = {
    className: PropTypes.string,
};
HomeUser.defaultProps = {
    className: '',
};
export default React.memo(HomeUser);
