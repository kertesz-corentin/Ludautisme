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
            const user = {
                id: response.data.id,
                role:response.data.role,
                token: response.data.token
            }
            console.log("user logged:",user);
            localStorage.setItem("user",JSON.stringify(user));
        }
        return response;
    },
    async logout() {
        console.log('logout');
        localStorage.removeItem("user");
        return { message: "logged Out" };
    }

}

export default api;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    if (token) {
        return { 'x-access-token': token }
    }
    //No token
    return {};
}
