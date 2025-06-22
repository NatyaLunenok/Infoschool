// // GradeSummaryTable.jsx
// import React from 'react';
// import styles from './GradeSummary.module.css';

// const getGradeColor = (grade) => {
//   const numericGrade = parseFloat(grade.replace(',', '.'));
  
//   if (numericGrade >= 4.5) return '#C8E6C9'; // Зеленый для 5 и близких к 5
//   if (numericGrade >= 3.5) return '#DCEDC8'; // Светло-зеленый для 4
//   if (numericGrade >= 2.5) return '#FFF9C4'; // Желтый для 3
//   if (numericGrade > 0) return '#FFCDD2';    // Красный для 2
  
//   return 'transparent';
// };

// const GradeCell = ({ grade }) => {
//   return (
//     <div 
//       className={styles.gradeContainer}
//       style={{ backgroundColor: grade ? getGradeColor(grade) : 'transparent' }}
//     >
//       {grade}
//     </div>
//   );
// };

// const GradeSummaryTable = () => {
//   const grades = [
//     { subject: 'Русский язык', q1: '5', q2: '4,67', q3: '', q4: '', year: '' },
//     { subject: 'Литература', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//     { subject: 'Математика', q1: '5', q2: '4', q3: '', q4: '', year: '' },
//     { subject: 'Английский язык', q1: '3', q2: '4,33', q3: '', q4: '', year: '' },
//     { subject: 'Информатика', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//     { subject: 'Технология', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//     { subject: 'ИЗО', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//     { subject: 'Окружающий мир', q1: '4', q2: '3,46', q3: '', q4: '', year: '' },
//     { subject: 'Физкультура', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//     { subject: 'Музыка', q1: '5', q2: '5', q3: '', q4: '', year: '' },
//   ];

//   return (
//     <div className={styles.tableContainer}>
//       <table className={styles.gradesTable}>
//         <thead>
//           <tr>
//             <th className={styles.subjectHeader}>Предмет</th>
//             <th>1 четверть</th>
//             <th>2 четверть</th>
//             <th>3 четверть</th>
//             <th>4 четверть</th>
//             <th>Год</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grades.map((grade, index) => (
//             <tr key={index}>
//               <td className={styles.subjectCell}>{grade.subject}</td>
//               <td><GradeCell grade={grade.q1} /></td>
//               <td><GradeCell grade={grade.q2} /></td>
//               <td><GradeCell grade={grade.q3} /></td>
//               <td><GradeCell grade={grade.q4} /></td>
//               <td><GradeCell grade={grade.year} /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GradeSummaryTable;


// GradeSummaryTable.jsx
import React, { useState, useEffect } from 'react';
import styles from './GradeSummary.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const getGradeColor = (grade) => {
  if (!grade) return 'transparent';
  
  const numericGrade = parseFloat(grade.replace(',', '.'));
  
  if (numericGrade >= 4.5) return '#C8E6C9'; // Зеленый для 5 и близких к 5
  if (numericGrade >= 3.5) return '#DCEDC8'; // Светло-зеленый для 4
  if (numericGrade >= 2.5) return '#FFF9C4'; // Желтый для 3
  if (numericGrade > 0) return '#FFCDD2';    // Красный для 2
  
  return 'transparent';
};

const GradeCell = ({ grade }) => {
  return (
    <div 
      className={styles.gradeContainer}
      style={{ backgroundColor: grade ? getGradeColor(grade) : 'transparent' }}
    >
      {grade}
    </div>
  );
};

const GradeSummaryTable = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear()); // Текущий год по умолчанию

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем student_id из данных пользователя
        const userData = await FetchWithAuth('http://127.0.0.1:8000/diary/full-name/?username=' + localStorage.getItem('username'));
        
        if (!userData || !userData.student_id) {
          throw new Error('Не удалось получить данные студента');
        }

        // Загружаем итоговые оценки
        const marksResponse = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/student-final-marks/?student_id=${userData.student_id}&year=${year}`
        );

        // Загружаем список предметов
        const subjectsResponse = await FetchWithAuth('http://127.0.0.1:8000/diary/subject/');

        if (!marksResponse || !subjectsResponse) {
          throw new Error('Не удалось загрузить данные');
        }

        // Формируем данные для таблицы
        const formattedGrades = subjectsResponse.map(subject => {
          const subjectMarks = marksResponse[subject.subject_name] || [];
          
          // Находим оценки по четвертям и годовую
          const quarterMarks = {
            1: '',
            2: '',
            3: '',
            4: '',
            year: ''
          };

          subjectMarks.forEach(mark => {
            if (mark.mark_type === 'Четвертная оценка') {
              quarterMarks[mark.quarter_number] = mark.mark.toString();
            } else if (mark.mark_type === 'Годовая оценка') {
              quarterMarks.year = mark.mark.toString();
            }
          });

          return {
            subject: subject.subject_name,
            q1: quarterMarks[1],
            q2: quarterMarks[2],
            q3: quarterMarks[3],
            q4: quarterMarks[4],
            year: quarterMarks.year
          };
        });

        setGrades(formattedGrades);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.gradesTable}>
        <thead>
          <tr>
            <th className={styles.subjectHeader}>Предмет</th>
            <th>1 четверть</th>
            <th>2 четверть</th>
            <th>3 четверть</th>
            <th>4 четверть</th>
            <th>Год</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td className={styles.subjectCell}>{grade.subject}</td>
              <td><GradeCell grade={grade.q1} /></td>
              <td><GradeCell grade={grade.q2} /></td>
              <td><GradeCell grade={grade.q3} /></td>
              <td><GradeCell grade={grade.q4} /></td>
              <td><GradeCell grade={grade.year} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSummaryTable;