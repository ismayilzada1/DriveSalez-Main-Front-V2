import React from "react";
import "./PrivacyPolicyCard.css"

const PrivacyPolicyCard = ({ title, content, theme }) => {
    return (
        <div className={`card ${theme === 'dark' ? 'privacy-policy-card-dark' : ''}`}>
            <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                    <h4 className="card-title custom-card-title">{title}</h4>
                </div>
            </div>
            <div className="card-body custom-card-body">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicyCard;
