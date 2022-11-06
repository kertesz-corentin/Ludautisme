import details from './features/Admin/details';
import users from './features/Admin/UsersList';

const reducer = {
    details: details.reducer,
    users : users.reducer,
}

const actions = {
    details: details.actions,
    users : users.actions,
}

export {reducer, actions};
