const categorySchema  = {
    id:{
        type: "number",
        label: "Modifier categorie",
        gridDisplay: "edit",
        width: 200
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
    }
}

export {categorySchema}
