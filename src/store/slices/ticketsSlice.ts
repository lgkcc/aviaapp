import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

export type SegmentsType = {
  origin: string
  destination: string
  date: string
  duration: number
  stops: string[]
}

export type TicketItems = {
  price: number
  carrier: string
  segments: SegmentsType[]
}

type LoadTickets = {
  stop: boolean
  tickets: TicketItems[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success'
}

interface ItemSliceState {
  items: TicketItems[]
  stop: boolean
  isLoading: Status
  sortAndFiltersTickets: TicketItems[]
  rangeTickets: number
  serverError: number
}

const initialState: ItemSliceState = {
  items: [],
  stop: false,
  isLoading: Status.LOADING,
  sortAndFiltersTickets: [],
  rangeTickets: 5,
  serverError: 0
}

export const fetchBySearchId = createAsyncThunk(
  'searchId/fetchSearchId',
  async (id: string) => {
    const { data } = await axios.get(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
    )
    return data as LoadTickets
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSortAndFilters(state, action) {
      let sortTickets: any = []
      if (action.payload.filters.length === 5) {
        sortTickets = []
      } else if (action.payload.filters.length > 0) {
        const filtersArr: TicketItems[] = []
        let count: number = 0
        const filteredTickets = () => {
          if (action.payload.filters.length > count) {
            const arrForFilter = current(state.items).slice()
            filtersArr.push(
              ...arrForFilter.filter(
                (ticket: TicketItems) =>
                  ticket.segments[0].stops.length +
                    ticket.segments[1].stops.length ===
                  action.payload.filters[count]
              )
            )
            count++
            filteredTickets()
          } else {
            return
          }
        }
        filteredTickets()
        sortTickets = filtersArr
      }
      if (action.payload.sortIndex === 0) {
        const arrForSort: TicketItems[] =
          sortTickets.length > 0
            ? sortTickets.slice()
            : current(state.items).slice()
        state.sortAndFiltersTickets = arrForSort.sort(
          (prev, next) => prev.price - next.price
        )
      } else if (action.payload.sortIndex === 1) {
        const arrForSort: TicketItems[] =
          sortTickets.length > 0
            ? sortTickets.slice()
            : current(state.items).slice()
        state.sortAndFiltersTickets = arrForSort.sort(
          (prev, next) => prev.segments[0].duration - next.segments[0].duration
        )
      } else if (action.payload.sortIndex === 2) {
        sortTickets.length > 0
          ? (state.sortAndFiltersTickets = sortTickets.slice())
          : (state.sortAndFiltersTickets = current(state.items).slice())
      }
    },
    updateRangeTickets(state) {
      state.rangeTickets += 5
    },
    firstUpdateRangeTickets(state) {
      state.rangeTickets = 5
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBySearchId.fulfilled, (state, action) => {
      state.isLoading = Status.SUCCESS
      const data = action.payload
      state.items = [...state.items, ...data.tickets]
      state.stop = data.stop
    })
    builder.addCase(fetchBySearchId.rejected, (state) => {
      state.serverError += 1
    })
  }
})

export default ticketsSlice.reducer
export const {
  setSortAndFilters,
  updateRangeTickets,
  firstUpdateRangeTickets
} = ticketsSlice.actions
