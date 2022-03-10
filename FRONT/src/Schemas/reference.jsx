const referenceSchema  = {
    id:{
        type: "number",
        label: "Modifier référence",
        gridDisplay: "edit",
        width: 125
    },
    name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 250,
    },
    description:{
        type : "string",
        label : "Description",
        gridDisplay : "normal",
        width : 400,
    },
    valorisation:{
        type : "number",
        label : "Valorisation",
        gridDisplay : "normal",
        width : 150,
    },
    maincategory:{
        type : "number",
        label : "Catégorie",
        gridDisplay : "normal",
        width : 150,
    },
    tag:[{
        type : "string",
        label : "tag",
        gridDisplay : "normal",
        width : 150,
    }],
}

export {referenceSchema}
