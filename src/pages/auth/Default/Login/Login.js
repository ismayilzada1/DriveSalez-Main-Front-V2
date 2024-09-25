import React, {useState, useEffect} from 'react';
import Logo from '../../../../components/ui/Logo';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../../Store/Auth/authActions';
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import LanguageDropdown from "../../../../components/ui/LanguageDropdown";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.theme.theme);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
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




    return (


        <div className="wrapper">

            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="top-right-dropdown">
                <ul className="navbar-nav ms-auto align-items-center navbar-list mb-2 mb-lg-0">
                    <li className={"nav-item dropdown"}>
                        <LanguageDropdown></LanguageDropdown>
                    </li>
                </ul>
            </div>
            <div className={`main-auth-page ${theme === 'dark' ? 'main-auth-page-dark' : ''}`}>
                <Logo size="190px"/>
                <div className="clip-board">
                    <div className="container">
                        <div className="row auth-details-card">
                            <div className="col-lg-12">
                                <div className="card iq-auth-card mb-0 row auth-login-card">
                                    <img
                                        src="../../assets/images/auth/01.webp"
                                        alt="background"
                                        className="img-fluid w-75 position-absolute"
                                        style={{top: '8%'}}
                                    />
                                    <div className="card-body col-5 offset-7">
                                        <div className="auth-form">
                                            <h2 className={`text-center mb-3 ${theme === 'dark' ? 'dark-theme-label' : ''}`}>{t("nav.signIn")}</h2>
                                            <form>
                                                <p className={`text-center ${theme === 'dark' ? 'dark-theme-label' : ''}`}>{t("nav.signInToStayConnected")}</p>
                                                <div className="row text-start mb-3">
                                                    <div className="col-12 mb-3">
                                                        <div className="form-floating">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="input1"
                                                                placeholder="Email"
                                                                value={Email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <label htmlFor="input1">Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="form-floating">
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                id="input2"
                                                                value={Password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                placeholder={t("nav.password")}
                                                            />
                                                            <label htmlFor="input2">{t("nav.password")}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between  align-items-center flex-wrap">
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="Remember"
                                                                checked={rememberMe}
                                                                onChange={handleRememberMeChange}
                                                            />
                                                            <label
                                                                className={`form-check-label ${theme === 'dark' ? 'dark-theme-label' : ''}`}
                                                                htmlFor="Remember"
                                                            >
                                                                {t("nav.rememberMe")}?
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <a href="/auth/Default/forgot-password">{t("nav.forgotPassword")}?</a>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={handleSignIn}
                                                        disabled={loading}
                                                    >
                                                        {loading ? t("nav.signIn") : t("nav.signIn")}
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
                                                <p>
                                                    {t("nav.dontHaveAnAccount")}?{' '}
                                                    <a className="" href="/auth/Default/Register">
                                                        {t("nav.clickHereToSignUp")}
                                                    </a>
                                                </p>
                                                <p>
                                                    <a className="" href="/auth/Business/Login">
                                                        {t("nav.areyouabusinessowner")}?{' '}
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
                                    <div className="col-12 mb-3">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="input1"
                                                placeholder="Email"
                                                value={Email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="input1">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="input2"
                                                value={Password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder={t("nav.password")}
                                            />
                                            <label htmlFor="input2">{t("nav.password")}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between  align-items-center flex-wrap">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
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
                                        <a href="#">{t("nav.forgotPassword")}?</a>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
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
                                <p>
                                    {t("nav.dontHaveAnAccount")}?{' '}
                                    <a className="" href="/auth/Default/Register">
                                        {t("nav.clickHereToSignUp")}
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

export default Login;
