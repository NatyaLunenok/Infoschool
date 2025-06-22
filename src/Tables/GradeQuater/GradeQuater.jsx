import React, { useState, useEffect } from 'react';
import styles from './GradeQuater.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

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

const getAverageColor = (average) => {
  if (average >= 4.5) return '#C8E6C9';
  if (average >= 3.5) return '#DCEDC8';
  if (average >= 2.5) return '#FFF9C4';
  return '#FFCDD2';
};

const GradeQuater1Table = ({ quarter }) => {
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем данные пользователя для получения student_id
        const username = localStorage.getItem('username');
        const userResponse = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/full-name/?username=${username}`
        );

        if (!userResponse || !userResponse.student_id) {
          throw new Error('Не удалось получить данные ученика');
        }

        setStudentId(userResponse.student_id);

        // Получаем список всех предметов
        const subjectsResponse = await FetchWithAuth(
          'http://127.0.0.1:8000/diary/subject/'
        );

        // Получаем оценки для выбранной четверти
        const currentYear = new Date().getFullYear();
        const marksResponse = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/student-quarter-marks/?student_id=${userResponse.student_id}&year=$2024&quarter=${quarter}`
        );

        setSubjects(subjectsResponse);
        setMarksData(marksResponse || {});
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quarter]);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!studentId) {
    return <div className={styles.error}>Доступно только для учеников</div>;
  }

  // Создаем объединенные данные для отображения
  const combinedData = subjects.map(subject => {
    const subjectName = subject.subject_name;
    const marksInfo = marksData[subjectName] || { marks: [], average: null };
    
    return {
      id: subject.id,
      subject: subjectName,
      grades: marksInfo.marks,
      average: marksInfo.average
    };
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.gradesTable}>
        <thead>
          <tr>
            <th className={styles.subjectHeader}>Предмет</th>
            <th className={styles.gradesHeader}>Оценки</th>
            <th className={styles.averageHeader}>Средний балл</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((row) => (
            <tr key={row.id}>
              <td className={styles.subjectCell}>{row.subject}</td>
              <td className={styles.gradesCell}>
                <div className={styles.gradesContainer}>
                  {row.grades.length > 0 ? (
                    row.grades.map((grade, i) => (
                      <span 
                        key={i} 
                        className={styles.gradeBadge}
                        style={{ backgroundColor: getGradeColor(grade) }}
                      >
                        {grade}
                      </span>
                    ))
                  ) : (
                    <span className={styles.noMarks}>—</span>
                  )}
                </div>
              </td>
              <td className={styles.averageCell}>
                {row.average ? (
                  <span 
                    className={styles.averageBadge}
                    style={{ backgroundColor: getAverageColor(row.average) }}
                  >
                    {row.average.toFixed(2)}
                  </span>
                ) : (
                  <span className={styles.noMarks}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeQuater1Table;