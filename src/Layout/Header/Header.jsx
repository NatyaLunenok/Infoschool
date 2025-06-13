import React, { useState, useEffect, useCallback } from 'react'; // <-- Добавлен useCallback
import FirstLine from './FirstLine/FirstLine';
import SecondLine from './SecondLine/SecondLine';
import SeletedLine from './SelectedLine/SelectedLine'
import SelectedQuarter from './SelectedQuarter/SelectedQuarter'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div style={{marginLeft:30}}>
      <FirstLine/>
      <SecondLine/>
      <SeletedLine/>
      <SelectedQuarter/>
    </div>
  );
};

export default Header;

