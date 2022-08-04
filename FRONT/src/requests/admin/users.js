import api from "../index";

const getAll = async () => {
    const result = await api.get('/admin/users');
    return result.data;
}

const adminUsers = {
    getAll
    ,
}

export default adminUsers;
