import React from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '../../store/store'
import { updateSort } from '../../store/slices/sortSlice'

import classes from './Filters.module.scss'

interface FiltersProps {
  filtersName: string[]
}
const Filters: React.FC<FiltersProps> = ({ filtersName }) => {
  const dispatch = useAppDispatch()
  const changeFilter = (index: number) => {
    dispatch(updateSort(index))
  }
  const activeFilter = useSelector((state: RootState) => state.sort.sortIndex)
  return (
    <div>
      {filtersName.map((filter: string, index: number) => (
        <button
          key={filter}
          className={
            activeFilter === index
              ? `${classes.btn} ${classes.active}`
              : classes.btn
          }
          onClick={() => changeFilter(index)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default Filters
