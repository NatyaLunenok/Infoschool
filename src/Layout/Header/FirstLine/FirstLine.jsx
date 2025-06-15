// import React, { useState, useEffect, useCallback } from 'react'; // <-- Добавлен useCallback
// import styles from './FirstLine.module.css';
// import logo from '../../../images/logo.png';

// const FirstLine = () => {
//     return(
//     <div className={styles.ConteinerFirstLine}>
//         <div className={styles.logo}>
//             <img src={logo} alt="" />
//         </div>
//         <div className={styles.textbox}>
//             <p className={styles.NameUser}>Учитель</p>
//             <button className={styles.ButtonExit}>ВЫХОД</button>
//         </div>
//     </div>
//     );
// };
// export default FirstLine;


import React, { useState, useEffect } from 'react';
import styles from './FirstLine.module.css';
import logo from '../../../images/logo.png';
import FetchWithAuth from '../../../Pages/Authorization/FetchWithAuth'; // Обязательно импортируйте FetchWithAuth

const FirstLine = () => {
  const [fullName, setFullName] = useState(''); // Состояние для хранения ФИО

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        // Получаем имя пользователя из localStorage (или откуда вы его получаете при авторизации)
        const username = localStorage.getItem('username'); //  или sessionStorage, или из контекста, откуда вы получаете username
        if (!username) {
          console.error('Имя пользователя не найдено в localStorage.');
          return; // Прекращаем, если нет имени пользователя
        }

        // Делаем запрос к API
        const response = await FetchWithAuth(`http://127.0.0.1:8000/diary/full-name/?username=${username}`);

        if (!response) {
          console.error('Не удалось получить данные ФИО.');
          return;
        }

        const data = await response.json();
        setFullName(data.full_name || 'Неизвестный пользователь'); // Устанавливаем ФИО или текст по умолчанию
      } catch (error) {
        console.error('Ошибка при загрузке ФИО:', error);
        setFullName('Ошибка загрузки'); // Показываем сообщение об ошибке
      }
    };

    fetchFullName();
  }, []); // Хук useEffect запускается только при монтировании компонента

  return (
    <div className={styles.ConteinerFirstLine}>
      <div className={styles.logo}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.textbox}>
        <p className={styles.NameUser}>{fullName}</p> {/* Отображаем ФИО */}
        <button className={styles.ButtonExit}>ВЫХОД</button>
      </div>
    </div>
  );
};

export default FirstLine;


