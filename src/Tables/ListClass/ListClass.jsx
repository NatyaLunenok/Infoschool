// import { useState, useEffect } from 'react';
// import styles from './ListClass.module.css';

// const ListClass = ({ students = [], onAddStudent, classId }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [addError, setAddError] = useState(null);

//   useEffect(() => {
//     const searchStudents = async (query) => {
//       if (query.length < 1) {
//         setSearchResults([]);
//         return;
//       }

//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//           throw new Error('Требуется авторизация');
//         }

//         const response = await fetch(
//           `http://127.0.0.1:8000/diary/student/?search=${query}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error('Ошибка при поиске учеников');
//         }

//         const data = await response.json();
//         // Фильтруем результаты, чтобы показывать только тех, у кого ФИО начинается с поискового запроса
//         const filteredResults = data.filter(student =>
//           `${student.last_name} ${student.first_name} ${student.patronymic}`
//             .toLowerCase()
//             .startsWith(query.toLowerCase())
//         );
//         setSearchResults(filteredResults);
//       } catch (err) {
//         setError(err.message);
//         console.error('Ошибка при поиске учеников:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounceTimer = setTimeout(() => {
//       searchStudents(searchTerm);
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [searchTerm]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setShowSearchResults(value.length > 0);
//   };

//   const handleStudentSelect = (student) => {
//     setSelectedStudent(student);
//     setSearchTerm(`${student.last_name} ${student.first_name} ${student.patronymic}`);
//     setShowSearchResults(false);
//   };

//     const handleAddClick = async () => {
//     if (!selectedStudent || !classId) return;
    
//     setAddError(null); // Сбрасываем предыдущую ошибку
//     const result = await onAddStudent(selectedStudent.id);
    
//     if (result.success) {
//       setSearchTerm('');
//       setSelectedStudent(null);
//     } else {
//       setAddError(result.message); // Устанавливаем сообщение об ошибке
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('ru-RU', options);
//   };

//   return (
//     <div className={styles.classListTableContainer}>
//       <h2>Список класса</h2>
//       {/* Добавьте отображение ошибки добавления */}
//       {addError && (
//         <div className={styles.errorMessage}>
//           {addError}
//         </div>
//       )}
//       <div className={styles.tableWrapper}>
//         <table className={styles.classListTable}>
//           <thead>
//             <tr>
//               <th>№</th>
//               <th>ФИО ученика</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={student.id}>
//                 <td>{index + 1}</td>
//                 <td>{student.full_name}</td>
//               </tr>
//             ))}
//             <tr className={styles.addRow}>
//               <td>
//                 <button 
//                   className={styles.addButton}
//                   onClick={handleAddClick}
//                   disabled={!selectedStudent}
//                 >
//                   +
//                 </button>
//               </td>
//               <td className={styles.searchCell}>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Введите ФИО ученика"
//                   className={styles.searchInput}
//                   autoComplete="off"
//                 />
//                 {showSearchResults && (
//                   <div className={styles.searchResults}>
//                     {loading && <div className={styles.loading}>Загрузка...</div>}
//                     {error && <div className={styles.error}>{error}</div>}
//                     {searchResults.length > 0 ? (
//                       <ul className={styles.resultsList}>
//                         {searchResults.map(student => (
//                           <li 
//                             key={student.id}
//                             onClick={() => handleStudentSelect(student)}
//                             className={selectedStudent?.id === student.id ? styles.selected : ''}
//                           >
//                             <div className={styles.studentInfo}>
//                               <span className={styles.studentName}>
//                                 {`${student.last_name} ${student.first_name} ${student.patronymic}`}
//                               </span>
//                               <span className={styles.studentBirth}>
//                                 {formatDate(student.birth_date)}
//                               </span>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       !loading && <div className={styles.noResults}>Ничего не найдено</div>
//                     )}
//                   </div>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ListClass;


import { useState, useEffect } from 'react';
import styles from './ListClass.module.css';

const ListClass = ({ students = [], onAddStudent, classId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [addError, setAddError] = useState(null);

  // Сортируем студентов по алфавиту
  const sortedStudents = [...students].sort((a, b) => 
    a.full_name.localeCompare(b.full_name)
  );

  useEffect(() => {
    const searchStudents = async (query) => {
      if (query.length < 1) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Требуется авторизация');
        }

        const response = await fetch(
          `http://127.0.0.1:8000/diary/student/?search=${query}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Ошибка при поиске учеников');
        }

        const data = await response.json();
        const filteredResults = data.filter(student =>
          `${student.last_name} ${student.first_name} ${student.patronymic}`
            .toLowerCase()
            .startsWith(query.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка при поиске учеников:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchStudents(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setSearchTerm(`${student.last_name} ${student.first_name} ${student.patronymic}`);
    setShowSearchResults(false);
  };

  const handleAddClick = async () => {
    if (!selectedStudent || !classId) return;
    
    setAddError(null);
    const result = await onAddStudent(selectedStudent.id);
    
    if (result.success) {
      setSearchTerm('');
      setSelectedStudent(null);
    } else {
      setAddError(result.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className={styles.classListTableContainer}>
      <h2>Список класса</h2>
      {addError && (
        <div className={styles.errorMessage}>
          {addError}
        </div>
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.classListTable}>
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО ученика</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.full_name}</td>
              </tr>
            ))}
            <tr className={styles.addRow}>
              <td>
                <button 
                  className={styles.addButton}
                  onClick={handleAddClick}
                  disabled={!selectedStudent}
                >
                  +
                </button>
              </td>
              <td className={styles.searchCell}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Введите ФИО ученика"
                  className={styles.searchInput}
                  autoComplete="off"
                />
                {showSearchResults && (
                  <div className={styles.searchResults}>
                    {loading && <div className={styles.loading}>Загрузка...</div>}
                    {error && <div className={styles.error}>{error}</div>}
                    {searchResults.length > 0 ? (
                      <ul className={styles.resultsList}>
                        {searchResults.map(student => (
                          <li 
                            key={student.id}
                            onClick={() => handleStudentSelect(student)}
                            className={selectedStudent?.id === student.id ? styles.selected : ''}
                          >
                            <div className={styles.studentInfo}>
                              <span className={styles.studentName}>
                                {`${student.last_name} ${student.first_name} ${student.patronymic}`}
                              </span>
                              <span className={styles.studentBirth}>
                                {formatDate(student.birth_date)}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      !loading && <div className={styles.noResults}>Ничего не найдено</div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClass;