import React, { useState, useEffect } from 'react';
import styles from '../AccountStudents/AccountStudents.module.css';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const AccountTeachers = () => {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParents = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await FetchWithAuth('http://127.0.0.1:8000/diary/teacher/');
                
                if (!data) {
                    setError('Не удалось получить список родителей');
                    return;
                }

                const formattedParents = data.map((parent, index) => ({
                    id: parent.id || `temp-${index}`,
                    lastName: parent.last_name || '',
                    firstName: parent.first_name || '',
                    middleName: parent.patronymic || '',
                    phone: parent.phone_number || '',
                    email: parent.email || ''
                }));

                setParents(formattedParents);

            } catch (fetchError) {
                console.error("Ошибка при получении родителей:", fetchError);
                setError(fetchError.message || 'Ошибка при получении списка родителей');
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
            <div className={styles.tableContainer}>
                <table>
                    <thead className={styles.headerRow}>
                        <tr>
                            <th className={styles.actionsColumn}>Действия</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Телефон</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parents.map(parent => (
                            <tr key={parent.id} className={styles.dataRow}>
                                <td className={styles.actionsColumn}>
                                    <div className={styles.actions}>
                                        <button className={styles.editButton}>
                                            <EditIcon />
                                        </button>
                                        <button className={styles.deleteButton}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                                <td>{parent.lastName}</td>
                                <td>{parent.firstName}</td>
                                <td>{parent.middleName}</td>
                                <td>{parent.phone}</td>
                                <td>{parent.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.addButtonContainer}>
                <button className={styles.addButton}>
                    Добавить учителя
                </button>
            </div>
        </div>
    );
};

export default AccountTeachers;