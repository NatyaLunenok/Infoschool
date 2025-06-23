import { useState, useEffect } from 'react';
import styles from './Student.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const Student = ({ studentId, onClose }) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await FetchWithAuth(
          `http://127.0.0.1:8000/diary/classes/student-info/${studentId}/`
        );
        
        if (response) {
          setStudentData(response);
        } else {
          throw new Error('Не удалось загрузить данные ученика');
        }
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке данных ученика');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  if (!studentId) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Информация об ученике</h2>
          <span className={styles.modalCloseButton} onClick={onClose}>&times;</span>
        </div>
        <div className={styles.modalBody}>
          {loading && <div className={styles.loadingOverlay}>Загрузка...</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          {studentData && (
            <div className={styles.studentInfoContainer}>
              <div className={styles.profileSection}>
                <div className={styles.profileImageContainer}>
                  <div className={styles.profileImage}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="#F2D7B8">
                      <circle cx="50" cy="30" r="15" />
                      <path d="M50 60 C 30 60 10 80 10 90 A 40 40 0 0 1 90 90 C 90 80 70 60 50 60 Z" />
                    </svg>
                  </div>
                </div>
                
                <div className={styles.topFields}>
                  <div className={styles.formGroup}>
                    <label>Фамилия:</label>
                    <div className={styles.infoValue}>{studentData.last_name}</div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Имя:</label>
                    <div className={styles.infoValue}>{studentData.first_name}</div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Отчество:</label>
                    <div className={styles.infoValue}>{studentData.patronymic || '-'}</div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Дата рождения:</label>
                    <div className={styles.infoValue}>{formatDate(studentData.birth_date)}</div>
                  </div>
                </div>
              </div>

              <div className={styles.bottomFields}>
                <div className={styles.formGroup}>
                  <label>Email:</label>
                  <div className={styles.infoValue}>{studentData.email || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Телефон:</label>
                  <div className={styles.infoValue}>{studentData.phone_number || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Адрес:</label>
                  <div className={styles.infoValue}>{studentData.address || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Номер свидетельства:</label>
                  <div className={styles.infoValue}>{studentData.birth_certificate_number || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Родитель/опекун 1:</label>
                  <div className={styles.infoValue}>{studentData.parent1 || '-'}</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Родитель/опекун 2:</label>
                  <div className={styles.infoValue}>{studentData.parent2 || '-'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;