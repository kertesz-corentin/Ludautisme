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
    async login(email, password) {
        const response = await connection.post('/login/admin', { email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response;

    },
    async logout() {
        localStorage.removeItem("user");
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

// const api = {
//     async get(path) {
//         try {
//         const connection = axios.create({
//             baseURL: `${baseURL}/api`,
//         });
//         const localToken = localStorage.getItem('token');
//         const headerToken = { Authorization: `bearer ${localToken}`}
//         console.log(headerToken);
//         const response = await connection.get(path,null,{ Authorization: `bearer ${localToken}` });
//         return response;} catch(err) {
//             console.error('axios',err);
//         }
//     },
//     async delete(path) {
//         try {
//         const connection = axios.create({
//             baseURL: `${baseURL}/api`,
//         });
//         const localToken = localStorage.getItem('token');
//         const response = await connection.delete(path,null,{ Authorization: `bearer ${localToken}` });
//         return response;} catch(err) {
//             console.error('axios',err);
//         }
//     },
//     async post(path,data){
//             const localToken = localStorage.getItem('token');
//             const headerToken = { Authorization: `bearer ${localToken}`}
//             const response = await connection.post(path,data,headerToken);
//             return response;
//     },
//     async patch(path,data){
//         try {
//         const connection = axios.create({
//             baseURL: `${baseURL}/api`,
//         });
//         const localToken = localStorage.getItem('token');
//         const response = await connection.patch(path,data,{ Authorization: `bearer ${localToken}` });
//         return response;} catch(err) {
//             console.error('axios',err);
//         }
//     },
//     async put(path,data){
//         try {
//         const connection = axios.create({
//             baseURL: `${baseURL}/api`,
//         });
//         const localToken = localStorage.getItem('token');
//         const response = connection.put(path,data,{ Authorization: `bearer ${localToken}` });
//         return response;} catch(err) {
//             console.error('axios',err);
//         }
//     },
// };

// export default api;

export function setBearerToken(token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;

    console.log("token set", localStorage.getItem('token'))
}

export function removeBearerToken() {
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem('token');
}

export function getLocalBearerToken() {
    const localToken = localStorage.getItem('token');
    if (localToken) {
        return localToken;
    }
    return undefined;
}
