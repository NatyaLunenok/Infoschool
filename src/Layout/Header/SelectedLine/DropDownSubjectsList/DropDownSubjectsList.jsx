import styles from "./DropDownSubjectsList.module.css";
import { useState, useRef, useEffect } from "react";
import st from '../../../../images/strelochka_icon.png';
import FetchWithAuth from '../../../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth


const DropDownSubjectList = ({ currentSubject, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const container = useRef();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await FetchWithAuth('http://127.0.0.1:8000/diary/subject/');
        setSubjects(data);
        
        // Автоматически выбираем первый предмет, если currentSubject не задан и есть данные
        if (!currentSubject && data && data.length > 0) {
          onChange(data[0]);
        }
      } catch (err) {
        console.error('Ошибка при загрузке предметов:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

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

  const handleSelectSubject = (subject) => {
    onChange(subject);
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
        {loading ? "Загрузка предметов..." : 
         error ? "Ошибка загрузки" : 
         currentSubject ? currentSubject.subject_name : (subjects[0]?.subject_name || "Нет доступных предметов")}
        <div className={styles.imageStrelochka}>
          <img src={st} alt="Стрелка" />
        </div>
      </button>
      {isOpen && !loading && !error && (
        <div className={styles.DropDown}>
          <ul>
            {subjects.map((subject) => (
              <li 
                key={subject.id} 
                onClick={() => handleSelectSubject(subject)}
                className={currentSubject?.id === subject.id ? styles.selected : ""}
              >
                {subject.subject_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownSubjectList;