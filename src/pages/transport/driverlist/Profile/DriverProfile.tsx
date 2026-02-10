import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { tryFetchDriverProfileData } from "../../../../slices/transport/transportSlice";
import DetailedProfile from "./DetailedProfile";
import ProfileButton from "./ProfileButton";
import ProfileCard from "./ProfileCard";

function DriverProfile() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryFetchDriverProfileData(id));
  }, [id]);
  return (
    <div className="page-content vehicle_profile">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12} lg={4}>
                  <ProfileCard />
                </Col>
                <Col md={12} lg={8}>
                  {/* asd */}
                  {/* <AttendanceCard /> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="mt-4 profile-details">
          <DetailedProfile />
          {/* <ProfileButton /> */}
        </Col>
      </Row>
    </div>
  );
}

export default DriverProfile;
