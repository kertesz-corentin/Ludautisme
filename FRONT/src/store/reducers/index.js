import { importReducer } from './import';
import { importOkReducer } from './importOk';
import { dynamicContentReducer } from './dynamicContent';
import adminUsersReducer  from './adminUsers';
import users from '../features/Admin/Users/UsersList';

export default {
    importReducer,
    importOkReducer,
    dynamicContentReducer,
    adminUsersReducer,
    users : users.reducer,
};
