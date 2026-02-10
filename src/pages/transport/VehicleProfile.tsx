import React, { useEffect, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { tryFetchVehicleProfileData } from "../../slices/transport/transportSlice";
import DetailedProfile from "./VehicleProfile/DetailedProfile";
import ProfileButton from "./VehicleProfile/ProfileButton";
import ProfileCard from "./VehicleProfile/ProfileCard";
import { useReactToPrint } from "react-to-print";
function VehicleProfile() {
  const componentRef: any = React.useRef();
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryFetchVehicleProfileData(id));
  }, [id]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    pageStyle: "margin:50px",
  });
  // const handlePrint = () => {
  //   console.log("print clicked");
  // };
  return (
    <div className="page-content vehicle_profile">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body className="profile_top">
              <Row>
                <Col md={12} lg={4}>
                  <ProfileCard />
                </Col>
                <Col md={12} lg={8}>
                  {/* <AttendanceCard /> */}
                </Col>
              </Row>
              {/* <div className="delete-btn">
                <button className="btn-view">Delete Vehicle</button>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="mt-4 profile-details">
          <DetailedProfile />
          {/* <ProfileButton print={handlePrint} /> */}
        </Col>
      </Row>
    </div>
  );
}

export default VehicleProfile;
