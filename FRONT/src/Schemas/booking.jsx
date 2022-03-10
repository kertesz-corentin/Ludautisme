const bookingSchema  = {
    id:{
        type: "number",
        label: "Modifier réservation",
        gridDisplay: "edit",
        width: 125
    },
    id_user:{
        type : "string",
        label : "identifiant adhérent",
        gridDisplay : "normal",
        width : 150,
    },
    member_number:{
        type : "string",
        label : "n° Adhérent",
        gridDisplay : "normal",
        width : 150,
    },
    email:{
        type : "string",
        label : "Email",
        gridDisplay : "normal",
        width : 150,
    },
    first_name:{
        type : "string",
        label : "Prénom",
        gridDisplay : "normal",
        width : 150,
    },
    last_name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 150,
    },
    id_permanency:{
        type : "number",
        label : "id Permanence",
        gridDisplay : "normal",
        width : 150,
    },
    date_permanency:{
        type : "string",
        label : "Date permanence",
        gridDisplay : "normal",
        width : 150,
    },
    delivered:{
        type : "boolean",
        label : "Délivrée",
        gridDisplay : "toggle",
        width : 125,
    },
    closed:{
        type : "boolean",
        label : "Clôturée",
        gridDisplay : "toggle",
        width : 125,
    },
    overdue:{
        type : "boolean",
        label : "Prolongation",
        gridDisplay : "toggle",
        width : 150,
    },
}

export {bookingSchema}
