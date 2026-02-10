import React, { useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FeesTable from "../dashboard/FeesTable";
import TransportSettingTable from "./TransportSettingTable";

function TransportSettings() {
  const dispatch = useDispatch();
  const transportSettingData: any = useSelector(
    (state: any) => state.transportsetting
  );

  return (
    <div className="page-inner-content">
      <Row>
        <Col md={12}>
          {transportSettingData?.transportSettingTableData?.id ? (
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
                      {
                        transportSettingData?.transportSettingTableData
                          ?.student_name
                      }
                    </span>
                    {transportSettingData?.transportSettingTableData?.class_id +
                      " " +
                      transportSettingData?.transportSettingTableData
                        ?.division_id}
                  </div>
                  <div className="student-class">
                    <span className="mb-2 student-detail-font">
                      {
                        transportSettingData?.transportSettingTableData
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
                  <TransportSettingTable />
                </Col>
              </Row>
            </Card>
          ) : (
            <div className="loaderContainer">
              {transportSettingData?.isLoading ? (
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

export default TransportSettings;
