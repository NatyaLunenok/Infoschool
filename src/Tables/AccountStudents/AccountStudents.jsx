// import React, { useState } from 'react';
// import styles from './AccountStudents.module.css';
// import { ReactComponent as EditIcon } from '../../images/edit.svg';
// import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
// import AddStudent from '../../ModalWindows/AddStudent/AddStudent'

// const AccountStudents = () => {
//     const [students, setStudents] = useState([
//         { id: 1, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '12345', parent1: 'Мария Ивановна', parent2: 'Иван Петрович' },
//         { id: 2, lastName: 'Лунёнок', firstName: 'Анастасия', middleName: 'Алексеевна', birthDate: '01.10.2004', phone: '+79241112038', email: 'lun@gmail.com', address: 'ул. Вершинина 408', certificateNumber: '67890', parent1: 'Елена Сергеевна', parent2: 'Сергей Алексеевич' },
//         // ... добавьте остальные данные здесь
//     ]);

//     const [editingId, setEditingId] = useState(null);
//     const [editedStudent, setEditedStudent] = useState({});
//     const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

//     const handleDeleteStudent = (id) => {
//         setStudents(students.filter(student => student.id !== id));
//     };

//     const handleEditStudent = (id) => {
//         setEditingId(id);
//         const studentToEdit = students.find(student => student.id === id);
//         setEditedStudent({ ...studentToEdit });
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setEditedStudent(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveStudent = (id) => {
//         setStudents(students.map(student =>
//             student.id === id ? { ...editedStudent } : student
//         ));
//         setEditingId(null);
//         setEditedStudent({});
//     };

//     const handleCancelEdit = () => {
//         setEditingId(null);
//         setEditedStudent({});
//     };
//     const handleOpenAddStudentModal = () => {
//         setIsAddStudentModalOpen(true);
//     };

//     const handleCloseAddStudentModal = () => {
//         setIsAddStudentModalOpen(false);
//     };


//     const handleAddStudent = (newStudent) => {
//         // Добавьте логику для добавления нового студента в список
//         setStudents([...students, newStudent]);
//         handleCloseAddStudentModal();
//     };
//     return (
//         <div className={styles.accountTable}>
//             <table>
//                 <thead className={styles.headerRow}>
//                     <tr>
//                         <th>Фамилия</th>
//                         <th>Имя</th>
//                         <th>Отчество</th>
//                         <th>Дата рождения</th>
//                         <th>Телефон</th>
//                         <th>Email</th>
//                         <th>Адрес</th>
//                         <th>№ Свидетельства</th>
//                         <th>Родитель 1</th>
//                         <th>Родитель 2</th>
//                         <th className={styles.actionsColumn}>Действия</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map(student => (
//                         <tr key={student.id} className={styles.dataRow}>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="lastName" value={editedStudent.lastName || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.lastName
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="firstName" value={editedStudent.firstName || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.firstName
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="middleName" value={editedStudent.middleName || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.middleName
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="birthDate" value={editedStudent.birthDate || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.birthDate
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="phone" value={editedStudent.phone || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.phone
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="email" value={editedStudent.email || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.email
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="address" value={editedStudent.address || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.address
//                                 )}
//                             </td>
//                              <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="certificateNumber" value={editedStudent.certificateNumber || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.certificateNumber
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="parent1" value={editedStudent.parent1 || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.parent1
//                                 )}
//                             </td>
//                             <td>
//                                 {editingId === student.id ? (
//                                     <input type="text" name="parent2" value={editedStudent.parent2 || ''} onChange={handleInputChange} />
//                                 ) : (
//                                     student.parent2
//                                 )}
//                             </td>
//                             <td className={styles.actionsColumn}>
//                                 <div className={styles.actions}>
//                                     {editingId === student.id ? (
//                                         <>
//                                             <button className={styles.editButton} onClick={() => handleSaveStudent(student.id)}>
//                                                 Сохранить
//                                             </button>
//                                             <button className={styles.deleteButton} onClick={handleCancelEdit}>
//                                                 Отмена
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button className={styles.editButton} onClick={() => handleEditStudent(student.id)}>
//                                                 <EditIcon />
//                                             </button>
//                                             <button className={styles.deleteButton} onClick={() => handleDeleteStudent(student.id)}>
//                                                 <DeleteIcon />
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className={styles.addButtonContainer}>
//                 <button className={styles.addButton} onClick={handleOpenAddStudentModal}>
//                     Добавить
//                 </button>
//             </div>

//             {/* Модальное окно AddStudent */}
//             {isAddStudentModalOpen && (
//                 <AddStudent onClose={handleCloseAddStudentModal} />
//             )}
//         </div>
//     );
// };

// export default AccountStudents;



import React, { useState, useEffect } from 'react';
import styles from './AccountStudents.module.css';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';
import AddStudent from '../../ModalWindows/AddStudent/AddStudent';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth'; // Путь к вашему файлу FetchWithAuth

const AccountStudents = () => {
    const [students, setStudents] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedStudent, setEditedStudent] = useState({});
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

    const fetchWithAuth = FetchWithAuth(); // Используем хук для получения экземпляра FetchWithAuth

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await fetchWithAuth('http://127.0.0.1:8000/diary/student/');

                // Преобразование данных для соответствия вашей структуре
                const formattedStudents = data.map(student => ({
                    id: student.birth_certificate_number, // Уникальный ID (если есть, например, birth_certificate_number)
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
            } catch (error) {
                console.error('Ошибка при загрузке списка студентов:', error);
            }
        };

        fetchStudents();
    }, [fetchWithAuth]);

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

    const handleAddStudent = (newStudentData) => {
        // Генерируем временный id для нового ученика
        const newStudent = {
            id: Date.now(),
            ...newStudentData,
        };

        setStudents([...students, newStudent]);
    };

    return (
        <div className={styles.accountTable}>
            <table>
                <thead className={styles.headerRow}>
                    <tr>
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
                                    <input type="text" name="birthDate" value={editedStudent.birthDate || ''} onChange={handleInputChange} />
                                ) : (
                                    student.birthDate
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
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="address" value={editedStudent.address || ''} onChange={handleInputChange} />
                                ) : (
                                    student.address
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="certificateNumber" value={editedStudent.certificateNumber || ''} onChange={handleInputChange} />
                                ) : (
                                    student.certificateNumber
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="parent1" value={editedStudent.parent1 || ''} onChange={handleInputChange} />
                                ) : (
                                    student.parent1
                                )}
                            </td>
                            <td>
                                {editingId === student.id ? (
                                    <input type="text" name="parent2" value={editedStudent.parent2 || ''} onChange={handleInputChange} />
                                ) : (
                                    student.parent2
                                )}
                            </td>
                            <td className={styles.actionsColumn}>
                                {editingId === student.id ? (
                                    <>
                                        <button onClick={() => handleSaveStudent(student.id)}>Сохранить</button>
                                        <button onClick={handleCancelEdit}>Отмена</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditStudent(student.id)}>
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => handleDeleteStudent(student.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             <div className={styles.addButtonContainer}>
                 <button className={styles.addButton} onClick={handleOpenAddStudentModal}>
                     Добавить
                 </button>
             </div>

             {isAddStudentModalOpen && (
                <AddStudent onClose={handleCloseAddStudentModal} />
            )}
        </div>
    );
};

export default AccountStudents;