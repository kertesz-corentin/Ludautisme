import React from 'react';
import './admindetails.scss';
import store from '../../../store';
import {useSelector} from 'react-redux';
import {actions} from '../../../store/reducers';
import CloseIcon from '@mui/icons-material/Close';
import { relativeTimeRounding } from 'moment';

const AdminDetails = ({schema,titleOverride}) => {
    const { details } = useSelector(state => state);
    const setClose = ()=> store.dispatch(actions.details.setClose());


    //DYNAMIC TITLE (Default)
    //Use title prop in schema definition and detail content value to make a dynamic title
    //Else show standard 'Details' string
    //Can be override by titleOverride props
    const titleStruct = (schema) && Object.entries(schema)
                                        .filter(prop => prop[1].title)                    //Only props with title
                                        .sort((a,b)=>{return a[1].title - b[1].title})    //Sort titles order by small -> big
                                        .map(titleElt => titleElt[0]);                    //get props ordered 
    const dynaTitle = (details.content) ? titleStruct.map(elt => `${(schema[elt].titlePrefix)  //Create string type titlePrefix + TitleContent
                                                                     ? schema[elt].titlePrefix 
                                                                     : ''}
                                                                   ${details.content[elt]}`)
                                                      .join(' ')
                                        : 'Détails';

    //DYNAMIC FIELDS
    const blocNumb = (schema) && [...new Set(Object.entries(schema)                       //...new Set naturaly avoid duplicate values
                                         .map((elt)=> [elt[1].bloc,elt[1].blocTitle,elt[1].field])
                                         .reduce((prev,curr)=>{
                                            const iExist = prev.findIndex((elt)=> elt[0] === curr[0]);
                                            const updateBloc = (iExist >= 0) && ((!prev[iExist][1] && curr[1])
                                                                                   ||(curr[1] && curr[2] < prev[iExist][2])) && curr;
                                            prev[iExist] = (updateBloc) ? updateBloc : prev[iExist]; // Update if needed, else do nothing
                                            return (iExist < 0) ? [...prev,curr] : prev;
                                        },[])   //get bloc number
                                         .sort((a,b)=> {return (!a[0] || !b[0]) ? -1 : a[0] - b[0]})              //order by small -> big
                                    )];                                                   //Result [1,2,3,etc...]
    console.log(blocNumb);



    return (
        <div className={`admin-details ${(details.open)?'admin-details__open':'admin-details__close'}`}>
            <div className='admin-details__header'> 
                <div  className='admin-details__close-button' onClick={setClose}>
                    <CloseIcon className='admin-details__close-button--icon'/>
                </div>
                <div className='admin-details__title'>{(titleOverride) ? titleOverride : dynaTitle}</div>
            </div>
                {/* <div style={{'text-overflow': 'clip','width':'100%'}}>{JSON.stringify(details.content)}</div> */}
                <div className='admin-details__bloc-container' >
                    {blocNumb.map((bloc)=>{
                        return(
                            <div className='admin-details__bloc'>
                                 {JSON.stringify(bloc)}
                                 {Object.entries(schema).filter((input) => input[1].bloc === bloc[0] && input[1].inputDisplay !== 'none')
                                        .sort((a,b)=>{ return a[1].field - b[1].field })                         //Sort inputs by field
                                        .map((input)=>{
                                            console.log(input);
                                            return(
                                            <>
                                                <label>{input[1].label}</label>
                                                <input value={details.content[input[0]]} />
                                            </>
                                        )}
                                        )}
                            </div>)}
                    )}   
                </div>   
        </div>
    )
}

export default React.memo(AdminDetails);
