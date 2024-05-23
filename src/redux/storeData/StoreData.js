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
        setCredential: (state,action) => {  
            state.value = {
                    login_role : action.payload.login_role,
                    user_name : action.payload.super_admin_name,
                    token : action.payload.token,
                    user_image : action.payload.data_image,
                    school_id : action.payload?.school_id
                }
        },
    },
})
 
export const { totalNotification, setCredential } = storeData.actions
export default storeData.reducer