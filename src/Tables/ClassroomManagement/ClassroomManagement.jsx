import { useState, useEffect } from 'react';
import styles from './ClassroomManagement.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const ClassroomManagement = () => {
  const [classroomNumber, setClassroomNumber] = useState('');
  const [classroomType, setClassroomType] = useState('Учебный');
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await FetchWithAuth('http://127.0.0.1:8000/diary/classroom/');
        if (data) {
          const formattedClassrooms = data.map(item => ({
            id: item.classroom_number,
            number: item.classroom_number.toString(),
            type: item.type_name
          }));
          setClassrooms(formattedClassrooms);
        }
      } catch (err) {
        console.error('Ошибка при загрузке кабинетов:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const handleAddClassroom = () => {
    if (classroomNumber.trim() && !classrooms.some(c => c.number === classroomNumber)) {
      const newClassroom = {
        id: Date.now(),
        number: classroomNumber,
        type: classroomType
      };
      setClassrooms([...classrooms, newClassroom]);
      setClassroomNumber('');
    }
  };

  const handleDeleteClassroom = (id) => {
    setClassrooms(classrooms.filter(classroom => classroom.id !== id));
  };

  const handleTypeChange = (id, newType) => {
    setClassrooms(classrooms.map(classroom => 
      classroom.id === id ? { ...classroom, type: newType } : classroom
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddClassroom();
    }
  };

  if (isLoading) {
    return <div className={styles.container}>Загрузка данных о кабинетах...</div>;
  }

  if (error) {
    return <div className={styles.container}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>      
      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableContainer}>
            <table className={styles.classroomTable}>
              <thead>
                <tr>
                  <th className={styles.numberHeader}>Номер кабинета</th>
                  <th className={styles.typeHeader}>Тип</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom) => (
                  <tr key={classroom.id}>
                    <td className={styles.numberCell}>
                      <button 
                        onClick={() => handleDeleteClassroom(classroom.id)}
                        className={styles.deleteButton}
                        aria-label="Удалить кабинет"
                      >
                        ×
                      </button>
                      <span>{classroom.number}</span>
                    </td>
                    <td className={styles.typeCell}>
                      <select
                        value={classroom.type}
                        onChange={(e) => handleTypeChange(classroom.id, e.target.value)}
                        className={styles.typeSelect}
                      >
                        <option value="Учебный класс">Учебный класс</option>
                        <option value="Большой спортивный зал">Большой спортивный зал</option>
                        <option value="Малый спортивный зал">Малый спортивный зал</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="classroomNumber">Введите номер кабинета:</label>
            <input
              id="classroomNumber"
              type="text"
              value={classroomNumber}
              onChange={(e) => setClassroomNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.inputField}
              placeholder="Например: 301"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="classroomType">Выберите тип кабинета:</label>
            <select 
              id="classroomType"
              value={classroomType}
              onChange={(e) => setClassroomType(e.target.value)}
              className={styles.selectField}
            >
              <option value="Учебный класс">Учебный класс</option>
              <option value="Большой спортивный зал">Большой спортивный зал</option>
              <option value="Малый спортивный зал">Малый спортивный зал</option>
            </select>
          </div>

          <button 
            onClick={handleAddClassroom}
            className={styles.addButton}
            disabled={!classroomNumber.trim()}
          >
            Добавить кабинет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomManagement;