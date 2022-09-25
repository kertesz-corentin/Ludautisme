import React , {useState,useEffect,useRef} from 'react';
import './admindetails.scss';
import store from '../../../store';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';
import CloseIcon from '@mui/icons-material/Close';
import {FormControlLabel,Checkbox,TextField,Button } from '@mui/material/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import frLocale from 'date-fns/locale/fr';
//import Checkbox from '@mui/material/Checkbox';

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

const AdminDetails = ({schema,titleOverride}) => {
    const { details } = useSelector(state => state);
    const setClose = ()=> store.dispatch(actions.details.setClose());

        // Responsive Datagrid height
    const [height, setHeight] = useState(null);
    const [clientHeight,setClientHeight] = useState(window.innerHeight);
    const parentSize = useRef();


    //Help to filter too many renderer, without, rendering each ms you are resising who makes brower bug.
    const debouncedHandleResize = debounce(() => {
        const delta = (window.innerHeight < clientHeight ) ?  clientHeight - window.innerHeight : 0;
        setClientHeight(window.innerHeight);
        setHeight(parentSize.current.getBoundingClientRect().height - delta);
    }, 16);

    useEffect(() => {
        debouncedHandleResize();
        window.addEventListener('resize', debouncedHandleResize);
        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientHeight]);


    //DYNAMIC TITLE (Default)
    //Use title prop in schema definition and detail content value to make a dynamic title
    //Else show standard 'Details' string
    //Can be override by titleOverride props
    const titleStruct = (schema) && Object.entries(schema)
                                        .filter(prop => prop[1].title)                                                              //Only props with title
                                        .sort((a,b)=>{return a[1].title - b[1].title})                                              //Sort titles order by small -> big
                                        .map(titleElt => titleElt[0]);                                                              //get props ordered 
    const dynaTitle = (details.content) ? titleStruct.map(elt => `${(schema[elt].titlePrefix)                                       //Create string type titlePrefix + TitleContent
                                                                     ? schema[elt].titlePrefix 
                                                                     : ''}
                                                                   ${details.content[elt]}`)
                                                      .join(' ')
                                        : 'Détails';

    //DYNAMIC FIELDS
    const blocNumb = (schema) && [...new Set(Object.entries(schema)                                                                 //...new Set naturaly avoid duplicate values
                                         .map((elt)=> [elt[1].bloc,elt[1].blocTitle,elt[1].field])
                                         .reduce((prev,curr)=>{
                                            const iExist = prev.findIndex((elt)=> elt[0] === curr[0]);
                                            const updateBloc = (iExist >= 0) && ((
                                                                                      !prev[iExist][1] && curr[1])
                                                                                    ||(curr[1] && curr[2] < prev[iExist][2])
                                                                                ) && curr;
                                            prev[iExist] = (updateBloc) ? updateBloc : prev[iExist];                                //! MUTATION : Update if needed, else do nothing
                                            return (iExist < 0) ? [...prev,curr] : prev;
                                        },[])   //get bloc number
                                         .sort((a,b)=> {return (!a[0] || !b[0]) ? -1 : a[0] - b[0]})                                //order by small -> big
                                    )];                                                                                             //Result [1,2,3,etc...]
    //console.log(blocNumb);
    
    //DYNAMIC INPUT
    const inputType = (type,label,value) => {
        console.log(type,label,value);
        const types = {
            checkbox    : () => (<FormControlLabel className='admin-details__input--checkbox admin-details__input '
                                                label={(label) ? label : ''}
                                                disabled 
                                                control={<Checkbox value={value} />} />),
            date        : () => (<LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                                    <DatePicker
                                        label="Sélectionner une date"
                                        value={value}
                                        //onChange={(event) => handleChangeDate(event)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>),
            input       : () => (<TextField className='admin-details__input'
                                            label={(label) ? label : ''} 
                                            id="outlined-size-normal" 
                                            value={(value) ? value : '' } />),
        }

        return (types[type]) ? types[type](label,value) : types.input(label,value)
    }



    return (
        <div className={`admin-details ${(details.open)?'admin-details__open':'admin-details__close'}`}>
            {/* HEADER */}
            <div className={`admin-details__header  ${(details.open)?'admin-details__header--open':'admin-details__header--close'}`}> 
                <div  className='admin-details__header-button--close admin-details__header-button' onClick={setClose}>
                    <CloseIcon className='admin-details__header-button--close-icon'/>
                </div>
                <div className='admin-details__title'>{(titleOverride) ? titleOverride : dynaTitle}</div>
                <Button className='admin-details__header-button' variant="contained">Valider</Button>
            </div>
            {/* BLOCS */}
                {/* <div style={{'text-overflow': 'clip','width':'100%'}}>{JSON.stringify(details.content)}</div> */}
                <div className={`admin-details__bloc-container ${(details.open)?'admin-details__bloc-container--open':'admin-details__bloc-container--close'}`} >
                    {blocNumb.map((bloc)=>{
                        return(
                            <div className='admin-details__bloc'>

                                <div className='admin-details__bloc--title'> {bloc[1]}</div>

                                <div className='admin-details__bloc--inputs'>
                                    {Object.entries(schema).filter((input) => input[1].bloc === bloc[0] && input[1].inputDisplay !== 'none')
                                            .sort((a,b)=>{ return a[1].field - b[1].field })                         //Sort inputs by field
                                            .map((input)=>{
                                                // console.log(input);
                                                return inputType(input[1].inputDisplay,
                                                                 input[1].label,
                                                                 details.content[input[0]]);
                                                // <div className='admin-details__input--container'>
                                                //     <label>{input[1].label}</label>
                                                //     <input value={details.content[input[0]]} />
                                                // </div>
                                            }

                                    )}
                                </div>

                            </div>)}
                    )}   
                </div>   
        </div>
    )
}

export default React.memo(AdminDetails);
