import React from 'react'

import { useAppDispatch } from '../../store/store'
import { updateRangeTickets } from '../../store/slices/ticketsSlice'

import classes from './Button.module.scss'

const Button: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      className={classes.btn}
      onClick={() => dispatch(updateRangeTickets())}
    >
      Показать еще 5 билетов!
    </button>
  )
}

export default Button
