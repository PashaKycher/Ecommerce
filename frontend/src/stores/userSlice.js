import { createSlice } from '@reduxjs/toolkit'

// defoult state
const initialState = {
    user: null
}
// create slice
export const userSlice = createSlice({
    // name of slice (need in store)
    name: 'user',
    initialState,
    // reducers (functions wot we can use to work whith state)
    // state -  it is initialState  
    // action.payload -  came from page or component when we call this function
    reducers: {
        // get user details to store
        setUserDetails: (state, action) => {
            // set user to store
            state.user = action.payload
        },
    },
})

// export reducer function to the pages and components
export const { setUserDetails } = userSlice.actions
// export slice
export default userSlice.reducer