import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import ConsolidatedReportHeader from "./headerComponents/ConsolidatedReportHeader";
import ConsolidatedReport from "./consolidatedreportcomponents/ConsolidatedReport";
import ConsolidatedPaymentHistory from "./consolidatedreportcomponents/consolidated_payment_history";
import ConsolidatedHistory from "./consolidatedreportcomponents/conslidated_history";
import { useDispatch } from "react-redux";
import { clearSearch } from "../../slices/navsearch/ClassWiseSearchSlice";

function ConsolidatedReportMain() {
  const dispatch = useDispatch();
  const [key, setKey] = useState("Consolidated");
  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, []);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <ConsolidatedReportHeader tabKey={key} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12} className="daily-summarytab consolidated-tab">
          <Tabs
            defaultActiveKey="Consolidated"
            className="mb-3 "
            onSelect={(k: any) => setKey(k)}
          >
            <Tab eventKey="Consolidated" title="Consolidated Report">
              <ConsolidatedReport />
            </Tab>
            <Tab eventKey="Till" title="Till date Reciept">
              <ConsolidatedPaymentHistory />
            </Tab>
            <Tab eventKey="History" title="Reciept wise Report">
              <ConsolidatedHistory />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default ConsolidatedReportMain;
