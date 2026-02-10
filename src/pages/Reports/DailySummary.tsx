import React, { useEffect } from "react";
import { Row, Col, Tab, Tabs, Card } from "react-bootstrap";
import DailySummaryHeader from "./headerComponents/DailySummaryHeader";
import SummaryCardComponent from "./dailysummarycomponents/SummaryCardComponent";
import { useSelector } from "react-redux";
import StandardReport from "./dailysummarycomponents/StandardReport";
import DetailedReport from "./dailysummarycomponents/DetailedReport";

function DailySummary() {
  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <DailySummaryHeader />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12} className="daily-summarytab">
          <Tabs defaultActiveKey="General" className="mb-3 ">
            <Tab eventKey="General" title="General Summary">
              <SummaryCardComponent />
            </Tab>
            <Tab eventKey="Standard" title=" Standard Report">
              <StandardReport />
            </Tab>
            <Tab eventKey="Detailed" title="Detailed Report">
              <DetailedReport />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default DailySummary;
