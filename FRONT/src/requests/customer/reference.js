import api from "../index";

export async function getOne(refId){
    const response = await api.get(`/customer/articles/single/${Number(refId)}`);
    return response;
}