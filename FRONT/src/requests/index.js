import axios from 'axios';
import {
    adminUsers
} from './admin';

const baseURL = (window.location.origin.includes('localhost')) ? `http://localhost:3001` : window.location.origin;
console.log(baseURL);

const connection = axios.create({
    baseURL: `${baseURL}/api`,
});


const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? { 'x-access-token': user.token } : {};
}

const api = {
    adminUsers,
    async get(path) {
        try {
        return await connection.get(path, { headers: authHeader() });
        } catch (err) {
            return err.response
        }
    },
    async post(path, data) {
        try {
        return await connection.post(path, data, { headers: authHeader() });
        } catch (err) {
            return err.response
        }
    },
    async patch(path, data) {
        try {
        return await connection.patch(path, data, { headers: authHeader() });
        } catch (err) {
            return err.response
        }
    },
    async put(path, data) {
        try {
        return await connection.put(path, data, { headers: authHeader() });
        } catch (err) {
            return err.response
        }
    },
    async delete(path, data) {
        try {
        return (!data) ? await connection.delete(path, { headers: authHeader() })
                      : await connection.delete(path, { headers: authHeader(), data });
        } catch (err) {
            return err
        }
    },
    async login(email, password,type) {
        try {
            let response = null;
            if (type === "user"){
                response = await connection.post('/login/user', { email, password });
            } else {
                response = await connection.post('/login/admin', { email, password });

            }
            if (response.data.token) {
                const user = {
                    id: response.data.id,
                    role:response.data.role,
                    token: response.data.token
                }
                localStorage.setItem("user",JSON.stringify(user));
            }
            return response;
        } catch (err) {
            return err.response
        }
    },
    async logout() {
        console.log('logout');
        localStorage.removeItem("user");
        return { message: "logged Out" };
    },
    async resetPassword(path, data) {
        try {
        return await connection.post(path, data);
        } catch (err) {
            return err.response
        }
    },

}

export default api;
