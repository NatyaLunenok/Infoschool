
// import React, { useState, useEffect, useRef } from 'react'; // Оставляем только эту строку
// import styles from './Journal.module.css'; // Импорт стилей

// const PaperclipIcon = () => (
//     <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#4CAF50"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     >
//         <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
//     </svg>
// );

// // Функция для определения цвета оценки (отдельная функция)
// const getGradeColor = (grade) => {
//     switch (grade) {
//         case 5:
//             return '#C8E6C9';
//         case 4:
//             return '#DCEDC8';
//         case 3:
//             return '#FFF9C4';
//         case 2:
//             return '#FFCDD2';
//         default:
//             return 'transparent';
//     }
// };

// // Исходные данные (можно вынести в отдельный файл, если нужно)
// const initialData = [
//     {
//         id: 1,
//         student: 'Ситникова Мария',
//         grades: {
//             '01.09.25': [5, 5],
//             '03.09.25': [5, 5],
//             '05.09.25': [4],
//             '09.09.25': [],
//             '13.09.25': [],
//             '15.09.25': [],
//             '20.09.25': [],
//         },
//         hasHomework: true,
//     },
//     {
//         id: 2,
//         student: 'Лунёнок Анасасия',
//         grades: {
//             '01.09.25': [3],
//             '03.09.25': [5],
//             '05.09.25': [3, 2],
//             '09.09.25': [5],
//             '13.09.25': [],
//             '15.09.25': [],
//             '20.09.25': [],
//         },
//         hasHomework: false,
//     },
//     {
//         id: 3,
//         student: 'Булыгина Арина',
//         grades: {
//             '01.09.25': [4],
//             '03.09.25': [5, 5, 4],
//             '05.09.25': [4],
//             '09.09.25': [],
//             '13.09.25': [],
//             '15.09.25': [],
//             '20.09.25': [],
//         },
//         hasHomework: false,
//     },
//     // Добавьте остальные записи по аналогии...
// ];

// // Даты (можно вынести в отдельный файл, если нужно)
// const dates = [
//     '01.09.25',
//     '03.09.25',
//     '05.09.25',
//     '09.09.25',
//     '13.09.25',
//     '15.09.25',
//     '20.09.25',
// ];

// const JournalTable = () => {
//   const [data, setData] = useState(initialData);
//   const [editingCell, setEditingCell] = useState(null);
//   const [newGrade, setNewGrade] = useState('');
//   const tableRef = useRef(null);
//   const inputRef = useRef(null);

//   const handleGradeChange = (event) => {
//     setNewGrade(event.target.value);
//   };

//   const handleCellClick = (studentId, date) => {
//     setEditingCell({ studentId, date });
//     setNewGrade('');
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 0);
//   };

//   const handleGradeSubmit = (studentId, date) => {
//     if (newGrade === '') {
//       setEditingCell(null);
//       setNewGrade('');
//       return;
//     }

//     const grade = parseInt(newGrade, 10);

//     if (isNaN(grade) || grade < 2 || grade > 5) {
//       alert('Пожалуйста, введите корректную оценку от 2 до 5.');
//       return;
//     }

//     setData(prevData =>
//       prevData.map(student => {
//         if (student.id === studentId) {
//           return {
//             ...student,
//             grades: {
//               ...student.grades,
//               [date]: [...(student.grades[date] || []), grade],
//             },
//           };
//         }
//         return student;
//       })
//     );

//     setEditingCell(null);
//     setNewGrade('');
//   };

//   const handleDeleteGrade = (studentId, date, gradeIndex) => {
//     setData(prevData =>
//       prevData.map(student => {
//         if (student.id === studentId) {
//           const updatedGrades = [...(student.grades[date] || [])];
//           updatedGrades.splice(gradeIndex, 1); // Удаляем оценку по индексу

//           return {
//             ...student,
//             grades: {
//               ...student.grades,
//               [date]: updatedGrades,
//             },
//           };
//         }
//         return student;
//       })
//     );
//   };

//   const handleClickOutside = (event) => {
//     if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
//       setEditingCell(null);
//       setNewGrade('');
//     }
//   };

//   const handleKeyDown = (event, studentId, date) => {
//     if (event.key === 'Enter') {
//       handleGradeSubmit(studentId, date);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [editingCell]);

//   return (
//     <table className={styles.journalTable} ref={tableRef}>
//       <thead>
//         <tr className={styles.headerRow}>
//           <th className={styles.headerCell}>№</th>
//           <th className={styles.headerCell}>Ученик</th>
//           {dates.map((date, idx) => (
//             <th
//               key={date}
//               className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
//               title={date}
//             >
//               {date}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {/* Первая строка - домашнее задание */}
//         <tr>
//           <td className={styles.dataCell}></td>
//           <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
//           {dates.map((date) => (
//             <td
//               key={date}
//               className={styles.dataCell}
//             >
//               {(date === '01.09.25' || date === '05.09.25') && <PaperclipIcon />}
//             </td>
//           ))}
//         </tr>

//         {/* Строки с учениками */}
//         {data.map((row, idx) => (
//           <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
//             <td className={styles.dataCell}>{idx + 1}</td>
//             <td className={styles.dataCell}>{row.student}</td>
//             {dates.map((date) => {
//               const grades = row.grades[date] || [];
//               const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === date;
//               return (
//                 <td
//                   key={date}
//                   className={styles.dataCell}
//                   onClick={(event) => {
//                     // Предотвращаем немедленное срабатывание обработчика клика снаружи
//                     event.stopPropagation();
//                     handleCellClick(row.id, date);
//                   }}
//                 >
//                   {isEditing ? (
//                     <div className={styles.editingContainer}>
//                       <input
//                         type="text"
//                         ref={inputRef}
//                         value={newGrade}
//                         onChange={handleGradeChange}
//                         className={styles.gradeInput}
//                         onKeyDown={(event) => handleKeyDown(event, row.id, date)}
//                         pattern="[2-5]"
//                       />
//                       <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, date)}>OK</button>
//                     </div>
//                   ) : (
//                     grades.map((grade, index) => (
//                       <div key={index} className={styles.gradeContainer}>
//                         <span
//                           className={styles.grade}
//                           style={{ backgroundColor: getGradeColor(grade) }}
//                         >
//                           {grade}
//                         </span>
//                         <button
//                           className={styles.deleteButton}
//                           onClick={(event) => {
//                             event.stopPropagation(); // Prevent cell click
//                             handleDeleteGrade(row.id, date, index);
//                           }}
//                         >
//                           &#10006;
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default JournalTable;


import React, { useState, useEffect, useRef } from 'react';
import styles from './Journal.module.css';
import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal'; // Импортируйте компонент HomeworkModal

const PaperclipIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
    </svg>
);

const getGradeColor = (grade) => {
    switch (grade) {
        case 5:
            return '#C8E6C9';
        case 4:
            return '#DCEDC8';
        case 3:
            return '#FFF9C4';
        case 2:
            return '#FFCDD2';
        default:
            return 'transparent';
    }
};

const initialData = [
    {
        id: 1,
        student: 'Ситникова Мария',
        grades: {
            '01.09.25': [5, 5],
            '03.09.25': [5, 5],
            '05.09.25': [4],
            '09.09.25': [],
            '13.09.25': [],
            '15.09.25': [],
            '20.09.25': [],
        },
        hasHomework: true,
    },
    {
        id: 2,
        student: 'Лунёнок Анасасия',
        grades: {
            '01.09.25': [3],
            '03.09.25': [5],
            '05.09.25': [3, 2],
            '09.09.25': [5],
            '13.09.25': [],
            '15.09.25': [],
            '20.09.25': [],
        },
        hasHomework: false,
    },
    {
        id: 3,
        student: 'Булыгина Арина',
        grades: {
            '01.09.25': [4],
            '03.09.25': [5, 5, 4],
            '05.09.25': [4],
            '09.09.25': [],
            '13.09.25': [],
            '15.09.25': [],
            '20.09.25': [],
        },
        hasHomework: false,
    },
];

const dates = [
    '01.09.25',
    '03.09.25',
    '05.09.25',
    '09.09.25',
    '13.09.25',
    '15.09.25',
    '20.09.25',
];

const JournalTable = () => {
  const [data, setData] = useState(initialData);
  const [editingCell, setEditingCell] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const tableRef = useRef(null);
  const inputRef = useRef(null);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(null);
    const [homeworks, setHomeworks] = useState({}); // Состояние для хранения информации о домашних заданиях

  const openHomeworkModal = (date) => {
      setSelectedHomeworkDate(date);
      setIsHomeworkModalOpen(true);
  };

  const closeHomeworkModal = () => {
      setIsHomeworkModalOpen(false);
      setSelectedHomeworkDate(null);
  };

  const handleClickOutside = (event) => {
      if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
        setEditingCell(null); // Закрыть редактирование, если клик снаружи таблицы
      }
  };

    const handleHomeworkSubmit = (homework) => {
        // Сохраняем информацию о домашнем задании в состоянии
        setHomeworks(prevHomeworks => ({
            ...prevHomeworks,
            [homework.date]: {
                text: homework.text,
                file: homework.file,
            },
        }));
    };

    const hasHomework = (date) => {
        // Проверяем, есть ли домашнее задание на указанную дату
        return homeworks[date] !== undefined;
    };

  useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingCell]);


  const handleGradeChange = (event) => {
    setNewGrade(event.target.value);
  };

  const handleCellClick = (studentId, date) => {
    setEditingCell({ studentId, date });
    setNewGrade('');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleGradeSubmit = (studentId, date) => {
    if (newGrade === '') {
      setEditingCell(null);
      setNewGrade('');
      return;
    }

    const grade = parseInt(newGrade, 10);

    if (isNaN(grade) || grade < 2 || grade > 5) {
      alert('Пожалуйста, введите корректную оценку от 2 до 5.');
      return;
    }

    setData(prevData =>
      prevData.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [date]: [...(student.grades[date] || []), grade],
            },
          };
        }
        return student;
      })
    );

    setEditingCell(null);
    setNewGrade('');
  };

  const handleDeleteGrade = (studentId, date, gradeIndex) => {
    setData(prevData =>
      prevData.map(student => {
        if (student.id === studentId) {
          const updatedGrades = [...(student.grades[date] || [])];
          updatedGrades.splice(gradeIndex, 1); // Удаляем оценку по индексу

          return {
            ...student,
            grades: {
              ...student.grades,
              [date]: updatedGrades,
            },
          };
        }
        return student;
      })
    );
  };

    const handleKeyDown = (event, studentId, date) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGradeSubmit(studentId, date);
        } else if (event.key === 'Escape') {
            setEditingCell(null);
            setNewGrade('');
        }
    };

  return (
    <>
      <table className={styles.journalTable} ref={tableRef}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>№</th>
            <th className={styles.headerCell}>Ученик</th>
            {dates.map((date, idx) => (
              <th
                key={date}
                className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
                title={date}
              >
                {date}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {/* Первая строка - домашнее задание */}
                    <tr>
                        <td className={styles.dataCell}></td>
                        <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
                        {dates.map((date) => (
                            <td
                                key={date}
                                className={styles.dataCell}
                                onClick={() => openHomeworkModal(date)} // Открываем модальное окно при клике
                                style={{ cursor: 'pointer' }} // Меняем курсор
                            >
                                {hasHomework(date) && <PaperclipIcon />} {/* Отображаем иконку, если есть домашнее задание */}
                            </td>
                        ))}
                    </tr>

        {/* Строки с учениками */}
        {data.map((row, idx) => (
          <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
            <td className={styles.dataCell}>{idx + 1}</td>
            <td className={styles.dataCell}>{row.student}</td>
            {dates.map((date) => {
              const grades = (row.grades && row.grades[date]) ? row.grades[date] : [];
              const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === date;
              return (
                <td
                  key={date}
                  className={styles.dataCell}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCellClick(row.id, date);
                  }}
                >
                  {isEditing ? (
                    <div className={styles.editingContainer}>
                      <input
                        type="text"
                        ref={inputRef}
                        value={newGrade}
                        onChange={handleGradeChange}
                        className={styles.gradeInput}
                        onKeyDown={(event) => handleKeyDown(event, row.id, date)}
                        pattern="[2-5]"
                      />
                      <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, date)}>OK</button>
                    </div>
                  ) : (
                    grades.map((grade, index) => (
                      <div key={index} className={styles.gradeContainer}>
                        <span
                          className={styles.grade}
                          style={{ backgroundColor: getGradeColor(grade) }}
                        >
                          {grade}
                        </span>
                        <button
                          className={styles.deleteButton}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteGrade(row.id, date, index);
                          }}
                        >
                          &#10006;
                        </button>
                      </div>
                    ))
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>

    {/* Рендерим компонент HomeworkModal */}
            <HomeworkModal
                isOpen={isHomeworkModalOpen}
                onClose={closeHomeworkModal}
                date={selectedHomeworkDate}
                onHomeworkSubmit={handleHomeworkSubmit} // Передаем функцию handleHomeworkSubmit
            />
  </>
  );
};

export default JournalTable;


// import React, { useState, useEffect, useRef } from 'react';
// import styles from './Journal.module.css';
// import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

// const PaperclipIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
//   </svg>
// );

// const getGradeColor = (grade) => {
//   switch (grade) {
//     case 5: return '#C8E6C9';
//     case 4: return '#DCEDC8';
//     case 3: return '#FFF9C4';
//     case 2: return '#FFCDD2';
//     default: return 'transparent';
//   }
// };

// const JournalTable = ({ classId, subjectId }) => { // Accept classId and subjectId as props
//   const [data, setData] = useState([]);
//   const [editingCell, setEditingCell] = useState(null);
//   const [newGrade, setNewGrade] = useState('');
//   const tableRef = useRef(null);
//   const inputRef = useRef(null);
//   const [dates, setDates] = useState([]); // Add state for dates
//   const fetchWithAuth = FetchWithAuth();

//   useEffect(() => {
//     const loadJournalData = async () => {
//       if (!classId || !subjectId || !fetchWithAuth) {
//         return; // Don't fetch if classId or subjectId is missing or fetchWithAuth is not yet available
//       }

//       try {
//         const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/journal/?class_id=${classId}&subject_id=${subjectId}`);

//         if (!response) {
//           console.error('Failed to fetch journal data.');
//           return;
//         }

//         // Prepare the data
//         const fetchedData = response.map(item => ({
//           id: item.id,
//           student: `${item.last_name} ${item.first_name}`,
//           grades: item.grades.reduce((acc, grade) => {
//             const date = grade.date;
//             if (!acc[date]) {
//               acc[date] = [];
//             }
//             acc[date].push(grade.mark);
//             return acc;
//           }, {}),
//         }));

//         setData(fetchedData);

//         // Extract unique dates from the grades
//         const uniqueDates = [...new Set(response.flatMap(item => item.grades.map(grade => grade.date)))];
//         setDates(uniqueDates);

//       } catch (error) {
//         console.error('Error loading journal data:', error);
//       }
//     };

//     loadJournalData();
//   }, [classId, subjectId, fetchWithAuth]);

//   const handleGradeChange = (event) => {
//     setNewGrade(event.target.value);
//   };
//   const handleCellClick = (studentId, date) => {
//     setEditingCell({ studentId, date });
//     setNewGrade('');
//     setTimeout(() => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     }, 0);
//   };

//   const handleKeyDown = (event, studentId, date) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleGradeSubmit(studentId, date);
//     } else if (event.key === 'Escape') {
//       event.preventDefault();
//       handleCancelEdit();
//     }
//   };

//   const handleGradeSubmit = (studentId, date) => {
//     if (newGrade === '') {
//       setEditingCell(null);
//       setNewGrade('');
//       return;
//     }

//     const grade = parseInt(newGrade, 10);

//     if (isNaN(grade) || grade < 2 || grade > 5) {
//       alert('Пожалуйста, введите корректную оценку от 2 до 5.');
//       return;
//     }

//     setData((prevData) =>
//       prevData.map((row) => {
//         if (row.id === studentId) {
//           const updatedGrades = {
//             ...row.grades,
//             [date]: [...(row.grades[date] || []), grade],
//           };
//           return { ...row, grades: updatedGrades };
//         }
//         return row;
//       })
//     );

//     setEditingCell(null);
//     setNewGrade('');
//   };

//   const handleDeleteGrade = (studentId, date, index) => {
//     setData((prevData) =>
//       prevData.map((row) => {
//         if (row.id === studentId) {
//           const updatedGrades = {
//             ...row.grades,
//             [date]: row.grades[date].filter((_, i) => i !== index),
//           };
//           return { ...row, grades: updatedGrades };
//         }
//         return row;
//       })
//     );
//   };

//   const handleCancelEdit = () => {
//     setEditingCell(null);
//     setNewGrade('');
//   };

//   return (
//     <table ref={tableRef} className={styles.journalTable}>
//       <thead className={styles.headerRow}>
//         <tr>
//           <th className={styles.headerCell}>№</th>
//           <th className={styles.headerCell}>Ученик</th>
//           {dates.map((date) => (
//             <th key={date} className={styles.headerCell}>{date}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, idx) => (
//           <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
//             <td className={styles.dataCell}>{idx + 1}</td>
//             <td className={styles.dataCell}>{row.student}</td>
//             {dates.map((date) => {
//               const grades = (row.grades && row.grades[date]) ? row.grades[date] : [];
//               const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === date;
//               return (
//                 <td
//                   key={date}
//                   className={styles.dataCell}
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     handleCellClick(row.id, date);
//                   }}
//                 >
//                   {isEditing ? (
//                     <div className={styles.editingContainer}>
//                       <input
//                         type="text"
//                         ref={inputRef}
//                         value={newGrade}
//                         onChange={handleGradeChange}
//                         className={styles.gradeInput}
//                         onKeyDown={(event) => handleKeyDown(event, row.id, date)}
//                         pattern="[2-5]"
//                       />
//                       <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, date)}>OK</button>
//                     </div>
//                   ) : (
//                     grades.map((grade, index) => (
//                       <div key={index} className={styles
// .gradeContainer}>
//                         <span className={styles.grade} style={{ backgroundColor: getGradeColor(grade) }}>{grade}</span>
//                         <button className={styles.deleteButton} onClick={(event) => {
//                           event.stopPropagation();
//                           handleDeleteGrade(row.id, date, index);
//                         }}>&#10006;</button>
//                       </div>
//                     ))
//                   )}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default JournalTable;