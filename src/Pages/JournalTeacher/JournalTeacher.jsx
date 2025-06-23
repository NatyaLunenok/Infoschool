// import React, { useState, useEffect } from 'react';
// import Footer from '../../Layout/Footer/Footer';
// import JournalTable from '../../Tables/Journal/Journal';
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
// import styles from './JournalTeacher.module.css';
// import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine';
// import FetchWithAuth from '../Authorization/FetchWithAuth';
// import { Link } from 'react-router-dom'; // Import Link


// const JournalTeacher = () => {
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [dates, setDates] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [homeworks, setHomeworks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubjectChange = (subject) => {
//     setSelectedSubject(subject);
//   };

//   const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedClass || !selectedSubject) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Загружаем даты уроков
//         const lessonsData = await FetchWithAuth(
//           `http://127.0.0.1:8000/diary/lessons/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=4`
//         );
        
//         if (!lessonsData) {
//           throw new Error('Не удалось получить даты уроков');
//         }
        
//         // Форматируем даты в нужный формат
//         const formattedDates = lessonsData.map(lesson => ({
//           id: lesson.id,
//           date: new Date(lesson.date).toLocaleDateString('ru-RU', {
//             day: '2-digit',
//             month: '2-digit',
//             year: '2-digit'
//           }).replace(/\./g, '.'),
//           originalDate: lesson.date
//         }));
        
//         setDates(formattedDates);
        
//         // Загружаем данные об учениках и оценках
//         const journalData = await FetchWithAuth(
//           `http://127.0.0.1:8000/diary/journal/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=4&year=2024`
//         );
        
//         if (!journalData) {
//           throw new Error('Не удалось получить данные журнала');
//         }
        
//         setStudents(journalData);

//         // Загружаем домашние задания
//         const homeworksData = await FetchWithAuth(
//           `http://127.0.0.1:8000/diary/homeworks/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=4`
//         );

//         if (homeworksData) {
//           setHomeworks(homeworksData);
//         }
//       } catch (err) {
//         setError(err.message || 'Ошибка при загрузке данных');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [selectedClass, selectedSubject]);

//   if (loading) {
//     return <div>Загрузка данных журнала...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine />
//         <div className={styles.ConteinerSecondLine}>
//           <button className={styles.activeButton}>ЖУРНАЛ</button>
//           <Link to="/pstm">
//           <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//           </Link>
//         </div>
//         <SelectedLine
//           onSubjectChange={handleSubjectChange}
//           onClassChange={handleClassChange}
//           selectedSubject={selectedSubject}
//           selectedClass={selectedClass}
//         />
//         <div className={styles.ConteinerSelectedQuarter}>
//           <button className={styles.SelectedCell}>1 четверть</button>
//           <button className={styles.DefaultCell}>2 четверть</button>
//           <button className={styles.DefaultCell}>3 четверть</button>
//           <button className={styles.DefaultCell}>4 четверть</button>
//         </div>
//       </div>
//       {selectedSubject && selectedClass && (
//       <div style={{marginLeft: 30, marginRight:30, marginBottom:30}}>
//         <JournalTable 
//           class={selectedClass} 
//           subject={selectedSubject}
//           quarter={1}
//           dates={dates}
//           students={students}
//           homeworks={homeworks}
//         />
//       </div>
//       )}
//       <Footer />
//     </>
//   );
// };
// export default JournalTeacher;



import React, { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import JournalTable from '../../Tables/Journal/Journal';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './JournalTeacher.module.css';
import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine';
import FetchWithAuth from '../Authorization/FetchWithAuth';
import { Link } from 'react-router-dom';

const JournalTeacher = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(1); // Добавляем состояние для выбранной четверти
  const [dates, setDates] = useState([]);
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
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
        // Загружаем даты уроков (используем selectedQuarter вместо жесткого значения)
        const lessonsData = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/lessons/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${selectedQuarter}`
        );
        
        if (!lessonsData) {
          throw new Error('Не удалось получить даты уроков');
        }
        
        // Форматируем даты в нужный формат
        const formattedDates = lessonsData.map(lesson => ({
          id: lesson.id,
          date: new Date(lesson.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).replace(/\./g, '.'),
          originalDate: lesson.date
        }));
        
        setDates(formattedDates);
        
        // Загружаем данные об учениках и оценках (используем selectedQuarter)
        const journalData = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/journal/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${selectedQuarter}&year=2024`
        );
        
        if (!journalData) {
          throw new Error('Не удалось получить данные журнала');
        }
        
        setStudents(journalData);

        // Загружаем домашние задания (используем selectedQuarter)
        const homeworksData = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/homeworks/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${selectedQuarter}`
        );

        if (homeworksData) {
          setHomeworks(homeworksData);
        } else {
          setHomeworks([]); // Устанавливаем пустой массив, если данных нет
        }
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке данных');
        console.error('Error fetching data:', err);
        setHomeworks([]); // При ошибке также устанавливаем пустой массив
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedClass, selectedSubject, selectedQuarter]); // Добавляем selectedQuarter в зависимости

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
          <Link to="/pstm">
            <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
          </Link>
        </div>
        <SelectedLine
          onSubjectChange={handleSubjectChange}
          onClassChange={handleClassChange}
          selectedSubject={selectedSubject}
          selectedClass={selectedClass}
        />
        <div className={styles.ConteinerSelectedQuarter}>
          <button 
            className={selectedQuarter === 1 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(1)}
          >
            1 четверть
          </button>
          <button 
            className={selectedQuarter === 2 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(2)}
          >
            2 четверть
          </button>
          <button 
            className={selectedQuarter === 3 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(3)}
          >
            3 четверть
          </button>
          <button 
            className={selectedQuarter === 4 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(4)}
          >
            4 четверть
          </button>
        </div>
      </div>
      {selectedSubject && selectedClass && (
        <div style={{marginLeft: 30, marginRight:30, marginBottom:30}}>
          <JournalTable 
            class={selectedClass} 
            subject={selectedSubject}
            quarter={selectedQuarter} // Передаем выбранную четверть
            dates={dates}
            students={students}
            // homeworks={homeworks}
  homeworks={Array.isArray(homeworks) ? homeworks : []}    />
        </div>
      )}
      <Footer />
    </>
  );
};

export default JournalTeacher;