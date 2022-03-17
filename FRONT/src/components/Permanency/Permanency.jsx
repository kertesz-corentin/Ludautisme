import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Calendrier from '../public/icones/calendrier.png'
import './permanency.scss';
import api from '../../requests';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr', null);

const Permanency = ({className,display, ...rest}) => {
    const [permDate,setPermDate] = useState();

    useEffect(()=>{getPermInfo()},[]);
    console.log(permDate);
    const getPermInfo = async ()=>{
        const response = await api.get(`/customer/permanency/`);
        if (response.status === 200){
            if (response.data[0].next_date){
                setPermDate(response.data[0].next_date);
            } else {
                const nextMonth = moment(response.data[0].perm_date).add(1, 'M').format('MMMM');
                setPermDate(nextMonth);
            }

            console.log(response.data);
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
                        {(display !== 'account' && permDate) ?
                            <>
                                <p className="permanency-date-none">
                                    { permDate}
                                 </p>
                            </>
                            :
                            <>
                            <p className="permanency-date account-date">
                                <span className='permanency-date-none'>{permDate}</span>
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
