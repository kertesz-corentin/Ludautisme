import React from 'react';
import './notice.scss';
const Notice = ({className, ...rest}) => {
    return(
        <div class="notice">
            <h1>
            Mentions légales
            </h1>
            <h2>
            1. Présentation du site
            </h2>
            <p>
            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :

            Le présent site est édité par : Lud'autisme, Association Loi 1901 ayant pour numéro d'identification RNA : W291004049 et qui est domiciliée au 8 Rue Traverse, 29800 landerneau

            Responsable de la publication : Cindy Defontaine, joignable par téléphone au 06 72 63 38 77 et par email ludautisme@gmail.com

            Webmaster du site: Kertesz Corentin, joignable par téléphone au 07 61 91 63 00

            Hébergeur du site: o2switch, qui est domicilié 222-224 Boulevard Gustave Flaubert 63000 Clermont-Ferrand et joignable par téléphone au 04 44 44 60 40
            </p>
            <h2>
            Propriété intellectuelle et contrefaçons
            </h2>
            <p>
            L’entreprise Lud'autisme est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment : les textes, les images, les graphismes, le logo, les icônes,…

            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l’entreprise Lud'autisme.

            Toute exploitation non autorisée du site ou d’un quelconque élément qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
            <h2>
            Formulaire de contact
            </h2>
            <p>
            Vous pouvez être amené à nous indiquer votre adresse e-mail lorsque vous remplissez notre formulaire de contact.

            En aucun cas, votre adresse e-mail ne sera cédée à des tiers.
            </p>
            <h2>
            Liens hypertextes
            </h2>
            <p>
            Ce site internet contient un certain nombre de liens hypertextes vers d’autres sites. Cependant, Lud'autisme n’a pas la possibilité de suivre et vérifier le contenu de ces sites, et n’assumera en conséquence aucune responsabilité de ce fait.
            </p>
        </div>
    );
}

Notice.defaultProps = {
    className: '',
};
export default React.memo(Notice);
