const referenceSchema  = {
    name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 75,
    },
    description:{
        type : "string",
        label : "Description",
        gridDisplay : "normal",
        width : 75,
    },
    valorisation:{
        type : "number",
        label : "Valorisation",
        gridDisplay : "normal",
        width : 75,
    },
    mainCategory:{
        type : "string",
        label : "Catégorie",
        gridDisplay : "normal",
        width : 75,
    },
    tag:[{
        type : "string",
        label : "tag",
        gridDisplay : "normal",
        width : 75,
    }],
}

export {referenceSchema}
