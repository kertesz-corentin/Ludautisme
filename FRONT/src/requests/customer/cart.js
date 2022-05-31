import api from "../index";

export async function getCart(userId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const response = await api.get(`/customer/cart/${id}`);
    return response;
}

export async function addToCart(refId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    console.log(refId);
    const settings = {refId}
    console.log("SETT",settings);
    const response = await api.post(`/customer/cart/add/${id}`,settings);
    return response;
}

export async function deleteFromCart(userId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const response = await api.get(`/customer/cart/${id}`);
    return response;
}
