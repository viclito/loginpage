import React, { useState } from 'react'
import styles from './main.module.scss'
import Navbar from '../navbar/Navbar'
import Task from '../task/Task'
import Project from '../project/Project'

const MainPage = ({username,handleLogout}) => {
    const [show , setShow] = useState(false)
    const [page , setPage] = useState('task')
    const switchToTaskPage = () => {
        setPage('task');
    };

    const switchToProjectPage = () => {
        setPage('project');
    };
  return (
    <>
        <div className={styles.main}>
            <div className={styles.inner}>
                <h4>{username}</h4>
                <div className={styles.profile} onClick={() => setShow(!show)} ></div>
                    <div className={`${!show ? `${styles.logout} ${styles.hide}` : styles.logout}`}>
                        <p onClick={handleLogout}>Logout</p>
                    </div>
            </div>
        </div>
        <Navbar switchToTaskPage={switchToTaskPage} switchToProjectPage={switchToProjectPage}/>
        {page === 'task' ? <Task /> : null}
        {page === 'project' ? <Project/> : null}


    </>
  )
}

export default MainPage