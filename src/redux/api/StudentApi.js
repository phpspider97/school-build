import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/student`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            const schoolID = getState().sessionData.value.school_id
            headers.set('authorization', `Bearer ${token}`)
            headers.set('x-school-id', schoolID)
            return headers
        }  
    }),
    tagTypes : ['student'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['student']
        }),
        addBulk: builder.mutation({
            query : (data) => ({
                url:'/bulk',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['student']
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
            invalidatesTags : ['student']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['student']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['student']
        }),
        particularList: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['student']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }),
            providesTags: ['student'],
        }),
        login: builder.mutation({
            query : (data) => ({
                url:'login',
                method: 'POST',
                body:data
            }),
            invalidatesTags : ['student']
        }),
        addAttendance: builder.mutation({
            query: (data) => ({
                url:'/attendance',
                method: 'POST',
                body:data
            }),  
        }),
        particularAttendance: builder.mutation({
            query: (data) => ({
                url:'/get-attendance',
                method: 'POST',
                body:data
            }),  
        }),
        addExamAttendance: builder.mutation({
            query: (data) => ({
                url:'/exam-attendance',
                method: 'POST',
                body:data
            }),  
        }),
        particularExamAttendance: builder.mutation({
            query: (data) => ({
                url:'/get-exam-attendance',
                method: 'POST',
                body:data
            }),  
        }),
        addExamMark: builder.mutation({
            query: (data) => ({
                url:'/exam-mark',
                method: 'POST',
                body:data
            }),  
        }),
        particularExamMark: builder.mutation({
            query: (data) => ({
                url:'/get-exam-mark',
                method: 'POST',
                body:data
            }),  
        }),
    }),
})
  
export const { useAddMutation, useAddBulkMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularListQuery, useLazyListQuery, useLoginMutation, useParticularAttendanceMutation, useAddAttendanceMutation, useParticularExamAttendanceMutation, useAddExamAttendanceMutation, useParticularExamMarkMutation, useAddExamMarkMutation } = studentApi