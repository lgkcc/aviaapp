import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface ItemSliceState {
  searchId: string
}

const initialState: ItemSliceState = {
  searchId: ''
}

export const fetchGetSearchId = createAsyncThunk(
  'fetchId/fetchGetSearchId',
  async () => {
    const { data } = await axios.get(
      'https://aviasales-test-api.kata.academy/search'
    )
    return data as { searchId: string }
  }
)

const searchIdSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetSearchId.fulfilled, (state, action) => {
      state.searchId = action.payload.searchId
    })
  }
})

export default searchIdSlice.reducer
