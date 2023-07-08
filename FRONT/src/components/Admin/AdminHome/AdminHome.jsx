import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// import requests
import api from '../../../requests/index';

// import react components
import AdminPermanency from '../AdminPermanency/AdminPermanency';
import AdminHomeCard from '../AdminHomeCard/AdminHomeCard';
import { Fab } from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import './adminhome.scss';

const AdminHome = ({ isLogged, className, ...rest }) => {
    const [bookings, setBookings] = useState([]);
    const [overdueBookings, setOverdueBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [references, setReferences] = useState([]);

    const allBookings = async () => {
        const response = await api.get('/admin/booking');
        const data = await response.data;
        if (response.status === 200) {
            setBookings(data.length);
        }
        else {
            console.error(response.data)
        }
    }

    const delayBookings = async () => {
        const response = await api.post('/admin/booking/search', { overdue: true });
        const data = await response.data;
        if (response.status === 200) {
            setOverdueBookings(data.length);
        }
        else {
            console.error(response.data)
        }
    }

    const allUsers = async () => {
        const response = await api.get('/admin/users');
        const data = await response.data;
        if (response.status === 200) {
            setUsers(data.length);
        }
        else {
            console.error(response.data)
        }
    }

    const allReferences = async () => {
        const response = await api.get('/admin/references');
        const data = await response.data;
        if (response.status === 200) {
            setReferences(data.length);
        }
        else {
            console.error(response.data)
        }
    }

    useEffect(() => {
        allBookings();
        delayBookings();
        allUsers();
        allReferences();
    }, [])

    return (
        <><div
            className={classnames('adminhome', className)}
            {...rest}
        >
            <div className='adminhome-element'>
                <div className="adminhome-element-item">
                    <AdminPermanency />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Réservations'} data={bookings} status={'en cours'} tag='booking' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Réservations'} data={overdueBookings} status={'en retard'} tag='booking' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Adhérents'} data={users} status={'inscrits'} tag='user' />
                </div>
                <div className="adminhome-element-item">
                    <AdminHomeCard title={'Références'} data={references} status={'enregistrées'} tag='reference' />
                </div>
            </div>
        </div>
            <div className='help'>
                <Fab color="primary" aria-label="help" href="https://docs.google.com/document/d/1kofKMn2T7YS-YfCv9o4-zQC-8MhM0y4a0gy7X-PBWUU/edit?usp=sharing" target='_blank' size='small'>
                    <QuestionMarkOutlinedIcon color='' />
                </Fab>
            </div></>
    );
};

AdminHome.propTypes = {
    isLogged: PropTypes.bool,
};
AdminHome.defaultProps = {
    isLogged: false,
};
export default React.memo(AdminHome);
