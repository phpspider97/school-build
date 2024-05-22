import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const routineApi = createApi({
    reducerPath: 'routineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/admin/routine`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            const schoolID = getState().sessionData.value.school_id
            headers.set('authorization', `Bearer ${token}`)
            headers.set('x-school-id', schoolID)
            return headers
        }  
    }),
    tagTypes : ['routine'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['routine']
        }),
        edit: builder.mutation({
            query : (parameterData) => { 
                const {dataID,...data} = parameterData
                return { 
                    url:`/${dataID}`,
                    method: 'PUT',
                    body:data
                }
            },
            invalidatesTags : ['routine']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['routine']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['routine']
        }),
        particular: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['routine']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }),
            providesTags: ['routine'],
        }),
    }),
})
 
export const { useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery } = routineApi