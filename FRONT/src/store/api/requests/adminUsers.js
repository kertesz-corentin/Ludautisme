//Liste des requetes api
export const adminUsers = {
    // getUser:'',
    getUsers: { query:() => '/users' },
    addUser:{type:'POST',query:'/users/'},  //useAddUserMutation
    updateUser:{type:'PUT',query:'/users/'}, //useUpdateUserMutation
    // deleteOne:'',
}
