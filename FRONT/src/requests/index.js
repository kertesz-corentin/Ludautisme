import axios from 'axios';

const baseURL = (window.location.origin.includes('localhost')) ? `http://localhost:3001` : window.location.origin;
console.log(baseURL);

const connection = axios.create({
    baseURL: `${baseURL}/api`,
});

const api = {
    async get(path) {
        return connection.get(path, { headers: authHeader() });
    },
    async post(path, data) {
        return connection.post(path, data, { headers: authHeader() });
    },
    async patch(path, data) {
        return connection.patch(path, data, { headers: authHeader() });
    },
    async put(path, data) {
        return connection.put(path, data, { headers: authHeader() });
    },
    async delete(path) {
        return connection.delete(path, { headers: authHeader() });
    },
    async login(email, password,type) {
        let response = null;
        if (type === "user"){
            response = await connection.post('/login/user', { email, password });
        } else {
            response = await connection.post('/login/admin', { email, password });
        }
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response;

    },
    async logout() {
        console.log('logout');
        localStorage.removeItem("token");
        return { message: "logged Out" };
    }

}

export default api;

const authHeader = () => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
        return { 'x-access-token': localToken }
    }
    //No token
    return {};
}
