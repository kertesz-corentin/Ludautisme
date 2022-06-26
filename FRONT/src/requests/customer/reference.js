import api from "../index";

export async function getOne(refId){
    const response = await api.get(`/customer/articles/${refId}`);
    return response;
}