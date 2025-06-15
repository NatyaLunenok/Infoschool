// import styles from "./DropDownSubjectsList.module.css";
// import {useState, useRef, useEffect} from "react";
// import st from '../../../../images/strelochka_icon.png';


// const DropDownSubjectList = ({ currentStatus, onStatusChange }) => {
//    const [isOpen, setIsOpen] = useState(false);
//    const container = useRef();

//    useEffect(() => {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//    }, []);

//    const handleToggle = () => setIsOpen(!isOpen);

//    const handleClickOutside = (e) => {
//       if (container.current && !container.current.contains(e.target)) {
//          setIsOpen(false);
//       }
//    };

//    const handleOptionClick = (status) => {
//       onStatusChange(status.id); // Передаём ID статуса вместо имени
//       setIsOpen(false);
//    };

//    const statusData = [
//        { id: 1, name_status: "Обрабатывается" },
//        { id: 2, name_status: "Передается в доставку" },
//        { id: 3, name_status: "В пути" },
//        { id: 4, name_status: "Доставлен" },
//        { id: 5, name_status: "Получен" }
//    ];

//    // Находим текущее имя статуса на основе currentStatus (id)
//    const currentStatusName = statusData.find(status => status.id === currentStatus)?.name_status || "Неизвестный статус";

//    return (
//       <div className={styles.DropDownStatusContainer} ref={container}>
//          <button 
//             type="button" 
//             className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`} 
//             onClick={handleToggle}
//          >
//             {currentStatusName} {/* Отображаем текущее имя статуса */}
//             <div className={styles.imageStrelochka}>
//                 <img src={st} alt="Стрелка" />
//             </div>
//          </button>
//          {isOpen && (
//             <div className={styles.DropDown}>
//                <ul>
//                   {statusData.map((status) => (
//                      <li key={status.id} onClick={() => handleOptionClick(status)}>
//                         {status.name_status} {/* Отображаем имя статуса */}
//                      </li>
//                   ))}
//                </ul>
//             </div>
//          )}
//       </div>
//    );
// };

// export default DropDownSubjectList;


// DropDownSubjectsList.jsx
import styles from "./DropDownSubjectsList.module.css";
import { useState, useRef, useEffect } from "react";
import st from '../../../../images/strelochka_icon.png';
import FetchWithAuth from '../../../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

// const DropDownSubjectList = ({ currentSubjectId, onSubjectChange }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const container = useRef();
//     const [subjectData, setSubjectData] = useState([]); // State to hold subject data

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         // Fetch subject data from the API using FetchWithAuth
//         const fetchSubjectData = async () => {
//             try {
//                 const response = await FetchWithAuth('http://127.0.0.1:8000/diary/subject/');

//                 if (!response) {
//                     console.error('Failed to fetch subject data or refresh token.');
//                     // Handle the error appropriately (e.g., redirect to login)
//                     return;
//                 }

//                 if (!response.ok) {
//                     // Handle HTTP errors (e.g., 500, 404)
//                     console.error('HTTP error:', response.status);
//                     // Display a user-friendly error message or retry the request
//                     return;
//                 }

//                 const data = await response.json();
//                 setSubjectData(data);
//             } catch (error) {
//                 console.error('Error fetching subject data:', error);
//                 // Handle network errors or other unexpected errors
//                 // Display a user-friendly error message
//             }
//         };

//         fetchSubjectData();
//     }, []); // Run only once when component mounts

//     const handleToggle = () => setIsOpen(!isOpen);

//     const handleClickOutside = (e) => {
//         if (container.current && !container.current.contains(e.target)) {
//             setIsOpen(false);
//         }
//     };

//     const handleOptionClick = (subjectObj) => {
//         onSubjectChange(subjectObj.id); // Pass the subject ID
//         setIsOpen(false);
//     };

//     // Find the current subject name based on currentSubjectId
//     const currentSubjectName = subjectData.find(subjectObj => subjectObj.id === currentSubjectId)?.subject_name || "";

//     return (
//         <div className={styles.DropDownStatusContainer} ref={container}>
//             <button
//                 type="button"
//                 className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
//                 onClick={handleToggle}
//             >
//                 {currentSubjectName} {/* Display the current subject name */}
//                 <div className={styles.imageStrelochka}>
//                     <img src={st} alt="Стрелка" />
//                 </div>
//             </button>
//             {isOpen && (
//                 <div className={styles.DropDown}>
//                     <ul>
//                         {subjectData.map((subjectObj) => (
//                             <li key={subjectObj.id} onClick={() => handleOptionClick(subjectObj)}>
//                                 {subjectObj.subject_name} {/* Display the subject name */}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DropDownSubjectList;



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
  } catch (err) {
    console.error('Ошибка при загрузке классов:', err);
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
         currentSubject ? currentSubject.subject_name : "Выберите предмет"}
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