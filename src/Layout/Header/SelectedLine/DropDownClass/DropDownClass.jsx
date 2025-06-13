import styles from "./DropDownClass.module.css";
import {useState, useRef, useEffect} from "react";
import st from '../../../../images/strelochka_icon.png';


const DropDownClass = ({ currentStatus, onStatusChange }) => {
   const [isOpen, setIsOpen] = useState(false);
   const container = useRef();

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleToggle = () => setIsOpen(!isOpen);

   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   const handleOptionClick = (status) => {
      onStatusChange(status.id); // Передаём ID статуса вместо имени
      setIsOpen(false);
   };

   const statusData = [
       { id: 1, name_status: "Обрабатывается" },
       { id: 2, name_status: "Передается в доставку" },
       { id: 3, name_status: "В пути" },
       { id: 4, name_status: "Доставлен" },
       { id: 5, name_status: "Получен" }
   ];

   // Находим текущее имя статуса на основе currentStatus (id)
   const currentStatusName = statusData.find(status => status.id === currentStatus)?.name_status || "Неизвестный статус";

   return (
      <div className={styles.DropDownStatusContainer} ref={container}>
         <button 
            type="button" 
            className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`} 
            onClick={handleToggle}
         >
            {currentStatusName} {/* Отображаем текущее имя статуса */}
            <div className={styles.imageStrelochka}>
                <img src={st} alt="Стрелка" />
            </div>
         </button>
         {isOpen && (
            <div className={styles.DropDown}>
               <ul>
                  {statusData.map((status) => (
                     <li key={status.id} onClick={() => handleOptionClick(status)}>
                        {status.name_status} {/* Отображаем имя статуса */}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default DropDownClass;