import styles from '../SelectedQuarter/SelectedQuarter.module.css';

const SelectedUsers = () => {
    return(
    <div className={styles.ConteinerSelectedQuarter}>
        <button className={styles.SelectedCell}>Ученики</button>
        <button className={styles.DefaultCell}>Учителя</button>
        <button className={styles.DefaultCell}>Родители</button>
    </div>
    );
};
export default SelectedUsers;