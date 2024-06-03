import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/admin`, 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().sessionData.value.token
            const schoolID = getState().sessionData.value.school_id
            headers.set('authorization', `Bearer ${token}`)
            headers.set('x-school-id', schoolID)
            return headers
        } 
    }),
    tagTypes : ['admin'],
    endpoints: (builder) => ({
        add: builder.mutation({
            query : (data) => ({
                url:'/',
                method: 'POST',
                body:data
            }), 
            invalidatesTags : ['admin'] 
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
            invalidatesTags : ['admin']
        }),
        delete: builder.mutation({
            query : (id) => ({
                url:`/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['admin']
        }),
        deleteBulk: builder.mutation({
            query : (data) => ({
                url:`/delete-bulk`,
                method: 'DELETE',
                body:data
            }),
            invalidatesTags : ['admin']
        }),
        particular: builder.query({
            query: (id='') => ({
                url:`/${id}`,
                method: 'GET'
            }), 
            invalidatesTags : ['admin']
        }),
        tokenBaseGet: builder.query({
            query: () => ({
                url:`/token`,
                method: 'GET'
            }), 
            providesTags : ['admin']
        }),
        tokenBaseEdit: builder.mutation({
            query : (data) => {  
                return { 
                    url:`/token`,
                    method: 'PUT',
                    body:data
                }
            },
            invalidatesTags : ['admin']
        }),
        list: builder.query({
            query: (name) => ({
                url:'/',
                method: 'GET'
            }), 
            providesTags: ['admin']
        }),
        schoolList: builder.query({
            query: (schoolID) => ({
                url:`/school-wise/${schoolID}`,
                method: 'GET'
            }),
            providesTags: ['admin']
        }),
        Login: builder.mutation({
            query : (data) => ({
                url:'login',
                method: 'POST',
                body:data
            })
        }),
    }),
})
 
export const { useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery, useLoginMutation, useTokenBaseGetQuery, useTokenBaseEditMutation, useLazySchoolListQuery } = adminApi