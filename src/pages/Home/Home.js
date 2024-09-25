import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
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

const Home = () => {
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
    const theme = useSelector((state) => state.theme.theme);

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
    isPremium: true,
    barter: true,
    onCredit: true,
    vinCode: "dsa56d16as1d2sad16as5d1s6das",
  };

  // Create an array of 10 car objects with unique IDs
  const cars = Array.from({ length: 10 }, (_, index) => ({
    ...baseCar,
    id: index + 1, // Unique ID for each car
  }));

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

      <HomeFilter />

      {/*<div className="container-fluid pt-3">*/}
      {/*    {premiumAnnouncements.length > 0 && (*/}

      {/*    <div className="pt-3">*/}

      {/*        <div className="d-flex justify-content-between align-items-center">*/}
      {/*            <h2 className="text-dark">Premium Announcements</h2>*/}
      {/*            <div>*/}
      {/*                <a href="">Show All</a>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        */}
      {/*            <div className="pt-3">*/}
      {/*                <div*/}
      {/*                    className="d-flex flex-row flex-wrap justify-content-start align-items-center announcement-cards-container">*/}
      {/*                    {premiumAnnouncements?.map((car, index) => (*/}
      {/*                        <div key={index} className="col-lg-3 mb-2">*/}
      {/*                            <AnnouncementCard {...car} />*/}
      {/*                        </div>*/}
      {/*                    ))}*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        */}

      {/*    </div>*/}

      {/*    )}*/}

      {/*    <div className="regular-announcements-container pt-3">*/}

      {/*        <div className="d-flex justify-content-between align-items-center">*/}
      {/*            <h2 className="text-dark">All Announcements</h2>*/}
      {/*        </div>*/}

      {/*        <InfiniteScroll*/}
      {/*            dataLength={allAnnouncements.length}*/}
      {/*            next={fetchData}*/}
      {/*            hasMore={hasMore}*/}
      {/*            scrollThreshold={0.6}*/}
      {/*        >*/}
      {/*            <div className="pt-3 ">*/}
      {/*                <div*/}
      {/*                    className="d-flex flex-row flex-wrap justify-content-start align-items-center announcement-cards-container">*/}
      {/*                    {allAnnouncements?.map((car, index) => (*/}
      {/*                        <div key={index} className="col-lg-3 mb-2">*/}
      {/*                            <AnnouncementCard {...car} />*/}
      {/*                        </div>*/}
      {/*                    ))}*/}
      {/*                </div>*/}
      {/*            </div>*/}

      {/*        </InfiniteScroll>*/}

      {/*    </div>*/}
      {/*</div>*/}


      <div className="container-fluid pt-3">
          {premiumAnnouncements.length > 0 && (

          <div className="pt-3">

              <div className="d-flex justify-content-between align-items-center">
                  <h2 className={`text-dark ${theme === 'dark' ? 'dark-theme-label' : ''}`}>Premium Announcements</h2>
                  <div>
                      <a href="">Show All</a>
                  </div>
              </div>

                  <div className="pt-3">
                      <div
                          className="d-flex flex-row flex-wrap justify-content-start align-items-center announcement-cards-container">
                          {cars?.map((car, index) => (
                              <div key={index} className="col-lg-3 mb-2">
                                  <AnnouncementCard {...car} />
                              </div>
                          ))}
                      </div>
                  </div>


          </div>

          )}

          <div className="regular-announcements-container pt-3">

              <div className="d-flex justify-content-between align-items-center">
                  <h2 className={` ${theme === 'dark' ? 'dark-theme-label' : 'text-dark'}`}>All Announcements</h2>
              </div>

              <InfiniteScroll
                  dataLength={cars.length}
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

export default Home;
