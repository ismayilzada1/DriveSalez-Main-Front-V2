import React, { useEffect } from "react";
import './app.css'
import {useRoutes} from 'react-router-dom'
import routes from '../../routes'
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet"
import {useSelector} from "react-redux";

function App() {

    const {i18n} = useTranslation ();
    const theme = useSelector((state) => state.theme.theme);
    const getFontClass = () => {
        switch (i18n.language) {
            case 'aze':
                return 'azerbaijani-font';
            case 'ru':
                return 'russian-font';
            case 'tr':
                return 'turkish-font';
            default:
                return 'font';
        }
    };

    useEffect(() => {
        console.log("remember me yoxla, servere login request at eger ok dusa qalsin eger deyilse logout ele");
    }, []);

    // useEffect(() => {
    //     if (theme === 'dark') {
    //         document.body.style.backgroundColor = '#121212';
    //         document.body.style.color = '#e8e8e8';
    //     } else {
    //         document.body.style.backgroundColor = '#fff';
    //         document.body.style.color = '#010101';
    //     }
    //
    //     return () => {
    //         document.body.style.backgroundColor = '';
    //         document.body.style.color = '';
    //         document.documentElement.style.backgroundColor = '';
    //     };
    // }, [theme]);

    return(
        <div className={`app-container ${getFontClass()}`}>
           <Helmet>
               <link  rel="icon" type="image/x-icon" href="../../../assets/images/favicon.ico" />
               <link rel="shortcut icon" type="image/x-icon" href="../../../assets/images/favicon.ico" />
           </Helmet>

            {useRoutes(routes)}
        </div>
    )
}

export default App;
