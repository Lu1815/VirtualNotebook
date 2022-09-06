import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7158/' }),
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: (id) => `Note?topicId=${id}`,
        }),
        createNote: builder.mutation({
            query: (body) => {
                return {
                    url: 'Note',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        editNote: builder.mutation({
            query: (body) => {
                return {
                    url: 'Note',
                    method: 'PUT',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        deleteNote: builder.mutation({
            query: (id) => {
                return {
                    url: 'Note',
                    method: 'DELETE',
                    body: id,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
    }),
})

export const { 
    useGetNotesQuery,
    useCreateNoteMutation,
    useEditNoteMutation,
    useDeleteNoteMutation,
} = notesApi