import React, { useState } from 'react';
import Footer from '../../Layout/Footer/Footer'
import JournalTable from '../../Tables/Journal/Journal'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import SecondLine from '../../Layout/Header/SecondLine/SecondLine'
import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers'
import SelectedQuarter from '../../Layout/Header/SelectedQuarter/SelectedQuarter'
import styles from './JournalTeacher.module.css'
import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine'

const JournalTeacher = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>ЖУРНАЛ</button>
          <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
        </div>
        <SelectedLine
          onSubjectChange={handleSubjectChange}
          onClassChange={handleClassChange}
          selectedSubject={selectedSubject}
          selectedClass={selectedClass}
        />
    <div className={styles.ConteinerSelectedQuarter}>
        <button className={styles.SelectedCell}>1 четверть</button>
        <button className={styles.DefaultCell}>2 четверть</button>
        <button className={styles.DefaultCell}>3 четверть</button>
        <button className={styles.DefaultCell}>4 четверть</button>
    </div>
      </div>
      {selectedSubject && selectedClass && (
        <JournalTable 
          class={selectedClass} 
          subject={selectedSubject}
          quarter={1}
            // Передаем id предмета
        />
      )}
      <Footer />
    </>
  );
};
export default JournalTeacher;
