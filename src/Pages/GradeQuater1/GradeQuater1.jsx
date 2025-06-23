import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './GradeQuater1.module.css'
import GradeQuater1Table from '../../Tables/GradeQuater/GradeQuater';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const GradeQuater1 = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <Link to="/pd">
            <button className={styles.defaultButton}>ДНЕВНИК</button>
          </Link>
          <button className={styles.activeButton}>УСПЕВАЕМОСТЬ</button>
        </div>
        <div className={styles.ConteinerSelectedQuarter}>
          <button className={styles.SelectedCell}>По четверти</button>
        <Link to="/pgs">
          <button className={styles.DefaultCell}>Итоговая</button>
          </Link>
        </div>
        <div className={styles.ConteinerSelectedQuarter}>
          <button 
            className={selectedQuarter === 1 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(1)}
          >
            1 четверть
          </button>
          <button 
            className={selectedQuarter === 2 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(2)}
          >
            2 четверть
          </button>
          <button 
            className={selectedQuarter === 3 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(3)}
          >
            3 четверть
          </button>
          <button 
            className={selectedQuarter === 4 ? styles.SelectedCell : styles.DefaultCell}
            onClick={() => setSelectedQuarter(4)}
          >
            4 четверть
          </button>
        </div>
        <GradeQuater1Table quarter={selectedQuarter}/>
      </div>
      <Footer />
    </>
  );
};

export default GradeQuater1;