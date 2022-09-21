import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:false
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setContent : (state,action) => {
        return {...state,content: action.payload}    
    },
    setOpen : (state,action) => {
        return {...state,open:true}
    },
    setClose : (state,action) => {
        return {...state,open:false}
    }
  },
})
