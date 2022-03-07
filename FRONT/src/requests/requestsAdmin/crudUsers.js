import api from '../index';

/**
 *
 * @param {*} param0
 * @returns
 */
export async function addUser(newUser, token) {
    try {
        console.log(newUser);
        const response = await api.post('/admin/users', newUser,{ Authorization: `bearer ${token}` });

        console.log('responseAddUser :', response);
        return response
    }
    catch (err) {
        return err.response;
    }
}


