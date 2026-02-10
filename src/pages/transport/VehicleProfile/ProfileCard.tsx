import React from "react";
import { useSelector } from "react-redux";

function ProfileCard() {
  const data = useSelector((state: any) => state.transport?.vehicleProfileData);
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
                data.vehicle_photo_path
                //   ? data.vehicle_photo_path
                //   :
                // "https://www.transparentpng.com/thumb/school-bus/quality-orange-school-bus-png-transparent-3cHmbz.png"
              }
              alt="Image"
            />
          </div>
          <div className="profile-head-details">
            <span className="name">{data.vehicle_no}</span>
            <div className="d-flex gap-4 head-sub-details">
              <span>{data.description}</span>
              {/* <span>ST 2345</span> */}
            </div>
            <span className="mobile">
              {/* <Icon
                icon="material-symbols:phone-enabled"
                width="12"
                height="12"
                rotate={1}
              />{" "} */}
              {data.mobile}
            </span>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-head-other-details">
          <div className="details">
            <span className="privilage">Transport</span>
            <span className="text">{data.vehicle_no}</span>
          </div>
          <div className="details">
            <span className="head">Academic Year</span>
            <span className="text">{data.academic_year}</span>
          </div>
          <div className="details">
            <span className="head">Ownership</span>
            <span className="text">{data.ownership}</span>
          </div>
          <div className="details">
            <span className="head">Fuel Type</span>
            <span className="text">{data.fuel_type_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
