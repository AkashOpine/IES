import React, { useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { tryFetchSingleHostelerDetails } from "../../../slices/hostel/hostelSlice";
import HostelSettingTable from "./HostelSettingsTable";
// import FeesTable from "../dashboard/FeesTable";
// import TransportSettingTable from "./TransportSettingTable";

function IndividualHostelSettings() {
  const params = useParams();
  const dispatch = useDispatch();
  const HostelSettingData: any = useSelector((state: any) => state.hostel);
  useEffect(() => {
    console.log("params id", params);
    dispatch(tryFetchSingleHostelerDetails(params.id));
  }, [params.id]);

  return (
    <div className="page-inner-content">
      <Row>
        <Col md={12}>
          {HostelSettingData?.singleHostelerDetails.id ? (
            <Card className="fees-table-card">
              <Row>
                <Col md={12} className="student-profile-details">
                  <div className="student-image">
                    <div className="student-image-container">
                      <img
                        src="https://static.xx.fbcdn.net/assets/?revision=816167972411634&name=desktop-creating-an-account-icon&density=1"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="student-details student-detail-font">
                    <span className="bold mb-2">
                      {HostelSettingData?.singleHostelerDetails?.student_name}
                    </span>
                    {HostelSettingData?.singleHostelerDetails?.class_id +
                      " " +
                      HostelSettingData?.singleHostelerDetails?.division_id}
                  </div>
                  <div className="student-class">
                    <span className="mb-2 student-detail-font">
                      {
                        HostelSettingData?.singleHostelerDetails
                          ?.old_admission_no
                      }
                    </span>
                    <div className="privilage">
                      <span className="student-privilage">
                        No special privilage
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <HostelSettingTable />
                </Col>
              </Row>
            </Card>
          ) : (
            <div className="loaderContainer">
              {HostelSettingData?.isLoading ? (
                <Spinner animation="grow" variant="primary" />
              ) : (
                "No data found"
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default IndividualHostelSettings;
