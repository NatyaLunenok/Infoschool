// // AddSubject.jsx
// import React, { useState } from 'react';
// import styles from './AddSubject.module.css';

// const AddSubject = () => {
//   const [subjectName, setSubjectName] = useState('');
//   const [subjects, setSubjects] = useState([
//     'Русский язык',
//     'Литература',
//     'Математика',
//     'Английский язык',
//     'Информатика',
//     'Физкультура',
//     'ИЗО'
//   ]);

//   const handleAddSubject = () => {
//     if (subjectName.trim() && !subjects.includes(subjectName)) {
//       setSubjects([...subjects, subjectName]);
//       setSubjectName('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleAddSubject();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.subjectsList}>
//         {subjects.map((subject, index) => (
//           <div key={index} className={styles.subjectItem}>
//             {subject}
//           </div>
//         ))}
//       </div>
      
//       <div className={styles.inputContainer}>
//         <input
//           type="text"
//           value={subjectName}
//           onChange={(e) => setSubjectName(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Введите название предмета"
//           className={styles.inputField}
//         />
//         <button 
//           onClick={handleAddSubject}
//           className={styles.addButton}
//         >
//           Добавить
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSubject;


// AddSubject.jsx
import React, { useState, useEffect } from 'react';
import styles from './AddSubject.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth'; // Импортируем ваш FetchWithAuth

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка предметов с сервера
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await FetchWithAuth('http://127.0.0.1:8000/diary/subject/');
        
        if (!response) {
          throw new Error('Не удалось загрузить список предметов');
        }

        // Преобразуем данные из API в массив названий предметов
        const subjectNames = response.map(item => item.subject_name);
        setSubjects(subjectNames);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке данных');
        console.error('Ошибка загрузки предметов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    if (subjectName.trim() && !subjects.includes(subjectName)) {
      // Добавляем только локально, без отправки на сервер
      setSubjects([...subjects, subjectName]);
      setSubjectName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка предметов...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.subjectsList}>
        {subjects.map((subject, index) => (
          <div key={index} className={styles.subjectItem}>
            {subject}
          </div>
        ))}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите название предмета"
          className={styles.inputField}
        />
        <button 
          onClick={handleAddSubject}
          className={styles.addButton}
          disabled={!subjectName.trim()}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddSubject;