import React, {useState, useRef, useEffect} from "react";
import styles from './Authorization.module.css';
import logo from '../../images/logo.png';

const Authorization = () => {
  return (
    <div className={styles.loginModal}>
        <div className={styles.logo}>
            <img src={logo} alt="" />
        </div>
      <div className={styles.modalContent}>
        <span className={styles.closeButton}>&times;</span>
        <h2>Авторизация</h2>
        <div className={styles.inputGroup}>
          <label htmlFor={styles.username}>Логин</label>
          <input type="text" id="username" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={styles.password}>Пароль</label>
          <input type="password" id="password" />
        </div>
        <button className={styles.loginButton}>Войти</button>
      </div>
    </div>
  );
};

export default Authorization;