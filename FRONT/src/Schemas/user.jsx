
const userSchema  = {
    id:{
        type: "number",
        label: "Editer profil",
        gridDisplay: "edit",
        width: 100,
    },
    member_number:{
        type : "number",
        label : "n° Membre",
        gridDisplay : "normal",
        width : 100,
    },
    email:{
        type : "email",
        label : "Email",
        gridDisplay : "normal",
        width : 150,
    },
    first_name:{
        type : "string",
        label : "Prénom",
        gridDisplay : "normal",
        width : 125,
    },
    last_name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 125,
    },
    phone:{
        type : "string",
        label : "Téléphone",
        gridDisplay : "normal",
        width : 100,
    },
    adress_number:{
        type : "number",
        label : "n° Rue",
        gridDisplay : "normal",
        width : 75,
    },
    adress_street:{
        type : "string",
        label : "nom Rue",
        gridDisplay : "normal",
        width : 200,
    },
    adress_zipcode:{
        type : "number",
        label : "Code Postal",
        gridDisplay : "normal",
        width : 125,
    },
    adress_city:{
        type : "string",
        label : "Ville",
        gridDisplay : "normal",
        width : 100,
    },
    cotisation_status:{
        type : "boolean",
        label : "Cotisation",
        gridDisplay : "toggle",
        width : 100,
    },
    cotisation_expiration:{
        type : "date",
        label : "Cotisation Exp",
        gridDisplay : "date",
        width : 150,
    },
    caution_status:{
        type : "boolean",
        label : "Caution",
        gridDisplay : "toggle",
        width: 100,
    },
    caution_expiration:{
        type : "date",
        label : "Caution Exp",
        gridDisplay : "date",
        width : 150,
    },
    id_role:{
        type : "number",
        label : "Role",
        gridDisplay : "normal",
        width : 75,
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 100,
    },
}

export {userSchema}
