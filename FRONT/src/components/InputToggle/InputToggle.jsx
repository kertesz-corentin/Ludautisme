import React from 'react';
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

console.log(currState);

    const handleChange = (event) =>{
        updateState(!currState);
    }

    return (
            <Switch
                    checked={currState}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}

            />
    )
};

export default React.memo(InputToggle);
