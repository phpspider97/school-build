import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const superAdminApi = createApi({
    reducerPath: 'superAdminApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/admin/super` 
    }), 
    tagTypes : ['superAdmin'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query : (data) => ({
                url:'login',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['superAdmin']
        }),
    }),
})
 
export const {useLoginMutation} = superAdminApi