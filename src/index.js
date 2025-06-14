import React from 'react';
import ReactDOM from 'react-dom/client';
import A from './A';
import Authorization from './Pages/Authorization/Authorization'
import JournalTeacher from './Pages/JournalTeacher/JournalTeacher'
import AccountsAdmin from './Pages/AccountsAdmin/AccountsAdmin'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(){
  
  return(
    <Router>
      <Routes>
        {/* <Route path="/" element={<AccountsAdmin/>} /> */}
        {/* <Route path="/" element={<JournalTeacher/>} /> */}
        <Route path="/" element={<Authorization/>} />
        <Route path="/paa" element={<AccountsAdmin/>} />
        <Route path="/pjt" element={<JournalTeacher/>} />
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