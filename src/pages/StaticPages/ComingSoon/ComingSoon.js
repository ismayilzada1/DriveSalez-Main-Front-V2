import React, { useState,useEffect } from 'react';
import './ComingSoon.css';
import {useTranslation} from "react-i18next";

const ComingSoon = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const {t}=useTranslation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form submitted:', formData);
    };


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = new Date("2024-05-03T00:00:00") - new Date();
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <header id="header" className="d-flex align-items-center coming-soon-header">
                <div className="container d-flex flex-column align-items-center">
                    <h1 className='coming-soon-text coming-soon-title'>{t("comingSoon")} !</h1>
                    <h2 className='coming-soon-text'>{t("comingSoonDescription")}</h2>
                    <div className="countdown d-flex justify-content-center">
                        <div className='countdown-tab'>
                            <h3 >{timeLeft.days}</h3>
                            <h4 >{t("days")}</h4>
                        </div>
                        <div className='countdown-tab'>
                            <h3 >{timeLeft.hours}</h3>
                            <h4 >{t("hours")}</h4>
                        </div>
                        <div className='countdown-tab'>
                            <h3 >{timeLeft.minutes}</h3>
                            <h4 >{t("minutes")}</h4>
                        </div>
                        <div className='countdown-tab'>
                            <h3 >{timeLeft.seconds}</h3>
                            <h4 >{t("seconds")}</h4>
                        </div>
                    </div>

                    <div className="subscribe">
                        <h4 className='coming-soon-text'>{t("comingSoonSubscribeDescription")}</h4>
                        <form role="form" className="php-email-form" onSubmit={handleSubmit}>
                            <div className="subscribe-form">
                                <input type="email" name="email" onChange={handleChange} value={formData.email} required />
                                <input type="submit" value="Subscribe" />
                            </div>
                            {/*<div className="mt-2">*/}
                            {/*    <div className="loading">Loading</div>*/}
                            {/*    <div className="error-message"></div>*/}
                            {/*    <div className="sent-message">Your notification request was sent. Thank you!</div>*/}
                            {/*</div>*/}
                        </form>
                    </div>

                    <div className="social-links text-center">
                        <a href="https://twitter.com" target='_blank' className="twitter"><i className="bi bi-twitter"></i></a>
                        <a href="https://facebook.com" target='_blank' className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com" target='_blank' className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="https://linkedin.com" target='_blank' className="linkedin" ><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </header>


        </>
    );
};

export default ComingSoon;
