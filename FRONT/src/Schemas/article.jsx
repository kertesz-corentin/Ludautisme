const articleSchema  = {
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
    created_at:{
        type : "string",
        label : "Date d'enregistrement",
        gridDisplay : "normal",
        width : 150,
    },
    id_booking:{
        type: "number",
        label: "Id booking",
        gridDisplay: "normal",
        width: 125
    },
    id_ref:{
        type: "number",
        label: "Id ref",
        gridDisplay: "normal",
        width: 125
    },
}

export {articleSchema}
