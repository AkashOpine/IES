import React from "react";
import { useSelector } from "react-redux";
import { BsTelephone } from "react-icons/bs";

function ProfileCard() {
  const data = useSelector((state: any) => state.transport?.driverProfileData);
  return (
    <div className="detail-card">
      <div className="profile-top">
        {/* <div className="profile-services">
          <div className="round-icon green">
            <span>
              <Icon icon="ic:baseline-directions-bus" width="15" height="15" />
            </span>
          </div>
          <div className="round-icon green">
            <span>
              <Icon icon="mdi:bed" width="15" height="15" />
            </span>
          </div>
        </div> */}
        <div className="profile">
          <div className="profile-image">
            <img
              src={
                data.driver_doc_path
                  ? data.driver_doc_path
                  : "https://toppng.com/uploads/preview/school-bus-11523881593wqokppllqq.png"
              }
              alt="Image"
            />
          </div>
          <div className="profile-head-details">
            <span className="name">{data.driver_name}</span>
            <div className="d-flex gap-4 head-sub-details">
              <span>{data.description}</span>
              {/* <span>ST 2345</span> */}
            </div>
            <span className="mobile">
              <BsTelephone size={12} color="#545B62" />
              {data.mobile}
            </span>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-head-other-details">
          <div className="details">
            <span className="privilage">Name</span>
            <span className="text">{data.driver_name}</span>
          </div>
          <div className="details">
            <span className="head">Mobile</span>
            <span className="text">{data.phone}</span>
          </div>
          <div className="details">
            <span className="head">Date of Birth</span>
            <span className="text">{data.dob}</span>
          </div>
          <div className="details">
            <span className="head">Blood Group</span>
            <span className="text">{data.blood_group}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
