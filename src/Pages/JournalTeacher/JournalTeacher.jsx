// import React, { useState } from 'react';
// import Footer from '../../Layout/Footer/Footer'
// import JournalTable from '../../Tables/Journal/Journal'
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
// import SecondLine from '../../Layout/Header/SecondLine/SecondLine'
// import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers'
// import SelectedQuarter from '../../Layout/Header/SelectedQuarter/SelectedQuarter'
// import styles from './JournalTeacher.module.css'
// import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine'

// const JournalTeacher = () => {
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);

//   const handleSubjectChange = (subject) => {
//     setSelectedSubject(subject);
//   };

//   const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//   };

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine />
//         <div className={styles.ConteinerSecondLine}>
//           <button className={styles.activeButton}>ЖУРНАЛ</button>
//           <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//         </div>
//         <SelectedLine
//           onSubjectChange={handleSubjectChange}
//           onClassChange={handleClassChange}
//           selectedSubject={selectedSubject}
//           selectedClass={selectedClass}
//         />
//     <div className={styles.ConteinerSelectedQuarter}>
//         <button className={styles.SelectedCell}>1 четверть</button>
//         <button className={styles.DefaultCell}>2 четверть</button>
//         <button className={styles.DefaultCell}>3 четверть</button>
//         <button className={styles.DefaultCell}>4 четверть</button>
//     </div>
//       </div>
//       {selectedSubject && selectedClass && (
//         <JournalTable 
//           class={selectedClass} 
//           subject={selectedSubject}
//           quarter={1}
//         />
//       )}
//       <Footer />
//     </>
//   );
// };
// export default JournalTeacher;



// JournalTeacher.js
import React, { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import JournalTable from '../../Tables/Journal/Journal';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import SecondLine from '../../Layout/Header/SecondLine/SecondLine';
import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers';
import SelectedQuarter from '../../Layout/Header/SelectedQuarter/SelectedQuarter';
import styles from './JournalTeacher.module.css';
import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine';
import FetchWithAuth from '../Authorization/FetchWithAuth';

const JournalTeacher = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [dates, setDates] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedClass || !selectedSubject) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Загружаем даты уроков
        const lessonsData = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/lessons/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=1`
        );
        
        if (!lessonsData) {
          throw new Error('Не удалось получить даты уроков');
        }
        
        // Форматируем даты в нужный формат
        const formattedDates = lessonsData.map(lesson => 
          new Date(lesson.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).replace(/\./g, '.')
        );
        
        setDates(formattedDates);
        
        // Загружаем данные об учениках и оценках
        const journalData = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/journal/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=1`
        );
        
        if (!journalData) {
          throw new Error('Не удалось получить данные журнала');
        }
        
        setStudents(journalData);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке данных');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedClass, selectedSubject]);

  if (loading) {
    return <div>Загрузка данных журнала...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

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
          dates={dates}
          students={students}
        />
      )}
      <Footer />
    </>
  );
};

export default JournalTeacher;