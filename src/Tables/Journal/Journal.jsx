// import React, { useState, useEffect, useRef } from 'react';
// import styles from './Journal.module.css';
// import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal'; // Импортируйте компонент HomeworkModal

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
// ];

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
//   const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
//   const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(null);
//     const [homeworks, setHomeworks] = useState({}); // Состояние для хранения информации о домашних заданиях

//   const openHomeworkModal = (date) => {
//       setSelectedHomeworkDate(date);
//       setIsHomeworkModalOpen(true);
//   };

//   const closeHomeworkModal = () => {
//       setIsHomeworkModalOpen(false);
//       setSelectedHomeworkDate(null);
//   };

//   const handleClickOutside = (event) => {
//       if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
//         setEditingCell(null); // Закрыть редактирование, если клик снаружи таблицы
//       }
//   };

//     const handleHomeworkSubmit = (homework) => {
//         // Сохраняем информацию о домашнем задании в состоянии
//         setHomeworks(prevHomeworks => ({
//             ...prevHomeworks,
//             [homework.date]: {
//                 text: homework.text,
//                 file: homework.file,
//             },
//         }));
//     };

//     const hasHomework = (date) => {
//         // Проверяем, есть ли домашнее задание на указанную дату
//         return homeworks[date] !== undefined;
//     };

//   useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [editingCell]);


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

//     const handleKeyDown = (event, studentId, date) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             handleGradeSubmit(studentId, date);
//         } else if (event.key === 'Escape') {
//             setEditingCell(null);
//             setNewGrade('');
//         }
//     };

//   return (
//     <>
//       <table className={styles.journalTable} ref={tableRef}>
//         <thead>
//           <tr className={styles.headerRow}>
//             <th className={styles.headerCell}>№</th>
//             <th className={styles.headerCell}>Ученик</th>
//             {dates.map((date, idx) => (
//               <th
//                 key={date}
//                 className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
//                 title={date}
//               >
//                 {date}
//               </th>
//             ))}
//         </tr>
//       </thead>
//       <tbody>
//         {/* Первая строка - домашнее задание */}
//                     <tr>
//                         <td className={styles.dataCell}></td>
//                         <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
//                         {dates.map((date) => (
//                             <td
//                                 key={date}
//                                 className={styles.dataCell}
//                                 onClick={() => openHomeworkModal(date)} // Открываем модальное окно при клике
//                                 style={{ cursor: 'pointer' }} // Меняем курсор
//                             >
//                                 {hasHomework(date) && <PaperclipIcon />} {/* Отображаем иконку, если есть домашнее задание */}
//                             </td>
//                         ))}
//                     </tr>

//         {/* Строки с учениками */}
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
//                             event.stopPropagation();
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

//     {/* Рендерим компонент HomeworkModal */}
//             <HomeworkModal
//                 isOpen={isHomeworkModalOpen}
//                 onClose={closeHomeworkModal}
//                 date={selectedHomeworkDate}
//                 onHomeworkSubmit={handleHomeworkSubmit} // Передаем функцию handleHomeworkSubmit
//             />
//   </>
//   );
// };

// export default JournalTable;





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
//  const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const loadJournalData = async () => {
//       if (!classId || !subjectId) return;
      
//       setLoading(true);
//       try {
//         const response = await FetchWithAuth(
//           `http://127.0.0.1:8000/diary/journal/?class_id=${classId}&subject_id=${subjectId}`
//         );

//         if (!response) {
//           throw new Error('Failed to fetch journal data');
//         }

//         // Обработка данных
//         const processedData = response.map(item => ({
//           id: item.id,
//           student: `${item.last_name} ${item.first_name}`,
//           grades: item.grades.reduce((acc, grade) => {
//             acc[grade.date] = acc[grade.date] || [];
//             acc[grade.date].push(grade.mark);
//             return acc;
//           }, {})
//         }));

//         setData(processedData);
//         setDates([...new Set(response.flatMap(item => 
//           item.grades.map(grade => grade.date)
//         ))]);
//       } catch (error) {
//         console.error('Error loading journal data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadJournalData();
//   }, [classId, subjectId]);


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




// return (
//   <div className={styles.tableWrapper}>
//     <table className={styles.journalTable}>
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
//                       <div key={index} className={styles.gradeContainer}>
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
//   </div>
// );
// };

// export default JournalTable;



import React, { useState, useEffect, useRef } from 'react';
import styles from './Journal.module.css';
import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

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
        case 5: return '#C8E6C9';
        case 4: return '#DCEDC8';
        case 3: return '#FFF9C4';
        case 2: return '#FFCDD2';
        default: return 'transparent';
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
};

const JournalTable = ({ class: selectedClass, subject: selectedSubject, quarter }) => {
    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [homeworks, setHomeworks] = useState({});
    const [editingCell, setEditingCell] = useState(null);
    const [newGrade, setNewGrade] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
    const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(null);
    const tableRef = useRef(null);
    const inputRef = useRef(null);

    // Загрузка данных журнала
    useEffect(() => {
        const fetchJournalData = async () => {
            try {
                setIsLoading(true);
                
                // Загрузка уроков
                const lessonsResponse = await FetchWithAuth(
                    `http://127.0.0.1:8000/diary/lessons/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${quarter}`
                );
                setLessons(lessonsResponse);

                // Загрузка оценок
                const marksResponse = await FetchWithAuth(
                    `http://127.0.0.1:8000/diary/journal/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${quarter}`
                );
                
                // Преобразуем данные в удобный формат
                const formattedStudents = marksResponse.map(student => {
                    const grades = {};
                    student.grades.forEach(grade => {
                        const formattedDate = formatDate(grade.date);
                        if (!grades[formattedDate]) {
                            grades[formattedDate] = [];
                        }
                        grades[formattedDate].push(grade.mark);
                    });
                    
                    return {
                        id: student.id,
                        student: `${student.last_name} ${student.first_name}`,
                        grades
                    };
                });
                setStudents(formattedStudents);

                // Загрузка домашних заданий
                const homeworksResponse = await FetchWithAuth(
                    `http://127.0.0.1:8000/diary/homeworks/?class_id=${selectedClass.id}&subject_id=${selectedSubject.id}&quarter=${quarter}`
                );
                
                const formattedHomeworks = {};
                homeworksResponse.forEach(hw => {
                    if (hw.homework_id) {
                        formattedHomeworks[formatDate(hw.date)] = true;
                    }
                });
                setHomeworks(formattedHomeworks);

            } catch (err) {
                console.error('Ошибка загрузки журнала:', err);
                setError('Не удалось загрузить данные журнала');
            } finally {
                setIsLoading(false);
            }
        };

        if (selectedClass && selectedSubject) {
            fetchJournalData();
        }
    }, [selectedClass, selectedSubject, quarter]);

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
            setEditingCell(null);
        }
    };

    const handleHomeworkSubmit = async (homework) => {
        try {
            // Отправка домашнего задания на сервер
            const response = await FetchWithAuth('http://127.0.0.1:8000/diary/homeworks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class_id: selectedClass.id,
                    subject_id: selectedSubject.id,
                    quarter_number: quarter,
                    date: homework.date,
                    text: homework.text,
                    file: homework.file
                })
            });

            // Обновляем состояние
            setHomeworks(prev => ({
                ...prev,
                [formatDate(homework.date)]: true
            }));
            
            return { success: true, message: 'Домашнее задание успешно добавлено' };
        } catch (error) {
            console.error('Ошибка при добавлении ДЗ:', error);
            return { success: false, message: 'Ошибка при добавлении ДЗ' };
        }
    };

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

    const handleGradeSubmit = async (studentId, date) => {
        if (newGrade.trim() === '' || isNaN(newGrade)) {
            setEditingCell(null);
            setNewGrade('');
            return;
        }

        const grade = parseInt(newGrade, 10);

        if (grade < 2 || grade > 5) {
            alert('Пожалуйста, введите корректную оценку от 2 до 5.');
            return;
        }

        try {
            // Находим ID урока по дате
            const lesson = lessons.find(l => formatDate(l.date) === date);
            if (!lesson) {
                throw new Error('Урок не найден');
            }

            // Отправляем оценку на сервер
            await FetchWithAuth('http://127.0.0.1:8000/diary/current-marks/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mark: grade,
                    lesson: lesson.id,
                    student: studentId,
                    quarter_number: quarter
                })
            });

            // Обновляем локальное состояние
            setStudents(prevStudents =>
                prevStudents.map(student => {
                    if (student.id === studentId) {
                        const updatedGrades = { ...student.grades };
                        if (!updatedGrades[date]) {
                            updatedGrades[date] = [];
                        }
                        updatedGrades[date] = [...updatedGrades[date], grade];
                        
                        return {
                            ...student,
                            grades: updatedGrades
                        };
                    }
                    return student;
                })
            );

            setEditingCell(null);
            setNewGrade('');

        } catch (error) {
            console.error('Ошибка при добавлении оценки:', error);
            alert('Не удалось добавить оценку');
        }
    };

    const handleDeleteGrade = async (studentId, date, gradeIndex) => {
        try {
            // Находим ID урока по дате
            const lesson = lessons.find(l => formatDate(l.date) === date);
            if (!lesson) {
                throw new Error('Урок не найден');
            }

            // Находим оценку для удаления
            const gradeToDelete = students
                .find(s => s.id === studentId)
                ?.grades[date][gradeIndex];
            
            if (!gradeToDelete) {
                throw new Error('Оценка не найдена');
            }

            // Отправляем запрос на удаление (предполагая, что у оценок есть ID)
            // В реальном API должен быть эндпоинт для удаления оценки
            await FetchWithAuth(`http://127.0.0.1:8000/diary/current-marks/${gradeToDelete.id}/delete/`, {
                method: 'DELETE'
            });

            // Обновляем локальное состояние
            setStudents(prevStudents =>
                prevStudents.map(student => {
                    if (student.id === studentId) {
                        const updatedGrades = { ...student.grades };
                        updatedGrades[date] = updatedGrades[date].filter((_, i) => i !== gradeIndex);
                        
                        return {
                            ...student,
                            grades: updatedGrades
                        };
                    }
                    return student;
                })
            );

        } catch (error) {
            console.error('Ошибка при удалении оценки:', error);
            alert('Не удалось удалить оценку');
        }
    };

    const handleKeyDown = (event, studentId, date) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newGrade.trim() === '' || isNaN(newGrade)) {
                setEditingCell(null);
                setNewGrade('');
            } else {
                handleGradeSubmit(studentId, date);
            }
        } else if (event.key === 'Escape') {
            setEditingCell(null);
            setNewGrade('');
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка журнала...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    const formattedDates = lessons.map(lesson => formatDate(lesson.date));

    return (
        <>
            <table className={styles.journalTable} ref={tableRef}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerCell}>№</th>
                        <th className={styles.headerCell}>Ученик</th>
                        {formattedDates.map((date, idx) => (
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
                    {/* Строка с домашними заданиями */}
                    <tr>
                        <td className={styles.dataCell}></td>
                        <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
                        {formattedDates.map((date) => (
                            <td
                                key={date}
                                className={styles.dataCell}
                                onClick={() => openHomeworkModal(date)}
                                style={{ cursor: 'pointer' }}
                            >
                                {homeworks[date] && <PaperclipIcon />}
                            </td>
                        ))}
                    </tr>

                    {/* Строки с учениками */}
                    {students.map((student, idx) => (
                        <tr key={student.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td className={styles.dataCell}>{idx + 1}</td>
                            <td className={styles.dataCell}>{student.student}</td>
                            {formattedDates.map((date) => {
                                const grades = student.grades[date] || [];
                                const isEditing = editingCell?.studentId === student.id && editingCell?.date === date;
                                
                                return (
                                    <td
                                        key={date}
                                        className={styles.dataCell}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleCellClick(student.id, date);
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
                                                    onKeyDown={(event) => handleKeyDown(event, student.id, date)}
                                                    pattern="[2-5]"
                                                />
                                                <button 
                                                    className={styles.gradeButton} 
                                                    onClick={() => {
                                                        if (newGrade.trim() === '' || isNaN(newGrade)) {
                                                            setEditingCell(null);
                                                            setNewGrade('');
                                                        } else {
                                                            handleGradeSubmit(student.id, date);
                                                        }
                                                    }}
                                                >
                                                    OK
                                                </button>
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
                                                            handleDeleteGrade(student.id, date, index);
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

            <HomeworkModal
                isOpen={isHomeworkModalOpen}
                onClose={closeHomeworkModal}
                date={selectedHomeworkDate}
                onHomeworkSubmit={handleHomeworkSubmit}
                classId={selectedClass?.id}
                subjectId={selectedSubject?.id}
                quarter={quarter}
            />
        </>
    );
};

export default JournalTable;