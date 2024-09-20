import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import  "./AnnouncementDetailisSalon.css"


const AnnouncementDetailisSalon = ({isSalon,phoneNumber,SalonImage,salonName,slogan,description,workinTime,adress,announcementNumber,UserName,UserSurname,UserCity,UserImage}) => {

    const{t}=useTranslation();
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const handleButtonClick = () => {
        setShowPhoneNumber(prevState => !prevState); 
    };

    return (
    <span>
        {isSalon ? (
        <div className="salonMainDiv" >
        <div className="salonMainTop">
            <div className="salonMainTop1">
                <img className="imgTopSalon" src={SalonImage}/>
                <span className="spanTopSalon">{salonName}</span>
            </div>
            <button className="callButtonTopSalon" onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 17">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                    {showPhoneNumber ? phoneNumber : t("Call")} 
                </button>
            
        </div>
        <hr className="salonMainDivHR"/>
        <div className="salonMainCenter">
            <span className="salonMainCenterSpan">{slogan}</span>
            <div className="salonMainCenterDescription">{description}</div>
            <span className="salonMainCenterSpan2">{announcementNumber} {t("announcements")}</span>
        </div>
        <hr className="salonMainDivHR"/>
        <div className="salonMainBottom">
            <div className="salonMainBottom2">
            <div className="salonMainBottomDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16"  className="svgbottom">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                </svg>
                <span className="spanBottom">{workinTime}</span>
            </div>
            <div className="salonMainBottomAdress">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16" className="svgbottom">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <span className="spanBottom">{adress}</span>
            </div>
            </div>
            <button className="salonMainBottomButton">
                {t("Visit salon")}
            </button>

        </div>
    </div>
         ) : (
            <div className="UserDiv">
                <div className="UserDivTop"> 
                    <div className="UserInfo">
                        <span className='UserName'>{UserSurname} {UserName}</span>
                        <span className='UserCity'>{UserCity}</span>
                    </div>
                    <img className="imgTopUser" src={UserImage}/>
                    

                </div>
                <div className="UserDivBottom">
                    <button className="callButtonTopUser"onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 17">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                {showPhoneNumber ? phoneNumber : t("Call")} 
            </button>
                </div>    
            </div>
        )}

    </span>
    );

    };

export default AnnouncementDetailisSalon;
