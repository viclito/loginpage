"use client"
import React, {useState} from 'react'
import styles from './login.module.scss'
import Image from 'next/image';
import logo from '../../public/logoenfo.png'
import loginimg from '../../public/loginimg1.png'
import MainPage from '../mainpage/MainPage';

const LoginPage = () => {
 
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const users = [
        {username:'berglin' , password:'berglin'},
        {username:'sayanth' , password:'sayath'},
        {username:'admin' , password:'admin'},
        {username:'vinoth' , password:'vinoth'}
    ]

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault()
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {!loggedIn ? (
        <div className={styles.login}>
          <div className={styles.inner}>
            <div className={styles.left}>
              <form onSubmit={handleLogin}>
                <Image src={logo} alt=''/>
                <h1>Sign In</h1>
                <h5>Login to Stay Connected</h5>
                <div className={styles.inputs}>
                  <label htmlFor="">UserName</label>
                  <div className={styles.input}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="">PassWord</label>
                  <div className={styles.input}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
            <div className={styles.right}>
              <Image src={loginimg} alt=''/>
            </div>
          </div>
          
        </div>
      ) : (
        <MainPage username={username} handleLogout={handleLogout}/>
      )}
    </div>
  );
};

  

export default LoginPage