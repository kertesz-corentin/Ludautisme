const extendSchema  = {
    id:{
        type: "number",
        label: "Details",
        gridDisplay: "edit",
        width: 100,
    },
    articles: {
        type: "string",
        label: "Articles",
        gridDisplay: "articles",
        width: 200,
    },
    user: {
        type: "string",
        label: "Membre",
        gridDisplay: "user",
        width: 200,
    }
}
export {extendSchema}
