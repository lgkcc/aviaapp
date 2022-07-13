import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '../../store/store'
import { filtersName, updateFilter } from '../../store/slices/filterSlice'

import classes from './Aside.module.scss'

const filterList: number[] = [
  filtersName.ALL,
  filtersName.WITHOUT,
  filtersName.ONE,
  filtersName.TWO,
  filtersName.THREE
]
const filterNames: string[] = [
  'Все',
  'Без пересадок',
  'Одна пересадка',
  'Две пересадки',
  'Три пересадки'
]
const Aside: React.FC = () => {
  const dispatch = useAppDispatch()
  const { filters } = useSelector((state: RootState) => state.filter)
  const changeFilters = (filter: number) => {
    if (filters.includes(filter)) {
      filter === filtersName.ALL
        ? dispatch(updateFilter([]))
        : dispatch(
            updateFilter(
              filters.filter(
                (filterElement) =>
                  filterElement !== filter && filterElement !== filtersName.ALL
              )
            )
          )
    } else {
      filter === filtersName.ALL
        ? dispatch(updateFilter([...filterList]))
        : dispatch(updateFilter([...filters, filter]))
    }
  }
  useEffect(() => {
    const activeAll = [
      filtersName.WITHOUT,
      filtersName.ONE,
      filtersName.TWO,
      filtersName.THREE
    ]
    const arrayForSort = [...filters]
    if (
      JSON.stringify(arrayForSort.sort()) === JSON.stringify(activeAll.sort())
    ) {
      dispatch(updateFilter([...filters, filtersName.ALL]))
    }
  }, [filters])
  return (
    <div className={classes.aside}>
      <h2 className={classes.title}>количество пересадок</h2>
      <ul className={classes.list}>
        {filterList.map((filter: number, index) => (
          <li
            key={filter}
            onClick={() => changeFilters(filter)}
            className={classes.filter}
          >
            <input
              className={classes.checkbox}
              type="checkbox"
              checked={filters.includes(filter)}
              onChange={() => changeFilters(filter)}
            />
            <span>{filterNames[index]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Aside
