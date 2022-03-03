import api from '../index';

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
        console.log('responseApi :', response);
        return response
    }
    catch (err) {
        return err.response;
    }
}


