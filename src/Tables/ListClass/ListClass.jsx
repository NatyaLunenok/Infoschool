// import { useState, useEffect } from 'react';
// import styles from './ListClass.module.css';

// const ClassList = ({ students = [], onAddStudent, classId }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     if (e.target.value.length > 2) {
//       setShowSearchResults(true);
//       searchStudents(e.target.value);
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//     }
//   };

//   const searchStudents = async (query) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Требуется авторизация');
//       }

//       const response = await fetch(`http://127.0.0.1:8000/diary/student/?search=${query}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Ошибка при поиске учеников');
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Ошибка при поиске учеников:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStudentSelect = (student) => {
//     setSelectedStudent(student);
//     setSearchTerm(`${student.last_name} ${student.first_name} ${student.patronymic}`);
//     setShowSearchResults(false);
//   };

//   const handleAddClick = async () => {
//     if (!selectedStudent || !classId) return;
    
//     const result = await onAddStudent(selectedStudent.id);
//     if (result.success) {
//       setSearchTerm('');
//       setSelectedStudent(null);
//     } else {
//       alert(result.message);
//     }
//   };

//   return (
//     <div className={styles.classListTableContainer}>
//       <h2>Список класса</h2>
//       <div className={styles.tableWrapper}>
//         <table className={styles.classListTable}>
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={student.id}>
//                 <td>{index + 1}</td>
//                 <td>{student.full_name}</td>
//               </tr>
//             ))}
//             <tr className={styles.emptyRow}>
//               <td>
//                 <button 
//                   className={styles.addButton}
//                   onClick={handleAddClick}
//                   disabled={!selectedStudent}
//                 >
//                   +
//                 </button>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Введите ФИО ученика"
//                   className={styles.searchInput}
//                 />
//                 {showSearchResults && (
//                   <div className={styles.searchResults}>
//                     {loading && <div>Загрузка...</div>}
//                     {error && <div className={styles.error}>{error}</div>}
//                     {searchResults.length > 0 ? (
//                       <ul>
//                         {searchResults.map(student => (
//                           <li 
//                             key={student.id}
//                             onClick={() => handleStudentSelect(student)}
//                             className={selectedStudent?.id === student.id ? styles.selected : ''}
//                           >
//                             {`${student.last_name} ${student.first_name} ${student.patronymic}`}
//                             <br />
//                             <small>Дата рождения: {student.birth_date}</small>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       !loading && <div>Ничего не найдено</div>
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

// export default ClassList;


import { useState, useEffect } from 'react';
import styles from './ListClass.module.css';

const ClassList = ({ students = [], onAddStudent, classId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      setShowSearchResults(true);
      searchStudents(value);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const searchStudents = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Требуется авторизация');
      }

      const response = await fetch(`http://127.0.0.1:8000/diary/student/?search=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при поиске учеников');
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при поиске учеников:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setSearchTerm(`${student.last_name} ${student.first_name} ${student.patronymic}`);
    setShowSearchResults(false);
  };

  const handleAddClick = async () => {
    if (!selectedStudent || !classId) return;
    
    const result = await onAddStudent(selectedStudent.id);
    if (result.success) {
      setSearchTerm('');
      setSelectedStudent(null);
    } else {
      setError(result.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className={styles.classListTableContainer}>
      <h2>Список класса</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.classListTable}>
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО ученика</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.full_name}</td>
              </tr>
            ))}
            <tr className={styles.emptyRow}>
              <td>
                <button 
                  className={styles.addButton}
                  onClick={handleAddClick}
                  disabled={!selectedStudent}
                >
                  +
                </button>
              </td>
              <td>
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
                      <ul>
                        {searchResults.map(student => (
                          <li 
                            key={student.id}
                            onClick={() => handleStudentSelect(student)}
                            className={selectedStudent?.id === student.id ? styles.selected : ''}
                          >
                            <div className={styles.studentName}>
                              {`${student.last_name} ${student.first_name} ${student.patronymic}`}
                            </div>
                            <div className={styles.studentBirth}>
                              {formatDate(student.birth_date)}
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

export default ClassList;