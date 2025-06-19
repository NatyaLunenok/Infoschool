import React from 'react';
import styles from './Diary.module.css';

const DiaryTable = () => {
  // Функция для определения цвета оценки
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
  // Функция-заглушка для обработки клика по ДЗ
  const handleHomeworkClick = (e) => {
    e.preventDefault();
    // Здесь будет логика открытия окна с ДЗ
    console.log('Homework clicked');
  };

  // Данные расписания с домашними заданиями и несколькими оценками
  const scheduleData = [
    {
      day: 'Пн, 24 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Русский язык', 
          room: 'каб. 204', 
          homework: 'Упр. 45-46',
          grades: [4, 5] 
        },
        { 
          number: 2, 
          subject: 'Технология', 
          room: 'каб. 204',
          homework: 'Проект до 30.03'
        },
        { 
          number: 3, 
          subject: 'Физкультура', 
          room: 'Большой зал' 
        },
      ],
    },
    {
      day: 'Вт, 25 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Английский язык', 
          room: 'каб. 102',
          homework: 'Урок 7, слова'
        },
        { 
          number: 2, 
          subject: 'ИЗО', 
          room: 'каб. 101',
          homework: 'Рисунок на тему "Весна"'
        },
        { 
          number: 3, 
          subject: 'Математика', 
          room: 'каб. 204',
          grades: [5, 4, 5],
          homework: '№ 125-128'
        },
      ],
    },
    {
      day: 'Ср, 26 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Русский язык', 
          room: 'каб. 204',
          homework: 'Сочинение'
        },
        { 
          number: 2, 
          subject: 'Литература', 
          room: 'каб. 204',
          homework: 'Читать главу 5'
        },
      ],
    },
    {
      day: 'Чт, 27 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Математика', 
          room: 'каб. 204', 
          grades: [5, 5],
          homework: 'Подготовка к контрольной'
        },
        { 
          number: 2, 
          subject: 'Окружающий мир', 
          room: 'каб. 204', 
          grades: [2],
          homework: 'Доклад о природе'
        },
        { 
          number: 3, 
          subject: 'Английский язык', 
          room: 'каб. 102',
          homework: 'Грамматические упражнения'
        },
        { 
          number: 4, 
          subject: 'Музыка', 
          room: 'каб. 215' 
        },
      ],
    },
    {
      day: 'Пт, 28 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Литература', 
          room: 'каб. 204', 
          grades: [3],
          homework: 'Анализ стихотворения'
        },
        { 
          number: 2, 
          subject: 'Физкультура', 
          room: 'Малый зал' 
        },
        { 
          number: 3, 
          subject: 'Математика', 
          room: 'каб. 204',
          homework: 'Повторить формулы'
        },
      ],
    },
    {
      day: 'Сб, 29 марта',
      lessons: [
        { 
          number: 1, 
          subject: 'Нет уроков', 
          room: '' 
        },
      ],
    },
  ];

  return (
    <div className={styles.diaryContainer}>
        <div className={styles.header}>
            <button className={styles.arrowButton}>←</button>
            <h2 className={styles.weekTitle}>24 - 30 марта 2025</h2>
            <button className={styles.arrowButton}>→</button>
      </div>
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
                        {lesson.homework && (
                          <a 
                            href="#" 
                            className={styles.homeworkLink}
                            onClick={handleHomeworkClick}
                          >
                            ДЗ
                          </a>
                        )}
                      </div>
                      <div className={styles.lessonRoom}>{lesson.room}</div>
                    </td>
                    <td className={styles.lessonGrade}>
                      {lesson.grades?.map((grade, gradeIndex) => (
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
                        {lesson.homework && (
                          <a 
                            href="#" 
                            className={styles.homeworkLink}
                            onClick={handleHomeworkClick}
                          >
                            ДЗ
                          </a>
                        )}
                      </div>
                      <div className={styles.lessonRoom}>{lesson.room}</div>
                    </td>
                    <td className={styles.lessonGrade}>
                      {lesson.grades?.map((grade, gradeIndex) => (
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