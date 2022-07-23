import React from 'react'
import { format } from 'date-fns'

import { SegmentsType } from '../../store/slices/ticketsSlice'

import classes from './Card.module.scss'

interface ICardProps {
  price: number
  segments: SegmentsType[]
  carrier: string
}

const Card: React.FC<ICardProps> = ({ price, segments, carrier }) => {
  function getTimeFromMin(min: number) {
    const hours = Math.trunc(min / 60)
    const minutes = min % 60
    return `${hours}ч ${minutes}м`
  }
  function formatDate(date: string) {
    return format(new Date(date), 'MMM dd yyyy')
  }
  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <span>{price} Р</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </header>
      <div className={classes.info}>
        {segments.map((param, index: number) => (
          <React.Fragment key={index}>
            <div className={classes.point}>
              <span>
                {param.origin} - {param.destination}
              </span>
              <span>{formatDate(param.date)}</span>
            </div>
            <div className={classes.point}>
              <span>В пути</span>
              <span>{getTimeFromMin(param.duration)}</span>
            </div>
            <div className={classes.point}>
              <span>Пересадки</span>
              <span>
                {param.stops.join(', ')}
                {param.stops.length === 0 && 'Без пересадок'}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Card
