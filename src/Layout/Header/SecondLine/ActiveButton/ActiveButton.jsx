import "./DeleteButton.css";
import styles from './ActiveButton.module.css';

const ActiveButton = () => { // Добавили prop onOpenModal
    return (
        <button className="activeButton">ЖУРНАЛ</button>
    );
};

export default ActiveButton;
