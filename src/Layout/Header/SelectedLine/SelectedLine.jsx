import styles from './SelectedLine.module.css';
import DropDownSubjectList from './DropDownSubjectsList/DropDownSubjectsList'
import DropDownClass from './DropDownClass/DropDownClass'

const SelectedLine = ({ onSubjectChange, onClassChange, selectedSubject, selectedClass }) => {
  return (
    <div className={styles.ConteinerSelectedLine}>
      <div className={styles.conteinerSelectedSubject}>
        <p className={styles.text}>Предмет:</p>
        <DropDownSubjectList 
          onChange={onSubjectChange} 
          currentSubject={selectedSubject}
        />
      </div>
      <div className={styles.ConteinerSelectedClass}>
        <p className={styles.text}>Класс:</p>
        <DropDownClass 
          onChange={onClassChange} 
          currentClass={selectedClass}
        />
      </div>
    </div>
  );
};

export default SelectedLine;

