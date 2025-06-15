// import styles from "./DropDownClass.module.css";
// import {useState, useRef, useEffect} from "react";
// import st from '../../../../images/strelochka_icon.png';


// const DropDownClass = ({ currentStatus, onStatusChange }) => {
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

// export default DropDownClass;


// DropDownClass.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDownClass.module.css";
import st from '../../../../images/strelochka_icon.png';
import FetchWithAuth from '../../../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

// const DropDownClass = ({ currentClassName, onClassChange }) => { // Используем currentClassName и onClassChange
//     const [isOpen, setIsOpen] = useState(false);
//     const container = useRef();
//     const [classData, setClassData] = useState([]); // State to hold class data

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         // Fetch class data from the API using FetchWithAuth
//         const fetchClassData = async () => {
//             try {
//                 const response = await FetchWithAuth('http://127.0.0.1:8000/diary/class/');

//                 if (!response) {
//                     console.error('Failed to fetch class data or refresh token.');
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
//                 setClassData(data);
//             } catch (error) {
//                 console.error('Error fetching class data:', error);
//                 // Handle network errors or other unexpected errors
//                 // Display a user-friendly error message
//             }
//         };

//         fetchClassData();
//     }, []); // Run only once when component mounts

//     const handleToggle = () => setIsOpen(!isOpen);

//     const handleClickOutside = (e) => {
//         if (container.current && !container.current.contains(e.target)) {
//             setIsOpen(false);
//         }
//     };

//     const handleOptionClick = (classObj) => {
//         onClassChange(classObj.class_name); // Pass the class name instead of ID
//         setIsOpen(false);
//     };

//     return (
//         <div className={styles.DropDownStatusContainer} ref={container}>
//             <button
//                 type="button"
//                 className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
//                 onClick={handleToggle}
//             >
//                 {currentClassName || "Выберите класс"} {/* Display the current class name */}
//                 <div className={styles.imageStrelochka}>
//                     <img src={st} alt="Стрелка" />
//                 </div>
//             </button>
//             {isOpen && (
//                 <div className={styles.DropDown}>
//                     <ul>
//                         {classData.map((classObj) => (
//                             <li key={classObj.id} onClick={() => handleOptionClick(classObj)}>
//                                 {classObj.class_name} {/* Display the class name */}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DropDownClass;


// const DropDownClass = ({ currentClass, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const container = useRef();

//   useEffect(() => {
//     const fetchClasses = async () => {
//   try {
//     const data = await FetchWithAuth('http://127.0.0.1:8000/diary/class/');
//     setClasses(data); // data уже распарсена
//   } catch (err) {
//     console.error('Ошибка при загрузке классов:', err);
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (container.current && !container.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggle = () => {
//     if (!loading && !error) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleSelectClass = (classItem) => {
//     onChange(classItem);
//     setIsOpen(false);
//   };

//   return (
//     <div className={styles.DropDownStatusContainer} ref={container}>
//       <button
//         type="button"
//         className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
//         onClick={handleToggle}
//         disabled={loading || error}
//       >
//         {loading ? "Загрузка классов..." : 
//          error ? "Ошибка загрузки" : 
//          currentClass ? currentClass.class_name : "Выберите класс"}
//         <div className={styles.imageStrelochka}>
//           <img src={st} alt="Стрелка" />
//         </div>
//       </button>
//       {isOpen && !loading && !error && (
//         <div className={styles.DropDown}>
//           <ul>
//             {classes.map((classItem) => (
//               <li 
//                 key={classItem.id} 
//                 onClick={() => handleSelectClass(classItem)}
//                 className={currentClass?.id === classItem.id ? styles.selected : ""}
//               >
//                 {classItem.class_name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropDownClass;

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