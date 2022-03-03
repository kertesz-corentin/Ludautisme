import api from '../index';


export async function requestLoginUser(email, password) {
    try {
        const response = await api.post('/login/user', {
             email, password,
        });
        return response
    }
    catch (err) {
        return err.response;
    }
}
