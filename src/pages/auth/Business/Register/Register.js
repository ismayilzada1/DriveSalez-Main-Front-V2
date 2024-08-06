import React, {useState, useEffect} from 'react';
import Logo from '../../../../components/ui/Logo';
import './Register.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../../Store/Auth/authActions';
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

const RegisterBusiness = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector((state) => state.auth);

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const [formData, setFormData] = useState({
        Email: '',
        PhoneNumber: '',
        Password: '',
        ConfirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };


    const handleSignIn = async () => {
        const credentials = {
            userName: Email,
            password: Password,
        };

        try {
            const response = await dispatch(loginUser(credentials, rememberMe));
            if (response && !response?.status) {
                navigate('/');
            } else if (!response?.status) {
                navigate('/500');
            }
        } catch (error) {
            console.error('An error occurred while signing in:', error);
        }
    };

    const {t, i18n} = useTranslation();

    const handleLanguageChange = async (lang, e) => {
        e.preventDefault();
        await i18n.changeLanguage(lang);
        localStorage.setItem('lng', lang);
    }

    return (


        <div className="wrapper">

            <Helmet>
                <title>Login Business</title>
            </Helmet>

            <div className="top-right-dropdown">
                <ul className="navbar-nav ms-auto align-items-center navbar-list mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a href="#" className="search-toggle nav-link" id="flagDropdown"
                           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={`../../assets/images/flag/flag-${i18n.language}.png`} className="img-fluid"
                                 alt="user" style={{height: '30px', minWidth: '30px', width: '30px'}}/>
                            <span className="bg-primary"></span>
                        </a>
                        <div className="sub-drop dropdown-menu dropdown-menu-end p-0"
                             aria-labelledby="dropdownMenuButton2">
                            <div className="card shadow-none m-0 border-0">
                                <div className=" p-0 ">
                                    <ul className="list-group list-group-flush p-0">
                                        <li className="iq-sub-card list-group-item"
                                            onClick={(e) => handleLanguageChange('en', e)}><a className="p-0"
                                                                                              href="#"><img
                                            src="../assets/images/flag/flag-en.png" alt="img-flaf"
                                            className="img-fluid me-2"
                                            style={{height: '30px', minWidth: '30px', width: '30px'}}/>English</a>
                                        </li>
                                        <li className="iq-sub-card list-group-item"
                                            onClick={(e) => handleLanguageChange('aze', e)}><a className="p-0"
                                                                                               href="#"><img
                                            src="../assets/images/flag/flag-aze.png" alt="img-flaf"
                                            className="img-fluid me-2" style={{
                                            height: '30px',
                                            minWidth: '30px',
                                            width: '30px'
                                        }}/>Azerbaijani</a></li>
                                        <li className="iq-sub-card list-group-item"
                                            onClick={(e) => handleLanguageChange('ru', e)}><a className="p-0"
                                                                                              href="#"><img
                                            src="../assets/images/flag/flag-ru.png" alt="img-flaf"
                                            className="img-fluid me-2"
                                            style={{height: '30px', minWidth: '30px', width: '30px'}}/>Russian</a>
                                        </li>
                                        <li className="iq-sub-card list-group-item"
                                            onClick={(e) => handleLanguageChange('tr', e)}><a className="p-0"
                                                                                              href="#"><img
                                            src="../assets/images/flag/flag-tr.png" alt="img-flaf"
                                            className="img-fluid me-2"
                                            style={{height: '30px', minWidth: '30px', width: '30px'}}/>Turkish</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="main-auth-page business-auth-page">
                <Logo size="190px"/>
                <div className="clip-board">
                    <div className="container">
                        <div className="row auth-details-card">
                            <div className="col-lg-12">
                                <div className="card iq-auth-card mb-0 row business-login-card">
                                    <img
                                        src="../../assets/images/auth/Bentley_continental_gt.png"
                                        alt="background"
                                        className="img-fluid w-75 position-absolute"
                                        style={{top: '3%'}}
                                    />
                                    <div className="card-body col-5 offset-7">
                                        <div className="auth-form">
                                            <h2 className="text-center mb-3">{t("nav.businessAccount")}</h2>
                                            <form>
                                                <p className="text-center">{t("nav.createAccountBusiness")}</p>

                                                <div className="row text-start mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input
                                                                type="email"
                                                                className="form-control input-blue"
                                                                id="input3"
                                                                placeholder="Email"
                                                                value={formData.Email}
                                                                onChange={handleChange}
                                                                name="Email"
                                                            />
                                                            <label htmlFor="input3">Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input
                                                                type="text"
                                                                className="form-control input-blue"
                                                                id="input4"
                                                                placeholder={t("nav.phoneNo")}
                                                                value={formData.PhoneNumber}
                                                                onChange={handleChange}
                                                                name="PhoneNumber"
                                                            />
                                                            <label htmlFor="input4">{t("nav.phoneNo")}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row text-start mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input
                                                                type="password"
                                                                className="form-control input-blue"
                                                                id="input5"
                                                                placeholder={t("nav.password")}
                                                                value={formData.Password}
                                                                onChange={handleChange}
                                                                name="Password"
                                                            />
                                                            <label htmlFor="input5">{t("nav.password")}</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input
                                                                type="password"
                                                                className="form-control input-blue"
                                                                id="input6"
                                                                placeholder={t("nav.confirmPassword")}
                                                                value={formData.ConfirmPassword}
                                                                onChange={handleChange}
                                                                name="ConfirmPassword"
                                                            />
                                                            <label htmlFor="input6">{t("nav.confirmPassword")}</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex justify-content-between  align-items-center flex-wrap">
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input checbox-blue"
                                                                type="checkbox"
                                                                id="Remember"
                                                                checked={rememberMe}
                                                                onChange={handleRememberMeChange}
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="Remember"
                                                            >
                                                                {t("nav.rememberMe")}?
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <a className={"blue-link"}
                                                           href="/auth/Default/forgot-password">{t("nav.forgotPassword")}?</a>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="signinbtn btn btn-primary"
                                                        onClick={handleSignIn}
                                                        disabled={loading}
                                                    >
                                                        {loading ? t("nav.signingUp") : t("nav.signUp")}
                                                    </button>
                                                </div>


                                                {error &&
                                                    <div
                                                        className="alert alert-primary rounded-0 alert-dismissible fade show mt-1"
                                                        role="alert">
                                                        <span>{error}</span>
                                                    </div>
                                                }


                                            </form>
                                            <div className="new-account mt-3 text-center">
                                                <p className="mb-0">
                                                    {t("nav.alreadyHaveAccount")}{' '}
                                                    <a className="blue-link" href="/auth/Business/Login">
                                                        {t("nav.signIn")}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="responsive-card auth-small">
                <div className="card">
                    <div className="card-body">
                        <div className="auth-form">
                            <h2 className="text-center mb-3">{t("nav.signIn")}</h2>
                            <form>
                                <p className="text-center">{t("nav.signInToStayConnected")}</p>


                                <div className="row text-start mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control input-blue"
                                                value={formData.Email}
                                                onChange={handleChange}
                                                id="input3"
                                                placeholder="Email"
                                                name="Email"
                                            />
                                            <label htmlFor="input3">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control input-blue"
                                                id="input4"
                                                value={formData.PhoneNumber}
                                                onChange={handleChange}
                                                placeholder={t("nav.phoneNo")}
                                                name="PhoneNumber"
                                            />
                                            <label htmlFor="input4">{t("nav.phoneNo")}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row text-start mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className="form-control input-blue"
                                                id="input5"
                                                value={formData.Password}
                                                onChange={handleChange}
                                                placeholder={t("nav.password")}
                                                name="Password"
                                            />
                                            <label htmlFor="input5">{t("nav.password")}</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className="form-control input-blue"
                                                id="input6"
                                                value={formData.ConfirmPassword}
                                                onChange={handleChange}
                                                placeholder={t("nav.confirmPassword")}
                                                name="ConfirmPassword"
                                            />
                                            <label htmlFor="input6">{t("nav.confirmPassword")}</label>
                                        </div>
                                    </div>
                                </div>



                                <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input checbox-blue"
                                                type="checkbox"
                                                id="checkMe"
                                                checked={rememberMe}
                                                onChange={handleRememberMeChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="checkMe"
                                            >
                                                {t("nav.rememberMe")}?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <a href="#" className={"blue-link"}>{t("nav.forgotPassword")}?</a>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className=" signinbtn btn btn-primary"
                                        onClick={handleSignIn}
                                        disabled={loading}
                                    >
                                        {loading ? t("nav.signingIn") : t("nav.signIn")}
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <p>or sign in with others account?</p>
                                </div>
                                <div className="d-flex justify-content-center ">
                                    <ul className="list-group list-group-horizontal list-group-flush">
                                        <li className="list-group-item bg-transparent border-0">
                                            <a href="#">
                                                <img
                                                    src="../../assets/images/brands/15.png"
                                                    className="img-fluid avatar avatar-30 avatar-rounded"
                                                    alt="img60"
                                                />
                                            </a>
                                        </li>
                                        <li className="list-group-item bg-transparent border-0">
                                            <a href="#">
                                                <img
                                                    src="../../assets/images/brands/08.png"
                                                    className="img-fluid avatar avatar-30 avatar-rounded"
                                                    alt="gm"
                                                />
                                            </a>
                                        </li>
                                        <li className="list-group-item bg-transparent border-0">
                                            <a href="#">
                                                <img
                                                    src="../../assets/images/brands/10.png"
                                                    className="img-fluid avatar avatar-30 avatar-rounded"
                                                    alt="im"
                                                />
                                            </a>
                                        </li>
                                        <li className="list-group-item bg-transparent border-0">
                                            <a href="#">
                                                <img
                                                    src="../../assets/images/brands/13.png"
                                                    className="img-fluid avatar avatar-30 avatar-rounded"
                                                    alt="li"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                            <div className="new-account mt-3 text-center">
                                <p className="mb-0">
                                    {t("nav.alreadyHaveAccount")}{' '}
                                    <a className="blue-link" href="/auth/Business/Login">
                                        {t("nav.signIn")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterBusiness;
