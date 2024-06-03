import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/teacher`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            const schoolID = getState().sessionData.value.school_id
            headers.set('authorization', `Bearer ${token}`)
            headers.set('x-school-id', schoolID)
            return headers
        }  
    }),
    tagTypes : ['teacher','teacherPermission'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['teacher']
        }),
        addBulk: builder.mutation({
            query : (data) => ({
                url:'/bulk',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['teacher']
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
            invalidatesTags : ['teacher']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['teacher']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['teacher']
        }),
        particularList: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['teacher']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }),
            providesTags: ['teacher'],
        }),
        login: builder.mutation({
            query : (data) => ({
                url:'login',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['teacher']
        }),
        addPermission: builder.mutation({
            query: (data) => ({
                url:'/permission',
                method: 'POST',
                body:data
            }), 
            providesTags : ['teacherPermission']
        }),
        particularPermission: builder.mutation({
            query: (data) => ({
                url:'/get-permission',
                method: 'POST',
                body:data
            }), 
            invalidatesTags: ['teacherPermission']
        }),
    }),
}) 
 
export const { useAddMutation, useAddBulkMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularListQuery, useLazyListQuery, useLoginMutation, useParticularPermissionMutation, useAddPermissionMutation } = teacherApi