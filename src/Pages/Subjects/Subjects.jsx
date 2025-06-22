import Footer from '../../Layout/Footer/Footer'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import AddSubject from '../../Tables/AddSubject/AddSubject';
import styles from './Subjects.module.css'
import { Link } from 'react-router-dom'; // Import Link


const AccountsAdmin = () => {
  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <Link to="/paa">
          <button className={styles.defaultButton}>УЧЕТНЫЕ ЗАПИСИ</button>
          </Link>
          <button className={styles.activeButton}>ПРЕДМЕТЫ</button>
          <Link to="/pr">
          <button className={styles.defaultButton}>КАБИНЕТЫ</button>
          </Link>
        </div>
      </div>
      <div style={{margin: 50}}>
      <AddSubject/>
      </div>
      <Footer />
    </>
  );
}

export default AccountsAdmin;

