import { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './ScheduleHeadTeacher.module.css'
import ScheduleClass from '../../Tables/ScheduleClass/ScheduleClass';
import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
import { Link } from 'react-router-dom'; // Import Link

const ScheduleHeadTeacher = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
  };
  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>РАСПИСАНИЕ</button>
          <Link to="/phtc">
          <button className={styles.defaultButton}>КЛАССЫ</button>
          </Link>
        </div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',width:1380, marginTop:10}}>
        <DropDownClass
            currentClass={selectedClass}
            onChange={handleClassChange}
        />
        <div style={{display:'flex',flexDirection:'row',gap:30}}>
        <button className={styles.button}>Создать</button>
        <button className={styles.button}>Удалить</button>
        </div>
        </div>
      {selectedClass && <ScheduleClass classId={selectedClass.id} />}
      <div style={{display:'flex', flexDirection:'row', justifyContent: 'end',width:1380 ,marginBottom:30}}>
      <button style={{paddingTop:10, paddingBottom:10}} className={styles.button}>Сохранить изменения</button>
      </div>
      <Footer />

    </div>
    </>
  );
};
export default ScheduleHeadTeacher;