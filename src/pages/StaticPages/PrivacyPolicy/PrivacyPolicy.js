import React from "react";
import './PrivacyPolicy.css';
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import PrivacyPolicyCard from "../../../components/ui/PrivacyPolicyCard";

const PrivacyPolicy = () => {

    const {t} = useTranslation ();
    const theme = useSelector((state) => state.theme.theme);


    const sections = [
        { title: t("privacyPolicy.title"), content: t("privacyPolicy.intro") },
        { title: t("privacyPolicy.informationWeCollect"), content: t("privacyPolicy.informationWeCollectContent") },
        { title: t("privacyPolicy.howWeUseYourInformation"), content: t("privacyPolicy.howWeUseYourInformationContent") },
        { title: t("privacyPolicy.sharingYourInformation"), content: t("privacyPolicy.sharingYourInformationContent") },
        { title: t("privacyPolicy.cookiesAndTechnologies"), content: t("privacyPolicy.cookiesAndTechnologiesContent") },
        { title: t("privacyPolicy.security"), content: t("privacyPolicy.securityContent") },
        { title: t("privacyPolicy.changesToPrivacyPolicy"), content: t("privacyPolicy.changesToPrivacyPolicyContent") },
        { title: t("privacyPolicy.contactUs"), content: t("privacyPolicy.contactUsContent") }
    ];

    return (
        <>

            <Helmet>
                <title>Privacy Policy</title>
            </Helmet>

            <div className="container-fluid content-inner mt-5 py-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">

                            {sections.map((section, index) => (
                                <PrivacyPolicyCard
                                    key={index}
                                    title={section.title}
                                    content={section.content}
                                    theme={theme}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
