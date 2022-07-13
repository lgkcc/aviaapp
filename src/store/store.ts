import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import sortReducer from './slices/sortSlice'
import filterReducer from './slices/filterSlice'
import ticketReducer from './slices/ticketsSlice'
import searchIdReducer from './slices/searchIdSlice'

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    filter: filterReducer,
    ticket: ticketReducer,
    id: searchIdReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
