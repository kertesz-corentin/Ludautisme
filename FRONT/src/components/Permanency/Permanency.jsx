import React,{useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Calendrier from '../public/icones/calendrier.png'
import './permanency.scss';
import api from '../../requests';

const Permanency = ({className,display, ...rest}) => {
    const [permInfo,setPermInfo] = useState();

    const getPermInfo = async ()=>{
        const response = await api.get(`/customer/booking/history/`);
        if (response.status === 200){
            setPermInfo(response.data);
        } else {
            console.error(response.data);
        }
    }

   return (
       <div
            className={(display !=='account') ? 'clay permanency' : 'clay permanency account'}
            // className={classnames('bandeau-présentation-permanence-infos', className)}
            {...rest}>

            {/* <div className="permanency-title"> */}
                    <h2>
                        Prochaine permanence
                    </h2>
                {/* </div> */}
                {/* <div className='permanency-block'> */}
                    <div className='permanency-block'>
                        <img className={(display !=='account') ? "permanency-logo" : "permanency-logo account-logo"} src={Calendrier} alt="" />
                        {(display !== 'account') ?
                            <>
                                <p className="permanency-date">
                                     01/03/2022 <br />
                                     8h00-12h00 <br />
                                 </p>
                            </>
                            :
                            <>
                            <p className="permanency-date account-date">
                                     01/03/2022
                                     8h00-12h00
                                 </p>
                            </>
                        }

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
