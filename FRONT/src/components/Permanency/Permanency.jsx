import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './permanency.scss';



const Permanency = ({className, ...rest}) => {
   return (
       <div
            className={classnames('permanency', className)}
            // className={classnames('bandeau-présentation-permanence-infos', className)}
            {...rest}
         >
             <h2>
                Prochaine permanence
             </h2>
            <p>
                01/03/2022 <br />
                8h00-12h00 <br />
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
