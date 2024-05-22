import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        login_role : sessionStorage.getItem('login_role'),
        user_name : sessionStorage.getItem('user_name'),
        token : sessionStorage.getItem('token'),
        user_image : sessionStorage.getItem('user_image'),
        school_id : sessionStorage.getItem('school_id'),
    }
}

export const storeData = createSlice({
    name: 'sessionData',
    initialState,
    reducers: {
        totalNotification: (state,action) => { 
            state.value = ''
        },
    },
})
 
export const { totalNotification } = storeData.actions
export default storeData.reducer