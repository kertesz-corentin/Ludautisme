import api from '../index';

export async function requestLoginAdmin(email, password) {
    try {
        const response = await api.post('/login/admin', {
            email, password
        });
        return response
    }
    catch (err) {
        return err.response;
    }
}
