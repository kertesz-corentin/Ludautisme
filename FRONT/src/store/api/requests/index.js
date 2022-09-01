/* eslint-disable array-callback-return */
//Ici aggrégation des différents enpoints des fichiers requests
import { adminUsers } from "./adminUsers";

//En sortie (builder)=>({monHook:builder.query(query:()=>'/url')});

export const initEndpoints = (builder) =>{

    const endpointsLibs = [adminUsers];
    
    //On lit chaque librairie de requete, si stucture ok on le rajoute au endpoints
    //Chaque hook de requete doit être unique
    //sinon on le signale en erreur et on rajoute un retour d'erreur sans bloquer l'exécution
    
    //Objet contenant toutes les requetes rempli par la fonction synchrone requestLib.map
    //Mutation ici
    let endpoints = {};
    
    //Le .map ajoute les requetes ok a apiEndpoints, rajoute aussi les requêtes pas ok avec message d'erreur redux
    //errors Récupère seulement les endpoints en erreur pour affichage console a l'initialisation
    //Pour toutes les librairies de requettes
    const errors = endpointsLibs.map(endpointLib => {
        //On contrôle si les propriétés sont valides
        return Object.keys(endpointLib).map(endpointName => {
           
            if (   typeof endpointLib[endpointName] === 'function'  //Si ok on les ajoute a endpoints
                && typeof endpointLib[endpointName]() === 'string'){
                endpoints = {...endpoints, ...{[endpointName] : builder.query({query : endpointLib[endpointName]})} };
            }
            //Sinon on retourne une erreur
            else {
                return `Redux[RequestError] : ${endpointName} n'est pas une fonction ou ne retourne pas une chaine de caractère`;
            }       
        })
        .filter(elt => elt); // Filtre Object.keys().map pour supprimer les undefined retourné si requete ok
    });
    console.log('endpoints',endpoints);
    (errors.length) && console.error('Redux[RequestError] :',errors.flat());
    return endpoints
}
