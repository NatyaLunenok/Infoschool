// import { useState } from 'react';
// import Footer from '../../Layout/Footer/Footer'
// import FirstLine from '../../Layout/Header/FirstLine/FirstLine'
// import styles from './HeadTeacherClasses.module.css'
// import DropDownClass from '../../Layout/Header/SelectedLine/DropDownClass/DropDownClass';
// import st from '../../images/strelochka_icon.png';
// import ListClass from '../../Tables/ListClass/ListClass'

// const HeadTeacherClasses = () => {
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [className, setClassName] = useState('1A');
//   const [specialization, setSpecialization] = useState('Математический');
//   const [teacher, setTeacher] = useState('Семенова Марина Владимировна');
//   const [year, setYear] = useState('2017');
//   const [openDropdown, setOpenDropdown] = useState({
//     class: false,
//     specialization: false,
//     teacher: false
//   });

//   const classOptions = ['1A', '1B', '2A', '2B', '3A', '3B'];
//   const specializationOptions = ['Математический', 'Гуманитарный', 'Естественно-научный', 'Общий'];
//   const teacherOptions = [
//     'Семенова Марина Владимировна',
//     'Иванов Петр Сергеевич',
//     'Петрова Анна Михайловна',
//     'Сидоров Алексей Владимирович'
//   ];

//   const handleSubjectChange = (subject) => {
//     setSelectedSubject(subject);
//   };

//   const handleClassChange = (classItem) => {
//     setSelectedClass(classItem);
//   };

//   const toggleDropdown = (dropdown) => {
//     setOpenDropdown(prev => ({
//       ...prev,
//       [dropdown]: !prev[dropdown]
//     }));
//   };

//   const handleClassNameChange = (selected) => {
//     setClassName(selected);
//     setOpenDropdown(prev => ({...prev, class: false}));
//   };

//   const handleSpecializationChange = (selected) => {
//     setSpecialization(selected);
//     setOpenDropdown(prev => ({...prev, specialization: false}));
//   };

//   const handleTeacherChange = (selected) => {
//     setTeacher(selected);
//     setOpenDropdown(prev => ({...prev, teacher: false}));
//   };

//   const handleYearChange = (e) => {
//     setYear(e.target.value);
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
//           selectedClass={selectedClass}
//           onClassChange={handleClassChange}/>
//           <div className={styles.ConteinerButtons}>
//             <button className={styles.Button}>Сменить учебный год</button>
//             <button className={styles.Button}>Создать</button>
//             <button className={styles.Button}>Удалить</button>
//           </div>
//         </div>
//         <div style={{display: 'flex', flexDirection:'row', gap:'200px', marginBottom: '30px'}}>
//         <ListClass/>
//         <div className={styles.classForm}>
//           <div className={styles.formRow}>
//             <label className={styles.label}>Название:</label>
//             <div className={styles.DropDownSortContainer}>
//               <button 
//                 className={styles.DropDownStatusButton}
//                 onClick={() => toggleDropdown('class')}
//               >
//                 {className}
//                 <span className={styles.imageStrelochka}>
//                   <img 
//                     src={st} 
//                     alt="стрелочка" 
//                     style={{ transform: openDropdown.class ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                   />
//                 </span>
//               </button>
//               {openDropdown.class && (
//                 <div className={styles.DropDown}>
//                   <ul>
//                     {classOptions.map((option, index) => (
//                       <li 
//                         key={index} 
//                         onClick={() => handleClassNameChange(option)}
//                         className={className === option ? styles.Selected : ''}
//                       >
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <label className={styles.label}>Специализация:</label>
//             <div className={styles.DropDownSortContainer}>
//               <button 
//                 className={styles.DropDownStatusButton}
//                 onClick={() => toggleDropdown('specialization')}
//               >
//                 {specialization}
//                 <span className={styles.imageStrelochka}>
//                   <img 
//                     src={st} 
//                     alt="стрелочка" 
//                     style={{ transform: openDropdown.specialization ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                   />
//                 </span>
//               </button>
//               {openDropdown.specialization && (
//                 <div className={styles.DropDown}>
//                   <ul>
//                     {specializationOptions.map((option, index) => (
//                       <li 
//                         key={index} 
//                         onClick={() => handleSpecializationChange(option)}
//                         className={specialization === option ? styles.Selected : ''}
//                       >
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <label className={styles.label}>Классный руководитель:</label>
//             <div className={styles.DropDownSortContainer}>
//               <button 
//                 className={styles.DropDownStatusButton}
//                 onClick={() => toggleDropdown('teacher')}
//               >
//                 {teacher}
//                 <span className={styles.imageStrelochka}>
//                   <img 
//                     src={st} 
//                     alt="стрелочка" 
//                     style={{ transform: openDropdown.teacher ? 'rotate(180deg)' : 'rotate(0deg)' }}
//                   />
//                 </span>
//               </button>
//               {openDropdown.teacher && (
//                 <div className={styles.DropDown}>
//                   <ul>
//                     {teacherOptions.map((option, index) => (
//                       <li 
//                         key={index} 
//                         onClick={() => handleTeacherChange(option)}
//                         className={teacher === option ? styles.Selected : ''}
//                       >
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <label className={styles.label}>Год приема:</label>
//             <div className={styles.DropDownSortContainer}>
//               <input 
//                 type="text" 
//                 className={styles.DropDownStatusButton} 
//                 value={year} 
//                 onChange={handleYearChange}
//                 style={{textAlign: 'left', paddingLeft: '10px'}}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//         </div>

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

//   const checkAuth = () => {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       navigate('/');
//       return false;
//     }
//     return true;
//   };

//   const fetchClassData = async (classId) => {
//     if (!checkAuth()) return;
    
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await fetch(`http://127.0.0.1:8000/diary/classes/${classId}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.status === 401) {
//         localStorage.removeItem('access_token');
//         navigate('/login');
//         return;
//       }
      
//       if (!response.ok) {
//         throw new Error(`Ошибка сервера: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setClassData(data);
//     } catch (err) {
//       setError(err.message);
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

// const handleSpecializationChange = async (selected) => {
//     if (!checkAuth() || !selectedClass) return;
    
//     try {
//       const token = localStorage.getItem('access_token');
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

//       if (response.status === 401) {
//         localStorage.removeItem('access_token');
//         navigate('/login');
//         return;
//       }
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить специализацию');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         specialization_name: selected
//       }));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setOpenDropdown(prev => ({...prev, specialization: false}));
//     }
//   };

//   const handleYearChange = async (e) => {
//     if (!checkAuth() || !selectedClass) return;
    
//     const newYear = e.target.value;
//     try {
//       const token = localStorage.getItem('access_token');
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

//       if (response.status === 401) {
//         localStorage.removeItem('access_token');
//         navigate('/');
//         return;
//       }
      
//       if (!response.ok) {
//         throw new Error('Не удалось обновить год поступления');
//       }
      
//       setClassData(prev => ({
//         ...prev,
//         year_admission: newYear
//       }));
//     } catch (err) {
//       setError(err.message);
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

  const specializationOptions = ['Математический', 'Гуманитарный', 'Естественно-научный', 'Общий'];

  const fetchClassData = async (classId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken'); // Изменено с access_token на accessToken
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
              <ListClass students={classData.students} />
              <div className={styles.classForm}>
                <div className={styles.formRow}>
                  <label className={styles.label}>Название:</label>
                  <div className={styles.DropDownSortContainer}>
                    <div className={styles.DropDownStatusButton}>
                      {classData.class_name}
                    </div>
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
                    <div className={styles.DropDownStatusButton}>
                      {classData.class_teacher_name}
                    </div>
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