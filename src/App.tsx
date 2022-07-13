import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Main from './pages/TicketList/TicketList'
import Header from './components/Header/Header'
import {
  fetchBySearchId,
  firstUpdateRangeTickets,
  setSortAndFilters
} from './store/slices/ticketsSlice'
import { RootState, useAppDispatch } from './store/store'
import { fetchGetSearchId } from './store/slices/searchIdSlice'

const App: React.FC = () => {
  const { sortIndex } = useSelector((state: RootState) => state.sort)
  const { filters } = useSelector((state: RootState) => state.filter)
  const dispatch = useAppDispatch()
  const { items, stop, serverError, isLoading } = useSelector(
    (state: RootState) => state.ticket
  )
  const id = useSelector((state: RootState) => state.id.searchId)
  useEffect(() => {
    const asyncDispatch = async () => {
      if (id) {
        await dispatch(fetchBySearchId(id))
      } else {
        await dispatch(fetchGetSearchId())
      }
    }
    if (!stop) {
      asyncDispatch().then()
    }
  }, [items, serverError, id, stop])

  useEffect(() => {
    dispatch(setSortAndFilters({ sortIndex, filters }))
  }, [items, sortIndex, filters])

  useEffect(() => {
    dispatch(firstUpdateRangeTickets())
  }, [isLoading, filters, sortIndex])
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  )
}

export default App
