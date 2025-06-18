
// import { useState, useCallback } from 'react';
// import styles from './HomeworkModal.module.css';

// const HomeworkModal = ({ isOpen, onClose, onSubmit, mode = 'add', homeworkData = null }) => {
//     const [homeworkText, setHomeworkText] = useState(mode === 'view' ? homeworkData?.text : '');
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [fileNames, setFileNames] = useState([]);

//     const handleTextChange = (event) => {
//         setHomeworkText(event.target.value);
//     };

//     const handleFileChange = (event) => {
//         const files = Array.from(event.target.files);
//         setSelectedFiles(prevFiles => [...prevFiles, ...files]);
//         setFileNames(prevNames => [...prevNames, ...files.map(file => file.name)]);
//     };

//     const handleRemoveFile = (index) => {
//         setSelectedFiles(prevFiles => {
//             const newFiles = [...prevFiles];
//             newFiles.splice(index, 1);
//             return newFiles;
//         });
//         setFileNames(prevNames => {
//             const newNames = [...prevNames];
//             newNames.splice(index, 1);
//             return newNames;
//         });
//     };

//     const handleSubmit = useCallback(() => {
//         if (mode === 'add' && homeworkText.trim() === '' && selectedFiles.length === 0) {
//             alert('Пожалуйста, добавьте текст задания или прикрепите файлы.');
//             return;
//         }

//         onSubmit({
//             text: homeworkText,
//             files: selectedFiles
//         });

//         if (mode === 'add') {
//             setHomeworkText('');
//             setSelectedFiles([]);
//             setFileNames([]);
//         }
//     }, [homeworkText, selectedFiles, onSubmit, mode]);

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 <div className={styles.modalHeader}>
//                     <h2 className={styles.modalTitle}>
//                         {mode === 'add' ? 'Добавление домашнего задания' : 'Домашнее задание'}
//                     </h2>
//                     <button className={styles.closeButton} onClick={onClose}>
//                         X
//                     </button>
//                 </div>
//                 <div className={styles.modalBody}>
//                     <label htmlFor="homeworkText" className={styles.homeworkLabel}>
//                         Текст задания:
//                     </label>
//                     {mode === 'view' ? (
//                         <div className={styles.homeworkText}>
//                             {homeworkData?.text || 'Текст задания отсутствует'}
//                         </div>
//                     ) : (
//                         <textarea
//                             id="homeworkText"
//                             className={styles.homeworkTextarea}
//                             value={homeworkText}
//                             onChange={handleTextChange}
//                             placeholder="Введите текст задания..."
//                         />
//                     )}

//                     {(mode === 'add' || (homeworkData?.files && homeworkData.files.length > 0)) && (
//                         <div className={styles.fileInputContainer}>
//                             {mode === 'add' && (
//                                 <>
//                                     <label htmlFor="fileInput" className={styles.fileInputLabel}>
//                                         <svg
//                                             width="16"
//                                             height="16"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="#4CAF50"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         >
//                                             <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
//                                         </svg>
//                                         Прикрепить файлы
//                                     </label>
//                                     <input
//                                         type="file"
//                                         id="fileInput"
//                                         className={styles.fileInput}
//                                         multiple
//                                         onChange={handleFileChange}
//                                     />
//                                 </>
//                             )}

//                             {(fileNames.length > 0 || (homeworkData?.files && homeworkData.files.length > 0)) && (
//                                 <div className={styles.fileList}>
//                                     <div className={styles.fileListTitle}>Прикрепленные файлы:</div>
//                                     <ul>
//                                         {mode === 'view' ? (
//                                             homeworkData.files.map((file, index) => (
//                                                 <li key={index}>
//                                                     <a 
//                                                         href={file.url} 
//                                                         target="_blank" 
//                                                         rel="noopener noreferrer"
//                                                         className={styles.fileLink}
//                                                     >
//                                                         {file.name}
//                                                     </a>
//                                                 </li>
//                                             ))
//                                         ) : (
//                                             fileNames.map((name, index) => (
//                                                 <li key={index}>
//                                                     {name}
//                                                     <button
//                                                         type="button"
//                                                         className={styles.removeFileButton}
//                                                         onClick={() => handleRemoveFile(index)}
//                                                     >
//                                                         &times;
//                                                     </button>
//                                                 </li>
//                                             ))
//                                         )}
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <div className={styles.modalFooter}>
//                     {mode === 'add' && (
//                         <button className={styles.addButton} onClick={handleSubmit}>
//                             Добавить
//                         </button>
//                     )}
//                     <button className={styles.cancelButton} onClick={onClose}>
//                         {mode === 'add' ? 'Отмена' : 'Закрыть'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomeworkModal;


import { useState, useCallback, useEffect } from 'react';
import styles from './HomeworkModal.module.css';

const HomeworkModal = ({ isOpen, onClose, onSubmit, mode = 'add', homeworkData = null }) => {
    const [homeworkText, setHomeworkText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);

    // Сбрасываем состояние при изменении режима или открытии модального окна
    useEffect(() => {
        if (isOpen) {
            if (mode === 'view' && homeworkData) {
                setHomeworkText(homeworkData.text || '');
            } else {
                setHomeworkText('');
            }
            setSelectedFiles([]);
            setFileNames([]);
        }
    }, [isOpen, mode, homeworkData]);

    const handleTextChange = (event) => {
        setHomeworkText(event.target.value);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        setFileNames(prevNames => [...prevNames, ...files.map(file => file.name)]);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
        setFileNames(prevNames => {
            const newNames = [...prevNames];
            newNames.splice(index, 1);
            return newNames;
        });
    };

    const handleSubmit = useCallback(() => {
        if (mode === 'add' && homeworkText.trim() === '' && selectedFiles.length === 0) {
            alert('Пожалуйста, добавьте текст задания или прикрепите файлы.');
            return;
        }

        onSubmit({
            text: homeworkText,
            files: selectedFiles
        });

        if (mode === 'add') {
            setHomeworkText('');
            setSelectedFiles([]);
            setFileNames([]);
        }
    }, [homeworkText, selectedFiles, onSubmit, mode]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {mode === 'add' ? 'Добавление домашнего задания' : 'Домашнее задание'}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        X
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <label htmlFor="homeworkText" className={styles.homeworkLabel}>
                        Текст задания:
                    </label>
                    {mode === 'view' ? (
                        <div className={styles.homeworkText}>
                            {homeworkData?.text || 'Текст задания отсутствует'}
                        </div>
                    ) : (
                        <textarea
                            id="homeworkText"
                            className={styles.homeworkTextarea}
                            value={homeworkText}
                            onChange={handleTextChange}
                            placeholder="Введите текст задания..."
                        />
                    )}

                    {(mode === 'add' || (homeworkData?.files && homeworkData.files.length > 0)) && (
                        <div className={styles.fileInputContainer}>
                            {mode === 'add' && (
                                <>
                                    <label htmlFor="fileInput" className={styles.fileInputLabel}>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#4CAF50"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21.44 11.05L12.96 19.53a4.5 4.5 0 01-6.36-6.36l7.07-7.07a3 3 0 114.24 4.24l-6.36 6.36" />
                                        </svg>
                                        Прикрепить файлы
                                    </label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className={styles.fileInput}
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </>
                            )}

                            {(fileNames.length > 0 || (homeworkData?.files && homeworkData.files.length > 0)) && (
                                <div className={styles.fileList}>
                                    <div className={styles.fileListTitle}>Прикрепленные файлы:</div>
                                    <ul>
                                        {mode === 'view' ? (
                                            homeworkData.files.map((file, index) => (
                                                <li key={index}>
                                                    <a 
                                                        href={file.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className={styles.fileLink}
                                                    >
                                                        {file.name}
                                                    </a>
                                                </li>
                                            ))
                                        ) : (
                                            fileNames.map((name, index) => (
                                                <li key={index}>
                                                    {name}
                                                    <button
                                                        type="button"
                                                        className={styles.removeFileButton}
                                                        onClick={() => handleRemoveFile(index)}
                                                    >
                                                        &times;
                                                    </button>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.modalFooter}>
                    {mode === 'add' && (
                        <button className={styles.addButton} onClick={handleSubmit}>
                            Добавить
                        </button>
                    )}
                    <button className={styles.cancelButton} onClick={onClose}>
                        {mode === 'add' ? 'Отмена' : 'Закрыть'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeworkModal;