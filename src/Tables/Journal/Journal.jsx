// // JournalTable.js
// import { useState, useEffect, useRef } from 'react';
// import styles from './Journal.module.css';
// import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal';
// import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

// const PaperclipIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#4CAF50"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
//   </svg>
// );

// const getGradeColor = (grade) => {
//   switch (grade) {
//     case 5:
//       return '#C8E6C9';
//     case 4:
//       return '#DCEDC8';
//     case 3:
//       return '#FFF9C4';
//     case 2:
//       return '#FFCDD2';
//     default:
//       return 'transparent';
//   }
// };

// const JournalTable = ({ class: selectedClass, subject: selectedSubject, quarter, dates, students, homeworks }) => {
//   const [data, setData] = useState([]);
//   const [editingCell, setEditingCell] = useState(null);
//   const [newGrade, setNewGrade] = useState('');
//   const tableRef = useRef(null);
//   const inputRef = useRef(null);
//   const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
//   const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [homeworksList, setHomeworksList] = useState(homeworks);

//   useEffect(() => {
//     // Преобразуем данные из API в формат, который ожидает таблица
//     const formattedData = students.map(student => {
//       const gradesByDate = {};
      
//       // Группируем оценки по датам
//       student.grades.forEach(grade => {
//         const formattedDate = dates.find(d => d.id === grade.lesson_id)?.date;
//         if (formattedDate) {
//           if (!gradesByDate[formattedDate]) {
//             gradesByDate[formattedDate] = [];
//           }
//           gradesByDate[formattedDate].push({
//             id: grade.id,
//             mark: grade.mark
//           });
//         }
//       });
      
//       return {
//         id: student.id,
//         student: `${student.last_name} ${student.first_name}`,
//         grades: gradesByDate
//       };
//     });
    
//     setData(formattedData);
//   }, [students, dates]);

//   useEffect(() => {
//     setHomeworksList(homeworks);
//   }, [homeworks]);

//   const openHomeworkModal = (date) => {
//     const lesson = dates.find(d => d.date === date);
//     if (lesson) {
//       setSelectedHomeworkDate({
//         date: lesson.date,
//         lessonId: lesson.id
//       });
//       setIsHomeworkModalOpen(true);
//     }
//   };

//   const closeHomeworkModal = () => {
//     setIsHomeworkModalOpen(false);
//     setSelectedHomeworkDate(null);
//   };

//   const handleClickOutside = (event) => {
//     if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
//       setEditingCell(null);
//     }
//   };

//   const handleHomeworkSubmit = async (homeworkData) => {
//     try {
//       setLoading(true);
      
//       const formData = new FormData();
//       formData.append('lesson', homeworkData.lessonId);
//       formData.append('description', homeworkData.text);
      
//       if (homeworkData.file) {
//         formData.append('files', homeworkData.file);
//       }

//       const response = await FetchWithAuth('http://127.0.0.1:8000/diary/homeworks/', {
//         method: 'POST',
//         body: formData
//       });

//       if (response) {
//         // Обновляем список домашних заданий
//         const updatedHomeworks = [...homeworksList];
//         const existingIndex = updatedHomeworks.findIndex(hw => hw.date === homeworkData.date);
        
//         if (existingIndex >= 0) {
//           updatedHomeworks[existingIndex].homework_id = response.id;
//         } else {
//           updatedHomeworks.push({
//             date: homeworkData.date,
//             homework_id: response.id
//           });
//         }
        
//         setHomeworksList(updatedHomeworks);
//       }
//     } catch (err) {
//       setError('Ошибка при сохранении домашнего задания');
//       console.error('Error saving homework:', err);
//     } finally {
//       setLoading(false);
//       closeHomeworkModal();
//     }
//   };

//   const hasHomework = (date) => {
//     const formattedDate = dates.find(d => d.date === date)?.originalDate;
//     return homeworksList.some(hw => hw.date === formattedDate && hw.homework_id !== null);
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [editingCell]);

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

//   const handleGradeSubmit = async (studentId, date) => {
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

//     try {
//       setLoading(true);
//       setError(null);
      
//       const lesson = dates.find(d => d.date === date);
//       if (!lesson) {
//         throw new Error('Урок не найден');
//       }
      
//       const response = await FetchWithAuth('http://127.0.0.1:8000/diary/current-marks/create/', {
//         method: 'POST',
//         body: JSON.stringify({
//           mark: grade,
//           lesson: lesson.id,
//           student: studentId,
//           quarter_number: quarter
//         })
//       });

//       if (!response) {
//         throw new Error('Не удалось сохранить оценку');
//       }
      
//       // Обновляем локальное состояние
//       setData(prevData =>
//         prevData.map(student => {
//           if (student.id === studentId) {
//             const updatedGrades = [...(student.grades[date] || [])];
//             updatedGrades.push({
//               id: response.id || Date.now(), // временный ID, если сервер не вернул
//               mark: grade
//             });

//             return {
//               ...student,
//               grades: {
//                 ...student.grades,
//                 [date]: updatedGrades,
//               },
//             };
//           }
//           return student;
//         })
//       );
//     } catch (err) {
//       setError(err.message || 'Ошибка при сохранении оценки');
//       console.error('Error saving grade:', err);
//     } finally {
//       setEditingCell(null);
//       setNewGrade('');
//       setLoading(false);
//     }
//   };

//   const handleDeleteGrade = async (studentId, date, gradeIndex) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const student = data.find(s => s.id === studentId);
//       const gradeToDelete = student.grades[date][gradeIndex];
      
//       const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/marks/${gradeToDelete.id}/`, {
//         method: 'DELETE'
//       });

//       if (!response) {
//         throw new Error('Не удалось удалить оценку');
//       }
      
//       // Обновляем локальное состояние
//       setData(prevData =>
//         prevData.map(student => {
//           if (student.id === studentId) {
//             const updatedGrades = [...(student.grades[date] || [])];
//             updatedGrades.splice(gradeIndex, 1);

//             return {
//               ...student,
//               grades: {
//                 ...student.grades,
//                 [date]: updatedGrades,
//               },
//             };
//           }
//           return student;
//         })
//       );
//     } catch (err) {
//       setError(err.message || 'Ошибка при удалении оценки');
//       console.error('Error deleting grade:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (event, studentId, date) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleGradeSubmit(studentId, date);
//     } else if (event.key === 'Escape') {
//       setEditingCell(null);
//       setNewGrade('');
//     }
//   };

//   if (loading) {
//     return <div>Загрузка данных...</div>;
//   }

//   if (error) {
//     return <div style={{color: 'red'}}>{error}</div>;
//   }

//   return (
//     <>
//       <table className={styles.journalTable} ref={tableRef}>
//         <thead>
//           <tr className={styles.headerRow}>
//             <th className={styles.headerCell}>№</th>
//             <th className={styles.headerCell}>Ученик</th>
//             {dates.map((dateObj, idx) => (
//               <th
//                 key={dateObj.date}
//                 className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
//                 title={dateObj.date}
//               >
//                 {dateObj.date}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className={styles.dataCell}></td>
//             <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
//             {dates.map((dateObj) => (
//               <td
//                 key={dateObj.date}
//                 className={styles.dataCell}
//                 onClick={() => openHomeworkModal(dateObj.date)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {hasHomework(dateObj.date) && <PaperclipIcon />}
//               </td>
//             ))}
//           </tr>

//           {data.map((row, idx) => (
//             <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
//               <td className={styles.dataCell}>{idx + 1}</td>
//               <td className={styles.dataCell}>{row.student}</td>
//               {dates.map((dateObj) => {
//                 const grades = (row.grades && row.grades[dateObj.date]) ? row.grades[dateObj.date] : [];
//                 const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === dateObj.date;
//                 return (
//                   <td
//                     key={dateObj.date}
//                     className={styles.dataCell}
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       handleCellClick(row.id, dateObj.date);
//                     }}
//                   >
//                     {isEditing ? (
//                       <div className={styles.editingContainer}>
//                         <input
//                           type="text"
//                           ref={inputRef}
//                           value={newGrade}
//                           onChange={handleGradeChange}
//                           className={styles.gradeInput}
//                           onKeyDown={(event) => handleKeyDown(event, row.id, dateObj.date)}
//                           pattern="[2-5]"
//                         />
//                         <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, dateObj.date)}>OK</button>
//                       </div>
//                     ) : (
//                       grades.map((grade, index) => (
//                         <div key={index} className={styles.gradeContainer}>
//                           <span
//                             className={styles.grade}
//                             style={{ backgroundColor: getGradeColor(grade.mark) }}
//                           >
//                             {grade.mark}
//                           </span>
//                           <button
//                             className={styles.deleteButton}
//                             onClick={(event) => {
//                               event.stopPropagation();
//                               handleDeleteGrade(row.id, dateObj.date, index);
//                             }}
//                           >
//                             &#10006;
//                           </button>
//                         </div>
//                       ))
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <HomeworkModal
//         isOpen={isHomeworkModalOpen}
//         onClose={closeHomeworkModal}
//         date={selectedHomeworkDate}
//         onHomeworkSubmit={handleHomeworkSubmit}
//       />
//     </>
//   );
// };

// export default JournalTable;



// // JournalTable.js
// import { useState, useEffect, useRef } from 'react';
// import styles from './Journal.module.css';
// import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal';
// import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

// const PaperclipIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#4CAF50"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
//   </svg>
// );

// const getGradeColor = (grade) => {
//   switch (grade) {
//     case 5:
//       return '#C8E6C9';
//     case 4:
//       return '#DCEDC8';
//     case 3:
//       return '#FFF9C4';
//     case 2:
//       return '#FFCDD2';
//     default:
//       return 'transparent';
//   }
// };

// const JournalTable = ({ class: selectedClass, subject: selectedSubject, quarter, dates, students, homeworks }) => {
//   const [data, setData] = useState([]);
//   const [editingCell, setEditingCell] = useState(null);
//   const [newGrade, setNewGrade] = useState('');
//   const tableRef = useRef(null);
//   const inputRef = useRef(null);
//   const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
//   const [selectedLessonForHomework, setSelectedLessonForHomework] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [homeworksList, setHomeworksList] = useState([]);

//   useEffect(() => {
//     // Преобразуем данные из API в формат, который ожидает таблица
//     const formattedData = students.map(student => {
//       const gradesByDate = {};
      
//       student.grades.forEach(grade => {
//         const formattedDate = dates.find(d => d.id === grade.lesson_id)?.date;
//         if (formattedDate) {
//           if (!gradesByDate[formattedDate]) {
//             gradesByDate[formattedDate] = [];
//           }
//           gradesByDate[formattedDate].push({
//             id: grade.id,
//             mark: grade.mark
//           });
//         }
//       });
      
//       return {
//         id: student.id,
//         student: `${student.last_name} ${student.first_name}`,
//         grades: gradesByDate
//       };
//     });
    
//     setData(formattedData);
//   }, [students, dates]);

//   useEffect(() => {
//     // Преобразуем домашние задания в удобный формат
//     if (homeworks) {
//       const formattedHomeworks = homeworks.map(hw => ({
//         lessonId: hw.id,
//         date: dates.find(d => d.id === hw.id)?.date,
//         hasHomework: hw.homework_id !== null
//       }));
//       setHomeworksList(formattedHomeworks);
//     }
//   }, [homeworks, dates]);

//   const openHomeworkModal = (lessonId) => {
//     setSelectedLessonForHomework(lessonId);
//     setIsHomeworkModalOpen(true);
//   };

//   const closeHomeworkModal = () => {
//     setIsHomeworkModalOpen(false);
//     setSelectedLessonForHomework(null);
//   };

//   const handleClickOutside = (event) => {
//     if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
//       setEditingCell(null);
//     }
//   };

//   const handleHomeworkSubmit = async (homeworkData) => {
//     try {
//       setLoading(true);
      
//       const formData = new FormData();
//       formData.append('lesson', selectedLessonForHomework);
//       formData.append('description', homeworkData.text);
      
//       if (homeworkData.file) {
//         formData.append('files', homeworkData.file);
//       }

//       const response = await FetchWithAuth('http://127.0.0.1:8000/diary/homeworks/', {
//         method: 'POST',
//         body: formData
//       });

//       if (response) {
//         // Обновляем список домашних заданий
//         const updatedHomeworks = [...homeworksList];
//         const homeworkIndex = updatedHomeworks.findIndex(hw => hw.lessonId === selectedLessonForHomework);
        
//         if (homeworkIndex >= 0) {
//           updatedHomeworks[homeworkIndex].hasHomework = true;
//         } else {
//           updatedHomeworks.push({
//             lessonId: selectedLessonForHomework,
//             date: dates.find(d => d.id === selectedLessonForHomework)?.date,
//             hasHomework: true
//           });
//         }
        
//         setHomeworksList(updatedHomeworks);
//       }
//     } catch (err) {
//       setError('Ошибка при сохранении домашнего задания');
//       console.error('Error saving homework:', err);
//     } finally {
//       setLoading(false);
//       closeHomeworkModal();
//     }
//   };

//   const hasHomework = (lessonId) => {
//     const homework = homeworksList.find(hw => hw.lessonId === lessonId);
//     return homework?.hasHomework || false;
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [editingCell]);
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

//   const handleGradeSubmit = async (studentId, date) => {
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

//     try {
//       setLoading(true);
//       setError(null);
      
//       const lesson = dates.find(d => d.date === date);
//       if (!lesson) {
//         throw new Error('Урок не найден');
//       }
      
//       const response = await FetchWithAuth('http://127.0.0.1:8000/diary/current-marks/create/', {
//         method: 'POST',
//         body: JSON.stringify({
//           mark: grade,
//           lesson: lesson.id,
//           student: studentId,
//           quarter_number: quarter
//         })
//       });

//       if (!response) {
//         throw new Error('Не удалось сохранить оценку');
//       }
      
//       // Обновляем локальное состояние
//       setData(prevData =>
//         prevData.map(student => {
//           if (student.id === studentId) {
//             const updatedGrades = [...(student.grades[date] || [])];
//             updatedGrades.push({
//               id: response.id || Date.now(), // временный ID, если сервер не вернул
//               mark: grade
//             });

//             return {
//               ...student,
//               grades: {
//                 ...student.grades,
//                 [date]: updatedGrades,
//               },
//             };
//           }
//           return student;
//         })
//       );
//     } catch (err) {
//       setError(err.message || 'Ошибка при сохранении оценки');
//       console.error('Error saving grade:', err);
//     } finally {
//       setEditingCell(null);
//       setNewGrade('');
//       setLoading(false);
//     }
//   };

//   const handleDeleteGrade = async (studentId, date, gradeIndex) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const student = data.find(s => s.id === studentId);
//       const gradeToDelete = student.grades[date][gradeIndex];
      
//       const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/marks/${gradeToDelete.id}/`, {
//         method: 'DELETE'
//       });

//       if (!response) {
//         throw new Error('Не удалось удалить оценку');
//       }
      
//       // Обновляем локальное состояние
//       setData(prevData =>
//         prevData.map(student => {
//           if (student.id === studentId) {
//             const updatedGrades = [...(student.grades[date] || [])];
//             updatedGrades.splice(gradeIndex, 1);

//             return {
//               ...student,
//               grades: {
//                 ...student.grades,
//                 [date]: updatedGrades,
//               },
//             };
//           }
//           return student;
//         })
//       );
//     } catch (err) {
//       setError(err.message || 'Ошибка при удалении оценки');
//       console.error('Error deleting grade:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (event, studentId, date) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleGradeSubmit(studentId, date);
//     } else if (event.key === 'Escape') {
//       setEditingCell(null);
//       setNewGrade('');
//     }
//   };

//   if (loading) {
//     return <div>Загрузка данных...</div>;
//   }

//   if (error) {
//     return <div style={{color: 'red'}}>{error}</div>;
//   }
//   // Остальные функции (handleGradeChange, handleCellClick, handleGradeSubmit, handleDeleteGrade, handleKeyDown)
//   // остаются без изменений, как в вашем предыдущем коде

//   if (loading) {
//     return <div>Загрузка данных...</div>;
//   }

//   if (error) {
//     return <div style={{color: 'red'}}>{error}</div>;
//   }

//   return (
//     <>
//       <table className={styles.journalTable} ref={tableRef}>
//         <thead>
//           <tr className={styles.headerRow}>
//             <th className={styles.headerCell}>№</th>
//             <th className={styles.headerCell}>Ученик</th>
//             {dates.map((dateObj, idx) => (
//               <th
//                 key={dateObj.id}
//                 className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
//                 title={dateObj.date}
//               >
//                 {dateObj.date}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className={styles.dataCell}></td>
//             <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
//             {dates.map((dateObj) => (
//               <td
//                 key={dateObj.id}
//                 className={styles.dataCell}
//                 onClick={() => openHomeworkModal(dateObj.id)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {hasHomework(dateObj.id) && <PaperclipIcon />}
//               </td>
//             ))}
//           </tr>

//           {data.map((row, idx) => (
//             <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
//               <td className={styles.dataCell}>{idx + 1}</td>
//               <td className={styles.dataCell}>{row.student}</td>
//               {dates.map((dateObj) => {
//                 const grades = (row.grades && row.grades[dateObj.date]) ? row.grades[dateObj.date] : [];
//                 const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === dateObj.date;
//                 return (
//                   <td
//                     key={dateObj.id}
//                     className={styles.dataCell}
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       handleCellClick(row.id, dateObj.date);
//                     }}
//                   >
//                     {isEditing ? (
//                       <div className={styles.editingContainer}>
//                         <input
//                           type="text"
//                           ref={inputRef}
//                           value={newGrade}
//                           onChange={handleGradeChange}
//                           className={styles.gradeInput}
//                           onKeyDown={(event) => handleKeyDown(event, row.id, dateObj.date)}
//                           pattern="[2-5]"
//                         />
//                         <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, dateObj.date)}>OK</button>
//                       </div>
//                     ) : (
//                       grades.map((grade, index) => (
//                         <div key={index} className={styles.gradeContainer}>
//                           <span
//                             className={styles.grade}
//                             style={{ backgroundColor: getGradeColor(grade.mark) }}
//                           >
//                             {grade.mark}
//                           </span>
//                           <button
//                             className={styles.deleteButton}
//                             onClick={(event) => {
//                               event.stopPropagation();
//                               handleDeleteGrade(row.id, dateObj.date, index);
//                             }}
//                           >
//                             &#10006;
//                           </button>
//                         </div>
//                       ))
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <HomeworkModal
//         isOpen={isHomeworkModalOpen}
//         onClose={closeHomeworkModal}
//         onSubmit={handleHomeworkSubmit}
//       />
//     </>
//   );
// };

// export default JournalTable;



// JournalTable.js
import { useState, useEffect, useRef } from 'react';
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

const JournalTable = ({ class: selectedClass, subject: selectedSubject, quarter, dates, students, homeworks }) => {
  const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const tableRef = useRef(null);
  const inputRef = useRef(null);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [selectedLessonForHomework, setSelectedLessonForHomework] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [homeworksList, setHomeworksList] = useState([]);
  const [homeworkViewData, setHomeworkViewData] = useState(null);
  const [homeworkModalMode, setHomeworkModalMode] = useState('add');


  useEffect(() => {
    const formattedData = students.map(student => {
      const gradesByDate = {};
      
      student.grades.forEach(grade => {
        const formattedDate = dates.find(d => d.id === grade.lesson_id)?.date;
        if (formattedDate) {
          if (!gradesByDate[formattedDate]) {
            gradesByDate[formattedDate] = [];
          }
          gradesByDate[formattedDate].push({
            id: grade.id,
            mark: grade.mark
          });
        }
      });
      
      return {
        id: student.id,
        student: `${student.last_name} ${student.first_name}`,
        grades: gradesByDate
      };
    });
    
    setData(formattedData);
  }, [students, dates]);

  useEffect(() => {
    if (homeworks) {
      const formattedHomeworks = homeworks.map(hw => ({
        lessonId: hw.id,
        date: dates.find(d => d.id === hw.id)?.date,
        hasHomework: hw.homework_id !== null
      }));
      setHomeworksList(formattedHomeworks);
    }
  }, [homeworks, dates]);

  const openHomeworkModal = (lessonId, mode = 'add') => {
    if (mode === 'view') {
      const homework = homeworks.find(hw => hw.id === lessonId);
      if (homework) {
        setHomeworkViewData({
          text: homework.description,
          files: homework.files || []
        });
      }
    }
    setSelectedLessonForHomework(lessonId);
    setHomeworkModalMode(mode);
    setIsHomeworkModalOpen(true);
  };

  const closeHomeworkModal = () => {
    setIsHomeworkModalOpen(false);
    setSelectedLessonForHomework(null);
    setHomeworkViewData(null);
    setHomeworkModalMode('add');
  };
  

  const handleClickOutside = (event) => {
    if (editingCell && tableRef.current && !tableRef.current.contains(event.target)) {
      setEditingCell(null);
    }
  };

// Изменения в handleHomeworkSubmit (JournalTable.js)
const handleHomeworkSubmit = async (homeworkData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('lesson', selectedLessonForHomework);
      formData.append('description', homeworkData.text);
      
      // Добавляем все файлы
      homeworkData.files.forEach(file => {
        formData.append('files', file);
      });

      const response = await FetchWithAuth('http://127.0.0.1:8000/diary/homeworks/', {
        method: 'POST',
        body: formData
      });

      if (response) {
        // Обновляем список домашних заданий
        const updatedHomeworks = [...homeworksList];
        const homeworkIndex = updatedHomeworks.findIndex(hw => hw.lessonId === selectedLessonForHomework);
        
        if (homeworkIndex >= 0) {
          updatedHomeworks[homeworkIndex].hasHomework = true;
        } else {
          updatedHomeworks.push({
            lessonId: selectedLessonForHomework,
            date: dates.find(d => d.id === selectedLessonForHomework)?.date,
            hasHomework: true
          });
        }
        
        setHomeworksList(updatedHomeworks);
      }
    } catch (err) {
      setError('Ошибка при сохранении домашнего задания');
      console.error('Error saving homework:', err);
    } finally {
      setLoading(false);
      closeHomeworkModal();
    }
  };

  const hasHomework = (lessonId) => {
    const homework = homeworksList.find(hw => hw.lessonId === lessonId);
    return homework?.hasHomework || false;
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

  const handleGradeSubmit = async (studentId, date) => {
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

    try {
      setLoading(true);
      setError(null);
      
      const lesson = dates.find(d => d.date === date);
      if (!lesson) {
        throw new Error('Урок не найден');
      }
      
      const response = await FetchWithAuth('http://127.0.0.1:8000/diary/current-marks/create/', {
        method: 'POST',
        body: JSON.stringify({
          mark: grade,
          lesson: lesson.id,
          student: studentId,
          quarter_number: quarter
        })
      });

      if (!response) {
        throw new Error('Не удалось сохранить оценку');
      }
      
      setData(prevData =>
        prevData.map(student => {
          if (student.id === studentId) {
            const updatedGrades = [...(student.grades[date] || [])];
            updatedGrades.push({
              id: response.id || Date.now(),
              mark: grade
            });

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
    } catch (err) {
      setError(err.message || 'Ошибка при сохранении оценки');
      console.error('Error saving grade:', err);
    } finally {
      setEditingCell(null);
      setNewGrade('');
      setLoading(false);
    }
  };

  const handleDeleteGrade = async (studentId, date, gradeIndex) => {
    try {
      setLoading(true);
      setError(null);
      
      const student = data.find(s => s.id === studentId);
      const gradeToDelete = student.grades[date][gradeIndex];
      
      const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/marks/${gradeToDelete.id}/`, {
        method: 'DELETE'
      });

      if (!response) {
        throw new Error('Не удалось удалить оценку');
      }
      
      setData(prevData =>
        prevData.map(student => {
          if (student.id === studentId) {
            const updatedGrades = [...(student.grades[date] || [])];
            updatedGrades.splice(gradeIndex, 1);

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
    } catch (err) {
      setError(err.message || 'Ошибка при удалении оценки');
      console.error('Error deleting grade:', err);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  return (
    <>
      <table className={styles.journalTable} ref={tableRef}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>№</th>
            <th className={styles.headerCell}>Ученик</th>
            {dates.map((dateObj, idx) => (
              <th
                key={dateObj.id}
                className={`${styles.headerCell} ${idx === 2 ? styles.highlightedDate : ''}`}
                title={dateObj.date}
              >
                {dateObj.date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.dataCell}></td>
            <td className={`${styles.dataCell} ${styles.homework}`}>Домашнее задание</td>
            {dates.map((dateObj) => (
              <td
                key={dateObj.id}
                className={styles.dataCell}
                onClick={() => hasHomework(dateObj.id) 
                  ? openHomeworkModal(dateObj.id, 'view') 
                  : openHomeworkModal(dateObj.id)
                }
                style={{ cursor: 'pointer' }}
              >
                {hasHomework(dateObj.id) && <PaperclipIcon />}
              </td>
            ))}
          </tr>

          {data.map((row, idx) => (
            <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td className={styles.dataCell}>{idx + 1}</td>
              <td className={styles.dataCell}>{row.student}</td>
              {dates.map((dateObj) => {
                const grades = (row.grades && row.grades[dateObj.date]) ? row.grades[dateObj.date] : [];
                const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === dateObj.date;
                return (
                  <td
                    key={dateObj.id}
                    className={styles.dataCell}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCellClick(row.id, dateObj.date);
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
                          onKeyDown={(event) => handleKeyDown(event, row.id, dateObj.date)}
                          pattern="[2-5]"
                        />
                        <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, dateObj.date)}>OK</button>
                      </div>
                    ) : (
                      grades.map((grade, index) => (
                        <div key={index} className={styles.gradeContainer}>
                          <span
                            className={styles.grade}
                            style={{ backgroundColor: getGradeColor(grade.mark) }}
                          >
                            {grade.mark}
                          </span>
                          <button
                            className={styles.deleteButton}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteGrade(row.id, dateObj.date, index);
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
        onSubmit={handleHomeworkSubmit}
        mode={homeworkModalMode}
        homeworkData={homeworkViewData}/>
    </>
  );
};

export default JournalTable;