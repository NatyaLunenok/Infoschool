import React, { useState, useEffect } from 'react';
import styles from './AccountStudents.module.css';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import AddStudent from '../../ModalWindows/AddStudent/AddStudent';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

const AccountStudents = () => {
    const [students, setStudents] = useState([]);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await FetchWithAuth('http://127.0.0.1:8000/diary/student/');
            
            const formattedStudents = data.map(student => ({
                id: student.id,
                lastName: student.last_name,
                firstName: student.first_name,
                middleName: student.patronymic,
                birthDate: student.birth_date,
                email: student.email,
                phone: student.phone_number,
                address: student.address,
                certificateNumber: student.birth_certificate_number,
                parent1: student.parent1,
                parent2: student.parent2,
            }));

            setStudents(formattedStudents);
            setError(null);
        } catch (error) {
            console.error('Ошибка при загрузке списка студентов:', error);
            setError('Не удалось загрузить список студентов');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleOpenAddStudentModal = () => {
        setIsAddStudentModalOpen(true);
    };

    const handleCloseAddStudentModal = () => {
        setIsAddStudentModalOpen(false);
    };

    const handleAddStudent = async () => {
        // Вместо добавления вручную, перезагружаем список с сервера
        await fetchStudents();
    };

    return (
        <div className={styles.accountTable}>
            {loading && <div className={styles.loading}>Загрузка...</div>}
            {error && <div className={styles.error}>{error}</div>}
            
            {!loading && !error && (
                <>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead className={styles.headerRow}>
                                <tr>
                                    <th className={styles.actionsColumn}>Действия</th>
                                    <th>Фамилия</th>
                                    <th>Имя</th>
                                    <th>Отчество</th>
                                    <th>Дата рождения</th>
                                    <th>Телефон</th>
                                    <th>Email</th>
                                    <th>Адрес</th>
                                    <th>№ Свидетельства</th>
                                    <th>Родитель 1</th>
                                    <th>Родитель 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} className={styles.dataRow}>
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
                                        <td>{student.lastName || '-'}</td>
                                        <td>{student.firstName || '-'}</td>
                                        <td>{student.middleName || '-'}</td>
                                        <td>{student.birthDate || '-'}</td>
                                        <td>{student.phone || '-'}</td>
                                        <td>{student.email || '-'}</td>
                                        <td>{student.address || '-'}</td>
                                        <td>{student.certificateNumber || '-'}</td>
                                        <td>{student.parent1 || '-'}</td>
                                        <td>{student.parent2 || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className={styles.addButtonContainer}>
                        <button 
                            className={styles.addButton} 
                            onClick={handleOpenAddStudentModal}
                        >
                            Добавить ученика
                        </button>
                    </div>
                </>
            )}

            {isAddStudentModalOpen && (
                <AddStudent 
                    onClose={handleCloseAddStudentModal} 
                    onAdd={handleAddStudent}
                />
            )}
        </div>
    );
};

export default AccountStudents;