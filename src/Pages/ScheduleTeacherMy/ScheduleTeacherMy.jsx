import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './ScheduleTeacherMy.module.css'
import Schedule from '../../Tables/Schedule/Schedule';
import { Link } from 'react-router-dom'; // Import Link


const ScheduleTeacherMy = () => {

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
          <button className={styles.SelectedCell}>Моё расписание</button>
          <Link to="/psc">
          <button className={styles.DefaultCell}>Расписание класса</button>
          </Link>
        </div>
      </div>
      <Schedule/>
      <Footer />
    </>
  );
};
export default ScheduleTeacherMy;