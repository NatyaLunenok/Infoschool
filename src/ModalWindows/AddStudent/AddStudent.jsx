import React, { useState, useEffect } from 'react';
import styles from './AddStudent.module.css';

const AddStudent = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        motherName: '',
        fatherName: '',
        phone: '',
        email: '',
        address: '',
        certificateNumber: '',
        login: '',
        password: '',
    });
    const [parentOptions, setParentOptions] = useState([
        { value: 'petrova_m', label: 'Петрова Мария Ивановна' },
        { value: 'ivanov_a', label: 'Иванов Алексей Петрович' },
        { value: 'sidorov_v', label: 'Сидоров Василий Сергеевич' },
        // Add more options here as needed
    ]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.lastName || !formData.firstName || !formData.certificateNumber) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        onAdd(formData);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Добавление ученика</h2>
                    <span className={styles.modalCloseButton} onClick={onClose}>&times;</span>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.profileSection}>
                        <div className={styles.profileImage}>
                            <svg width="50" height="50" viewBox="0 0 100 100" fill="#F2D7B8">
                                <circle cx="50" cy="30" r="15" />
                                <path d="M50 60 C 30 60 10 80 10 90 A 40 40 0 0 1 90 90 C 90 80 70 60 50 60 Z" />
                            </svg>
                        </div>
                        <div className={styles.topFields}>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName"><span>*</span>Фамилия:</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName"><span>*</span>Имя:</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="middleName">Отчество:</label>
                                <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="birthDate"><span>*</span>Дата рождения:</label>
                                <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <form className={styles.modalForm} onSubmit={handleSubmit}>
                        <div className={styles.bottomFields}>
                            <div className={styles.formGroup}>
                                <label htmlFor="motherName"><span>*</span>ФИО матери/опекуна 1:</label>
                                <select
                                    id="motherName"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Выберите ФИО родителя</option>
                                    {parentOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="fatherName">ФИО отца/опекуна 2:</label>
                                <select
                                    id="fatherName"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                >
                                    <option value="">Выберите ФИО родителя</option>
                                    {parentOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
<div className={styles.formGroup}>
                                <label htmlFor="phone"><span>*</span>Телефон:</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address"><span>*</span>Адрес проживания:</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="certificateNumber"><span>*</span>Номер свидетельства о рождении:</label>
                                <input type="text" id="certificateNumber" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="login"><span>*</span>Логин:</label>
                                <input type="text" id="login" name="login" value={formData.login} onChange={handleChange} required/>
                            </div>
                            <div className
 
={styles.formGroup}>
                                <label htmlFor="password"><span>*</span>Пароль:</label>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button type="submit">Добавить</button>
                            <button type="button" onClick={onClose}>Отменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;