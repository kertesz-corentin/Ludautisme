export default function schemas() {
    return {
    userSchema: {
        member_number:{type : "number", label : "Numéro de membre"},
        email:{type : "string", label : "Email"},
        first_name:{type : "string", label : "Prénom"},
        last_name:{type : "string", label : "Nom"},
        phone:{type : "string", label : "Téléphone"},
        adress_number:{type : "number", label : "N° de la rue"},
        adress_street:{type : "string", label : "Nom de la rue"},
        adress_zipcode:{type : "number", label : "Code Postal"},
        adress_city:{type : "string", label : "Ville"},
        cotisation_status:{type : "boolean", label : "Cotisation OK"},
        cotisation_expiration:{type : "string", label : "Date d'expiration Caution"},
        caution_status:{type : "boolean", label : "Caution Ok"},
        caution_expiration:{type : "string", label : "Date d'expiration Caution"},
        id_role:{type : "number", label : "Admin"},
    }
    }
};
