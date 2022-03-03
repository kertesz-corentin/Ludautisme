import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export async function requestLogin(email, password) {
    try {
        const response = await api.post('/login/admin', {
            "email": email,
            "password": password,
        });
        return response
    }
    catch (err) {
        return err.response;
    }
}
