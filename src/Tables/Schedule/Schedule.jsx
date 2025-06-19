import React from 'react';
import styles from './Schedule.module.css';

const Schedule = () => {
  const scheduleData = [
    {
      lesson: '1',
      time: '08:00 - 08:40',
      days: [
        { subject: 'Русский язык', class: '1А', room: 'каб. 47' },
        { subject: 'Литература', class: '1А', room: 'каб. 47' },
        { subject: 'Литература', class: '2Б', room: 'каб. 47' },
        { subject: 'Русский язык', class: '1Б', room: 'каб. 000' },
        { subject: 'Литература', class: '1В', room: 'каб. 47' },
        null,
      ],
    },
    {
      lesson: '2',
      time: '08:55 - 09:35',
      days: [
        { subject: 'Русский язык', class: '1Б', room: 'каб. 47' },
        { subject: 'Литература', class: '1Б', room: 'каб. 47' },
        { subject: 'Русский язык', class: '2Б', room: 'каб. 47' },
        null,
        { subject: 'Русский язык', class: '1Б', room: 'каб. 52' },
        null,
      ],
    },
    {
      lesson: '3',
      time: '09:55 - 10:35',
      days: [
        { subject: 'Литература', class: '1В', room: 'каб. 47' },
        { subject: 'Русский язык', class: '2В', room: 'каб. 47' },
        null,
        { subject: 'Литература', class: '1Б', room: 'каб. 52' },
        null,
        null,
      ],
    },
    {
      lesson: '4',
      time: '10:50 - 11:30',
      days: [
        { subject: 'Литература', class: '1В', room: 'каб. 52' },
        { subject: 'Русский язык', class: '2А', room: 'каб. 47' },
        { subject: 'Русский язык', class: '1А', room: 'каб. 47' },
        null,
        null,
        null,
      ],
    },
    {
      lesson: '5',
      time: '11:45 - 12:25',
      days: [
        { subject: 'Русский язык', class: '1В', room: 'каб. 52' },
        { subject: 'Русский язык', class: '3А', room: 'каб. 52' },
        { subject: 'Русский язык', class: '1Б', room: 'каб. 47' },
        null,
        null,
        null,
      ],
    },
    {
      lesson: '6',
      time: '12:30 - 13:10',
      days: [
        { subject: 'Литература', class: '2А', room: 'каб. 000' },
        { subject: 'Литература', class: '3Б', room: 'каб. 52' },
        { subject: 'Русский язык', class: '1В', room: 'каб. 47' },
        null,
        null,
        null,
      ],
    },
  ];

  const daysOfWeek = [
    { day: 'Пн', date: '24.03.2025' },
    { day: 'Вт', date: '25.03.2025' },
    { day: 'Ср', date: '26.03.2025' },
    { day: 'Чт', date: '27.03.2025' },
    { day: 'Пт', date: '28.03.2025' },
    { day: 'Сб', date: '29.03.2025' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.arrowButton}>←</button>
        <h2 className={styles.weekTitle}>24 - 30 марта 2025</h2>
        <button className={styles.arrowButton}>→</button>
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th className={styles.lessonHeader}>Урок</th>
              <th className={styles.dayHeader}>Время</th>
              {daysOfWeek.map((day, index) => (
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
                <td className={styles.dayCell}>{row.time}</td>
                {row.days.map((day, dayIndex) => (
                  <td key={dayIndex} className={styles.dayCell}>
                    {day ? (
                      <>
                        <div>{day.subject}</div>
                        <div>{day.class}</div>
                        <div>{day.room}</div>
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

export default Schedule;