import React, { useState, useEffect, useCallback } from 'react'; // <-- Добавлен useCallback
import styles from './FirstLine.module.css';
import logo from '../../../images/logo.png';

const FirstLine = () => {
    return(
    <div className={styles.ConteinerFirstLine}>
        <div className={styles.logo}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.textbox}>
            <p className={styles.NameUser}>Учитель</p>
            <button className={styles.ButtonExit}>ВЫХОД</button>
        </div>
    </div>
    );
};
export default FirstLine;