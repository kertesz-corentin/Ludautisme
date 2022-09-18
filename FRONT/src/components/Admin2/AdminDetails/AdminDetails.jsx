import React, {useState} from 'react';
import './admindetails.scss';
import { Collapse } from '@mui/material';

const AdminDetails = () => {

    return (
        <div className='admin-details'>
                <div>DETAILS</div>
                <div>{JSON.stringify()}</div>    
        </div>
    )
}

export default React.memo(AdminDetails);
