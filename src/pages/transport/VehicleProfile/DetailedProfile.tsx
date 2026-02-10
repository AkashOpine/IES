import React from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import FuelHistory from "./FuelHistory";
import GeneralDetails from "./GeneralDetails";
import LegalDocuments from "./LegalDocuments";
import MaintanenceHistory from "./MaintanenceHistory";
function DetailedProfile() {
  return (
    <div className="detail-card tab-style">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey="general">
            <Tab eventKey="general" title="General">
              <GeneralDetails />
            </Tab>
            <Tab eventKey="fuel" title="Fuel">
              <FuelHistory />
            </Tab>
            <Tab eventKey="maintanence" title="Maintanence">
              <MaintanenceHistory />
            </Tab>
            <Tab eventKey="legal" title="Legal">
              <LegalDocuments />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default DetailedProfile;
