import axios from 'axios';

const api = axios.create({
    baseURL: `${window.location.origin}/api`,
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

export function getLocalBearerToken () {
    const localToken = localStorage.getItem('token');
    if(localToken) {
        return localToken;
    }
    return undefined;
}
