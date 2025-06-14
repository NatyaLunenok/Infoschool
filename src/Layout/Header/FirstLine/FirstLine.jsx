import React, { useEffect } from 'react';
import styles from './FirstLine.module.css';
import logo from '../../../images/logo.png';
import FetchWithAuth from '../../../Pages/Authorization/FetchWithAuth';
import { useNavigate } from "react-router-dom";

const FirstLine = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            console.warn('No refresh token found. Cannot logout.');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            navigate('/');
            return;
        }

        try {
            const data = await FetchWithAuth('http://127.0.0.1:8000/diary/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
             console.log("выход",data);

            if (!data ) {
                console.error('Logout failed:', data);
            } else {
                console.log('Logout successful');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            navigate('/');
        }
    };

    useEffect(() => {
      const data =   localStorage.getItem('username');
        console.log("юзер",data);
    }, []);

    return (
        <div className={styles.ConteinerFirstLine}>
            <div className={styles.logo}>
                <img src={logo} alt=""/>
            </div>
            <div className={styles.textbox}>
                <p className={styles.NameUser}>Учитель</p>
                <button className={styles.ButtonExit} onClick={handleLogout}>ВЫХОД</button>
            </div>
        </div>
    );
};

export default FirstLine;

