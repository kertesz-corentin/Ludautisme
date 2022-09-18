import React from 'react';
import './admindashboardmenu.scss';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';

const AdminDashboardMenu = ({title, store , buttons, searchbar}) => {
    return (
        <div className='admin-dashboardmenu'>
            <div className='admin-dashboardmenu__title'>{title}</div>
            <div className='admin-dashboardmenu__container'>
                {buttons.map((bloc,index) => {return (
                    <div key={`bloc_${index}`}>
                        {bloc.map(button => {return(<Button key={`bloc_${index}_${button.label}`} variant="contained">{button.label}</Button>)})}
                    </div>
                )}
                                
                            )
                }
            
            </div>

            <div className='admin-dashboardmenu__loading-zone'>
                {(store) && (store.status === 'pending') && <CircularProgress className='admin-dashboardmenu__circularprogress'/>}
            </div>
        </div>
    )
}

export default React.memo(AdminDashboardMenu);
