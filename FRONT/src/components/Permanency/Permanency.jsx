import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './permanency.scss';



const Permanency = ({className, ...rest}) => {
   return (
       <div
            className={classnames('clay permanency', className)}
            // className={classnames('bandeau-présentation-permanence-infos', className)}
            {...rest}
         >
             <h2 className="permanency-title">
                Prochaine permanence
             </h2>
             <div className="permanency-inline">
                <div className="permanency-logo">
                    <img src="../public/icones/calendrier.png" alt="" />
                </div>
                <p className="permanency-date">
                    01/03/2022 <br />
                    8h00-12h00 <br />
                </p>
            </div>
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
