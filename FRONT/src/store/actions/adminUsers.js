/* eslint-disable import/prefer-default-export */
import { dispatch } from 'rxjs/internal/observable/pairs';
import api from '../../../requests'

export const FETCH_ADMIN_USERS = 'FETCH_ADMIN_USERS';

export const fetchAdminUsers = () => async (dispatch, getState) => {
        dispatch({type: 'FETCH_ADMIN_USERS_REQUEST'});
    try {
        const response = api.adminUsers.getAll();
        dispatch({type:'FETCH_ADMIN_USERS_SUCCESS',payload: response});
    } catch (err){
        dispatch({type:'FETCH_POSTS_FAILURE',err});
    }
};
