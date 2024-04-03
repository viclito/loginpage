import React from 'react'
import styles from '../mainpage/main.module.scss'
import Image from 'next/image'
import logo from '../../public/logoenfo.png'


const Navbar = ({switchToTaskPage, switchToProjectPage}) => {
  return (
    <div className={styles.navbar}>
        <div className={styles.inner}>
            <Image src={logo} alt=''/>
            <h4 onClick={switchToProjectPage}>Project</h4>
            <h4 onClick={switchToTaskPage}>Task</h4>
        </div>
        
    </div>
  )
}

export default Navbar