import styles from './Footer.module.css';
import vk from '../../images/iconVK.png'

const Footer=()=>{
    return(
        <div className={styles.footer}>
            <div className ={styles.sb__footer}>
                <div className={styles.cont}>
                    <p className={styles.cont}>Контактная информация</p>
                    <p className={styles.cont}>+7 (777) 777 77 77</p>
                    <p className={styles.cont}>infoschool@mail.ru</p>
                </div>
                <div className={styles.contacts}>
                    <p className={styles.contacts}>Мы в социальных сетях</p>
                        <div className="socialmedia">
                            <p><img src={vk} alt=""/></p>
                        </div>
                </div>
                <div className={styles.label}>
                    <p className={styles.label}>
                        @{new Date().getFullYear()} ООО "ИНФОШКОЛА.ру".
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;