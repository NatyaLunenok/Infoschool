import { useState, useEffect } from 'react';
import styles from './Diary.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';
import HomeworkModal from '../../ModalWindows/HomeworkModal/HomeworkModal';

const DiaryTable = ({ username }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [classId, setClassId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [homeworkViewData, setHomeworkViewData] = useState(null);
  const [homeworkLoading, setHomeworkLoading] = useState(false);
  const [homeworkError, setHomeworkError] = useState(null);
  // Функция для открытия модального окна с ДЗ
  const openHomeworkModal = async (homeworkId) => {
    if (!homeworkId) return;
    
    try {
      setHomeworkLoading(true);
      setHomeworkError(null);
      
      const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/homework/${homeworkId}/`);
      
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
        setIsHomeworkModalOpen(true);
      }
    } catch (err) {
      setHomeworkError('Ошибка при загрузке домашнего задания');
      console.error('Error fetching homework:', err);
    } finally {
      setHomeworkLoading(false);
    }
  };

  // Обработчик клика по ДЗ (обновленный)
  const handleHomeworkClick = async (e, homeworkId) => {
    e.preventDefault();
    await openHomeworkModal(homeworkId);
  };

  // Закрытие модального окна
  const closeHomeworkModal = () => {
    setIsHomeworkModalOpen(false);
    setHomeworkViewData(null);
  };

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
// В начале компонента DiaryTable, перед вызовом fetchUserData
useEffect(() => {
  if (!username) {
    setError('Не удалось определить пользователя');
    setLoading(false);
    return;
  }
  
  const loadData = async () => {
    if (!classId) {
      await fetchUserData();
    } else {
      await processData();
    }
  };
  
  loadData();
}, [currentWeek, classId, username]); // Добавляем username в зависимости

  // Загрузка данных пользователя
const fetchUserData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    if (!username) {
      throw new Error('Имя пользователя не определено');
    }
    
    const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/full-name/?username=${username}`);
    
    if (!response) {
      throw new Error('Не удалось загрузить данные пользователя');
    }
    
    if (response.student_id) {
      setStudentId(response.student_id);
      setClassId(response.class_id);
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
      
      if (!response) {
        throw new Error('Не удалось загрузить расписание');
      }
      
      return response;
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
      
      if (!response) {
        throw new Error('Не удалось загрузить оценки');
      }
      
      return response;
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

  // // Формирование заголовка недели
  // const { startDate, endDate } = getWeekDates(currentWeek);
  // const weekTitle = `${startDate.getDate()} - ${endDate.getDate()} ${[
  //   'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  //   'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  // ][endDate.getMonth()]} ${endDate.getFullYear()}`;

  // Формирование заголовка недели
const { startDate, endDate } = getWeekDates(currentWeek);
const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const weekTitle = startDate.getMonth() === endDate.getMonth() 
  ? `${startDate.getDate()} - ${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`
  : `${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
  
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
      <HomeworkModal
        isOpen={isHomeworkModalOpen}
        onClose={closeHomeworkModal}
        mode="view"
        homeworkData={homeworkViewData}
      />
    </div>
  );
};

export default DiaryTable;