import styles from '../SelectedQuarter/SelectedQuarter.module.css';

const SelectedQuarter = () => {
    return(
    <div className={styles.ConteinerSelectedQuarter}>
        <button className={styles.SelectedCell}>Ученики</button>
        <button className={styles.DefaultCell}>Учителя</button>
        <button className={styles.DefaultCell}>Родители</button>
    </div>
    );
};
export default SelectedQuarter;