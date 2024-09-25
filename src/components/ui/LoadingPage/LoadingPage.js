import React from 'react';
import './LoadingPage.css';
import {useSelector} from "react-redux";

const LoadingPage = () => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <div className={`loading-page ${theme === 'dark' ? 'loading-page-dark':''}`}>
            <div className="spinner-container">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        </div>
    );
};

export default LoadingPage;
