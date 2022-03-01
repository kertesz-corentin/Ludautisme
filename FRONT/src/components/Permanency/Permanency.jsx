import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './permanency.scss';



const Permanency = ({className, ...rest}) => {
   return (
       <div
            className={classnames('permanency', className)}
            {...rest}
         >

            <p>
                Prochaine permanence
                01/03/2022
                8h00-12h00
            </p>

        </div>
   );
};

Permanency.propTypes = {
    className: PropTypes.string,
};
Permanency.defaultProps = {
    className: '',
};
export default React.memo(Permanency);
