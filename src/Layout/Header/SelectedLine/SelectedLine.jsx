import styles from './SelectedLine.module.css';
import DropDownSubjectList from './DropDownSubjectsList/DropDownSubjectsList'
import DropDownClass from './DropDownClass/DropDownClass'
    // В SelectedLine.js

    const SelectedLine = ({onSubjectChange, onClassChange}) => {
      return(
      <div className={styles.ConteinerSelectedLine}>
          <div className={styles.conteinerSelectedSubject}>
              <p className={styles.text}>Предмет:</p>
              <DropDownSubjectList onChange={onSubjectChange}/>
          </div>
          <div className={styles.ConteinerSelectedClass}>
              <p className={styles.text}>Класс:</p>
              <DropDownClass onChange = {onClassChange}/>
          </div>

      </div>
      );
    };
    export default SelectedLine;
