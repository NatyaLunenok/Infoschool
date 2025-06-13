import styles from './SelectedLine.module.css';
import DropDownSubjectList from './DropDownSubjectsList/DropDownSubjectsList'
import DropDownClass from './DropDownClass/DropDownClass'
const SeletedLine = () => {
    return(
    <div className={styles.ConteinerSelectedLine}>
        <div className={styles.conteinerSelectedSubject}>
            <p className={styles.text}>Предмет:</p>
            <DropDownSubjectList/>
        </div>
        <div className={styles.ConteinerSelectedClass}>
            <p className={styles.text}>Класс:</p>
            <DropDownClass/>
        </div>
        
    </div>
    );
};
export default SeletedLine;