import { createSlice } from '@reduxjs/toolkit'

export enum filtersName {
  ALL = 4,
  WITHOUT = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3
}

export interface CounterState {
  filters: number[]
}

const initialState: CounterState = {
  filters: [
    filtersName.ALL,
    filtersName.TWO,
    filtersName.THREE,
    filtersName.WITHOUT,
    filtersName.ONE
  ]
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filters = action.payload
    }
  }
})

export const { updateFilter } = filterSlice.actions

export default filterSlice.reducer
