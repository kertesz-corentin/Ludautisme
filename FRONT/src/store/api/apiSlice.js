// Comments and code from https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { initEndpoints } from './requests/index';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/api'
  baseQuery: fetchBaseQuery({
     baseUrl: 'http://localhost:3001/api/admin' ,
     prepareHeaders: (headers, { getState }) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
             headers.set('x-access-token', user.token);
        }
        return headers
    }
}),
  // The "endpoints" represent operations and requests for this server
 // endpoints : (builder)=>({monHook:builder.query(query:()=>'/url')});
  endpoints: (builder) => (initEndpoints(builder))
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetUsersQuery } = apiSlice
