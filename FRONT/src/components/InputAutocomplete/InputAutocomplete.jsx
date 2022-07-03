import React, {useState} from 'react';
import './inputAutocomplete.scss';
import {InputLabel,MenuItem,FormControl,Select, Autocomplete} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

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
    iconList,
    handleCloseMenu,
    listOnFocus,
    searchIcon,
    ...rest }) => {

    const [placeholderState,setPlaceholderState] = useState(placeholder);
    const [PlaceholderReset,setPlaceholderReset] = useState(true);
    const clearPlaceholder = ()=>setPlaceholderState('');
    const resetPlaceholder = ()=>{
        setPlaceholderState(placeholder);
        setPlaceholderReset(!PlaceholderReset);
        setOpen(false);
    }
    const [inputValue, setInputValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        console.log('inputValue',inputValue);
        if (inputValue.length > 0 || !listOnFocus) {
                setOpen(true);
            }
    };
    const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const clearOpen = ()=>{
    setOpen(false);
    resetPlaceholder();
  }

    return (
            <Autocomplete
                    autoComplete={false}
                    clearOnEscape ={true}
                    freeSolo
                    open={open}
                    onBlur={clearOpen}
                    onOpen={handleOpen}
                    onInputChange={handleInputChange}
                    inputValue={inputValue}
                    value={currState.name}
                    key={`${placeholder}-${PlaceholderReset}`}
                    onClose={resetPlaceholder}
                    options={(eltsList)?eltsList.map(elt=>elt.name):[]}
                    onChange={(event,newValue)=>{
                        if (newValue) {
                        setOpen(false);
                        setInputValue("");
                        const processed = onChange(newValue);
                        updateState(processed);
                        }
                    }}
                    renderInput={(params) => (
                         <form
                            autoComplete={'new-password'}
                            ref={params.InputProps.ref}
                            className= {`atcplt-input ${(className)?`atcplt-input-${className}`:''}`}
                         >
                              { (searchIcon) &&
                                <SearchIcon
                                    className = 'atcplt-input--interaction'
                                />
                            }
                            <input

                                    type="text"
                                    placeholder={placeholderState}
                                    onFocusCapture={clearPlaceholder}
                                    {...params.inputProps}
                            />
                            { (iconList) &&
                                <ArrowDropDownIcon
                                    onClick={(open)?clearOpen:handleOpen}
                                    className = 'atcplt-input--interaction'
                                />
                            }
                        </form>

                    )}
                />
    )
};

export default React.memo(InputAutocomplete);
