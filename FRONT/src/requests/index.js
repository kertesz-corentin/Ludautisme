import axios from 'axios';

const baseURL = (window.location.origin.includes('localhost')) ? `http://localhost:3001`: window.location.origin;
console.log(baseURL);
const api = axios.create({
    baseURL: `${baseURL}/api`,
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
