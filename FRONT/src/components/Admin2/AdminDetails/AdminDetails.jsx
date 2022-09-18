import React, {useState} from 'react';
import './admindetails.scss';
import { Collapse } from '@mui/material';
import store from '../../../store';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';

const AdminDetails = () => {
    const reduxState = useSelector(state => state);
    console.log(reduxState);
    console.log(actions);
    


    return (
        <Collapse in={reduxState.details.open} collapsedSize={'0px'} >
        <div className='admin-details'>
                <div onClick={()=>{store.dispatch(actions.details.setClose(reduxState.details))}}>Fermer</div>
                <div>DETAILS</div>
                <div>{JSON.stringify()}</div>    
        </div>
        </Collapse>
    )
}

export default React.memo(AdminDetails);
