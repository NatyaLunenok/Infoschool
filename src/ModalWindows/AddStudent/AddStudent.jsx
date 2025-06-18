// import React, { useState, useEffect } from 'react';
// import styles from './AddStudent.module.css';
// import FetchWithAuth from '../../Pages/Authorization/FetchWithAuth';

// const AddStudent = ({ onClose, onAdd }) => {
//     const [formData, setFormData] = useState({
//         lastName: '',
//         firstName: '',
//         middleName: '',
//         birthDate: '',
//         motherId: '',
//         fatherId: '',
//         phone: '',
//         email: '',
//         address: '',
//         certificateNumber: '',
//         login: '',
//         password: ''
//     });
    
//     const [parentOptions, setParentOptions] = useState([]);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [touched, setTouched] = useState({});

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'email':
//                 return value ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Некорректный email') : null;
//             case 'phone':
//                 return value ? (/^\+?[0-9\s\-()]{10,}$/.test(value) || 'Некорректный телефон') : 'Обязательное поле';
//             case 'certificateNumber':
//                 return /^[IVXLCDM0-9-]+$/i.test(value) || 'Только римские/арабские цифры и дефис';
//             case 'password':
//                 return value.length >= 6 || 'Пароль должен содержать минимум 6 символов';
//             default:
//                 return null;
//         }
//     };

//     const errors = {
//         email: validateField('email', formData.email),
//         phone: validateField('phone', formData.phone),
//         certificateNumber: validateField('certificateNumber', formData.certificateNumber),
//         password: validateField('password', formData.password)
//     };

//     useEffect(() => {
//         const fetchParents = async () => {
//             try {
//                 setLoading(true);
//                 const parentsData = await FetchWithAuth('http://127.0.0.1:8000/diary/parent/');
//                 setParentOptions(parentsData.map(parent => ({
//                     id: parent.id,
//                     label: `${parent.last_name} ${parent.first_name} ${parent.patronymic || ''}`
//                 })));
//             } catch (error) {
//                 console.error('Ошибка при загрузке родителей:', error);
//                 setError('Не удалось загрузить список родителей');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchParents();
//     }, []);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
        
//         if (name === 'certificateNumber') {
//             const cleanedValue = value.replace(/[^ivxlcdm0-9-]/gi, '');
//             setFormData(prev => ({ ...prev, [name]: cleanedValue }));
//             return;
//         }
        
//         if (name === 'phone') {
//             const cleanedValue = value.replace(/[^0-9+()-]/g, '');
//             setFormData(prev => ({ ...prev, [name]: cleanedValue }));
//             return;
//         }
        
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleBlur = (field) => {
//         setTouched(prev => ({ ...prev, [field]: true }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setError(null);
//         setSuccess(null);

//         try {
//             setLoading(true);
            
//             const response = await FetchWithAuth('http://127.0.0.1:8000/diary/register/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: formData.login,
//                     password: formData.password,
//                     password2: formData.password,
//                     role: "Ученик",
//                     last_name: formData.lastName,
//                     first_name: formData.firstName,
//                     patronymic: formData.middleName || null,
//                     phone_number: formData.phone,
//                     birth_date: formData.birthDate,
//                     address: formData.address,
//                     birth_certificate_number: formData.certificateNumber,
//                     email: formData.email || null,
//                     parent1_id: formData.motherId,
//                     parent2_id: formData.fatherId || null
//                 })
//             });

//             setSuccess(`Ученик ${formData.lastName} ${formData.firstName} успешно добавлен`);
            
//             // Очищаем форму
//             setFormData({
//                 lastName: '',
//                 firstName: '',
//                 middleName: '',
//                 birthDate: '',
//                 motherId: '',
//                 fatherId: '',
//                 phone: '',
//                 email: '',
//                 address: '',
//                 certificateNumber: '',
//                 login: '',
//                 password: ''
//             });
            
//             // Вызываем onAdd для обновления списка учеников
//             onAdd();
            
//             // Закрываем модальное окно через 2 секунды
//             onClose();

//         } catch (error) {
//             console.error('Ошибка при добавлении ученика:', error);
            
//             if (error.response) {
//                 try {
//                     const errorData = await error.response.json();
//                     setError(errorData.message || 'Ошибка при добавлении ученика');
//                 } catch {
//                     setError('Ошибка обработки ответа сервера');
//                 }
//             } else {
//                 setError('Ошибка сети или сервера. Пожалуйста, попробуйте позже.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContainer}>
//                 <div className={styles.modalHeader}>
//                     <h2 className={styles.modalTitle}>Добавление ученика</h2>
//                     <span className={styles.modalCloseButton} onClick={onClose}>&times;</span>
//                 </div>
//                 <div className={styles.modalBody}>
//                     {loading && <div className={styles.loadingOverlay}>Загрузка...</div>}
//                     {error && <div className={styles.errorMessage}>{error}</div>}
//                     {success && <div className={styles.successMessage}>{success}</div>}
                    
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
//                                 <input 
//                                     type="text" 
//                                     id="lastName" 
//                                     name="lastName" 
//                                     value={formData.lastName} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('lastName')}
//                                     required
//                                     disabled={loading}
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="firstName"><span>*</span>Имя:</label>
//                                 <input 
//                                     type="text" 
//                                     id="firstName" 
//                                     name="firstName" 
//                                     value={formData.firstName} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('firstName')}
//                                     required
//                                     disabled={loading}
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="middleName">Отчество:</label>
//                                 <input 
//                                     type="text" 
//                                     id="middleName" 
//                                     name="middleName" 
//                                     value={formData.middleName} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('middleName')}
//                                     disabled={loading}
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="birthDate"><span>*</span>Дата рождения:</label>
//                                 <input 
//                                     type="date" 
//                                     id="birthDate" 
//                                     name="birthDate" 
//                                     value={formData.birthDate} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('birthDate')}
//                                     required
//                                     disabled={loading}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <form className={styles.modalForm} onSubmit={handleSubmit}>
//                         <div className={styles.bottomFields}>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="motherId"><span>*</span>ФИО матери/опекуна 1:</label>
//                                 <select
//                                     id="motherId"
//                                     name="motherId"
//                                     value={formData.motherId}
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('motherId')}
//                                     required
//                                     disabled={loading}
//                                 >
//                                     <option value="">Выберите родителя</option>
//                                     {parentOptions.map((option) => (
//                                         <option key={option.id} value={option.id}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="fatherId">ФИО отца/опекуна 2:</label>
//                                 <select
//                                     id="fatherId"
//                                     name="fatherId"
//                                     value={formData.fatherId}
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('fatherId')}
//                                     disabled={loading}
//                                 >
//                                     <option value="">Выберите родителя (необязательно)</option>
//                                     {parentOptions.map((option) => (
//                                         <option key={option.id} value={option.id}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="phone"><span>*</span>Телефон:</label>
//                                 <input 
//                                     type="tel" 
//                                     id="phone" 
//                                     name="phone" 
//                                     value={formData.phone} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('phone')}
//                                     placeholder="+7 (XXX) XXX-XX-XX"
//                                     required
//                                     disabled={loading}
//                                 />
//                                 {touched.phone && errors.phone && (
//                                     <span className={styles.fieldError}>{errors.phone}</span>
//                                 )}
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="email">Email:</label>
//                                 <input 
//                                     type="email" 
//                                     id="email" 
//                                     name="email" 
//                                     value={formData.email} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('email')}
//                                     disabled={loading}
//                                 />
//                                 {touched.email && errors.email && (
//                                     <span className={styles.fieldError}>{errors.email}</span>
//                                 )}
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="address"><span>*</span>Адрес проживания:</label>
//                                 <input 
//                                     type="text" 
//                                     id="address" 
//                                     name="address" 
//                                     value={formData.address} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('address')}
//                                     required
//                                     disabled={loading}
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="certificateNumber"><span>*</span>Номер свидетельства:</label>
//                                 <input 
//                                     type="text" 
//                                     id="certificateNumber" 
//                                     name="certificateNumber" 
//                                     value={formData.certificateNumber} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('certificateNumber')}
//                                     placeholder="II-СЕ №123456"
//                                     required
//                                     disabled={loading}
//                                 />
//                                 {touched.certificateNumber && errors.certificateNumber && (
//                                     <span className={styles.fieldError}>{errors.certificateNumber}</span>
//                                 )}
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="login"><span>*</span>Логин:</label>
//                                 <input 
//                                     type="text" 
//                                     id="login" 
//                                     name="login" 
//                                     value={formData.login} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('login')}
//                                     required
//                                     disabled={loading}
//                                 />
//                             </div>
//                             <div className={styles.formGroup}>
//                                 <label htmlFor="password"><span>*</span>Пароль:</label>
//                                 <input 
//                                     type="password" 
//                                     id="password" 
//                                     name="password" 
//                                     value={formData.password} 
//                                     onChange={handleChange}
//                                     onBlur={() => handleBlur('password')}
//                                     required
//                                     disabled={loading}
//                                 />
//                                 {touched.password && errors.password && (
//                                     <span className={styles.fieldError}>{errors.password}</span>
//                                 )}
//                             </div>
//                         </div>
//                         <div className={styles.modalFooter}>
//                              <button 
//                                  type="submit" 
//                                  disabled={loading}
//                                  className={styles.submitButton}
//                              >
//                                  {loading ? 'Добавление...' : 'Добавить'}
//                              </button>
//                              <button 
//                                  type="button" 
//                                  onClick={onClose} 
//                                  disabled={loading}
//                              >
//                                  Отменить
//                              </button>
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
        motherId: '',
        fatherId: '',
        phone: '',
        email: '',
        address: '',
        certificateNumber: '',
        login: '',
        password: '',
        photo: null
    });
    
    const [previewUrl, setPreviewUrl] = useState(null);
    const [parentOptions, setParentOptions] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});

    // Обработчик изменения файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Проверка типа файла
            if (!file.type.match('image.*')) {
                setError('Пожалуйста, выберите файл изображения');
                return;
            }
            
            // Проверка размера файла (например, не более 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Размер файла не должен превышать 5MB');
                return;
            }

            setFormData(prev => ({ ...prev, photo: file }));
            
            // Создание превью изображения
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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

    useEffect(() => {
        const fetchParents = async () => {
            try {
                setLoading(true);
                const parentsData = await FetchWithAuth('http://127.0.0.1:8000/diary/parent/');
                setParentOptions(parentsData.map(parent => ({
                    id: parent.id,
                    label: `${parent.last_name} ${parent.first_name} ${parent.patronymic || ''}`
                })));
            } catch (error) {
                console.error('Ошибка при загрузке родителей:', error);
                setError('Не удалось загрузить список родителей');
            } finally {
                setLoading(false);
            }
        };

        fetchParents();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'certificateNumber') {
            const cleanedValue = value.replace(/[^ivxlcdm0-9-]/gi, '');
            setFormData(prev => ({ ...prev, [name]: cleanedValue }));
            return;
        }
        
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            setLoading(true);
            
            // Создаем FormData для отправки файла
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.login);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('password2', formData.password);
            formDataToSend.append('role', "Ученик");
            formDataToSend.append('last_name', formData.lastName);
            formDataToSend.append('first_name', formData.firstName);
            if (formData.middleName) formDataToSend.append('patronymic', formData.middleName);
            formDataToSend.append('phone_number', formData.phone);
            formDataToSend.append('birth_date', formData.birthDate);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('birth_certificate_number', formData.certificateNumber);
            if (formData.email) formDataToSend.append('email', formData.email);
            formDataToSend.append('parent1_id', formData.motherId);
            if (formData.fatherId) formDataToSend.append('parent2_id', formData.fatherId);
            if (formData.photo) formDataToSend.append('photo', formData.photo);

            const response = await FetchWithAuth('http://127.0.0.1:8000/diary/register/', {
                method: 'POST',
                body: formDataToSend
                // Не устанавливаем Content-Type вручную - браузер сам установит с boundary
            });

            setSuccess(`Ученик ${formData.lastName} ${formData.firstName} успешно добавлен`);
            
            // Очищаем форму
            setFormData({
                lastName: '',
                firstName: '',
                middleName: '',
                birthDate: '',
                motherId: '',
                fatherId: '',
                phone: '',
                email: '',
                address: '',
                certificateNumber: '',
                login: '',
                password: '',
                photo: null
            });
            setPreviewUrl(null);
            
            // Вызываем onAdd для обновления списка учеников
            onAdd();
            
            // Закрываем модальное окно через 2 секунды
            setTimeout(() => onClose());

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
                            {previewUrl ? (
                                <img src={previewUrl} alt="Превью фото" className={styles.profilePhoto} />
                            ) : (
                                <svg width="50" height="50" viewBox="0 0 100 100" fill="#F2D7B8">
                                    <circle cx="50" cy="30" r="15" />
                                    <path d="M50 60 C 30 60 10 80 10 90 A 40 40 0 0 1 90 90 C 90 80 70 60 50 60 Z" />
                                </svg>
                            )}
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                disabled={loading}
                            />
                            <label htmlFor="photo" className={styles.photoUploadLabel}>
                                {formData.photo ? 'Изменить фото' : 'Добавить фото'}
                            </label>
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
                                <label htmlFor="motherId"><span>*</span>ФИО матери/опекуна 1:</label>
                                <select
                                    id="motherId"
                                    name="motherId"
                                    value={formData.motherId}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('motherId')}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Выберите родителя</option>
                                    {parentOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="fatherId">ФИО отца/опекуна 2:</label>
                                <select
                                    id="fatherId"
                                    name="fatherId"
                                    value={formData.fatherId}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('fatherId')}
                                    disabled={loading}
                                >
                                    <option value="">Выберите родителя (необязательно)</option>
                                    {parentOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
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
                                 disabled={loading}
                                 className={styles.submitButton}
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