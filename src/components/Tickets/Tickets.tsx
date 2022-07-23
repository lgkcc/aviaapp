import React from 'react'
import { useSelector } from 'react-redux'

import Card from '../Card/Card'
import { RootState } from '../../store/store'
import { Status, TicketItems } from '../../store/slices/ticketsSlice'
import Skeleton from '../Card/Skeleton/Skeleton'

const Tickets: React.FC = () => {
  const { rangeTickets, isLoading, sortAndFiltersTickets } = useSelector(
    (state: RootState) => state.ticket
  )
  const { filters } = useSelector((state: RootState) => state.filter)
  if (filters.length === 0) {
    return <h2>Билетов под такие фильтры не найдено</h2>
  }
  return (
    <div>
      {isLoading === Status.LOADING &&
        [...new Array(5)].map((_, i) => <Skeleton key={i} />)}
      {sortAndFiltersTickets
        .slice(0, rangeTickets)
        .map((ticket: TicketItems) => (
          <Card
            key={ticket.segments[0].date + ticket.segments[1].date}
            {...ticket}
          />
        ))}
    </div>
  )
}

export default Tickets
