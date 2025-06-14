import React, { useState } from 'react';
import styles from './AccountStudents.module.css';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';

const AccountStudents = () => {
    const [students, setStudents] = useState([
        { id: 1, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '12345', parent1: 'Мария Ивановна', parent2: 'Иван Петрович' },
        { id: 2, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '67890', parent1: 'Елена Сергеевна', parent2: 'Сергей Алексеевич' },
        // ... добавьте остальные данные здесь
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editedStudent, setEditedStudent] = useState({});
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

    const handleDeleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const handleEditStudent = (id) => {
        setEditingId(id);
        const studentToEdit = students.find(student => student.id === id);
        setEditedStudent({ ...studentToEdit });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveStudent = (id) => {
        setStudents(students.map(student =>
            student.id === id ? { ...editedStudent } : student
        ));
        setEditingId(null);
        setEditedStudent({});
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedStudent({});
    };
    const handleOpenAddStudentModal = () => {
        setIsAddStudentModalOpen(true);
    };

    const handleCloseAddStudentModal = () => {
        setIsAddStudentModalOpen(false);
    };


    const handleAddStudent = (newStudent) => {
        // Добавьте логику для добавления нового студента в список
        setStudents([...students, newStudent]);
        handleCloseAddStudentModal();
    };
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
                    {students.map(student => (
                        <tr key={student.id} className={styles.dataRow}>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="lastName" value={editedStudent.lastName || ''} onChange={handleInputChange} />
                                ) : (
                                    student.lastName
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="firstName" value={editedStudent.firstName || ''} onChange={handleInputChange} />
                                ) : (
                                    student.firstName
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="middleName" value={editedStudent.middleName || ''} onChange={handleInputChange} />
                                ) : (
                                    student.middleName
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="phone" value={editedStudent.phone || ''} onChange={handleInputChange} />
                                ) : (
                                    student.phone
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="email" value={editedStudent.email || ''} onChange={handleInputChange} />
                                ) : (
                                    student.email
                                )}
                            </td>
                            <td className={styles.actionsColumn}>
                                <div className={styles.actions}>
                                    {editingId === student.id ? (
                                        <>
                                            <button className={styles.editButton} onClick={() => handleSaveStudent(student.id)}>
                                                Сохранить
                                            </button>
                                            <button className={styles.deleteButton} onClick={handleCancelEdit}>
                                                Отмена
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className={styles.editButton} onClick={() => handleEditStudent(student.id)}>
                                                <EditIcon />
                                            </button>
                                            <button className={styles.deleteButton} onClick={() => handleDeleteStudent(student.id)}>
                                                <DeleteIcon />
                                            </button>
                                        </>
                                    )}
                                </div>
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

export default AccountStudents;