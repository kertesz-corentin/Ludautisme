import axios from 'axios';

// create axios instance for API
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export default api;

export function setBearerToken(token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;
    localStorage.setItem('token', token);
}

export function removeBearerToken() {
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem('token');
}

export function getLocalBearerToken() {
    const localToken = localStorage.getItem('token');
    if(localToken) {
        return localToken;
    }
    return undefined;
}
