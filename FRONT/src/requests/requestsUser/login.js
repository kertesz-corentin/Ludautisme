import api, { setBearerToken } from '../index';


export async function requestLoginUser(email, password) {
    try {
        const response = await api.post('/login/user', {
             email, password
        })
        setBearerToken(response.data.token);
        console.log(`Voila la réponse de l'api`, response);
        return response
    }
    catch (err) {
        console.log(`Voici l'erreur provenant de l 'api`, err.response)
        return err.response;

    }
}
