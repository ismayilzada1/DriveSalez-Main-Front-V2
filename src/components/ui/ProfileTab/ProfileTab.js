import React, {useEffect, useState} from "react";
import './ProfileTab.css'
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {DeleteAccount} from "../../../Store/Auth/authActions";
import {useNavigate} from "react-router-dom";

const ProfileTab = () => {

    const {t} = useTranslation ();
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [password,setPassword]=useState('');
    const {loading} = useSelector((state) => state.announcement);

    const navigate=useNavigate();


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const createLabelValue = (label, value) => (
        <li className="list-group-item">
            <span className="label info-key">{t (label)} :</span>
            <span className="value"><strong>{value}</strong></span>
        </li>
    );

    const {user} = useSelector ((state) => state.auth);


    const handleDeleteAccount = async () => {
        if(!password){return null}
        try {
            const response= await dispatch(DeleteAccount(password,accessToken));

            if (response.status === 200) {
                setAlertMessage("Account Deleted succesfully !");
                setShowSuccessAlert(true);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setShowAlert(true);
                setAlertMessage('Something went wrong !');
            }
        } catch (error) {
            setShowAlert(true);
            setAlertMessage('Something went wrong !');
        }
    }





    const [showModal, setShowModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState('');
    const [formData, setFormData] = useState({
        bannerImage: "https://www.wsupercars.com/wallpapers-regular/Lincoln/2017-Lincoln-Continental-001-2000.jpg",
        logoImage: "https://turbo.azstatic.com/uploads/f352x352/2023%2F06%2F05%2F15%2F13%2F39%2Ffa6d535d-f3b5-468b-89f9-f493c86ce1ee%2Flogo.png",
        title: "Prestige Auto",
        description: `"Prestige Auto" avtosalonu avtomobillərin yüksək qiymətlə alışını,
        eləcə də sərfəli şərtlərlə satışını və barterini həyata keçirir.`,
        address: "Bakı ş., Nəsimi r., Xətai pr.",
        phoneNumbers: ['(070) 288-44-74', '(070) 288-44-74','0'],
        workingHours: "Hər gün: 10:00–19:00",
    });

    const handleEdit = (field) => {
        setCurrentEdit(field);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [currentEdit]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFormData({
                    ...formData,
                    [currentEdit]: reader.result,
                });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSave = () => {
        setShowModal(false);
        setCurrentEdit('');
    };





    if (!user) {
        return (
            <div className="card card-profile-tab">
                <div className="card-body pe-2">
                    <h5 className="card-title">{t ("personalData")}</h5>
                    <hr/>
                </div>
                <div className="card-body">
                    <p>User data not available.</p>
                </div>
            </div>
        );
    }


    return (
        <>
            {/*for user*/}
            {/*<div className="card card-profile-tab">*/}
            {/*    <div className="card-body pe-2">*/}
            {/*        <h5 className="card-title">{t("personalData")}</h5>*/}
            {/*        <hr/>*/}
            {/*    </div>*/}
            {/*    <ul className="list-group list-group-flush">*/}
            {/*        {createLabelValue("name", user?.firstName)}*/}
            {/*        {createLabelValue("surname", user?.lastName)}*/}
            {/*        {createLabelValue("email", user?.email)}*/}
            {/*        {createLabelValue("accountType", user?.userRole)}*/}
            {/*        {createLabelValue("phoneNumber", user?.phoneNumbers?.[0]?.phoneNumber)}*/}
            {/*    </ul>*/}
            {/*    <div className="card-body d-flex flex-row justify-content-between">*/}
            {/*        <a href="#" data-bs-toggle="modal" data-bs-target="#DeleteModal"*/}
            {/*           className="card-link">{t("removeAccount")}</a>*/}
            {/*        <a href="/src/pages/auth/changePassword" className="card-link">{t("changePassword")}</a>*/}
            {/*        <a href="/updateAccount" className="card-link">{t("updateAccount")}</a>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*for business account*/}

            <div className="dealership-details-card container">
                <div className="row no-gutters h-100">
                    <div className="col-lg-8 p-0 position-relative">
                        <img
                            src={formData.bannerImage}
                            alt="Dealership Banner"
                            className="img-fluid dealership-image h-100"
                        />
                        <button
                            className="custom-edit-btn  position-absolute top-0 end-0 m-2"
                            onClick={() => handleEdit('bannerImage')}
                        >
                            <i className="custom-edit-btn-icon bi bi-pencil"></i>
                        </button>
                    </div>

                    <div className="col-lg-4 text-white p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div className="d-flex flex-row">
                                <div className="position-relative">
                                    <img
                                        src={formData.logoImage}
                                        alt="Prestige Auto Logo"
                                        className="logo mb-3"
                                    />
                                    <button
                                        className="custom-edit-btn  position-absolute top-0 end-0 m-1"
                                        onClick={() => handleEdit('logoImage')}
                                    >
                                        <i className="custom-edit-btn-icon bi bi-pencil"></i>
                                    </button>
                                </div>
                                <div className="ms-3 text-center">
                                    <h3 className="text-light text-c" onClick={() => handleEdit('title')}>
                                        {formData.title}
                                    </h3>
                                    <div className="d-flex mt-2 align-items-center">
                                        <i className="bi bi-eye mb-1"></i>
                                        <p className="m-0 p-0">388 798</p>
                                    </div>
                                </div>
                            </div>

                            <p className="p-0" onClick={() => handleEdit('description')}>
                                {formData.description}
                            </p>
                            <p className="p-0" onClick={() => handleEdit('address')}>
                                <i className="bi bi-geo-alt-fill"></i> {formData.address}
                            </p>

                            <div className="d-flex flex-row">
                                <p className="p-0" onClick={() => handleEdit('phoneNumbers')}>
                                    <i className="bi bi-telephone-fill"></i> {formData?.phoneNumbers?.join(', ')}
                                </p>
                            </div>

                            <p className="p-0" onClick={() => handleEdit('workingHours')}>
                                <i className="bi bi-clock-fill"></i> {formData.workingHours}
                            </p>
                        </div>
                        <div className="dealership-details-card-btns-container">
                            <button className="btn btn-primary mb-2">97 elan</button>
                            <button className="btn btn-light">Lüks sinif avtomobillərinin satış mərkəzi</button>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit {currentEdit}</h5>
                                    <button type="button" className="btn-close"
                                            onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {currentEdit.includes('Image') ? (
                                        <input type="file" className="form-control" onChange={handleImageChange}/>
                                    ) : (
                                        <input
                                            type={currentEdit === 'phone1' || currentEdit === 'phone2' ? 'tel' : 'text'}
                                            className="form-control"
                                            value={formData[currentEdit]}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                                <div className="modal-footer">

                                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save
                                        changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>




            <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog"
                 aria-labelledby="DeleteModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{t("deleteAccount")}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label" htmlFor="pno">Password:</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                       name="passwordInput" className="form-control rounded"/>
                            </div>

                        </div>

                        <button type="button" data-toggle="modal"
                                data-target="#DeleteModal" onClick={handleDeleteAccount} disabled={loading}
                                className="btn btn-danger m-3">{loading ? t('deleteLoading') : t('delete')}
                        </button>

                        {showAlert && (
                            <div className="alert alert-warning m-4" role="alert">
                                {alertMessage}
                            </div>
                        )}
                        {showSuccessAlert && (
                            <div className="alert alert-success m-4" role="alert">
                                {alertMessage}
                            </div>
                        )}

                    </div>
                </div>
            </div>


        </>
    );
}

export default ProfileTab;