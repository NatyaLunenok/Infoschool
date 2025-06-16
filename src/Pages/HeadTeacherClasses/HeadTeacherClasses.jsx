// import { useState, useEffect } from 'react';
// import Footer from '../../Layout/Footer/Footer';
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
// import styles from './HeadTeacherClasses.module.css';
// import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
// import st from '../../images/strelochka_icon.png';
// import ListClass from '../../Tables/ListClass/ListClass';
// import { useNavigate } from 'react-router-dom';

// const HeadTeacherClasses = () => {
//   const navigate = useNavigate();
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [classData, setClassData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [openDropdown, setOpenDropdown] = useState({
//     class: false,
//     specialization: false,
//     teacher: false
//   });

//   const specializationOptions = ['Математический', 'Гуманитарный', 'Естественно-научный', 'Общий'];

//   const fetchClassData = async (classId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('accessToken'); // Изменено с access_token на accessToken
//       if (!token) {
//         throw new Error('Токен отсутствует');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${classId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Требуется авторизация');
//         }
//         throw new Error(`Ошибка сервера: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setClassData(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при загрузке данных класса:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//     fetchClassData(classItem.id);
//   };

//   const toggleDropdown = (dropdown) => {
//     setOpenDropdown(prev => ({
//       ...prev,
//       [dropdown]: !prev[dropdown]
//     }));
//   };

//   const handleSpecializationChange = async (selected) => {
//     if (!selectedClass) return;
    
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           specialization_name: selected
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить специализацию');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         specialization_name: selected
//       }));
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при обновлении специализации:', err);
//     } finally {
//       setOpenDropdown(prev => ({...prev, specialization: false}));
//     }
//   };

//   const handleYearChange = async (e) => {
//     if (!selectedClass) return;
    
//     const newYear = e.target.value;
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           year_admission: newYear
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить год поступления');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         year_admission: newYear
//       }));
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при обновлении года поступления:', err);
//     }
//   };

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine />
//         <div className={styles.ConteinerSecondLine}>
//           <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//           <button className={styles.activeButton}>КЛАССЫ</button>
//         </div>
//         <div style={{marginTop: '10px', marginBottom:'10px',marginRight:'30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//           <DropDownClass
//             currentClass={selectedClass}
//             onChange={handleClassChange}
//           />
//           <div className={styles.ConteinerButtons}>
//             <button className={styles.Button}>Сменить учебный год</button>
//             <button className={styles.Button}>Создать</button>
//             <button className={styles.Button}>Удалить</button>
//           </div>
//         </div>
        
//         {loading && <div>Loading...</div>}
//         {error && <div className={styles.error}>Error: {error}</div>}
        
//         <div style={{display: 'flex', flexDirection:'row', gap:'200px', marginBottom: '30px'}}>
//             <>
//               <ListClass students={classData.students} />
//               <div className={styles.classForm}>
//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Название:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <div className={styles.DropDownStatusButton}>
//                       {classData.class_name}
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Специализация:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <button 
//                       className={styles.DropDownStatusButton}
//                       onClick={() => toggleDropdown('specialization')}
//                     >
//                       {classData.specialization_name}
//                       <span className={styles.imageStrelochka}>
//                         <img 
//                           src={st} 
//                           alt="стрелочка" 
//                           style={{ transform: openDropdown.specialization ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                         />
//                       </span>
//                     </button>
//                     {openDropdown.specialization && (
//                       <div className={styles.DropDown}>
//                         <ul>
//                           {specializationOptions.map((option, index) => (
//                             <li 
//                               key={index} 
//                               onClick={() => handleSpecializationChange(option)}
//                               className={classData.specialization_name === option ? styles.Selected : ''}
//                             >
//                               {option}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Классный руководитель:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <div className={styles.DropDownStatusButton}>
//                       {classData.class_teacher_name}
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Год приема:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <input 
//                       type="number" 
//                       className={styles.DropDownStatusButton} 
//                       value={classData.year_admission} 
//                       onChange={handleYearChange}
//                       style={{textAlign: 'left', paddingLeft: '10px'}}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default HeadTeacherClasses;


// import { useState, useEffect } from 'react';
// import Footer from '../../Layout/Footer/Footer';
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
// import styles from './HeadTeacherClasses.module.css';
// import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
// import st from '../../images/strelochka_icon.png';
// import ListClass from '../../Tables/ListClass/ListClass';
// import { useNavigate } from 'react-router-dom';

// const HeadTeacherClasses = () => {
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [classData, setClassData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [openDropdown, setOpenDropdown] = useState({
//     class: false,
//     specialization: false,
//     teacher: false
//   });

//   const specializationOptions = ['Математический', 'Гуманитарный', 'Естественно-научный', 'Общий'];

//   const fetchClassData = async (classId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Токен отсутствует');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${classId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Требуется авторизация');
//         }
//         throw new Error(`Ошибка сервера: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setClassData(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при загрузке данных класса:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//     fetchClassData(classItem.id);
//   };

//   const toggleDropdown = (dropdown) => {
//     setOpenDropdown(prev => ({
//       ...prev,
//       [dropdown]: !prev[dropdown]
//     }));
//   };

//   const handleSpecializationChange = async (selected) => {
//     if (!selectedClass) return;
    
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           specialization_name: selected
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить специализацию');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         specialization_name: selected
//       }));
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при обновлении специализации:', err);
//     } finally {
//       setOpenDropdown(prev => ({...prev, specialization: false}));
//     }
//   };

//   const handleYearChange = async (e) => {
//     if (!selectedClass) return;
    
//     const newYear = e.target.value;
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           year_admission: newYear
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить год поступления');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         year_admission: newYear
//       }));
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при обновлении года поступления:', err);
//     }
//   };

//   const handleClassNameChange = async (e) => {
//     if (!selectedClass) return;
    
//     const newName = e.target.value;
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           class_name: newName
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить название класса');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         class_name: newName
//       }));
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при обновлении названия класса:', err);
//     }
//   };

//   return (
//     <>
//       <div style={{ marginLeft: 30 }}>
//         <FirstLine />
//         <div className={styles.ConteinerSecondLine}>
//           <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
//           <button className={styles.activeButton}>КЛАССЫ</button>
//         </div>
//         <div style={{marginTop: '10px', marginBottom:'10px',marginRight:'30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
//           <DropDownClass
//             currentClass={selectedClass}
//             onChange={handleClassChange}
//           />
//           <div className={styles.ConteinerButtons}>
//             <button className={styles.Button}>Сменить учебный год</button>
//             <button className={styles.Button}>Создать</button>
//             <button className={styles.Button}>Удалить</button>
//           </div>
//         </div>
        
//         {loading && <div>Loading...</div>}
//         {error && <div className={styles.error}>Error: {error}</div>}
        
//         <div style={{display: 'flex', flexDirection:'row', gap:'200px', marginBottom: '30px'}}>
//           {classData && (
//             <>
//               <ListClass students={classData.students} />
//               <div className={styles.classForm}>
//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Название:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <input 
//                       type="text" 
//                       className={styles.DropDownStatusButton} 
//                       value={classData.class_name} 
//                       onChange={handleClassNameChange}
//                       style={{textAlign: 'left', paddingLeft: '10px'}}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Специализация:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <button 
//                       className={styles.DropDownStatusButton}
//                       onClick={() => toggleDropdown('specialization')}
//                     >
//                       {classData.specialization_name}
//                       <span className={styles.imageStrelochka}>
//                         <img 
//                           src={st} 
//                           alt="стрелочка" 
//                           style={{ transform: openDropdown.specialization ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                         />
//                       </span>
//                     </button>
//                     {openDropdown.specialization && (
//                       <div className={styles.DropDown}>
//                         <ul>
//                           {specializationOptions.map((option, index) => (
//                             <li 
//                               key={index} 
//                               onClick={() => handleSpecializationChange(option)}
//                               className={classData.specialization_name === option ? styles.Selected : ''}
//                             >
//                               {option}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Классный руководитель:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <button 
//                       className={styles.DropDownStatusButton}
//                       onClick={() => toggleDropdown('teacher')}
//                     >
//                       {classData.class_teacher_name}
//                       <span className={styles.imageStrelochka}>
//                         <img 
//                           src={st} 
//                           alt="стрелочка" 
//                           style={{ transform: openDropdown.teacher ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                         />
//                       </span>
//                     </button>
//                     {openDropdown.teacher && (
//                       <div className={styles.DropDown}>
//                         <ul>
//                           {/* Здесь должен быть список учителей */}
//                           <li>Учитель 1</li>
//                           <li>Учитель 2</li>
//                           <li>Учитель 3</li>
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.formRow}>
//                   <label className={styles.label}>Год приема:</label>
//                   <div className={styles.DropDownSortContainer}>
//                     <input 
//                       type="number" 
//                       className={styles.DropDownStatusButton} 
//                       value={classData.year_admission} 
//                       onChange={handleYearChange}
//                       style={{textAlign: 'left', paddingLeft: '10px'}}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default HeadTeacherClasses;



import { useState, useEffect } from 'react';
import Footer from '../../Layout/Footer/Footer';
import FirstLine from '../../Layout/Header/FirstLine/FirstLine';
import styles from './HeadTeacherClasses.module.css';
import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
import st from '../../images/strelochka_icon.png';
import ListClass from '../../Tables/ListClass/ListClass';
import { useNavigate } from 'react-router-dom';

const HeadTeacherClasses = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState({
    class: false,
    specialization: false,
    teacher: false
  });
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);

  // Загрузка списков специализаций и учителей
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        // Загрузка специализаций
        const specResponse = await fetch('http://127.0.0.1:8000/diary/specialization/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (specResponse.ok) {
          const specData = await specResponse.json();
          setSpecializationOptions(specData.map(item => item.specialization_name));
        }

        // Загрузка учителей
        const teacherResponse = await fetch('http://127.0.0.1:8000/diary/teacher-list/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          setTeacherOptions(teacherData);
        }
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchClassData = async (classId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/classes/${classId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Требуется авторизация');
        }
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const data = await response.json();
      setClassData(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при загрузке данных класса:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (classItem) => {
    setSelectedClass(classItem);
    fetchClassData(classItem.id);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleSpecializationChange = async (selected) => {
    if (!selectedClass) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          specialization_name: selected
        })
      });
      
      if (!response.ok) {
        throw new Error('Не удалось обновить специализацию');
      }
      
      setClassData(prev => ({
        ...prev,
        specialization_name: selected
      }));
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при обновлении специализации:', err);
    } finally {
      setOpenDropdown(prev => ({...prev, specialization: false}));
    }
  };

  const handleTeacherChange = async (teacher) => {
    if (!selectedClass) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          class_teacher_id: teacher.id
        })
      });
      
      if (!response.ok) {
        throw new Error('Не удалось обновить классного руководителя');
      }
      
      setClassData(prev => ({
        ...prev,
        class_teacher_id: teacher.id,
        class_teacher_name: teacher.teacher_name
      }));
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при обновлении классного руководителя:', err);
    } finally {
      setOpenDropdown(prev => ({...prev, teacher: false}));
    }
  };

  const handleYearChange = async (e) => {
    if (!selectedClass) return;
    
    const newYear = e.target.value;
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          year_admission: newYear
        })
      });
      
      if (!response.ok) {
        throw new Error('Не удалось обновить год поступления');
      }
      
      setClassData(prev => ({
        ...prev,
        year_admission: newYear
      }));
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при обновлении года поступления:', err);
    }
  };

  const handleClassNameChange = async (e) => {
    if (!selectedClass) return;
    
    const newName = e.target.value;
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/classes/${selectedClass.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          class_name: newName
        })
      });
      
      if (!response.ok) {
        throw new Error('Не удалось обновить название класса');
      }
      
      setClassData(prev => ({
        ...prev,
        class_name: newName
      }));
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при обновлении названия класса:', err);
    }
  };

  const handleAddStudent = async (studentId) => {
    if (!selectedClass) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch('http://127.0.0.1:8000/diary/classes/add-student/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_id: studentId,
          class_id: selectedClass.id
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.non_field_errors) {
          throw new Error(data.non_field_errors[0]);
        }
        throw new Error('Не удалось добавить ученика');
      }
      
      // Обновляем данные класса после успешного добавления
      fetchClassData(selectedClass.id);
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <>
      <div style={{ marginLeft: 30 }}>
        <FirstLine />
        <div className={styles.ConteinerSecondLine}>
          <button className={styles.defaultButton}>РАСПИСАНИЕ</button>
          <button className={styles.activeButton}>КЛАССЫ</button>
        </div>
        <div style={{marginTop: '10px', marginBottom:'10px',marginRight:'30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <DropDownClass
            currentClass={selectedClass}
            onChange={handleClassChange}
          />
          <div className={styles.ConteinerButtons}>
            <button className={styles.Button}>Сменить учебный год</button>
            <button className={styles.Button}>Создать</button>
            <button className={styles.Button}>Удалить</button>
          </div>
        </div>
        
        {loading && <div>Loading...</div>}
        {error && <div className={styles.error}>Error: {error}</div>}
        
        <div style={{display: 'flex', flexDirection:'row', gap:'200px', marginBottom: '30px'}}>
          {classData && (
            <>
              <ListClass 
                students={classData.students} 
                onAddStudent={handleAddStudent}
                classId={selectedClass.id}
              />
              <div className={styles.classForm}>
                <div className={styles.formRow}>
                  <label className={styles.label}>Название:</label>
                  <div className={styles.DropDownSortContainer}>
                    <input 
                      type="text" 
                      className={styles.DropDownStatusButton} 
                      value={classData.class_name} 
                      onChange={handleClassNameChange}
                      style={{textAlign: 'left', paddingLeft: '10px'}}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label className={styles.label}>Специализация:</label>
                  <div className={styles.DropDownSortContainer}>
                    <button 
                      className={styles.DropDownStatusButton}
                      onClick={() => toggleDropdown('specialization')}
                    >
                      {classData.specialization_name}
                      <span className={styles.imageStrelochka}>
                        <img 
                          src={st} 
                          alt="стрелочка" 
                          style={{ transform: openDropdown.specialization ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </span>
                    </button>
                    {openDropdown.specialization && (
                      <div className={styles.DropDown}>
                        <ul>
                          {specializationOptions.map((option, index) => (
                            <li 
                              key={index} 
                              onClick={() => handleSpecializationChange(option)}
                              className={classData.specialization_name === option ? styles.Selected : ''}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label className={styles.label}>Классный руководитель:</label>
                  <div className={styles.DropDownSortContainer}>
                    <button 
                      className={styles.DropDownStatusButton}
                      onClick={() => toggleDropdown('teacher')}
                    >
                      {classData.class_teacher_name}
                      <span className={styles.imageStrelochka}>
                        <img 
                          src={st} 
                          alt="стрелочка" 
                          style={{ transform: openDropdown.teacher ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </span>
                    </button>
                    {openDropdown.teacher && (
                      <div className={styles.DropDown}>
                        <ul>
                          {teacherOptions.map((teacher) => (
                            <li 
                              key={teacher.id} 
                              onClick={() => handleTeacherChange(teacher)}
                              className={classData.class_teacher_id === teacher.id ? styles.Selected : ''}
                            >
                              {teacher.teacher_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label className={styles.label}>Год приема:</label>
                  <div className={styles.DropDownSortContainer}>
                    <input 
                      type="number" 
                      className={styles.DropDownStatusButton} 
                      value={classData.year_admission} 
                      onChange={handleYearChange}
                      style={{textAlign: 'left', paddingLeft: '10px'}}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeadTeacherClasses;