const commentSchema  = {
    number: {
        type: "string",
        label: "N° article",
        gridDisplay: "normal",
        width: 100
    },
    id:{
        type: "number",
        label: "Editer",
        gridDisplay: "edit",
        width: 100,
        inputDisplay : 'none'
    },
    id_article:{
        type: "number",
        label: "ID article",
        gridDisplay: "normal",
        width: 100,
        inputDisplay : 'none'
    },
    id_user:{
        type: "number",
        label: "Auteur",
        gridDisplay: "normal",
        width: 100,
        inputDisplay : 'none'
    },
    first_name:{
        type: "string",
        label: "Prénom",
        gridDisplay: "normal",
        width: 100,
        inputDisplay : 'none'
    },
    last_name:{
        type: "string",
        label: "Nom",
        gridDisplay: "normal",
        width: 100,
        inputDisplay : 'none'
    },
    email: {
        type: "string",
        label: "Email",
        gridDisplay: "normal",
        width: 200,
    },
    comment:{
        type: "string",
        label: "Commentaire",
        gridDisplay: "normal",
        width: 500,
    },
    created_at:{
        type: "strring",
        label: "Date",
        gridDisplay: "date",
        width: 150,
    },
    validated:{
        type: "boolean",
        label: "Validation",
        gridDisplay: "validate",
        width: 100,
    },
    delete:{
        type: "number",
        label: "Suppression",
        gridDisplay: "delete",
        width: 100
    },
    name: {
        type: "string",
        label: "Nom référence",
        gridDisplay: "normal",
        width: 100
    },
}

export {commentSchema}
