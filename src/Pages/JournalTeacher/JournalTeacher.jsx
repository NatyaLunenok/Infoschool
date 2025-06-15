import React, { useState } from 'react';
import Footer from '../../Layout/Footer/Footer'
import JournalTable from '../../Tables/Journal/Journal'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import SecondLine from '../../Layout/Header/SecondLine/SecondLine'
import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers'
import SelectedQuarter from '../../Layout/Header/SelectedQuarter/SelectedQuarter'
import styles from './JournalTeacher.module.css'
import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine'
// // const JournalTeacher = () => {
// //   return (
// //   <>
// //   <div style={{marginLeft:30}}>
// //     <FirstLine/>
// //     <div className={styles.ConteinerSecondLine}>
// //         <button className={styles.activeButton}>ЖУРНАЛ</button>
// //         <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
// //     </div>
// //     <SelectedLine/>
// //     <SelectedQuarter/>
// //   </div>
// //   <JournalTable/>
// //   <Footer/>
// // </>
// //   );
// // }

// // export default JournalTeacher;



// const JournalTeacher = () => {
//   const [selectedSubjectId, setSelectedSubjectId] = useState(null);
//   const [selectedClassName, setSelectedClassName] = useState(null); // Изменено: храним название класса

//   const handleSubjectChange = (subjectId) => {
//     setSelectedSubjectId(subjectId);
//     console.log("ID выбранного предмета:", subjectId); // Для отладки
//   };

//   const handleClassChange = (className) => { // Изменено: получаем название класса
//     setSelectedClassName(className);
//     console.log("Выбран класс:", className); // Для отладки
//   };

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine/>
//         <div className={styles.ConteinerSecondLine}>
//           <button className={styles.activeButton}>ЖУРНАЛ</button>
//           <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//         </div>
//         <SelectedLine
//           onSubjectChange={handleSubjectChange}
//           onClassChange={handleClassChange}
//           currentClassName={selectedClassName} // Передаем название класса в SelectedLine
//         />
//         <SelectedQuarter/>
//       </div>
//       <JournalTable subjectId={selectedSubjectId} className={selectedClassName}/> {/* Передаем название класса в JournalTable */}
//       <Footer/>
//     </>
//   );
// }

// export default JournalTeacher;


const JournalTeacher = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    console.log("Выбранный предмет:", subject);
  };

  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
    console.log("Выбранный класс:", classItem);
  };

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>ЖУРНАЛ</button>
          <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
        </div>
        <SelectedLine
          onSubjectChange={handleSubjectChange}
          onClassChange={handleClassChange}
          selectedSubject={selectedSubject}
          selectedClass={selectedClass}
        />
        <SelectedQuarter />
      </div>
      <JournalTable 
        subjectId={selectedSubject?.id} 
        className={selectedClass?.class_name}
      />
      <Footer />
    </>
  );
};

export default JournalTeacher;