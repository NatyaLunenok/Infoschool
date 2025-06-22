// import Footer from '../../Layout/Footer/Footer';
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
// import styles from './ScheduleClass.module.css'
// import ScheduleClass from '../../Tables/ScheduleClass/ScheduleClass'
// import { Link } from 'react-router-dom'; // Import Link

// const ScheduleClass = () => {
// const [selectedClass, setSelectedClass] = useState(null);
// const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//     fetchClassData(classItem.id);
// };

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine />
//         <div className={styles.ConteinerSecondLine}>
//           <Link to="/pjt">
//           <button className={styles.defaultButton}>ЖУРНАЛ</button>
//           </Link>
//           <button className={styles.activeButton}>РАСПИСАНИЕ</button>
//         </div>
//         <div className={styles.ConteinerSelectedQuarter} style={{margin:10}}>
//           <button className={styles.DefaultCell}>Моё расписание</button>
//           <button className={styles.SelectedCell}>Расписание класса</button>
//         </div>
//         <div style={{marginTop: '10px', marginBottom:'10px',marginRight:'30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//           <DropDownClass
//             currentClass={selectedClass}
//             onChange={handleClassChange}
//           />
//         </div>
//       </div>
//       <ScheduleClass/>
//       <Footer />
//     </>
//   );
// };
// export default ScheduleClass;


import { useState } from 'react';
import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './ScheduleClass.module.css';
import ScheduleClass from '../../Tables/ScheduleClass/ScheduleClass';
import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
import { Link } from 'react-router-dom';

const ScheduleClassPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <Link to="/pjt">
            <button className={styles.defaultButton}>ЖУРНАЛ</button>
          </Link>
          <button className={styles.activeButton}>РАСПИСАНИЕ</button>
        </div>
        <div className={styles.ConteinerSelectedQuarter} style={{margin:10}}>
          <Link to="/pstm">
          <button className={styles.DefaultCell}>Моё расписание</button>
          </Link>
          <button className={styles.SelectedCell}>Расписание класса</button>
        </div>
        <div style={{
          marginTop: '10px', 
          marginBottom:'10px',
          marginRight:'30px', 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between'
        }}>
          <DropDownClass
            currentClass={selectedClass}
            onChange={handleClassChange}
          />
        </div>
      </div>
      {selectedClass && <ScheduleClass classId={selectedClass.id} />}
      <Footer />
    </>
  );
};

export default ScheduleClassPage;