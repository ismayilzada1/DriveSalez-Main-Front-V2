import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet"
import {useNavigate, useNavigation, useParams} from "react-router-dom";
import "./AnnouncementDetails.css";
import {Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {SetAnnouncement} from '../../Store/Announcement/AnnouncementActions'
import LoadingPage from "../../components/ui/LoadingPage";
import {useTranslation} from "react-i18next";

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
            year:2020
        },
        fuelType:{
            id:4,
            fuelType:"Diesel"
        },
        isBrandNew:false,
        bodyType:{
            id:5,
            bodyType:"Sedan"
        },
        color:{
            id:6,
            color:"Black"
        },
        horsePower:440,
        gearboxType:{
            id:7,
            gearboxType: "Manual"
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
            id:1,
            option:"ABS"
        },{
            id:1,
            option:"ABS"
        },{
            id:1,
            option:"ABS"
        }],
        engineVolume:4200,
        mileage:49000,
        mileageType:"KM",
        imageUrls:[{url:"https://www.bmw.az/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-seo-overview-ms-04.jpg"},{url:"https://www.topgear.com/sites/default/files/2023/08/P90492179_highRes_bmw-i7-xdrive60-m-sp%20%281%29.jpg"}],
        barter:false,
        onCredit:false,
        description:"no description",
        price:49000,
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
                                            <a href='#tabs-1' onClick={() => handleTabClick ('tabs-1')}>
                                                <i className="fa fa-cog"></i> {t("vehicleSpecs")}
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#tabs-2' onClick={() => handleTabClick ('tabs-2')}>
                                                <i className="fa fa-info-circle"></i> {t("vehicleDescription")}
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#tabs-3' onClick={() => handleTabClick ('tabs-3')}>
                                                <i className="fa fa-plus-circle"></i> {t("vehicleExtras")}
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#tabs-4' onClick={() => handleTabClick ('tabs-4')}>
                                                <i className="fa fa-phone"></i> {t("contactDetails")}
                                            </a>
                                        </li>
                                        <li>
                                            <div className="salonMainDiv">
                                                <div className="salonMainTop">
                                                    <div className="salonMainTop1">
                                                        <img className="imgTopSalon" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"/>
                                                        <span className="spanTopSalon">Lorem Ipsum</span>
                                                    </div>
                                                    <button className="callButtonTopSalon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 17">
                                                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                                        </svg>
                                                       {t("Call")}
                                                    </button>
                                                    
                                                </div>
                                                <hr className="salonMainDivHR"/>
                                                <div className="salonMainCenter">
                                                    <span className="salonMainCenterSpan">Lorem ipsum dolor sit amet</span>
                                                    <div className="salonMainCenterDescription">Lorem ipsum dolor sit amet,
                                                         consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                                                    </div>
                                                    <span className="salonMainCenterSpan2">17 {t("announcements")}</span>
                                                </div>
                                                <hr className="salonMainDivHR"/>
                                                <div className="salonMainBottom">
                                                    <div className="salonMainBottom2">
                                                    <div className="salonMainBottomDate">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16"  className="svgbottom">
                                                             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                                        </svg>
                                                        <span className="spanBottom">Hər gün: 09:30–20:30</span>
                                                    </div>
                                                    <div className="salonMainBottomAdress">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16" className="svgbottom">
                                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                                        </svg>
                                                        <span className="spanBottom">Bakı ş., Nəsimi r., Abbas Səhhət küç., 67-69</span>
                                                    </div>
                                                    </div>
                                                    <button className="salonMainBottomButton">
                                                        {t("Visit salon")}
                                                    </button>

                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                </div>




                                <div className="col-lg-8">
                                    <section className='tabs-content' style={{width: '100%'}}>
                                        <article id='tabs-1'
                                                 className={`fade-in-element ${activeTab === 'tabs-1' ? 'active-tab' : ''}`}>


                                            <h4>{t("vehicleSpecs")}</h4>

                                            <div className="row">

                                                <div className="col-6 col-sm-6">
                                                    <label>{t('mainLabelMake')}</label>
                                                    <p>{make?.makeName}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t('labelVehicleModel')}</label>
                                                    <p>{model?.modelName}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t('labelBodyType')}</label>
                                                    <p>{bodyType?.bodyType}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("firstRegistration")}</label>
                                                    <p>{year?.year}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("mileage")}</label>
                                                    <p>{mileage} {mileageType}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("fuelType")}</label>
                                                    <p>{fuelType?.fuelType}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("engineVolume")}</label>
                                                    <p>{engineVolume} cc</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("labelHorsePower")}</label>
                                                    <p>{horsePower}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("labelGearboxType")}</label>
                                                    <p>{gearboxType?.gearboxType}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("seatCount")}</label>
                                                    <p>{seatCount}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("labelMarketVersion")}</label>
                                                    <p>{marketVersion?.marketVersion}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("labelWheelDrive")}</label>
                                                    <p>{drivetrainType?.drivetrainType}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("ownerQuantity")}</label>
                                                    <p>{ownerQuantity}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("brandNew")}</label>
                                                    <p>{isBrandNew ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("labelVehicleColor")}</label>
                                                    <p>{color?.color}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("barter")}</label>
                                                    <p>{barter ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div className="col-6 col-sm-6">
                                                    <label>{t("onCredit")}</label>
                                                    <p>{onCredit ? t("Yes") : t("No")}</p>
                                                </div>

                                                <div className="col-6 col-sm-12">
                                                    <label style={{fontSize: '1.4em'}}>{t("labelPrice")}</label>
                                                    <p className="main-price text-success font-weight-bold"
                                                       style={{fontSize: '2.2em'}}>
                                                        {price && `${price} ${currency?.currencyName}`}
                                                    </p>
                                                </div>

                                                <p>{t("announcementNumber")}:  {id}</p>

                                                <div className=" col-6col-sm-6">
                                                    <p>{t("expirationDate")}: {formatTimestamp (expirationDate)}</p>
                                                </div>

                                                <div className="col-6 col-sm-6 d-flex align-items-center" >
                                                    <p><i className="far fa-eye me-2" ></i>
                                                    <span>{viewCount} {t("views")}</span>
                                                    </p>
                                                </div>


                                            </div>

                                        </article>
                                        <article id='tabs-2'
                                                 className={`fade-in-element ${activeTab === 'tabs-2' ? 'active-tab' : ''}`}>
                                            <h4>{t("vehicleDescription")}</h4>

                                            <div className='row'>
                                                <p className='col-sm-12' style={{maxWidth: '800px', margin: '0 auto',maxHeight: '400px', overflowY: 'auto' }}>
                                                    {description.split('\n').map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                    ))}
                                                </p>

                                                {vinCode && (
                                                    <p className='col-sm-12 font-weight-bold mt-3' style={{fontSize: '1.2em'}}>
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
                                        </article>
                                        <article id='tabs-3'
                                                 className={`fade-in-element ${activeTab === 'tabs-3' ? 'active-tab' : ''}`}>
                                            <h4>{t("vehicleExtras")}</h4>

                                            <div className="row">
                                                {options?.map ((option, index) => (
                                                    <div className="col-6 col-sm-6">
                                                        <p>{option.option}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {conditions && conditions.length > 0 && (
                                                <div>
                                                    <h4>{t("vehicleConditions")}</h4>
                                                    <div className="row">
                                                        {conditions.map ((condition, index) => (
                                                            <div key={condition.id} className="col-sm-6">
                                                                <p className={'mb-1'}
                                                                   style={{fontWeight: "bold"}}>{condition.condition}</p>
                                                                <p>{condition.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}


                                        </article>
                                        <article id='tabs-4'
                                                 className={`fade-in-element ${activeTab === 'tabs-4' ? 'active-tab' : ''}`}>
                                            <h4>{t("contactDetails")}</h4>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label>{t("name")} {t("surname")}</label>

                                                    <p>{firstName} {lastName}</p>
                                                </div>

                                                <div className="col-sm-6">
                                                    <label>{t("email")}</label>
                                                    <p><a href="#">{email}</a></p>
                                                </div>

                                                <div className="col-sm-6">
                                                    <label>{t("mainLabelCountry")}</label>
                                                    <p>{country?.countryName}</p>
                                                </div>

                                                <div className="col-sm-6">
                                                    <label>{t("labelCity")}</label>
                                                    <p>{city?.cityName}</p>
                                                </div>


                                                <div className="col-sm-6">
                                                    <label className="mb-2">{t("mobilePhones")}</label>
                                                    {phoneNumbers?.map ((phone, index) => (
                                                        <p key={index} className="m-2">
                                                            {phone.phoneNumber}
                                                        </p>
                                                    ))}
                                                </div>

                                            </div>
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
                                onClick={(e) => e.stopPropagation ()}
                            />
                            <div className="thumbnails-container">
                                {Images?.map ((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        className={`thumbnail-image ${selectedImageIndex === index ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick (index)}
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