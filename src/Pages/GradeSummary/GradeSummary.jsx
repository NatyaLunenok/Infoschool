import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './GradeSummary.module.css'
import GradeSummaryTable from '../../Tables/GradeSummary/GradeSummary';
import { Link } from 'react-router-dom';

const GradeSummary = () => {

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
          <Link to="/pgq1">
          <button className={styles.DefaultCell}>По четверти</button>
          </Link>
          <button className={styles.SelectedCell}>Итоговая</button>
        </div>
        <GradeSummaryTable/>
      </div>
      <Footer />
    </>
  );
};

export default GradeSummary;