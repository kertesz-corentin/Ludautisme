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
    handleCloseMenu,
    ...rest }) => {

    const handleChange = (event) =>{
        updateState(!currState);
        (handleCloseMenu)&&handleCloseMenu();
    }

    return (
            <Switch
                className='inputSwitch'
                checked={currState || false}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
    )
};

export default React.memo(InputSwitch);
