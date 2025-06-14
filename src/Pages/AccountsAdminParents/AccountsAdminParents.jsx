import Footer from '../../Layout/Footer/Footer'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import AccountParents from '../../Tables/AccountParents/AccountParents'
import styles from '../AccountsAdmin/AccountsAdmin.module.css'
import { Link } from 'react-router-dom'; // Import Link

const AccountsAdmin = () => {
  return (
  <>
  <div style={{marginLeft:30}}>
    <FirstLine/>
    <div className={styles.ConteinerSecondLine}>
        <button className={styles.activeButton}>УЧЕТНЫЕ ЗАПИСИ</button>
        <button className={styles.defaultButton}>ПРЕДМЕТЫ</button>
        <button className={styles.defaultButton}>КАБИНЕТЫ</button>
    </div>
    <div className={styles.ConteinerSelectedQuarter}>
        <Link to="/paa">
        <button className={styles.DefaultCell}>Ученики</button>
        </Link>
        <button className={styles.DefaultCell}>Учителя</button>
        <button className={styles.SelectedCell}>Родители</button>
    </div>
    </div>
  <AccountParents/>
  <Footer/>
</>
  );
}

export default AccountsAdmin;
