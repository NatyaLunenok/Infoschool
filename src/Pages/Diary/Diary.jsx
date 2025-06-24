import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './Diary.module.css'
import DiaryTable from '../../Tables/Diary/Diary';
import { Link } from 'react-router-dom';

const Diary = () => {
  const username = localStorage.getItem('username'); // Получаем username из localStorage

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>ДНЕВНИК</button>
          <Link to="/pgq1">
            <button className={styles.defaultButton}>УСПЕВАЕМОСТЬ</button>
          </Link>
        </div>
      </div>
      <div style={{margin:30}}>
        <DiaryTable username={username} /> {/* Передаем username в DiaryTable */}
      </div>
      <Footer />
    </>
  );
};

export default Diary;