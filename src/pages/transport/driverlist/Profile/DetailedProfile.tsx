import React from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import GeneralDetails from "./GeneralDetails";

function DetailedProfile() {
  return (
    <div className="detail-card tab-style">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey="general">
            <Tab eventKey="general" title="General">
              <GeneralDetails />
            </Tab>
            {/* <Tab eventKey="fuel" title="Fuel">
              Fuel History
            </Tab>
            <Tab eventKey="maintanence" title="Maintanence">
              Miantanence History
            </Tab>
            <Tab eventKey="legal" title="Legal">
              Legal documents
            </Tab> */}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default DetailedProfile;
