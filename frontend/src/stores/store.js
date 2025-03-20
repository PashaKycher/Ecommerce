import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './userSlice'
// create store
export const store = configureStore({
  reducer: {
    //name of slice (from userSlice) and reducer with export defoult
    user: useReducer 
  },
})