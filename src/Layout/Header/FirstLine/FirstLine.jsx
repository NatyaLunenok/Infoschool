import React, { useState, useEffect } from 'react';
import styles from './FirstLine.module.css';
import logo from '../../../images/logo.png';
import FetchWithAuth from '../../../Pages/Authorization/FetchWithAuth'; // Обязательно импортируйте FetchWithAuth
import { useNavigate } from 'react-router-dom';

const FirstLine = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) return;

        const response = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/full-name/?username=${username}`
        );

        if (response && response.full_name) {
          setFullName(response.full_name);
        }
      } catch (error) {
        console.error('Ошибка при загрузке ФИО:', error);
      }
    };

    fetchFullName();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        console.warn('Refresh token не найден');
        clearAndRedirect();
        return;
      }

      // Отправляем запрос на выход
      const response = await fetch('http://127.0.0.1:8000/diary/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ refresh: refreshToken })
      });

      if (!response.ok) {
        throw new Error(`Ошибка выхода: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // "Успешный выход"

      clearAndRedirect();
      
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // В любом случае очищаем и перенаправляем
      clearAndRedirect();
    }
  };

//   const handleLogout = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
    
//     if (!refreshToken) {
//       console.warn('Refresh token не найден');
//       clearAndRedirect();
//       return;
//     }

//     // Отправляем запрос на выход
//     const response = await fetch('http://127.0.0.1:8000/diary/logout/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//       },
//       body: JSON.stringify({ refresh: refreshToken })
//     });

//     // Проверяем статус ответа, но не пытаемся парсить JSON если ответ пустой
//     if (!response.ok) {
//       throw new Error(`Ошибка выхода: ${response.status}`);
//     }

//     // Пытаемся получить JSON только если есть содержимое
//     const text = await response.text();
//     if (text) {
//       try {
//         const result = JSON.parse(text);
//         console.log(result.message || 'Успешный выход');
//       } catch (e) {
//         console.log('Успешный выход (не JSON ответ)');
//       }
//     } else {
//       console.log('Успешный выход (пустой ответ)');
//     }

//     clearAndRedirect();
    
//   } catch (error) {
//     console.error('Ошибка при выходе:', error);
//     // В любом случае очищаем и перенаправляем
//     clearAndRedirect();
//   }
// };

  const clearAndRedirect = () => {
    // Очищаем localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    
    // Перенаправляем на страницу входа
    navigate('/');
  };

  return (
    <div className={styles.ConteinerFirstLine}>
      <div className={styles.logo}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.textbox}>
        <p className={styles.NameUser}>{fullName || 'Администратор'}</p>
        <button 
          className={styles.ButtonExit} 
          onClick={handleLogout}
        >
          ВЫХОД
        </button>
      </div>
    </div>
  );
};

export default FirstLine;
