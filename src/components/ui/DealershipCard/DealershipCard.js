import React from "react";
import "./DealershipCard.css";
import { useTranslation } from "react-i18next";


const truncateText = (text, maxLength = 50) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};


const DealershipCard = ({ imgSrc, description, phoneNumber, name, announcementNumber,isOfficial,onClick }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="mainCard" onClick={() => onClick({ imgSrc, description, phoneNumber, name, announcementNumber, isOfficial })}>
      <div className="imgContainer" >
        {isOfficial && <span className="isOfficial">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
          </svg>
          <span className="tooltip">{t("Official")}</span>
        </span>}
        <img className="imgContainerImg" src={imgSrc}/>
      </div>
      <div className="dataContainer">
        
        <span className="hr"></span>
        <div className="dataContainer2">
            <span className="NameDataContainer">{name}</span>
            <span className="DescriptionDataContainer">{truncateText(description, 150)}</span>
            <span className="PhoneDataContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-telephone" viewBox="0 2 16 13">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                <span>{truncateText(phoneNumber, 40)}</span>
            </span>
            <span className="AnnouncementsDataContainer">{announcementNumber} {t("announcements")}</span>
        </div>
      </div>
    </div>
  );
};

export default DealershipCard;
