import React from 'react';

// Иконка скрепки
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

const data = [
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
  // Добавьте остальные записи по аналогии...
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
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial, sans-serif', margin: '30px'}}>
      <thead>
        <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>№</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ученик</th>
          {dates.map((date, idx) => (
            <th
              key={date}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                backgroundColor: idx === 2 ? '#FFB74D' : '#4CAF50', // Оранжевый для 05.09.25
                cursor: 'pointer',
              }}
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
          <td style={{ padding: '8px', border: '1px solid #ddd' }}></td>
          <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Домашнее задание</td>
          {dates.map((date) => (
            <td
              key={date}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                textAlign: 'center',
              }}
            >
              {(date === '01.09.25' || date === '05.09.25') && <PaperclipIcon />}
            </td>
          ))}
        </tr>

        {/* Строки с учениками */}
        {data.map((row, idx) => (
          <tr key={row.id} style={{ backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white' }}>
            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{idx + 1}</td>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.student}</td>
            {dates.map((date) => {
            const grades = row.grades[date] || [];
            return (
                <td
                key={date}
                style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    verticalAlign: 'top', // чтобы оценки выравнивались сверху ячейки
                }}
                >
                {grades.length > 0
                ? grades.map((grade, i) => (
                    <div
                        key={i}
                        style={{
                        display: 'inline-block',
                        minWidth: '20px',
                        margin: '3px',
                        backgroundColor: getGradeColor(grade),
                        border: grade === 2
                            ? '1px solid #b71c1c' // красный бордер для 2
                            : grade === 3
                            ? '1px solid #FF9800' // оранжевый бордер для 3
                            : '1px solid #4CAF50', // зелёный бордер для остальных
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color:
                            grade === 3
                            ? '#FF9800' // оранжевый текст для 3
                            : grade === 2
                            ? '#b71c1c' // красный текст для 2
                            : '#2e7d32', // зелёный текст для остальных
                        userSelect: 'none',
                        lineHeight: '20px',
                        textAlign: 'center',
                        }}
                    >
                        {grade}
                    </div>
                    ))
                : ''}
                </td>
            );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JournalTable;
