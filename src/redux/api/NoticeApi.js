import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const noticeApi = createApi({
    reducerPath: 'noticeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/admin/notice`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            const schoolID = getState().sessionData.value.school_id
            headers.set('authorization', `Bearer ${token}`)
            headers.set('x-school-id', schoolID)
            return headers
        }  
    }),
    tagTypes : ['notice'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['notice']
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
            invalidatesTags : ['notice']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['notice']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['notice']
        }),
        particular: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['notice']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }),
            providesTags: ['notice'],
        }),
    }),
})
 
export const { useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useParticularQuery, useLazyListQuery } = noticeApi