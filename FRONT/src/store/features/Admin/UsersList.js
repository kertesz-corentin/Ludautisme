import { createSlice} from '@reduxjs/toolkit'

const initialState = {
     users:[]
    ,status:null
}

export default createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
    setStatus: (state, action) => {
        //console.log(state,action);
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        console.log('handleFetch',action.payload.status);
        state.status = action.payload.status;
        state.users = (action.payload.data) ? action.payload.data : state.users;
    }
  },
})
