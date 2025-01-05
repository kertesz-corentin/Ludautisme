const historySchema  = {
    id: {
        type: "number",
        label: "Id",
        gridDisplay: "normal",
        width: 200
    },
    member_number: {
        type: "number",
        label: "Numéros d'adhérent",
        gridDisplay: "simple",
        width: 200
    },
    first_name: {
        type: "string",
        label: "Prénom",
        gridDisplay: "simple",
        width: 200
    },
    last_name: {
        type: "string",
        label: "Nom",
        gridDisplay: "simple",
        width: 200
    },
    perm_date: {
        type: "string",
        lable: "Date d'emprunt",
        gridDisplay: "date",
        width: 200
    }
}
export {historySchema}
