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

  // Получаем текущую дату в формате YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    const formattedData = students
      .map(student => {
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
          lastName: student.last_name,
          firstName: student.first_name,
          grades: gradesByDate
        };
      })
      .sort((a, b) => {
        const lastNameCompare = a.lastName.localeCompare(b.lastName);
        if (lastNameCompare !== 0) return lastNameCompare;
        return a.firstName.localeCompare(b.firstName);
      });
    
    setData(formattedData);
  }, [students, dates]);

useEffect(() => {
  const formattedHomeworks = Array.isArray(homeworks) 
    ? homeworks.map(hw => ({
        lessonId: hw.id,
        date: dates.find(d => d.id === hw.id)?.date,
        hasHomework: hw.homework_id !== null
      }))
    : []; // Если homeworks не массив - используем пустой массив
    
  setHomeworksList(formattedHomeworks);
}, [homeworks, dates]);

  const openHomeworkModal = async (lessonId, mode = 'add') => {
    setSelectedLessonForHomework(lessonId);
    setHomeworkModalMode(mode);
    
    if (mode === 'view') {
      try {
        setLoading(true);
        const homework = homeworks.find(hw => hw.id === lessonId);
        if (!homework || !homework.homework_id) {
          throw new Error('Домашнее задание не найдено');
        }

        const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/homework/${homework.homework_id}/`);
        
        if (response) {
          setHomeworkViewData({
            text: response.description,
            files: response.files.map(file => ({
              id: file.id,
              url: file.file_url,
              name: file.file_name
            })),
            lessonInfo: {
              date: response.lesson.date,
              subject: response.lesson.subject_name,
              teacher: response.lesson.teacher_name
            }
          });
        }
      } catch (err) {
        setError('Ошибка при загрузке домашнего задания');
        console.error('Error fetching homework:', err);
      } finally {
        setLoading(false);
      }
    }
    
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

  const handleHomeworkSubmit = async (homeworkData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('lesson', selectedLessonForHomework);
      formData.append('description', homeworkData.text);
      
      homeworkData.files.forEach(file => {
        formData.append('files', file);
      });

      const response = await FetchWithAuth('http://127.0.0.1:8000/diary/homework/', {
        method: 'POST',
        body: formData
      });

      if (response) {
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
  if (!Array.isArray(homeworks)) return false; // Защита от не-массивов
  
  const homework = homeworks.find(hw => hw.id === lessonId);
  return homework?.homework_id !== null && homework?.homework_id !== undefined;
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

//   return (
//     <>
//     <div className={styles.tableContainer}>
//       <table className={styles.journalTable} ref={tableRef}>
//         <colgroup>
//           <col />
//           <col style={{ width: '500px' }} />
//           {dates.map((dateObj) => (
//             <col key={`col-${dateObj.id}`} style={{ width: '200px' }} />
//           ))}
//         </colgroup>
//         <thead>
//           <tr className={styles.headerRow}>
//             <th className={styles.headerCell}>№</th>
//             <th className={styles.headerCell} style={{ textAlign: 'left', paddingLeft: '15px' }}>Ученик</th>
//             {dates.map((dateObj) => (
//               <th
//                 key={dateObj.id}
//                 className={`${styles.headerCell} ${dateObj.date === currentDate ? styles.highlightedDate : ''}`}
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
//             <td className={`${styles.dataCell} ${styles.homework}`} style={{ textAlign: 'left', paddingLeft: '15px' }}>Домашнее задание</td>
//             {dates.map((dateObj) => (
//               <td
//                 key={dateObj.id}
//                 className={styles.dataCell}
//                 onClick={() => hasHomework(dateObj.id) 
//                   ? openHomeworkModal(dateObj.id, 'view') 
//                   : openHomeworkModal(dateObj.id)
//                 }
//                 style={{ cursor: 'pointer' }}
//               >
//                 {hasHomework(dateObj.id) && <PaperclipIcon />}
//               </td>
//             ))}
//           </tr>

//           {data.map((row, idx) => (
//             <tr key={row.id} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
//               <td className={styles.dataCell}>{idx + 1}</td>
//               <td className={styles.dataCell} style={{ textAlign: 'left', paddingLeft: '15px' }}>{row.student}</td>
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
//           </div>

//       <HomeworkModal
//         isOpen={isHomeworkModalOpen}
//         onClose={closeHomeworkModal}
//         onSubmit={handleHomeworkSubmit}
//         mode={homeworkModalMode}
//         homeworkData={homeworkViewData}/>
//     </>
//   );
// };
// В компоненте JournalTable обновите JSX:
return (
  <>
    <div className={styles.tableWrapper}>
      <div className={styles.fixedColumn}>
        <table className={styles.fixedTable}>
          <colgroup>
            <col style={{ width: '50px' }} />
            <col style={{ width: '300px' }} />
          </colgroup>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>№</th>
              <th className={styles.headerCell} style={{ textAlign: 'left', paddingLeft: '15px' }}>Ученик</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.dataCell}></td>
              <td className={`${styles.dataCell} ${styles.homework}`} style={{ textAlign: 'left', paddingLeft: '15px' }}>
                Домашнее задание
              </td>
            </tr>
            {data.map((row, idx) => (
              <tr key={`fixed-${row.id}`} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.dataCell}>{idx + 1}</td>
                <td className={styles.dataCell} style={{ textAlign: 'left', paddingLeft: '15px' }}>
                  {row.student}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles.scrollableContent}>
        <table className={styles.scrollableTable}>
          <colgroup>
            {dates.map((dateObj) => (
              <col key={`col-${dateObj.id}`} style={{ width: '200px' }} />
            ))}
          </colgroup>
          <thead>
            <tr className={styles.headerRow}>
              {dates.map((dateObj) => (
                <th
                  key={`header-${dateObj.id}`}
                  className={`${styles.headerCell} ${dateObj.date === currentDate ? styles.highlightedDate : ''}`}
                  title={dateObj.date}
                >
                  {dateObj.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {dates.map((dateObj) => (
                <td
                  key={`hw-${dateObj.id}`}
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
              <tr key={`scroll-${row.id}`} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                {dates.map((dateObj) => {
                  const grades = (row.grades && row.grades[dateObj.date]) ? row.grades[dateObj.date] : [];
                  const isEditing = editingCell && editingCell.studentId === row.id && editingCell.date === dateObj.date;
                  return (
                    <td
                      key={`grade-${dateObj.id}`}
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
                          <button className={styles.gradeButton} onClick={() => handleGradeSubmit(row.id, dateObj.date)}>
                            OK
                          </button>
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
      </div>
    </div>

    <HomeworkModal
      isOpen={isHomeworkModalOpen}
      onClose={closeHomeworkModal}
      onSubmit={handleHomeworkSubmit}
      mode={homeworkModalMode}
      homeworkData={homeworkViewData}
    />
  </>
)};
export default JournalTable;