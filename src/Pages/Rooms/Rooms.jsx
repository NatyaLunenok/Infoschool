import Footer from '../../Layout/Footer/Footer'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import ClassroomManagement from '../../Tables/ClassroomManagement/ClassroomManagement';
import styles from '../Subjects/Subjects.module.css'
import { Link } from 'react-router-dom'; // Import Link


const Rooms = () => {
  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <Link to="/paa">
          <button className={styles.defaultButton}>УЧЕТНЫЕ ЗАПИСИ</button>
          </Link>
          <Link to="/ps">
          <button className={styles.defaultButton}>ПРЕДМЕТЫ</button>
          </Link>
          <button className={styles.activeButton}>КАБИНЕТЫ</button>
        </div>
      </div>
      <div style={{margin: 50}}>
        <ClassroomManagement/>
      </div>
      <Footer />
    </>
  );
}

export default Rooms;

