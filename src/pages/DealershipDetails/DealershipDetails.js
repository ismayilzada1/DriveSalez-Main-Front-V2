import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./DealershipDetails.css";
import AnnouncementCard from "../../components/ui/AnnouncementCard";
import { Row } from "react-bootstrap";
import LoadingPage from "../../components/ui/LoadingPage";
import HomeFilter from "../../components/ui/HomeFilter";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllFilterAnnouncements,
    GetAnnouncements,
    SetPageNumber,
} from "../../Store/Announcement/AnnouncementActions";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    setAnnouncements,
    setFilterParams,
    setPageNumber,
} from "../../Store/Announcement/AnnouncementSlice";
import {useTranslation} from "react-i18next";

const DealershipDetails = () => {
    const dispatch = useDispatch();
    const {
        allAnnouncements,
        premiumAnnouncements,
        filterParams,
        loading,
        error,
        pageNumber,
        hasMore,
    } = useSelector((state) => state.announcement);

    const pageSize = 4;

    useEffect(() => {
        dispatch(setAnnouncements([]));
        dispatch(setPageNumber(1));
        dispatch(setFilterParams(null));
    }, []);

    useEffect(() => {
        if (filterParams) {
            dispatch(GetAllFilterAnnouncements(filterParams))
                .then((response) => {})
                .catch((error) => {
                    console.error("Error fetching announcements:", error);
                });
            return;
        }

        dispatch(GetAnnouncements(pageNumber, pageSize))
            .then((response) => {
                if (response && response.length === 0) {
                    return <p>No announcement found.</p>;
                }
            })
            .catch((error) => {
                console.error("Error fetching announcements:", error);
            });
    }, [dispatch, pageNumber, pageSize]);

    const fetchData = () => {
        try {
            if (hasMore) {
                // console.log('Fetching more data...');
                dispatch(SetPageNumber(pageNumber + 1));
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    const baseCar = {
        make: { id: 2, makeName: "BMW" },
        model: { id: 3, modelName: "M5" },
        price: "49900",
        mileage: 144000,
        mileageType: "KM",
        engineVolume: 4400,
        fuelType: { id: 5, fuelType: "Gasoline" },
        year: { id: 6, year: "2021" },
        currency: { id: 7, currencyName: "AZN" },
        imageUrl: { url: "https://i.ytimg.com/vi/iZt7Fwu91FI/maxresdefault.jpg" },
        isPremium: false,
        barter: false,
        onCredit: false,
        vinCode: "dsa56d16as1d2sad16as5d1s6das",
    };

    // Create an array of 10 car objects with unique IDs
    const cars = Array.from({ length: 10 }, (_, index) => ({
        ...baseCar,
        id: index + 1, // Unique ID for each car
    }));


    const{t}=useTranslation();

    return (
        <Row className="wrapper">
            <Helmet>
                <title>Drivesalez - They choose vehicles in here</title>
                <meta
                    name="description"
                    content={
                        "Welcome to DriveSalez - the largest pan-Azerbaijan online car market."
                    }
                />
            </Helmet>


            <div className={"d-flex  align-items-center mb-3 mt-3"}>
                <a href="/dealerships" className={"blue-link"}>{t("dealerships")}</a>
                <span className="divider">•</span>
                <p className={"p-0 m-0"}>Prestige Auto</p>
            </div>

            <div className="dealership-details-card container">

                <div className="row no-gutters h-100">

                    <div className="col-lg-8 p-0">
                        <img
                            src="https://www.wsupercars.com/wallpapers-regular/Lincoln/2017-Lincoln-Continental-001-2000.jpg"
                            alt="Dealership Banner"
                            className="img-fluid dealership-image h-100"
                        />
                    </div>

                    <div className="col-lg-4  text-white p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div className="d-flex flex-row">
                                <div>
                                    <img
                                        src="https://turbo.azstatic.com/uploads/f352x352/2023%2F06%2F05%2F15%2F13%2F39%2Ffa6d535d-f3b5-468b-89f9-f493c86ce1ee%2Flogo.png"
                                        alt="Prestige Auto Logo"
                                        className="logo mb-3"
                                    />
                                </div>
                                <div className="ms-3 text-center">
                                    <h3 className="text-light text-c">Prestige Auto</h3>
                                    <div className="d-flex mt-2 align-items-center">
                                        <i className="bi bi-eye mb-1"></i>
                                        <p className="m-0 p-0">388 798</p>
                                    </div>
                                </div>
                            </div>

                            <p className={"p-0"}>"Prestige Auto" avtosalonu avtomobillərin yüksək qiymətlə alışını,
                                eləcə də sərfəli şərtlərlə satışını və barterini həyata keçirir.
                            </p>
                            <p className={"p-0"}><i className="bi bi-geo-alt-fill"></i> Bakı ş., Nəsimi r., Xətai pr.</p>

                            <div className="d-flex flex-row">
                                <p className="me-2 p-0"><i className="bi bi-telephone-fill"></i> (070) 288-44-73 ,</p>
                                <p className={"p-0"}>(070) 288-44-74</p>
                            </div>

                            <p className={"p-0"}><i className="bi bi-clock-fill"></i> Hər gün: 10:00–19:00</p>
                        </div>
                        <div className={"dealership-details-card-btns-container "}>
                            <button className=" btn btn-primary mb-2">97 elan</button>
                            <button className=" btn btn-light">Lüks sinif avtomobillərinin satış mərkəzi</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid pt-3">
                <div className="regular-announcements-container pt-3 border-0">


                    <InfiniteScroll
                        dataLength={allAnnouncements.length}
                        next={fetchData}
                        hasMore={hasMore}
                        scrollThreshold={0.6}
                    >
                        <div className="pt-3 ">
                            <div
                                className="d-flex flex-row flex-wrap justify-content-start align-items-center announcement-cards-container">
                                {cars?.map((car, index) => (
                                    <div key={index} className="col-lg-3 mb-2">
                                        <AnnouncementCard {...car} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </InfiniteScroll>

                </div>
            </div>


        </Row>
    );
};

export default DealershipDetails;
