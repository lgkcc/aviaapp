import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  sortIndex: number
}

const initialState: CounterState = {
  sortIndex: 2
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sortIndex = action.payload
    }
  }
})

export const { updateSort } = sortSlice.actions

export default sortSlice.reducer
