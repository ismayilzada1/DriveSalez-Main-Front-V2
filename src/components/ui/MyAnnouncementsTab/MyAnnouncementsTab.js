import React, {useEffect, useState} from "react";
import "./MyAnnouncementsTab.css"
import AccountTab from "../AccountTab";
import ProfileTab from "../ProfileTab";
import {useDispatch, useSelector} from "react-redux";
import {
    GetAllActiveAnnouncementsByUserId,
    GetAllInactiveAnnouncementsByUserId,
    GetAllWaitingAnnouncementsByUserId,
} from "../../../Store/Announcement/AnnouncementActions";
import AnnouncementContainer from "../AnnouncementContainer";
import {useTranslation} from "react-i18next";

const MyAnnouncementsTab = () => {


    const dispatch = useDispatch ();
    const theme = useSelector((state) => state.theme.theme);
    const {accessToken}=useSelector(state => state.auth);
    const {t}=useTranslation();

    const [waitingAnnouncements, setWaitingAnnouncements] = useState ([]);
    const [activeAnnouncements, setActiveAnnouncements] = useState ([]);
    const [inActiveAnnouncements, setInActiveAnnouncements] = useState ([]);
    const [allAnnouncements,setAllAnnouncements]=useState([]);


    useEffect (() => {
        const fetchData = async () => {
            try {


                const waitingAnnouncementsData = await dispatch(GetAllWaitingAnnouncementsByUserId(accessToken));
                const activeAnnouncementsData = await dispatch(GetAllActiveAnnouncementsByUserId(accessToken));
                const inactiveAnnouncementsData = await dispatch(GetAllInactiveAnnouncementsByUserId(accessToken));

                setWaitingAnnouncements(waitingAnnouncementsData || []);
                setActiveAnnouncements(activeAnnouncementsData || []);
                setInActiveAnnouncements(inactiveAnnouncementsData || []);

                setAllAnnouncements([
                    ...(waitingAnnouncementsData),
                    ...(activeAnnouncementsData),
                    ...(inactiveAnnouncementsData),
                ]);
            } catch (ex) {
                // console.log (ex);
            }
        };
        fetchData ();
    }, [dispatch]);


    return (
        <div className="mt-3">

            <nav>
                <div className={`nav nav-tabs profile-nav mb-3 ${theme === 'dark' ? 'profile-nav-dark' : ''}`} id="nav-tab" role="tablist">
                    <button className="nav-link me-4 active" id="nav-all-announcements-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-all-announcements" type="button" role="tab"
                            aria-controls="nav-all-announcements" aria-selected="false">
                        {t("allAnnouncements")} ( {waitingAnnouncements.length + activeAnnouncements.length + inActiveAnnouncements.length} )
                    </button>

                    <button className="nav-link me-4" id="nav-active-announcements-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-active-announcements" type="button" role="tab"
                            aria-controls="nav-active-announcements" aria-selected="false">
                        {t("activeAnnouncements")} ( {activeAnnouncements.length} )
                    </button>


                    <button className="nav-link me-4" id="nav-waiting-announcements-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-waiting-announcements" type="button" role="tab"
                            aria-controls="nav-waiting-announcements" aria-selected="false">
                        {t("waitingAnnouncements")} ( {waitingAnnouncements.length} )
                    </button>

                    <button className="nav-link me-4" id="nav-inactive-announcements-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-inactive-announcements" type="button" role="tab"
                            aria-controls="nav-inactive-announcements" aria-selected="false">
                        {t("inactiveAnnouncements")} ( {inActiveAnnouncements.length} )
                    </button>
                </div>
            </nav>


            <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-all-announcements" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AnnouncementContainer announcements={allAnnouncements}/>
                </div>


                <div className="tab-pane fade" id="nav-waiting-announcements" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AnnouncementContainer announcements={waitingAnnouncements}/>
                </div>


                <div className="tab-pane fade" id="nav-active-announcements" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AnnouncementContainer announcements={activeAnnouncements}/>
                </div>


                <div className="tab-pane fade" id="nav-inactive-announcements" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <AnnouncementContainer announcements={inActiveAnnouncements}/>
                </div>

            </div>




        </div>
    );
}

export default MyAnnouncementsTab;