import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Calendrier from '../public/icones/calendrier.png'

import './permanency.scss';

const Permanency = ({className, ...rest}) => {
   return (
       <div
            className={classnames('clay permanency', className)}
            // className={classnames('bandeau-présentation-permanence-infos', className)}
            {...rest}>

            {/* <div className="permanency-title"> */}
                    <h2>
                        Prochaine permanence
                    </h2>
                {/* </div> */}
                {/* <div className='permanency-block'> */}
                    <div className='permanency-block'>
                        <img className="permanency-logo" src={Calendrier} alt="" />

                        <p className="permanency-date">
                            01/03/2022 <br />
                            8h00-12h00 <br />
                        </p>
                    </div>
                    {/* <div>
                        <p className="permanency-date">
                            01/03/2022 <br />
                            8h00-12h00 <br />
                        </p>
                    </div> */}
                {/* </div> */}

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
