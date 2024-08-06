import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import './Dealerships.css';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import { Row } from 'react-bootstrap';
import LoadingPage from '../../components/ui/LoadingPage';
import HomeFilter from '../../components/ui/HomeFilter';
import { useDispatch, useSelector } from 'react-redux';
import {GetAllFilterAnnouncements, GetAnnouncements, SetPageNumber} from '../../Store/Announcement/AnnouncementActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import {setAnnouncements, setFilterParams, setPageNumber} from '../../Store/Announcement/AnnouncementSlice';
import {useTranslation} from "react-i18next";


const Dealerships = () => {
    const dispatch = useDispatch();
    const { allAnnouncements,premiumAnnouncements,filterParams, loading, error, pageNumber,hasMore } = useSelector((state) => state.announcement);

    const pageSize = 4;

    useEffect (() => {
         dispatch(setAnnouncements([]));
         dispatch(setPageNumber(1));
         dispatch(setFilterParams(null));
    }, []);

    useEffect(() => {

        if(filterParams){
            dispatch(GetAllFilterAnnouncements(filterParams))
                .then((response) => {})
                .catch((error) => {
                    console.error('Error fetching announcements:', error);
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
                console.error('Error fetching announcements:', error);
            });
    }, [dispatch, pageNumber, pageSize]);

    const fetchData = () => {
        try {
            if(hasMore){
                // console.log('Fetching more data...');
                dispatch(SetPageNumber(pageNumber + 1));
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };


    const {t, i18n} = useTranslation();

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    return (
        <Row className="wrapper">

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
                       {/*Her should be dealership cards*/}
                       {/* 2 cards in a row*/}

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

                        {/*Her should be dealership cards*/}
                        {/* 2 cards in a row*/}

                    </InfiniteScroll>

                </div>
            </div>


        </Row>
    );
};

export default Dealerships;
