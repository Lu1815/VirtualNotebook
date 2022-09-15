import { configureStore } from '@reduxjs/toolkit'
import { topicsApi } from '../services/topicsApi'
import { notesApi } from '../services/notesApi'

export const store = configureStore({
  reducer: {
    [topicsApi.reducerPath]: topicsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(topicsApi.middleware),
})