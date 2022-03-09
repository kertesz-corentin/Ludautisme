import api from "../index";

export async function requestGetNewPassword(email) {
    try {
        const response = await api.post('/login/user/reset-password', {
             email,
        })
        console.log(`Voila la réponse de l'api`, response);
        return response
    }
    catch (err) {
        console.log(`Voici l'erreur provenant de l'api`, err.response)
        return err.response;
    }
}
