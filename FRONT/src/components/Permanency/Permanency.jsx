import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Calendrier from '../public/icones/calendrier.png'
import './permanency.scss';
import api from '../../requests';
import moment from 'moment';
import 'moment/locale/fr';
import {Typography, Box } from '@mui/material';

moment.locale('fr', null);

const Permanency = ({className,display, ...rest}) => {
    const [permDate,setPermDate] = useState();

    useEffect(()=>{getPermInfo()},[]);
    const getPermInfo = async ()=>{
        const response = await api.get(`/customer/permanency/`);
        if (response.status === 200){
            if (response.data[0].next_date){
                const nextDate = moment(response.data[0].next_date).format('DD MMMM YYYY');
                setPermDate(nextDate);
            } else {
                const nextMonth = (response.data[0].perm_date) ?
                    moment(response.data[0].perm_date).add(1, 'M').format('MMMM')
                :
                    moment().add(1, 'M').format('MMMM')

                    setPermDate(nextMonth);

            }
        } else {
            console.error(response.data);
        }
    }

   return (
       <div
            className={(display !=='inline') ? 'clay permanency' : 'clay permanency inline'}
            {...rest}>
                    <h2>
                        Prochaine permanence
                    </h2>
                    <div className={(display !=='inline') ? "permanency-block" : "permanency-block inline-block"}>
                        <img className={(display !=='inline') ? "permanency-logo" : "permanency-logo inline-logo"} src={Calendrier} alt="" />
                                <Box className={(display !=='inline') ? "permanency-date" : "permanency-date inline-date"}>
                                <Typography >
                                    <span>
                                    {permDate}
                                    </span>
                                 </Typography>
                                {(permDate && !isNaN(Number(permDate[0]))) &&
                                <>
                                  <Typography className={(display ==='inline') && "inline-hours"}>
                                  20-00h - 22h00
                                    </Typography>
                                </>
                                }
                                </Box>

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
