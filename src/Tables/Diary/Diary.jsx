// import React from 'react';
// import styles from './Diary.module.css';

// const DiaryTable = () => {
//   // Функция для определения цвета оценки
//   const getGradeColor = (grade) => {
//     if (!grade) return 'transparent';
//     switch (grade) {
//       case 5: return '#C8E6C9';
//       case 4: return '#DCEDC8';
//       case 3: return '#FFF9C4';
//       case 2: return '#FFCDD2';
//       default: return 'transparent';
//     }
//   };
//   // Функция-заглушка для обработки клика по ДЗ
//   const handleHomeworkClick = (e) => {
//     e.preventDefault();
//     // Здесь будет логика открытия окна с ДЗ
//     console.log('Homework clicked');
//   };

//   // Данные расписания с домашними заданиями и несколькими оценками
//   const scheduleData = [
//     {
//       day: 'Пн, 24 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Русский язык', 
//           room: 'каб. 204', 
//           homework: 'Упр. 45-46',
//           grades: [4, 5] 
//         },
//         { 
//           number: 2, 
//           subject: 'Технология', 
//           room: 'каб. 204',
//           homework: 'Проект до 30.03'
//         },
//         { 
//           number: 3, 
//           subject: 'Физкультура', 
//           room: 'Большой зал' 
//         },
//       ],
//     },
//     {
//       day: 'Вт, 25 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Английский язык', 
//           room: 'каб. 102',
//           homework: 'Урок 7, слова'
//         },
//         { 
//           number: 2, 
//           subject: 'ИЗО', 
//           room: 'каб. 101',
//           homework: 'Рисунок на тему "Весна"'
//         },
//         { 
//           number: 3, 
//           subject: 'Математика', 
//           room: 'каб. 204',
//           grades: [5, 4, 5],
//           homework: '№ 125-128'
//         },
//       ],
//     },
//     {
//       day: 'Ср, 26 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Русский язык', 
//           room: 'каб. 204',
//           homework: 'Сочинение'
//         },
//         { 
//           number: 2, 
//           subject: 'Литература', 
//           room: 'каб. 204',
//           homework: 'Читать главу 5'
//         },
//       ],
//     },
//     {
//       day: 'Чт, 27 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Математика', 
//           room: 'каб. 204', 
//           grades: [5, 5],
//           homework: 'Подготовка к контрольной'
//         },
//         { 
//           number: 2, 
//           subject: 'Окружающий мир', 
//           room: 'каб. 204', 
//           grades: [2],
//           homework: 'Доклад о природе'
//         },
//         { 
//           number: 3, 
//           subject: 'Английский язык', 
//           room: 'каб. 102',
//           homework: 'Грамматические упражнения'
//         },
//         { 
//           number: 4, 
//           subject: 'Музыка', 
//           room: 'каб. 215' 
//         },
//       ],
//     },
//     {
//       day: 'Пт, 28 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Литература', 
//           room: 'каб. 204', 
//           grades: [3],
//           homework: 'Анализ стихотворения'
//         },
//         { 
//           number: 2, 
//           subject: 'Физкультура', 
//           room: 'Малый зал' 
//         },
//         { 
//           number: 3, 
//           subject: 'Математика', 
//           room: 'каб. 204',
//           homework: 'Повторить формулы'
//         },
//       ],
//     },
//     {
//       day: 'Сб, 29 марта',
//       lessons: [
//         { 
//           number: 1, 
//           subject: 'Нет уроков', 
//           room: '' 
//         },
//       ],
//     },
//   ];

//   return (
//     <div className={styles.diaryContainer}>
//         <div className={styles.header}>
//             <button className={styles.arrowButton}>←</button>
//             <h2 className={styles.weekTitle}>24 - 30 марта 2025</h2>
//             <button className={styles.arrowButton}>→</button>
//       </div>
//       <div className={styles.weekRow}>
//         {scheduleData.slice(0, 3).map((daySchedule, index) => (
//           <div key={index} className={styles.dayContainer}>
//             <h2 className={styles.dayTitle}>{daySchedule.day}</h2>
//             <table className={styles.lessonTable}>
//               <tbody>
//                 {daySchedule.lessons.map((lesson, lessonIndex) => (
//                   <tr key={lessonIndex} className={styles.lessonRow}>
//                     <td className={styles.lessonNumber}>{lesson.number}</td>
//                     <td className={styles.lessonSubject}>
//                       <div className={styles.subjectLine}>
//                         <span className={styles.subjectText}>{lesson.subject}</span>
//                         {lesson.homework && (
//                           <a 
//                             href="#" 
//                             className={styles.homeworkLink}
//                             onClick={handleHomeworkClick}
//                           >
//                             ДЗ
//                           </a>
//                         )}
//                       </div>
//                       <div className={styles.lessonRoom}>{lesson.room}</div>
//                     </td>
//                     <td className={styles.lessonGrade}>
//                       {lesson.grades?.map((grade, gradeIndex) => (
//                         <span 
//                           key={gradeIndex}
//                           className={styles.gradeCircle}
//                           style={{ backgroundColor: getGradeColor(grade) }}
//                         >
//                           {grade}
//                         </span>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
      
//      <div className={styles.weekRow}>
//         {scheduleData.slice(3, 6).map((daySchedule, index) => (
//           <div key={index + 3} className={styles.dayContainer}>
//             <h2 className={styles.dayTitle}>{daySchedule.day}</h2>
//             <table className={styles.lessonTable}>
//               <tbody>
//                 {daySchedule.lessons.map((lesson, lessonIndex) => (
//                   <tr key={lessonIndex} className={styles.lessonRow}>
//                     <td className={styles.lessonNumber}>{lesson.number}</td>
//                     <td className={styles.lessonSubject}>
//                       <div className={styles.subjectLine}>
//                         <span className={styles.subjectText}>{lesson.subject}</span>
//                         {lesson.homework && (
//                           <a 
//                             href="#" 
//                             className={styles.homeworkLink}
//                             onClick={handleHomeworkClick}
//                           >
//                             ДЗ
//                           </a>
//                         )}
//                       </div>
//                       <div className={styles.lessonRoom}>{lesson.room}</div>
//                     </td>
//                     <td className={styles.lessonGrade}>
//                       {lesson.grades?.map((grade, gradeIndex) => (
//                         <span 
//                           key={gradeIndex}
//                           className={styles.gradeCircle}
//                           style={{ backgroundColor: getGradeColor(grade) }}
//                         >
//                           {grade}
//                         </span>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiaryTable;


import React, { useState, useEffect } from 'react';
import styles from './Diary.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const DiaryTable = ({ username }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [classId, setClassId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения дат начала и конца недели
  const getWeekDates = (date) => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)); // Начало с понедельника
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return { startDate, endDate };
  };

  // Форматирование даты для API (YYYY-MM-DD)
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Форматирование даты для отображения (Пн, 24 марта)
  const formatDisplayDate = (date) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Получение цвета для оценки
  const getGradeColor = (grade) => {
    if (!grade) return 'transparent';
    switch (grade) {
      case 5: return '#C8E6C9';
      case 4: return '#DCEDC8';
      case 3: return '#FFF9C4';
      case 2: return '#FFCDD2';
      default: return 'transparent';
    }
  };

  // Обработчик клика по ДЗ
  const handleHomeworkClick = (e, homeworkId) => {
    e.preventDefault();
    if (homeworkId) {
      // Логика открытия окна с ДЗ
      console.log('Homework clicked', homeworkId);
    }
  };

  // Навигация по неделям
  const handlePrevWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  // Загрузка данных пользователя
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/full-name/?username=${username}`);
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные пользователя');
      }
      
      const userData = await response.json();
      
      if (userData.student_id) {
        setStudentId(userData.student_id);
        setClassId(userData.class_id);
      } else {
        throw new Error('Дневник доступен только для учеников');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке данных пользователя');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка расписания
  const fetchScheduleData = async () => {
    if (!classId) return {};
    
    try {
      const { startDate } = getWeekDates(currentWeek);
      const dateParam = formatDate(startDate);
      
      const response = await FetchWithAuth(
        `http://127.0.0.1:8000/diary/class-schedule/?class_id=${classId}&date=${dateParam}`
      );
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить расписание');
      }
      
      return await response.json();
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке расписания');
      console.error(err);
      return {};
    }
  };

  // Загрузка оценок
  const fetchMarksData = async () => {
    if (!studentId) return {};
    
    try {
      const { startDate } = getWeekDates(currentWeek);
      const dateParam = formatDate(startDate);
      
      const response = await FetchWithAuth(
        `http://127.0.0.1:8000/diary/student-marks/?student_id=${studentId}&date=${dateParam}`
      );
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить оценки');
      }
      
      return await response.json();
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке оценок');
      console.error(err);
      return {};
    }
  };

  // Обработка и объединение данных
  const processData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [schedule, marks] = await Promise.all([
        fetchScheduleData(),
        fetchMarksData()
      ]);
      
      const { startDate } = getWeekDates(currentWeek);
      const weekDays = [];
      
      // Создаем данные для каждого дня недели
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = formatDate(date);
        
        const daySchedule = schedule[dateStr] || [];
        const dayMarks = marks[dateStr] || {};
        
        const lessons = daySchedule.map(lesson => {
          const subjectMarks = dayMarks[lesson.subject_name] || [];
          return {
            number: lesson.lesson_number,
            subject: lesson.subject_name,
            room: `каб. ${lesson.classroom_number}`,
            teacher: lesson.teacher_name,
            homeworkId: lesson.homework_id,
            grades: subjectMarks.map(m => m.mark)
          };
        });
        
        // Добавляем "Нет уроков" если уроков нет (кроме воскресенья)
        if (lessons.length === 0 && i < 6) {
          lessons.push({
            number: 1,
            subject: 'Нет уроков',
            room: '',
            teacher: '',
            homeworkId: null,
            grades: []
          });
        }
        
        weekDays.push({
          day: formatDisplayDate(date),
          lessons
        });
      }
      
      setScheduleData(weekDays);
    } catch (err) {
      setError(err.message || 'Ошибка при обработке данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных при монтировании и изменении недели/класса
  useEffect(() => {
    const loadData = async () => {
      if (!classId) {
        await fetchUserData();
      } else {
        await processData();
      }
    };
    
    loadData();
  }, [currentWeek, classId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  // Формирование заголовка недели
  const { startDate, endDate } = getWeekDates(currentWeek);
  const weekTitle = `${startDate.getDate()} - ${endDate.getDate()} ${[
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ][endDate.getMonth()]} ${endDate.getFullYear()}`;

  return (
    <div className={styles.diaryContainer}>
      <div className={styles.header}>
        <button className={styles.arrowButton} onClick={handlePrevWeek}>←</button>
        <h2 className={styles.weekTitle}>{weekTitle}</h2>
        <button className={styles.arrowButton} onClick={handleNextWeek}>→</button>
      </div>
      
      {/* Первые 3 дня недели */}
      <div className={styles.weekRow}>
        {scheduleData.slice(0, 3).map((daySchedule, index) => (
          <div key={index} className={styles.dayContainer}>
            <h2 className={styles.dayTitle}>{daySchedule.day}</h2>
            <table className={styles.lessonTable}>
              <tbody>
                {daySchedule.lessons.map((lesson, lessonIndex) => (
                  <tr key={lessonIndex} className={styles.lessonRow}>
                    <td className={styles.lessonNumber}>{lesson.number}</td>
                    <td className={styles.lessonSubject}>
                      <div className={styles.subjectLine}>
                        <span className={styles.subjectText}>{lesson.subject}</span>
                        {lesson.homeworkId && (
                          <a 
                            href="#" 
                            className={styles.homeworkLink}
                            onClick={(e) => handleHomeworkClick(e, lesson.homeworkId)}
                          >
                            ДЗ
                          </a>
                        )}
                      </div>
                      <div className={styles.lessonRoom}>{lesson.room}</div>
                    </td>
                    <td className={styles.lessonGrade}>
                      {lesson.grades.map((grade, gradeIndex) => (
                        <span 
                          key={gradeIndex}
                          className={styles.gradeCircle}
                          style={{ backgroundColor: getGradeColor(grade) }}
                        >
                          {grade}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      
      {/* Последние 3 дня недели */}
      <div className={styles.weekRow}>
        {scheduleData.slice(3, 6).map((daySchedule, index) => (
          <div key={index + 3} className={styles.dayContainer}>
            <h2 className={styles.dayTitle}>{daySchedule.day}</h2>
            <table className={styles.lessonTable}>
              <tbody>
                {daySchedule.lessons.map((lesson, lessonIndex) => (
                  <tr key={lessonIndex} className={styles.lessonRow}>
                    <td className={styles.lessonNumber}>{lesson.number}</td>
                    <td className={styles.lessonSubject}>
                      <div className={styles.subjectLine}>
                        <span className={styles.subjectText}>{lesson.subject}</span>
                        {lesson.homeworkId && (
                          <a 
                            href="#" 
                            className={styles.homeworkLink}
                            onClick={(e) => handleHomeworkClick(e, lesson.homeworkId)}
                          >
                            ДЗ
                          </a>
                        )}
                      </div>
                      <div className={styles.lessonRoom}>{lesson.room}</div>
                    </td>
                    <td className={styles.lessonGrade}>
                      {lesson.grades.map((grade, gradeIndex) => (
                        <span 
                          key={gradeIndex}
                          className={styles.gradeCircle}
                          style={{ backgroundColor: getGradeColor(grade) }}
                        >
                          {grade}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryTable;