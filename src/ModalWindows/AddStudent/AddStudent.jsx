// import React, { useState, useEffect } from 'react';
// import styles from './AddStudent.module.css';

// const AddStudent = ({ onClose, onAdd }) => {
//     const [formData, setFormData] = useState({
//         lastName: '',
//         firstName: '',
//         middleName: '',
//         birthDate: '',
//         motherName: '',
//         fatherName: '',
//         phone: '',
//         email: '',
//         address: '',
//         certificateNumber: '',
//         login: '',
//         password: '',
//     });
//     const [parentOptions, setParentOptions] = useState([
//         { value: 'petrova_m', label: 'Петрова Мария Ивановна' },
//         { value: 'ivanov_a', label: 'Иванов Алексей Петрович' },
//         { value: 'sidorov_v', label: 'Сидоров Василий Сергеевич' },
//         // Add more options here as needed
//     ]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (!formData.lastName || !formData.firstName || !formData.certificateNumber) {
//             alert('Пожалуйста, заполните все обязательные поля.');
//             return;
//         }

//         onAdd(formData);
//         onClose();
//     };

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContainer}>
//                 <div className={styles.modalHeader}>
//                     <h2 className={styles.modalTitle}>Добавление ученика</h2>
//                     <span className={styles.modalCloseButton} onClick={onClose}>&times;</span>
//                 </div>
//                 <div className={styles.modalBody}>
//                     <div className={styles.profileSection}>
//                         <div className={styles.profileImage}>
//                             <svg width="50" height="50" viewBox="0 0 100 100" fill="#F2D7B8">
//                                 <circle cx="50" cy="30" r="15" />
//                                 <path d="M50 60 C 30 60 10 80 10 90 A 40 40 0 0 1 90 90 C 90 80 70 60 50 60 Z" />
//                             </svg>
//                         </div>
//                         <div className={styles.topFields}>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="lastName"><span>*</span>Фамилия:</label>
//                                 <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="firstName"><span>*</span>Имя:</label>
//                                 <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="middleName">Отчество:</label>
//                                 <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="birthDate"><span>*</span>Дата рождения:</label>
//                                 <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
//                             </div>
//                         </div>
//                     </div>

//                     <form className={styles.modalForm} onSubmit={handleSubmit}>
//                         <div className={styles.bottomFields}>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="motherName"><span>*</span>ФИО матери/опекуна 1:</label>
//                                 <select
//                                     id="motherName"
//                                     name="motherName"
//                                     value={formData.motherName}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="">Выберите ФИО родителя</option>
//                                     {parentOptions.map((option) => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="fatherName">ФИО отца/опекуна 2:</label>
//                                 <select
//                                     id="fatherName"
//                                     name="fatherName"
//                                     value={formData.fatherName}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Выберите ФИО родителя</option>
//                                     {parentOptions.map((option) => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
// <div className={styles.formGroup}>
//                                 <label htmlFor="phone"><span>*</span>Телефон:</label>
//                                 <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="email">Email:</label>
//                                 <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="address"><span>*</span>Адрес проживания:</label>
//                                 <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required/>
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="certificateNumber"><span>*</span>Номер свидетельства о рождении:</label>
//                                 <input type="text" id="certificateNumber" name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} required/>
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="login"><span>*</span>Логин:</label>
//                                 <input type="text" id="login" name="login" value={formData.login} onChange={handleChange} required/>
//                             </div>
//                             <div className
 
// ={styles.formGroup}>
//                                 <label htmlFor="password"><span>*</span>Пароль:</label>
//                                 <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
//                             </div>
//                         </div>

//                         <div className={styles.modalFooter}>
//                             <button type="submit">Добавить</button>
//                             <button type="button" onClick={onClose}>Отменить</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddStudent;


import React, { useState, useEffect } from 'react';
import styles from './AddStudent.module.css';
import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

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
        password: ''
    });
    
    const [parentOptions, setParentOptions] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});

    // Валидация полей
    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                return value ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Некорректный email') : null;
            case 'phone':
                return value ? (/^\+?[0-9\s\-()]{10,}$/.test(value) || 'Некорректный телефон') : 'Обязательное поле';
            case 'certificateNumber':
                return /^[IVXLCDM0-9-]+$/i.test(value) || 'Только римские/арабские цифры и дефис';
            case 'password':
                return value.length >= 6 || 'Пароль должен содержать минимум 6 символов';
            default:
                return null;
        }
    };

    const errors = {
        email: validateField('email', formData.email),
        phone: validateField('phone', formData.phone),
        certificateNumber: validateField('certificateNumber', formData.certificateNumber),
        password: validateField('password', formData.password)
    };

    const isValid = !Object.values(errors).some(Boolean) && 
                   ['lastName', 'firstName', 'birthDate', 'motherName', 
                    'address', 'certificateNumber', 'login', 'password', 'phone']
                   .every(field => formData[field].trim());

    // Загрузка данных родителей
    useEffect(() => {
        const fetchParents = async () => {
            try {
                setLoading(true);
                
                // Загрузка родителей
                const parentsData = await FetchWithAuth('http://127.0.0.1:8000/diary/parent/');
                setParentOptions(parentsData.map(parent => ({
                    value: parent.id,
                    label: `${parent.last_name} ${parent.first_name} ${parent.patronymic || ''}`
                })));
                
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setError('Не удалось загрузить данные для формы');
            } finally {
                setLoading(false);
            }
        };

        fetchParents();
    }, []);

    // Обработчик изменения полей
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // Маска для номера свидетельства
        if (name === 'certificateNumber') {
            const cleanedValue = value.replace(/[^ivxlcdm0-9-]/gi, '');
            setFormData(prev => ({ ...prev, [name]: cleanedValue }));
            return;
        }
        
        // Маска для телефона
        if (name === 'phone') {
            const cleanedValue = value.replace(/[^0-9+()-]/g, '');
            setFormData(prev => ({ ...prev, [name]: cleanedValue }));
            return;
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // Отправка формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!isValid) {
            setError('Пожалуйста, заполните все обязательные поля и исправьте ошибки');
            return;
        }

        try {
            setLoading(true);
            
            // Создаем ученика
            const studentResponse = await FetchWithAuth('http://127.0.0.1:8000/diary/student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    last_name: formData.lastName,
                    first_name: formData.firstName,
                    patronymic: formData.middleName,
                    birth_date: formData.birthDate,
                    phone_number: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    birth_certificate_number: formData.certificateNumber,
                    parent1: formData.motherName,
                    parent2: formData.fatherName,
                    login: formData.login,
                    password: formData.password
                })
            });

            setSuccess(`Ученик ${formData.lastName} ${formData.firstName} успешно добавлен`);
            
            // Очистка формы
            setFormData({
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
                password: ''
            });
            
            // Закрытие модалки через 2 секунды
            setTimeout(() => {
                onAdd();
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Ошибка при добавлении ученика:', error);
            
            if (error.response) {
                try {
                    const errorData = await error.response.json();
                    setError(errorData.message || 'Ошибка при добавлении ученика');
                } catch {
                    setError('Ошибка обработки ответа сервера');
                }
            } else {
                setError('Ошибка сети или сервера. Пожалуйста, попробуйте позже.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Добавление ученика</h2>
                    <span className={styles.modalCloseButton} onClick={onClose}>&times;</span>
                </div>
                <div className={styles.modalBody}>
                    {loading && <div className={styles.loadingOverlay}>Загрузка...</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {success && <div className={styles.successMessage}>{success}</div>}
                    
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
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('lastName')}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName"><span>*</span>Имя:</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('firstName')}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="middleName">Отчество:</label>
                                <input 
                                    type="text" 
                                    id="middleName" 
                                    name="middleName" 
                                    value={formData.middleName} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('middleName')}
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="birthDate"><span>*</span>Дата рождения:</label>
                                <input 
                                    type="date" 
                                    id="birthDate" 
                                    name="birthDate" 
                                    value={formData.birthDate} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('birthDate')}
                                    required
                                    disabled={loading}
                                />
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
                                    onBlur={() => handleBlur('motherName')}
                                    required
                                    disabled={loading}
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
                                    onBlur={() => handleBlur('fatherName')}
                                    disabled={loading}
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
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('phone')}
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                    required
                                    disabled={loading}
                                />
                                {touched.phone && errors.phone && (
                                    <span className={styles.fieldError}>{errors.phone}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('email')}
                                    disabled={loading}
                                />
                                {touched.email && errors.email && (
                                    <span className={styles.fieldError}>{errors.email}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address"><span>*</span>Адрес проживания:</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    name="address" 
                                    value={formData.address} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('address')}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="certificateNumber"><span>*</span>Номер свидетельства:</label>
                                <input 
                                    type="text" 
                                    id="certificateNumber" 
                                    name="certificateNumber" 
                                    value={formData.certificateNumber} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('certificateNumber')}
                                    placeholder="II-СЕ №123456"
                                    required
                                    disabled={loading}
                                />
                                {touched.certificateNumber && errors.certificateNumber && (
                                    <span className={styles.fieldError}>{errors.certificateNumber}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="login"><span>*</span>Логин:</label>
                                <input 
                                    type="text" 
                                    id="login" 
                                    name="login" 
                                    value={formData.login} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('login')}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password"><span>*</span>Пароль:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('password')}
                                    required
                                    disabled={loading}
                                />
                                {touched.password && errors.password && (
                                    <span className={styles.fieldError}>{errors.password}</span>
                                )}
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button 
                                type="submit" 
                                disabled={loading || !isValid}
                                className={!isValid ? styles.disabledButton : ''}
                            >
                                {loading ? 'Добавление...' : 'Добавить'}
                            </button>
                            <button 
                                type="button" 
                                onClick={onClose} 
                                disabled={loading}
                            >
                                Отменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;