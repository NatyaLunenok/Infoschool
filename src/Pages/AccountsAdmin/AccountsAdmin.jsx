import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import JournalTable from '../../Tables/Journal/Journal'
import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
import SecondLine from '../../Layout/Header/SecondLine/SecondLine'
import SelectedUsers from '../../Layout/Header/SelectedUsers/SelectedUsers'
import AccountStudents from '../../Tables/AccountStudents/AccountStudents'
import styles from './AccountsAdmin.module.css'
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
        <button className={styles.SelectedCell}>Ученики</button>
        <button className={styles.DefaultCell}>Учителя</button>
        <button className={styles.DefaultCell}>Родители</button>
    </div>
    </div>
  <AccountStudents/>
  <Footer/>
</>
  );
}

export default AccountsAdmin;
