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
import styles from "./DropDownClass.module.css";
import { useState, useRef, useEffect } from "react";
import st from '../../../../images/strelochka_icon.png';
import FetchWithAuth from '../../../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

const DropDownClass = ({ currentClassId, onClassChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const container = useRef();
    const [classData, setClassData] = useState([]); // State to hold class data

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Fetch class data from the API using FetchWithAuth
        const fetchClassData = async () => {
            try {
                const response = await FetchWithAuth('http://127.0.0.1:8000/diary/class/');

                if (!response) {
                    console.error('Failed to fetch class data or refresh token.');
                    // Handle the error appropriately (e.g., redirect to login)
                    return;
                }

                if (!response.ok) {
                    // Handle HTTP errors (e.g., 500, 404)
                    console.error('HTTP error:', response.status);
                    // Display a user-friendly error message or retry the request
                    return;
                }

                const data = await response.json();
                setClassData(data);
            } catch (error) {
                console.error('Error fetching class data:', error);
                // Handle network errors or other unexpected errors
                // Display a user-friendly error message
            }
        };

        fetchClassData();
    }, []); // Run only once when component mounts

    const handleToggle = () => setIsOpen(!isOpen);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleOptionClick = (classObj) => {
        onClassChange(classObj.id); // Pass the class ID
        setIsOpen(false);
    };

    // Find the current class name based on currentClassId
    const currentClassName = classData.find(classObj => classObj.id === currentClassId)?.class_name || "";

    return (
        <div className={styles.DropDownStatusContainer} ref={container}>
            <button
                type="button"
                className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
                onClick={handleToggle}
            >
                {currentClassName} {/* Display the current class name */}
                <div className={styles.imageStrelochka}>
                    <img src={st} alt="Стрелка" />
                </div>
            </button>
            {isOpen && (
                <div className={styles.DropDown}>
                    <ul>
                        {classData.map((classObj) => (
                            <li key={classObj.id} onClick={() => handleOptionClick(classObj)}>
                                {classObj.class_name} {/* Display the class name */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownClass;
