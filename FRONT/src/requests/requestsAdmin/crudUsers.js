import api from '../index';

/**
 *
 * @param {*} param0
 * @returns
 */
export async function addUser(user, token) {
    try {
        const response = await api.post('/admin/users', {
            'member_number': user.member_number,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone': user.phone,
            'email': user.email,
            'adress_number': user.adress_number,
            'adress_street': user.adress_street,
            'adress_zipcode': user.adress_zipcode,
            'adress_city': user.adress_city,
            headers: {
                Authorization: `bearer ${token}`
            }
        });

        console.log('responseAddUser :', response);
        return response
    }
    catch (err) {
        return err.response;
    }
}


