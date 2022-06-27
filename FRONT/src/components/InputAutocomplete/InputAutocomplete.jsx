import React, {useState} from 'react';
import './inputAutocomplete.scss';
import {InputLabel,MenuItem,FormControl,Select, Autocomplete} from '@mui/material';

const InputAutocomplete = ({
    autoComplete,
    clearOnEscape,
    freeSolo,
    className,
    currState,
    updateState,
    onChange,
    eltsList,
    labelId,
    displayName,
    placeholder,
    iconBefore,
    iconAfter,
    ...rest }) => {

    const handleChange = (event) =>{
        updateState(event.target.value);
    }

    const [placeholderState,setPlaceholderState] = useState(placeholder);
    const [PlaceholderReset,setPlaceholderReset] = useState(true);
    const clearPlaceholder = ()=>setPlaceholderState('');
    const resetPlaceholder = ()=>{
        setPlaceholderState(placeholder);
        setPlaceholderReset(!PlaceholderReset);
    }

    return (
            <Autocomplete
                    autoComplete={false}
                    clearOnEscape
                    freeSolo
                    value={currState.name}
                    key={`${placeholder}-${PlaceholderReset}`}
                    onClose={resetPlaceholder}
                    options={(eltsList)?eltsList.map(elt=>elt.name):[]}
                    onChange={(event,newValue)=>{
                        if (newValue) {
                        const processed = onChange(newValue);
                        updateState(processed);
                        }
                    }}
                    renderInput={(params) => (
                         <form
                            autoComplete={'new-password'}
                            ref={params.InputProps.ref}
                            className= {`atcplt-input ${(className)?className:''}`}
                         >
                            <input
                                    type="text"
                                    placeholder={placeholderState}
                                    onFocusCapture={clearPlaceholder}
                                    {...params.inputProps}
                            />
                        </form>

                    )}
                />
    )
};

export default React.memo(InputAutocomplete);
