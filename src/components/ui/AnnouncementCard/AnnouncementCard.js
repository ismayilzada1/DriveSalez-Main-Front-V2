import React, { useEffect } from "react";
import "./AnnouncementCard.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";

const AnnouncementCard = (props) => {
  const navigate = useNavigate();

  const {
    id,
    make,
    model,
    price,
    mileage,
    mileageType,
    engineVolume,
    fuelType,
    year,
    currency,
    imageUrl,
    isPremium,
    barter,
    onCredit,
    vinCode,
  } = props;

  const { t } = useTranslation();

  const theme = useSelector((state) => state.theme.theme);

  const createLabelValue = (label, value) => (
    <li className="list-group-item m-0 p-2">
      <span className="label info-key">{t(label)}:</span>
      <span className="value">{value}</span>
    </li>
  );

  const handleCardClick = () => {
    const isMobile = window.innerWidth <= 768;
    const url = `/AnnouncementDetails/${id}`;

    if (isMobile) {
      navigate(url);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <a>
      <div
        className={`card me-3 iq-mb-3 announcement-card ${theme === 'dark' ? 'announcement-card-dark' : ''}`}
        onClick={handleCardClick}
      >
        {imageUrl && (
          <img
            src={imageUrl.url}
            className="card-img-top img-fluid tall-image"
            alt="vehicle-image"
          />
        )}

  

        <div className="barter-and-credit-icon">
          {barter && (
            <i className="bi bi-arrow-repeat barter-icon" title="Barter"></i>
          )}
          {onCredit && (
            <i className="bi bi-percent percent-icon" title="On Credit"></i>
          )}
        </div>

        {vinCode && (
          <div className="vin-code-icon" title="VIN CODE">
            VIN
          </div>
          
        )}
        {isPremium && (
          <div className="premium-announcement-icon" title="Premium">
            <i className="bi bi-gem"></i>
          </div>
        )}

        <div className="card-body announcement-card-body">
          <h4 className="card-title">
            {make?.makeName} {model?.modelName}
          </h4>

          <div className="details-row">
            <span className="value">{year?.year},</span>
            <span className="value">{` ${engineVolume}`},</span>
            <span className="value">{`${mileage} ${mileageType}`}</span>
          </div>

          <h5 className="card-title text-success float-start h3 mt-2">
            {price} {currency?.currencyName}
          </h5>

        </div>
      </div>
    </a>
  );
};

export default AnnouncementCard;
