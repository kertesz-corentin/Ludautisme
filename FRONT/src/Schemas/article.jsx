const articleSchema  = {
    id: {
        type: "number",
        label: "Id",
        gridDisplay: "normal",
        width: 125
    },
    id_article:{
        type: "number",
        label: "Id article",
        gridDisplay: "normal",
        width: 125
    },
    number:{
        type : "number",
        label : "n° Article",
        gridDisplay : "normal",
        width : 150,
    },
    name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 250,
    },
    origin:{
        type : "string",
        label : "Origine",
        gridDisplay : "normal",
        width : 400,
    },
    description:{
        type : "string",
        label : "Description",
        gridDisplay : "normal",
        width : 400,
    },
    main_category:{
        type : "string",
        label : "Catégorie principale",
        gridDisplay : "normal",
        width : 400,
    },
    valorisation:{
        type : "number",
        label : "Valorisation",
        gridDisplay : "normal",
        width : 150,
    },
    date_buy:{
        type : "string",
        label : "Date d'achat",
        gridDisplay : "normal",
        width : 150,
    },
    available:{
        type : "boolean",
        label : "Disponible",
        gridDisplay : "toggle",
        width : 150,
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 150,
    },
    delivered:{
        type : "boolean",
        label : "Délivré",
        gridDisplay : "toggle",
        width : 150,
    },
    closed:{
        type : "boolean",
        label : "Clôturé",
        gridDisplay : "toggle",
        width : 150,
    },
    created_at:{
        type : "string",
        label : "Date d'enregistrement",
        gridDisplay : "normal",
        width : 150,
    },
    nb_prolongation:{
        type: "number",
        label: "Nombre de prolongation",
        gridDisplay: "normal",
        width: 125
    },
    id_booking:{
        type: "number",
        label: "Id booking",
        gridDisplay: "normal",
        width: 125
    },
    id_permanency:{
        type: "number",
        label: "Id permanence",
        gridDisplay: "normal",
        width: 125
    },
    id_ref:{
        type: "number",
        label: "Id ref",
        gridDisplay: "normal",
        width: 125
    },
    id_user:{
        type: "number",
        label: "Id Adhérent",
        gridDisplay: "normal",
        width: 125
    },
}

export {articleSchema}
