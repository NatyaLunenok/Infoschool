import React from 'react';
import ReactDOM from 'react-dom/client';
import A from './A';
import Authorization from './Pages/Authorization/Authorization'
import JournalTeacher from './Pages/JournalTeacher/JournalTeacher'
import AccountsAdmin from './Pages/AccountsAdmin/AccountsAdmin'
import AccountsAdminParents from './Pages/AccountsAdminParents/AccountsAdminParents'
import AccountsAdminTeachers from './Pages/AccountsAdminTeachers/AccountsAdminTeachers';
import ScheduleTeacherMy from './Pages/ScheduleTeacherMy/ScheduleTeacherMy';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeadTeacherClasses from './Pages/HeadTeacherClasses/HeadTeacherClasses';
import Diary from './Pages/Diary/Diary';
import GradeQuater1 from './Pages/GradeQuater1/GradeQuater1';
import GradeSummary from './Pages/GradeSummary/GradeSummary';

function App(){
  
  return(
    <Router>
      <Routes>
        {/* <Route path="/" element={<AccountsAdmin/>} /> */}
        {/* <Route path="/" element={<AccountsAdminParents/>} /> */}
        {/* <Route path="/" element={<JournalTeacher/>} /> */}
        {/* <Route path="/" element={<HeadTeacherClasses/>} /> */}
        {/* <Route path="/" element={<ScheduleTeacherMy/>} /> */}
        {/* <Route path="/" element={<Diary/>} /> */}
        {/* <Route path="/" element={<GradeQuater1/>} /> */}
        {/* <Route path="/" element={<GradeSummary/>} /> */}
        <Route path="/" element={<Authorization/>} />
        <Route path="/paa" element={<AccountsAdmin/>} />
        <Route path="/pjt" element={<JournalTeacher/>} />
        <Route path="/paap" element={<AccountsAdminParents/>} />
        <Route path="/paat" element={<AccountsAdminTeachers/>} />
        <Route path="/phtc" element={<HeadTeacherClasses/>} />
        <Route path="/pstm" element={<ScheduleTeacherMy/>} />
        <Route path="/pd" element={<Diary/>} />
        <Route path="/pgq1" element={<GradeQuater1/>} />
        <Route path="/pgs" element={<GradeSummary/>} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);