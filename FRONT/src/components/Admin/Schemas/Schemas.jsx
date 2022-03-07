export default function schemas() {
    return {
    user: {
        member_number:"number",
        email:"string",
        first_name:"string",
        last_name:"string",
        phone:"string",
        adress_number:"number",
        adress_street:"string",
        adress_zipcode:"number",
        adress_city:"string",
        cotisation_status:"boolean",
        cotisation_expiration:"string",
        caution_status:"boolean",
        caution_expiration:"string",
        id_role:"number",
        archived:"boolean",
    }
    }
};
