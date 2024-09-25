import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet"
import {useNavigate, useNavigation, useParams} from "react-router-dom";
import "./AnnouncementDetails.css";
import {Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {SetAnnouncement} from '../../Store/Announcement/AnnouncementActions'
import LoadingPage from "../../components/ui/LoadingPage";
import {useTranslation} from "react-i18next";
import AnnouncementDetailisSalon from "../../components/ui/AnnouncementDetailisSalon/AnnouncementDetailisSalon";

const AnnouncementDetails = () => {

    const {id} = useParams ();

    // const {announcement, loading, error} = useSelector ((state) => state.announcement);


    //HARD CODE TEMP DATA FOR FRONT
    const announcement={
        make:{
            id:1,
            makeName:"BMW"
        },
        model:{
            id:2,
            modelName:"M5"
        },
        year:{
            id:3,
            year:2013
        },
        fuelType:{
            id:4,
            fuelType:"Gasoline"
        },
        isBrandNew:false,
        bodyType:{
            id:5,
            bodyType:"Sedan"
        },
        color:{
            id:6,
            color:"Blue"
        },
        horsePower:575,
        gearboxType:{
            id:7,
            gearboxType: "Robotic"
        },
        drivetrainType:{
            id:8,
            drivetrainType:"RWD"
        },
        conditions:[{
            id:1,
            condition:"Colored",
            description: "the car is colored"
        }],
        marketVersion:{
            id:9,
            marketVersion:"US"
        },
        ownerQuantity:6,
        seatCount:5,
        viewCount:40,
        vinCode:"sdad51a6sd15as",
        options:[{
            id:1,
            option:"ABS"
        },{
            id:2,
            option:"Lyuk"
        },{
            id:3,
            option:"Kondisioner"
        },{
            id:4,
            option:"Park radar"
        }],
        engineVolume:4400,
        mileage:80000,
        mileageType:"KM",
        imageUrls:[
            {
                url:"https://turbo.azstatic.com/uploads/full/2024%2F09%2F23%2F19%2F31%2F09%2Fc2b70444-6b24-4dd9-a1cb-3d0b551a0cfc%2F11375_qXr7-N1ppBcS2a5TEaxWRQ.jpg"}
            ,
            {
                url:"https://turbo.azstatic.com/uploads/full/2024%2F09%2F23%2F19%2F32%2F28%2Fef6d4d73-c722-4c88-ba83-a3d0bd337bf8%2F76402_Kt6M8xdUQ8mUvNPSzi54jw.jpg"},
            {
                url:"https://turbo.azstatic.com/uploads/full/2024%2F09%2F23%2F19%2F32%2F47%2Fa1c3e9d4-7218-4d23-a53a-78374b5ffb99%2F26954_DWgEQQqRrb1W5yDQKFgsVA.jpg"},
            {
                url:"https://turbo.azstatic.com/uploads/full/2024%2F09%2F23%2F19%2F32%2F28%2F1661f8bd-4b5e-440c-92a9-bfeb37cd5469%2F26954_DWgEQQqRrb1W5yDQKFgsVA.jpg"},
            {
                url:"https://turbo.azstatic.com/uploads/full/2024%2F09%2F23%2F19%2F32%2F48%2F84408599-0c0e-4d31-ad04-36e2375b7003%2F26954_DWgEQQqRrb1W5yDQKFgsVA.jpg"},

        ],
        barter:false,
        onCredit:false,
        description:"Bmw M5 F10 Competition Package. 2014 M.Y\n" +
            "Downpipe.\n" +
            "Bezkraskadır.\n" +
            "Maşın ideal vəziyyətdədir.\n" +
            "Yalnız 98 benzinlə idarə edilib.\n" +
            "Risk zonaları qoruyucu plenka ilə üzlənib.\n" +
            "Kasko Siğortalıdır.\n" +
            "Alıcı istənilən yerdə yoxlatdıra bilər.\n" +
            "Real alıcı ilə maşına baxdıqdan sonra qiymətdə razılaşmaq olar.\n" +
            "TEST DRİVE VERİLMİR !!\n" +
            "Qeyri ciddi şəxslər narahat etməsin !\n" +
            "Barter edilmir !",
        price:85000,
        currency:{
            id:8,
            currencyName:"AZN"
        },
        announcementState:"waiting",
        country:{
            id:9,
            countryName:"Azerbaijan"
        },
        city:{
            id:14,
            cityName:"Quba"
        },
        expirationDate:"2022-14-16",
        userId:"5sad16as",
        userName:"maga",
        email:"isma@gmail.com",
        firstName:"maga",
        lastName:"isma",
        phoneNumbers:[{phoneNumber:"0505555555"},{phoneNumber:"09055451542"},{phoneNumber:"07057755752"}]
    }
    const loading=false;


    const navigate = useNavigate();

    const{t}=useTranslation();
    const theme = useSelector((state) => state.theme.theme);

    const dispatch = useDispatch ();

    const [selectedImageIndex, setSelectedImageIndex] = useState (0);
    const [isTransitioning, setIsTransitioning] = useState (false);
    const [showModal, setShowModal] = useState (false);
    const [activeTab, setActiveTab] = useState ('tabs-1');

    const Images = announcement?.imageUrls?.map (image => image.url) || [];


    const handleTabClick = (tabId) => {
        // console.log (loading);
        setActiveTab (tabId);
    };


    const handleCloseModal = () => {
        // console.log (options);
        setShowModal (false);
    };


    const handleThumbnailClick = (index) => {
        if (!isTransitioning) {
            setIsTransitioning (true);
            setSelectedImageIndex (index);
        }
    };

    const handlePrevButtonClick = () => {
        if (!isTransitioning) {
            setIsTransitioning (true);
            setSelectedImageIndex ((prevIndex) => (prevIndex - 1 + Images.length) % Images.length);
        }
    };

    const handleNextButtonClick = () => {
        if (!isTransitioning) {
            setIsTransitioning (true);
            setSelectedImageIndex ((prevIndex) => (prevIndex + 1) % Images.length);
        }
    };

    useEffect (() => {
        const transitionTimeout = setTimeout (() => {
            setIsTransitioning (false);
        }, 200);

        return () => clearTimeout (transitionTimeout);
    }, [isTransitioning]);

    useEffect (() => {
        const carousel = document.getElementById ("carouselExampleCaptions");

        if (carousel) {
            const carouselItems = carousel.querySelectorAll (".carousel-item");

            carouselItems.forEach ((item, index) => {
                if (index === selectedImageIndex) {
                    item.classList.add ("active");
                } else {
                    item.classList.remove ("active");
                }
            });
        }
    }, [selectedImageIndex]);


    const renderIndicators = () => {
        return Images?.map ((_, index) => (
            <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                onClick={() => handleThumbnailClick (index)}
                className={`carousel-indicator-button ${selectedImageIndex === index ? 'active' : ''}`}
            ></button>
        ));
    };


    useEffect (() => {
        // const fetchData = async () => {
        //     try {
        //         dispatch(SetAnnouncement(id));
        //     } catch (error) {
        //         console.error ('Error fetching announcement:', error);
        //     }
        // };

        // fetchData ();


    }, [dispatch, id]);

    if (loading) {
        return <LoadingPage/>;
    }

    // if (!announcement) {
    //     navigate("/NotFound");
    //     return null;
    // }

    const {
        make,
        model,
        year,
        fuelType,
        isBrandNew,
        bodyType,
        color,
        horsePower,
        gearboxType,
        drivetrainType,
        conditions,
        marketVersion,
        ownerQuantity,
        seatCount,
        viewCount,
        vinCode,
        options,
        engineVolume,
        mileage,
        mileageType
    } = announcement;

    const {
        barter,
        onCredit,
        description,
        price,
        currency,
        announcementState,
        imageUrls,
        country,
        city,
        expirationDate,
        userId,
        userName,
        email,
        firstName,
        lastName,
        phoneNumbers
    } = announcement;

    function formatTimestamp(timestamp) {
        // const dateObject = new Date (timestamp);
        // const options = {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     hour12: false
        // };
        // const formattedDate = dateObject.toLocaleString ('en-GB', options);
        // return formattedDate;
        return timestamp
    }



    const salonDetails = {
        isSalon: true,
        phoneNumber: "0555778899",
        salonName: "Suraxanı Salonu",
        adress: "Suraxanı, Neriman Nerimanov 34a",
        workinTime: "7:00-10:00",
        announcementNumber: "15",
        description: "Suraxanı Salonu – Azərbaycanda avtomobil dünyasının ən prestijli məkanlarından biridir. Biz, ən son model avtomobilləri və lüks markaları bir araya gətirərək, müştərilərimizə üstün keyfiyyət və rahatlıq təqdim edirik.",
        SalonImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6YY1dAud4mB5-5N0T3vGW0QlgNfF1PAIc4A&s",
        slogan: "Adiliyin sərhədlərini aş!",
        UserName: "Logman",
        UserSurname: "Dovsaneli",
        UserCity: "Baki",
        UserImage: "https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png"
       // Userin nomresinnen salonunki birdi (yani hansi nomre gelse fergi yoxdu at "phoneNumber"-in icine cixacaq orda")
    };



    return (
        <>
            <Helmet>
                <title>{`${make.makeName} ${model.modelName} - DriveSalez`}</title>
            </Helmet>
            {loading ? (
                <LoadingPage/>
            ) : (
                <>
                    <section className="section mt-2 mb-2" id="trainers">
                        <div className="container">
                            <div id="carouselExampleCaptions" className="carousel slide">
                                <div className="carousel-indicators">
                                    {renderIndicators ()}
                                </div>


                                <div className="carousel-inner">
                                    {Images?.map ((image, index) => (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                        >

                                            <div
                                                className={`image-container img-container ${announcement.isPremium ? 'premium-announcement-detail' : ''}`}>
                                                <div className="background-container"
                                                     style={{backgroundImage: `url(${image})`}}></div>
                                                <img
                                                    src={image}
                                                    className="d-block"
                                                    alt={`Slide ${index}`}
                                                    onClick={() => {
                                                        setShowModal(true);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <button className="carousel-control-prev" type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        onClick={handlePrevButtonClick}>
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        onClick={handleNextButtonClick}>
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="d-flex flex-wrap flex-row justify-content-center align-items-center mt-3">
                                {Images?.map ((image, index) => (
                                    <div className="d-flex flex-row justify-content-center align-items-center"
                                         key={index}>
                                        <div className="thumbnail-container">
                                            <img
                                                src={image}
                                                className="thumbnail-image"
                                                data-bs-target="#carouselExampleCaptions"

                                                onClick={() => handleThumbnailClick (index)}
                                                style={{
                                                    opacity: selectedImageIndex === index ? 1 : 0.7,
                                                }}
                                                alt={'vehicleImage'}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row mt-3" id="tabs">
                                <div className="col-lg-4">
                                    <ul>
                                        <li>
                                            <AnnouncementDetailisSalon {...salonDetails} />
                                        </li>
                                        <li className={`${theme === 'dark' ? 'announcement-details-tab-dark' : ''}`}>
                                            <a href='#tabs-1' onClick={() => handleTabClick('tabs-1')}>
                                                <i className="fa fa-cog"></i> {t("vehicleSpecs")}
                                            </a>
                                        </li>

                                        <li className={`mb-5 ${theme === 'dark' ? 'announcement-details-tab-dark' : ''}`}>
                                            <a href='#tabs-2' onClick={() => handleTabClick('tabs-2')}>
                                                <i className="fa fa-plus-circle"></i> {t("vehicleExtras")}
                                            </a>
                                        </li>

                                    </ul>

                                </div>


                                <div className="col-lg-8">
                                    <section className='tabs-content' style={{width: '100%'}}>
                                        <article id='tabs-1'
                                                 className={`fade-in-element ${activeTab === 'tabs-1' ? 'active-tab' : ''}`}>


                                            <h4 className={`${theme === 'dark' ? 'announcement-details-tab-label' : ''}`}>{t("vehicleSpecs")}</h4>

                                            <div className="row">

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t('mainLabelMake')}</label>
                                                    <p>{make?.makeName}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t('labelVehicleModel')}</label>
                                                    <p>{model?.modelName}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t('labelBodyType')}</label>
                                                    <p>{bodyType?.bodyType}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("firstRegistration")}</label>
                                                    <p>{year?.year}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("mileage")}</label>
                                                    <p>{mileage} {mileageType}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("fuelType")}</label>
                                                    <p>{fuelType?.fuelType}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("engineVolume")}</label>
                                                    <p>{engineVolume} cc</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("labelHorsePower")}</label>
                                                    <p>{horsePower}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("labelGearboxType")}</label>
                                                    <p>{gearboxType?.gearboxType}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("seatCount")}</label>
                                                    <p>{seatCount}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("labelMarketVersion")}</label>
                                                    <p>{marketVersion?.marketVersion}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("labelWheelDrive")}</label>
                                                    <p>{drivetrainType?.drivetrainType}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("ownerQuantity")}</label>
                                                    <p>{ownerQuantity}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("brandNew")}</label>
                                                    <p>{isBrandNew ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("labelVehicleColor")}</label>
                                                    <p>{color?.color}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("barter")}</label>
                                                    <p>{barter ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label>{t("onCredit")}</label>
                                                    <p>{onCredit ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-12 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <label style={{fontSize: '1.4em'}}>{t("labelPrice")}</label>
                                                    <p className="main-price text-success font-weight-bold"
                                                       style={{fontSize: '2.2em'}}>
                                                        {price && `${price} ${currency?.currencyName}`}
                                                    </p>
                                                </div>


                                                <div
                                                    className={`col-6 col-sm-12 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <p>{t("announcementNumber")}: {id}</p>
                                                </div>


                                                <div
                                                    className={`col-6 col-sm-6 ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <p>{t("expirationDate")}: {formatTimestamp(expirationDate)}</p>
                                                </div>

                                                <div
                                                    className={`col-6 col-sm-6 d-flex align-items-center ${theme === 'dark' ? 'announcement-details-label-dark' : ''}`}>
                                                    <p><i className="far fa-eye me-2"></i>
                                                        <span>{viewCount} {t("views")}</span>
                                                    </p>
                                                </div>


                                            </div>

                                        </article>
                                        <article id='tabs-2'
                                                 className={`fade-in-element ${activeTab === 'tabs-2' ? 'active-tab' : ''}`}>

                                        <h4 className={`${theme === 'dark' ? 'announcement-details-tab-label' : ''}`}>{t("vehicleDescription")}</h4>

                                            <div className='row'>
                                                <p className={`col-sm-12 ${theme === 'dark' ? 'dark-theme-label2' : ''}`} style={{
                                                    maxWidth: '800px',
                                                    margin: '0 auto',
                                                    maxHeight: '400px',
                                                    overflowY: 'auto'
                                                }}>
                                                    {description.split('\n').map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br/>
                                                        </React.Fragment>
                                                    ))}
                                                </p>

                                                {vinCode && (
                                                    <p className={`col-sm-12 font-weight-bold mt-3 ${theme === 'dark' ? 'dark-theme-label2' : ''}`}
                                                       style={{fontSize: '1.2em'}}>
                                                        {t("vinCode")} :
                                                        <a
                                                            href={`https://www.google.com/search?q=${vinCode}&tbm=isch`}
                                                            target="_blank"
                                                            id={'vin-code'}
                                                            rel="noopener noreferrer"
                                                            className="font-weight-bold d-block d-sm-inline"
                                                            style={{fontSize: '1em', opacity: .7}}
                                                        >
                                                            {vinCode}
                                                        </a>
                                                    </p>
                                                )}


                                            </div>


                                            <h4 className={`${theme === 'dark' ? 'announcement-details-tab-label' : ''}`}>{t("vehicleExtras")}</h4>

                                            <div className="row">
                                                {options?.map((option, index) => (
                                                    <div className={`col-6 col-sm-6`}>
                                                        <p className={`announcement-details-option ${theme === 'dark' ? 'announcement-details-option-dark' : ''}`}>{option.option}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {conditions && conditions.length > 0 && (
                                                <div>
                                                    <h4 className={`${theme === 'dark' ? 'announcement-details-tab-label' : ''}`}>{t("vehicleConditions")}</h4>
                                                    <div className="row">
                                                        {conditions.map((condition, index) => (
                                                            <div key={condition.id} className="col-sm-6">
                                                                <p className={`mb-1 ${theme === 'dark' ? 'dark-theme-label3' : ''}`}
                                                                   style={{fontWeight: "bold"}}>{condition.condition}</p>
                                                                <p className={`announcement-details-option ${theme === 'dark' ? 'announcement-details-option-dark' : ''}`}>{condition.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}


                                        </article>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>


                    <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                        className="fade"
                        backdrop="static"
                        dialogClassName="modal-dialog-fullscreen">

                        <Modal.Body className="modal-image-container modal-body-announcement-details">
                            <Button className="close-button" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            <img
                                src={Images[selectedImageIndex]}
                                alt={`Slide ${selectedImageIndex}`}
                                className="modal-image"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="thumbnails-container">
                                {Images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        className={`thumbnail-image ${selectedImageIndex === index ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(index)}
                                    />
                                ))}
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
};


export default AnnouncementDetails;