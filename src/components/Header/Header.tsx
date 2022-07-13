import React from 'react'

import logo from '../../assets/Logo@2x.png'

import classes from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="LOGO" width={80} height={80} />
    </header>
  )
}

export default Header
