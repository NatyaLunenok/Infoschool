import React, { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './Diary.module.css'
import DiaryTable from '../../Tables/Diary/Diary';
import FetchWithAuth from '../Authorization/FetchWithAuth';

const Diary = () => {

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>ДНЕВНИК</button>
          <button className={styles.defaultButton}>УСПЕВАЕМОСТЬ</button>
        </div>
      </div>
      <div style={{margin:30}}>
      <DiaryTable/>
      </div>
      <Footer />
    </>
  );
};
export default Diary;