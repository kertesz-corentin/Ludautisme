import React from 'react';
import './inputSelect.scss';
import {InputLabel,MenuItem,FormControl,Select} from '@mui/material';

const InputSelect = ({
    className,
    currState,
    updateState,
    eltsList,
    labelId,
    displayName,
    ...rest }) => {

    const handleChange = (event) =>{
        updateState(event.target.value);
    }

    return (
            <FormControl className="select-form" fullWidth>
                <InputLabel id={labelId}>{displayName}</InputLabel>
                <Select
                    className="select-field"
                    labelId={labelId}
                    value={currState}
                    label={displayName}
                    onChange={handleChange}
                >
                    {eltsList &&
                        eltsList.map((item) => {
                            return (
                                <MenuItem key={item.id} value={item.id} > {item.name}</MenuItem>)
                        })}
                </Select>
            </FormControl>
    )
};

export default React.memo(InputSelect);
