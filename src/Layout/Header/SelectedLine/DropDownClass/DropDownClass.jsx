import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDownClass.module.css";
import st from '../../../../images/strelochka_icon.png';
import FetchWithAuth from '../../../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

const DropDownClass = ({ currentClass, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const container = useRef();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await FetchWithAuth('http://127.0.0.1:8000/diary/class/');
        setClasses(data);
        
        // Автоматически выбираем первый класс, если currentClass не задан и есть данные
        if (!currentClass && data && data.length > 0) {
          onChange(data[0]);
        }
      } catch (err) {
        console.error('Ошибка при загрузке классов:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!loading && !error) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectClass = (classItem) => {
    onChange(classItem);
    setIsOpen(false);
  };

  return (
    <div className={styles.DropDownStatusContainer} ref={container}>
      <button
        type="button"
        className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
        onClick={handleToggle}
        disabled={loading || error}
      >
        {loading ? "Загрузка классов..." : 
         error ? "Ошибка загрузки" : 
         currentClass ? currentClass.class_name : (classes[0]?.class_name || "Нет доступных классов")}
        <div className={styles.imageStrelochka}>
          <img src={st} alt="Стрелка" />
        </div>
      </button>
      {isOpen && !loading && !error && (
        <div className={styles.DropDown}>
          <ul>
            {classes.map((classItem) => (
              <li 
                key={classItem.id} 
                onClick={() => handleSelectClass(classItem)}
                className={currentClass?.id === classItem.id ? styles.selected : ""}
              >
                {classItem.class_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownClass;