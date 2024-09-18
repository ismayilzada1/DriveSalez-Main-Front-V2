import React from "react";
import './TermsOfUse.css'
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import CustomAccordion from "../../../components/ui/CustomAccordion";

const TermsOfUse=()=>{

    const {t}=useTranslation();

    const sections = [
        { id: 1, title: t('termsOfUse.acceptanceOfTerms'), content: t('termsOfUse.acceptanceOfTermsContent'), isList: false },
        { id: 2, title: t('termsOfUse.useOfTheWebsite'), content: t("termsOfUse.useOfTheWebsiteContent", { returnObjects: true }), isList: true },
        { id: 3, title: t('termsOfUse.vehicleListingsAndSales'), content: t("termsOfUse.vehicleListingsAndSalesContent", { returnObjects: true }), isList: true },
        { id: 4, title: t("termsOfUse.intellectualProperty"), content: t("termsOfUse.intellectualPropertyContent", { returnObjects: true }), isList: true },
        { id: 5, title: t("termsOfUse.userConduct"), content: t("termsOfUse.userConductContent", { returnObjects: true }), isList: true },
        { id: 7, title: t("termsOfUse.limitationOfLiability"), content: t("termsOfUse.limitationOfLiabilityContent"), isList: false },
        { id: 8, title: t("termsOfUse.termination"), content: t("termsOfUse.terminationContent"), isList: false }
    ];

    return (
        <>

            <Helmet>
                <title>Terms Of Use</title>
            </Helmet>

            <div className="conatiner-fluid content-inner mt-5 py-0">
                <div id="faqAccordion" className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="accordion custom-accordion" id="accordionExample">


                                {sections.map((section) => (
                                    <CustomAccordion
                                        key={section.id}
                                        id={section.id}
                                        parentId="accordionExample"
                                        title={section.title}
                                        content={section.content}
                                        isList={section.isList}
                                    />
                                ))}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TermsOfUse;