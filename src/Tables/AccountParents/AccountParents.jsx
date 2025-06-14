// import React, { useState } from 'react';
// import styles from '../AccountStudents/AccountStudents.module.css';
// import { ReactComponent as EditIcon } from '../../images/edit.svg';
// import { ReactComponent as DeleteIcon } from '../../images/delete.svg';

// const AccountParents = () => {
//     const [parents, setParents] = useState([
//         { id: 1, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '12345', parent1: 'Мария Ивановна', parent2: 'Иван Петрович' },
//         { id: 2, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '67890', parent1: 'Елена Сергеевна', parent2: 'Сергей Алексеевич' },
//         // ... добавьте остальные данные здесь
//     ]);

//     return (
//         <div className={styles.accountTable}>
//             <table>
//                 <thead className={styles.headerRow}>
//                     <tr>
//                         <th>Фамилия</th>
//                         <th>Имя</th>
//                         <th>Отчество</th>
//                         <th>Телефон</th>
//                         <th>Email</th>
//                         <th className={styles.actionsColumn}>Действия</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {parents.map(parent => (
//                         <tr key={parent.id} className={styles.dataRow}>
//                                                         <td className={styles.actionsColumn}>
//                                 <div className={styles.actions}>
//                                         <>
//                                             <button className={styles.editButton}>
//                                                 <EditIcon />
//                                             </button>
//                                             <button className={styles.deleteButton}>
//                                                 <DeleteIcon />
//                                             </button>
//                                         </>
//                                 </div>
//                             </td>
//                             <td>
//                                 {parent?.lastName || ''}
//                             </td>
//                             <td>
//                                 {parent?.firstName || ''}
//                             </td>
//                             <td>
//                                 {parent?.middleName || ''}
//                             </td>
//                             <td>
//                                 {parent?.phone || ''}
//                             </td>
//                             <td>
//                                 {parent?.email || ''}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className={styles.addButtonContainer}>
//                 <button className={styles.addButton}>
//                     Добавить
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AccountParents;


import React, { useState, useEffect } from 'react';
import styles from '../AccountStudents/AccountStudents.module.css';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth'; // Import FetchWithAuth

const AccountParents = () => {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParents = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await FetchWithAuth('http://127.0.0.1:8000/diary/parent/');

                if (!response) {
                    setError('Не удалось получить список родителей. Пожалуйста, попробуйте позже.');
                    return;
                }

                if (!response.ok) {
                    setError(`Ошибка при получении списка родителей: ${response.status}`);
                    return;
                }

                try {
                    const data = await response.json();
                    setParents(data);
                } catch (jsonError) {
                    setError('Ошибка при обработке полученных данных.');
                    console.error("Ошибка при разборе JSON:", jsonError);
                    return;
                }
            } catch (fetchError) {
                setError('Ошибка подключения к серверу. Проверьте соединение.');
                console.error("Ошибка при выполнении запроса:", fetchError);
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchParents();
    }, []);

    if (loading) {
        return <div>Загрузка списка родителей...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className={styles.accountTable}>
            <table>
                <thead className={styles.headerRow}>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th className={styles.actionsColumn}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {parents.map(parent => (
                        <tr key={parent.lastName} className={styles.dataRow}> {/*Изменил ключ на более уникальный*/}
                            <td className={styles.actionsColumn}>
                                <div className={styles.actions}>
                                    <>
                                        <button className={styles.editButton}>
                                            <EditIcon />
                                        </button>
                                        <button className={styles.deleteButton}>
                                            <DeleteIcon />
                                        </button>
                                    </>
                                </div>
                            </td>
                            <td>
                                {parent?.lastName || ''} {/*Исправил поле на верные*/}
                            </td>
                            <td>
                                {parent?.firstName || ''} {/*Исправил поле на верные*/}
                            </td>
                            <td>
                                {parent?.middleName || ''} {/*Исправил поле на верные*/}
                            </td>
                            <td>
                                {parent?.phone || ''} {/*Исправил поле на верные*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.addButtonContainer}>
                <button className={styles.addButton}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default AccountParents;
