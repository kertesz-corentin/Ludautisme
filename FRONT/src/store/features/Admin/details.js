import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:null
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails: (state, action) => {
     console.log(state,action);
      state.content = action.payload; // mutate the state all you want with immer
    },
    openDetails: (state,action) => {
        console.log('openDetail');
        state = {...state,open:true};
    },
    resetDetails: (state,action) => {
        console.log('closeDetail');
        state = {...state,open:false};
    },
  },
})
