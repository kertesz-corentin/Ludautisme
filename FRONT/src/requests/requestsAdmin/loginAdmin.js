import api from '../index';
import { setBearerToken } from '../index';
/**
 *
 * @param {string} email : user email
 * @param {string} password : user password
 * @returns
 */
export async function requestLoginAdmin(email, password) {
    try {
        const response = await api.post('/login/admin', {
            email, password
        });
        setBearerToken(response.data.token);

        return response
    }
    catch (err) {
        return err.response;
    }
}


