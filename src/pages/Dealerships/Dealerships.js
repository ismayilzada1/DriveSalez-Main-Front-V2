import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Dealerships.css";
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
import { useTranslation } from "react-i18next";
import DealershipCard from "../../components/ui/DealershipCard/DealershipCard";

const Dealerships = () => {
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

  const ann = [
    {
      imgSrc: "https://logowik.com/content/uploads/images/land-rover9557.jpg",
      description:
        "Land Rover is a British brand of predominantly four-wheel drive, off-road capable vehicles, owned by multinational car manufacturer Jaguar Land Rover (JLR), since 2008 a subsidiary of Indias Tata Motors.",
      phoneNumber: "(050)225 26 24, (055)877 49 65",
      name: "Land Rover",
      announcementNumber: 10,
      isOfficial: true,
    },
    {
      imgSrc:
        "https://i.pinimg.com/736x/90/c6/2a/90c62a04093a897e0cdc5ac249e4334f.jpg",
      description:
        "Lexus (レクサス, Rekusasu) is the luxury vehicle division of the Japanese automaker Toyota Motor Corporation. The Lexus brand is marketed in more than 90 countries and territories worldwide and is Japans largest-selling make of premium cars.",
      phoneNumber: "123-456-7890",
      name: "Lexus",
      announcementNumber: 10,
    },
    {
      imgSrc: "https://logowik.com/content/uploads/images/bugatti.jpg",
      description:
        "Automobiles Ettore Bugatti was a German then French manufacturer of high-performance automobiles. The company was founded in 1909 in the then-German city of Molsheim, Alsace, by the Italian-born industrial designer Ettore Bugatti. ",
      phoneNumber: "123-456-7890",
      name: "Bugatti",
      announcementNumber: 10,
      isOfficial: true,
    },
    {
      imgSrc:
        "https://i.pinimg.com/736x/38/a0/25/38a025fc4ca62f5b95b435e0b43e9169.jpg",
      description:
        "To us, quality, safety and innovation are just as important as — and integral parts of — every vehicle that drives out of our plants. So, when you join the Chevrolet family, youre really joining a 100-year-old practice of protection, caring for others and evolving technology.",
      phoneNumber: "123-456-7890",
      name: "Chevrolet",
      announcementNumber: 10,
    },
  ];

  const handleCardClick = (dealership) => {
    console.log("Dealership clicked:", dealership);
    // Click logic here (when card clicked)!!
  };



    const {t, i18n} = useTranslation();

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    return (
        <Row className="wrapper dealerships-container">

            <Helmet>
                <title>Drivesalez - Dealerships</title>
                <meta name='description' content={"Welcome to DriveSalez - the largest pan-Azerbaijan online car market."}/>
            </Helmet>



            <div className="container-fluid pt-3">
                {(true || premiumAnnouncements.length > 0) && (     // remove true after testing

                <div className="pt-3">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-dark">{t("officialRepresentatives")}</h2>
                    </div>


                    <InfiniteScroll
                        dataLength={premiumAnnouncements.length}
                        next={fetchData}
                        hasMore={hasMore}
                        scrollThreshold={0.6}
                    >
                        <div className="dealership-cards-container">
                            {ann.map((announcement, index) => (
                                <DealershipCard
                                    key={index}
                                    imgSrc={announcement.imgSrc}
                                    description={announcement.description}
                                    phoneNumber={announcement.phoneNumber}
                                    name={announcement.name}
                                    announcementNumber={announcement.announcementNumber}
                                    isOfficial={announcement.isOfficial}
                                    onClick={handleCardClick}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>


                </div>

                )}


                <div className="regular-announcements-container pt-3">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-dark">{t("dealerships")}</h2>
                    </div>


                    <InfiniteScroll
                        dataLength={allAnnouncements.length}
                        next={fetchData}
                        hasMore={hasMore}
                        scrollThreshold={0.6}
                    >
                        <div className="dealership-cards-container">
                            {ann.map((announcement, index) => (
                                <DealershipCard
                                    key={index}
                                    imgSrc={announcement.imgSrc}
                                    description={announcement.description}
                                    phoneNumber={announcement.phoneNumber}
                                    name={announcement.name}
                                    announcementNumber={announcement.announcementNumber}
                                    isOfficial={announcement.isOfficial}
                                    onClick={handleCardClick}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>

                </div>

            </div>



    </Row>
  );
};

export default Dealerships;
