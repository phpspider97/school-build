import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const schoolApi = createApi({
    reducerPath: 'schoolApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/admin/school`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            headers.set('authorization', `Bearer ${token}`) 
            return headers
        } 
    }),
    tagTypes : ['school'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['school']
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
            invalidatesTags : ['school']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['school']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['school']
        }),
        particular: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['school']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }),
            providesTags: ['school'],
        })
    }),
}) 
export const {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useParticularQuery, useLazyListQuery} = schoolApi