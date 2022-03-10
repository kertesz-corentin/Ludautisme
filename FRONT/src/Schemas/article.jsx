const articleSchema  = {
    id:{
        type: "number",
        label: "Id",
        gridDisplay: "normal",
        width: 125
    },
    number:{
        type : "number",
        label : "n° Article",
        gridDisplay : "normal",
        width : 250,
    },
    origin:{
        type : "string",
        label : "Origine",
        gridDisplay : "normal",
        width : 400,
    },
    date_buy:{
        type : "string",
        label : "Date d'achat",
        gridDisplay : "normal",
        width : 150,
    },
    available:{
        type : "boolean",
        label : "Disponibilité",
        gridDisplay : "toggle",
        width : 150,
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 150,
    },
    created_at:{
        type : "string",
        label : "Date d'enregistrement",
        gridDisplay : "normal",
        width : 150,
    },
    id_ref:{
        type : "number",
        label : "id de la référence",
        gridDisplay : "normal",
        width : 150,
    },
}

export {articleSchema}
