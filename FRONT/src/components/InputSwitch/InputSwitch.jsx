import React, {useState,useEffect} from 'react';
import './inputswitch.scss';
import {Switch} from '@mui/material';


const InputSwitch = ({
    className,
    currState,
    updateState,
    eltsList,
    labelId,
    displayName,
    ...rest }) => {

    const handleChange = (event) =>{
        updateState(!currState);
    }

    return (
            <Switch
                className='inputSwitch'
                checked={currState}
                value={''}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
    )
};

export default React.memo(InputSwitch);
