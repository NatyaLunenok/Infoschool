import Footer from '../../Layout/Footer/Footer'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import AccountStudents from '../../Tables/AccountStudents/AccountStudents'
import styles from './AccountsAdmin.module.css'
import { Link } from 'react-router-dom'; // Import Link

const AccountsAdmin = () => {
  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.activeButton}>УЧЕТНЫЕ ЗАПИСИ</button>
        <Link to="/ps">
          <button className={styles.defaultButton}>ПРЕДМЕТЫ</button>
        </Link>
          <button className={styles.defaultButton}>КАБИНЕТЫ</button>
        </div>
        <div className={styles.ConteinerSelectedQuarter}>
          <button className={styles.SelectedCell}>Ученики</button>
        <Link to="/paat">
        <button className={styles.DefaultCell}>Учителя</button>
        </Link>
          <Link to="/paap">
          <button className={styles.DefaultCell}>Родители</button>
          </Link>
        </div>
      </div>
      <AccountStudents />
      <Footer />
    </>
  );
}

export default AccountsAdmin;

