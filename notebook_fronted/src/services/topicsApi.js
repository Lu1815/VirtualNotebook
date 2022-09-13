import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const topicsApi = createApi({
    reducerPath: 'topicsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
    endpoints: (builder) => ({
        getTopics: builder.query({
            query: () => `Topic`,
        }),
        createTopic: builder.mutation({
            query: (body) => {
                return {
                    url: 'Topic',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        deleteTopic: builder.mutation({
            query: (id) => {
                return {
                    url: 'Topic',
                    method: 'DELETE',
                    body: id,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseHandler: (response) => response.text(),
                }
            }
        }),
    }),
})

export const { 
    useGetTopicsQuery,
    useCreateTopicMutation,
    useDeleteTopicMutation,
} = topicsApi