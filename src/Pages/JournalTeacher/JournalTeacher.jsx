import React, { useState } from 'react';
import Footer from '../../Layout/Footer/Footer'
import JournalTable from '../../Tables/Journal/Journal'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import SecondLine from '../../Layout/Header/SecondLine/SecondLine'
import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers'
import SelectedQuarter from '../../Layout/Header/SelectedQuarter/SelectedQuarter'
import styles from './JournalTeacher.module.css'
import SelectedLine from '../../Layout/Header/SelectedLine/SelectedLine'
// const JournalTeacher = () => {
//   return (
//   <>
//   <div style={{marginLeft:30}}>
//     <FirstLine/>
//     <div className={styles.ConteinerSecondLine}>
//         <button className={styles.activeButton}>ЖУРНАЛ</button>
//         <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//     </div>
//     <SelectedLine/>
//     <SelectedQuarter/>
//   </div>
//   <JournalTable/>
//   <Footer/>
// </>
//   );
// }

// export default JournalTeacher;

        const JournalTeacher = () => {
          const [selectedSubjectId, setSelectedSubjectId] = useState(null);
          const [selectedClassId, setSelectedClassId] = useState(null);

          const handleSubjectChange = (subjectId) => {
            setSelectedSubjectId(subjectId);
            console.log("ID выбранного предмета:", subjectId); // Для отладки
          };

          const handleClassChange = (classId) => {
            setSelectedClassId(classId);
            console.log("ID выбранного класса:", classId); // Для отладки
          };

          return (
            <>
              <div style={{ marginLeft: 30 }}>
                <FirstLine/>
                <div className={styles.ConteinerSecondLine}>
                  <button className={styles.activeButton}>ЖУРНАЛ</button>
                  <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
                </div>
                <SelectedLine onSubjectChange={handleSubjectChange} onClassChange={handleClassChange}/>
                <SelectedQuarter/>
              </div>
              <JournalTable subjectId={selectedSubjectId} classId={selectedClassId}/>
              <Footer/>
            </>
          );
        }

        export default JournalTeacher;
