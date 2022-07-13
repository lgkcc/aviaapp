import React from 'react'
import { useSelector } from 'react-redux'

import Aside from '../../components/Aside/Aside'
import Filters from '../../components/Filters/Filters'
import Tickets from '../../components/tickets/Tickets'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store'

import classes from './Main.module.scss'

const TicketList: React.FC = () => {
  const filtersName: string[] = ['самый дешевый', 'самый быстый', 'оптимальный']
  const { filters } = useSelector((state: RootState) => state.filter)
  return (
    <main className={classes.main}>
      <Aside />
      <div className={classes.content}>
        <Filters filtersName={filtersName} />
        <Tickets />
        {!(filters.length === 0) && <Button />}
      </div>
    </main>
  )
}

export default TicketList
