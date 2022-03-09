
const userSchema  = {
    member_number:{
        type : "number",
        label : "N° Membre",
        gridDisplay : "normal",
        width : 75,
    },
    email:{
        type : "email",
        label : "Email",
        gridDisplay : "normal",
        width : 75,
    },
    first_name:{
        type : "string",
        label : "Prénom",
        gridDisplay : "normal",
        width : 75,
    },
    last_name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 75,
    },
    phone:{
        type : "string",
        label : "Téléphone",
        gridDisplay : "normal",
        width : 75,
    },
    adress_number:{
        type : "number",
        label : "N° Rue",
        gridDisplay : "normal",
        width : 75,
    },
    adress_street:{
        type : "string",
        label : "Nom rue",
        gridDisplay : "normal",
        width : 75,
    },
    adress_zipcode:{
        type : "number",
        label : "Code Postal",
        gridDisplay : "normal",
        width : 75,
    },
    adress_city:{
        type : "string",
        label : "Ville",
        gridDisplay : "normal",
        width : 75,
    },
    cotisation_status:{
        type : "boolean",
        label : "Cotisation",
        gridDisplay : "toggle",
        width : 75,
    },
    cotisation_expiration:{
        type : "date",
        label : "Cotisation Exp",
        gridDisplay : "date",
        width : 75,
    },
    caution_status:{
        type : "boolean",
        label : "Caution",
        gridDisplay : "toggle",
        width: 75,
    },
    caution_expiration:{
        type : "date",
        label : "Caution Exp",
        gridDisplay : "date",
        width : 75,
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
        width : 75,
    },
}

export {userSchema}
