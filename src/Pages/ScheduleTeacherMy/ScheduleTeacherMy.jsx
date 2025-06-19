import React, { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import JournalTable from '../../Tables/Journal/Journal';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './ScheduleTeacherMy.module.css'
import Schedule from '../../Tables/Schedule/Schedule';
import FetchWithAuth from '../Authorization/FetchWithAuth';
import { Link } from 'react-router-dom'; // Import Link


const ScheduleTeacherMy = () => {

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <Link to="/pjt">
          <button className={styles.defaultButton}>ЖУРНАЛ</button>
          </Link>
          <button className={styles.activeButton}>РАСПИСАНИЕ</button>
        </div>
        <div className={styles.ConteinerSelectedQuarter}>
          <button className={styles.SelectedCell}>Моё расписание</button>
          <button className={styles.DefaultCell}>Расписание класса</button>
        </div>
      </div>
      <Schedule/>
      <Footer />
    </>
  );
};
export default ScheduleTeacherMy;