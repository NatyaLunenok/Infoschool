import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Authorization.module.css';
import logo from '../../images/logo.png';
import FetchWithAuth from "./FetchWithAuth";

const Authorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await FetchWithAuth('http://127.0.0.1:8000/diary/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Неверный логин или пароль');
        } else {
          setError('Ошибка сервера, попробуйте позже');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Сохраняем токены и данные пользователя в localStorage
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);

      setLoading(false);

      // Переход на страницу JournalTeacher
      navigate('/paas');

    } catch (err) {
      setError('Ошибка сети, попробуйте позже');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginModal}>
      <div className={styles.logo}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.modalContent}>
        <span className={styles.closeButton}>&times;</span>
        <h2>Авторизация</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <button
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={loading || !username || !password}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </div>
    </div>
  );
};

export default Authorization;

