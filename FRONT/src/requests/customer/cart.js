import api from "../index";

export async function getCart(userId){
    const { id } = await JSON.parse(localStorage.getItem('user'));
    const response = await api.get(`/customer/cart/${id}`);
    return response;
}
