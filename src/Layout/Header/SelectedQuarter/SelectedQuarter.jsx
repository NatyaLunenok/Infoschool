import styles from './SelectedQuarter.module.css';

const SelectedQuarter = () => {
    return(
    <div className={styles.ConteinerSelectedQuarter}>
        <button className={styles.SelectedCell}>1 четверть</button>
        <button className={styles.DefaultCell}>2 четверть</button>
        <button className={styles.DefaultCell}>3 четверть</button>
        <button className={styles.DefaultCell}>4 четверть</button>
    </div>
    );
};
export default SelectedQuarter;