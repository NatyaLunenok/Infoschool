import { useState, useEffect } from 'react';
import styles from '../Schedule/Schedule.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const ScheduleClass = ({ classId }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Функция для получения дат недели
  const getWeekDates = (date) => {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1));
    
    return Array.from({ length: 6 }).map((_, index) => {
      const day = new Date(startDate);
      day.setDate(day.getDate() + index);
      return day;
    });
  };

  // Функция для загрузки расписания класса
  const fetchClassSchedule = async (date) => {
    try {
      if (!classId) return;
      
      setLoading(true);
      setError(null);
      
      const weekDates = getWeekDates(date);
      
      const schedulePromises = weekDates.map(day => {
        const formattedDate = day.toISOString().split('T')[0];
        return FetchWithAuth(
          `http://127.0.0.1:8000/diary/class-schedule/?class_id=${classId}&date=${formattedDate}`
        );
      });

      const responses = await Promise.all(schedulePromises);
      
      const formattedData = formatScheduleData(responses, weekDates);
      setScheduleData(formattedData);
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке расписания класса');
      console.error('Error fetching class schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  // Функция для преобразования данных с сервера в нужный формат
  const formatScheduleData = (weekSchedule, weekDates) => {
    const allLessons = [];
    
    weekSchedule.forEach((daySchedule, dayIndex) => {
      const date = weekDates[dayIndex];
      const dateKey = date.toISOString().split('T')[0];
      
      if (daySchedule && daySchedule[dateKey]) {
        daySchedule[dateKey].forEach(lesson => {
          allLessons.push({
            ...lesson,
            dayIndex,
            date: dateKey
          });
        });
      }
    });

    // Группируем по номеру урока
    const lessonsByNumber = {};
    
    // Создаем пустые записи для всех возможных уроков (1-8)
    for (let i = 1; i <= 8; i++) {
      lessonsByNumber[i] = Array(6).fill(null);
    }
    
    // Заполняем данными, если они есть
    allLessons.forEach(lesson => {
      if (lessonsByNumber[lesson.lesson_number]) {
        lessonsByNumber[lesson.lesson_number][lesson.dayIndex] = {
          subject: lesson.subject_name,
          teacher: lesson.teacher_name,
          room: `каб. ${lesson.classroom_number}`,
          homeworkId: lesson.homework_id
        };
      }
    });

    // Преобразуем в массив для отображения
    return Object.keys(lessonsByNumber).map(lessonNumber => ({
      lesson: lessonNumber,
      time: getLessonTime(parseInt(lessonNumber)),
      days: lessonsByNumber[lessonNumber]
    }));
  };

  // Функция для получения времени урока по его номеру
  const getLessonTime = (lessonNumber) => {
    const lessonTimes = [
      '08:00 - 08:40',
      '08:55 - 09:35',
      '09:55 - 10:35',
      '10:50 - 11:30',
      '11:45 - 12:25',
      '12:30 - 13:10',
      '13:25 - 14:05',
      '14:20 - 15:00'
    ];
    return lessonTimes[lessonNumber - 1] || '';
  };

  // Навигация по неделям
  const prevWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  // Получаем даты текущей недели
  const currentWeekDates = getWeekDates(currentWeek);
  
  // Форматируем дни недели для отображения
  const formattedDaysOfWeek = currentWeekDates.map((date, index) => ({
    day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][index],
    date: date.toLocaleDateString('ru-RU')
  }));

  // Формируем заголовок недели
  const weekTitle = `${currentWeekDates[0].toLocaleDateString('ru-RU')} - ${currentWeekDates[5].toLocaleDateString('ru-RU')}`;

  // Загружаем расписание при изменении текущей недели или classId
  useEffect(() => {
    fetchClassSchedule(currentWeek);
  }, [currentWeek, classId]);

  if (loading) return <div className={styles.loading}>Загрузка расписания...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.arrowButton} onClick={prevWeek}>←</button>
        <h2 className={styles.weekTitle}>{weekTitle}</h2>
        <button className={styles.arrowButton} onClick={nextWeek}>→</button>
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th className={styles.lessonHeader}>Урок</th>
              <th className={styles.timeHeader}>Время</th>
              {formattedDaysOfWeek.map((day, index) => (
                <th key={index} className={styles.dayHeader}>
                  <div>{day.day}</div>
                  <div>{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={styles.lessonCell}>{row.lesson}</td>
                <td className={styles.timeCell}>{row.time}</td>
                {row.days.map((day, dayIndex) => (
                  <td key={dayIndex} className={styles.dayCell}>
                    {day ? (
                      <>
                        <div>{day.subject}</div>
                        <div>{day.teacher}</div>
                        <div>{day.room}</div>
                        {day.homeworkId && (
                          <a 
                            href="#" 
                            className={styles.homeworkLink}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Homework clicked', day.homeworkId);
                            }}
                          >
                            ДЗ
                          </a>
                        )}
                      </>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleClass;