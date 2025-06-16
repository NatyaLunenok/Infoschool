// import React from 'react';
// import styles from './ListClass.module.css';

// const ClassList = ({ students = [] }) => {
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
//               <td/>
//               <td>
//                 <button className={styles.addButton}>+</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ClassList;


import React from 'react';
import styles from './ListClass.module.css';

const ClassList = ({ students = [] }) => {
  return (
    <div className={styles.classListTableContainer}>
      <h2>Список класса</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.classListTable}>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.full_name}</td>
              </tr>
            ))}
            <tr className={styles.emptyRow}>
              <td>
                <button className={styles.addButton}>+</button>
              </td>
              <td/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList;