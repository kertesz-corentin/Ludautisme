import React, { useEffect, useState } from 'react';
import './choiceselection.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChoiceSelection = ({
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

export default React.memo(ChoiceSelection);
