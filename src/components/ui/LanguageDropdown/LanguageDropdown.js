import React from 'react';
import "./LanguageDropdown.css"
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const LanguageDropdown = () => {

    const languages = [
        { code: 'en', label: 'English', flag: 'flag-en.png' },
        { code: 'aze', label: 'Azerbaijani', flag: 'flag-aze.png' },
        { code: 'ru', label: 'Russian', flag: 'flag-ru.png' },
        { code: 'tr', label: 'Turkish', flag: 'flag-tr.png' },
    ];

    const {t, i18n} = useTranslation();
    const theme = useSelector((state) => state.theme.theme);
    const handleLanguageChange = async (lang, e) => {
        e.preventDefault();
        await i18n.changeLanguage(lang);
        localStorage.setItem('lng', lang);
    }

    return (
        <>
            <a
                href="#"
                className="search-toggle nav-link"
                id="flagDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <img
                    src={`/assets/images/flag/flag-${i18n.language}.png`}
                    className="img-fluid"
                    alt="user"
                    style={{height: '30px', minWidth: '30px', width: '30px'}}
                />
                <span className="bg-primary"></span>
            </a>
            <div className="sub-drop dropdown-menu dropdown-menu-end p-0" aria-labelledby="flagDropdown">
                <div className="card shadow-none m-0 border-0">
                    <div className="p-0">
                        <ul className="list-group list-group-flush p-0">
                            {languages.map((language) => (
                                <li
                                    key={language.code}
                                    className={`iq-sub-card ${theme === 'dark' ? 'dark-mode-dropdown' : ''}`}
                                    onClick={(e) => handleLanguageChange(language.code, e)}
                                >
                                    <a className={`p-0 ${theme === 'dark' ? 'dark-theme-label' : ''}`} href="#">
                                        <img
                                            src={`/assets/images/flag/${language.flag}`}
                                            alt={`flag-${language.code}`}
                                            className="img-fluid me-2"
                                            style={{height: '30px', minWidth: '30px', width: '30px'}}
                                        />
                                        {language.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


        </>
    )
        ;
};

export default LanguageDropdown;