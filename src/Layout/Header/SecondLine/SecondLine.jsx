import styles from './SecondLine.module.css';


const SecondLine = () => {
    return(
    <div className={styles.ConteinerSecondLine}>
        <button className={styles.activeButton}>ЖУРНАЛ</button>
        <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
    </div>
    );
};
export default SecondLine;