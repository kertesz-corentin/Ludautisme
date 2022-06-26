import React, {useState,useEffect} from 'react';
import './inputToggle.scss';
import {Switch} from '@mui/material';


const InputToggle = ({
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
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
    )
};

export default React.memo(InputToggle);
