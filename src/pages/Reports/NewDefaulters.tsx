import React, { useState, useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import DefaultersWithDate from "./defaultersComponents/DefaultersWithDate";
import DefaultersWithDCB from "./defaultersComponents/DefaultersWithDCB";
import NewDefaultersHeader from "./defaultersComponents/NewDefaultersHeader";
import NormalDefaulters from "./defaultersComponents/NormalDefaulters";

function NewDefaulters() {
  const [key, setKey] = useState("Defaulters");
  const [headDate, setHeadDate] = useState("");

  const handleHeadDate = (value: any) => {
    setHeadDate(value);
  };
  useEffect(() => {
    console.log("selected date", headDate);
  }, [headDate]);

  return (
    <>
      <Row>
        <Col md={12} className="report-header">
          <NewDefaultersHeader tabKey={key} onChangeHeadDate={handleHeadDate} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12} className="daily-summarytab">
          <Tabs
            defaultActiveKey="Defaulters"
            className="mb-3 "
            onSelect={(k: any) => setKey(k)}
          >
            <Tab eventKey="Defaulters" title="Defaulters">
              {/* <SummaryCardComponent /> */}
              <NormalDefaulters />
            </Tab>
            <Tab eventKey="Defaultersdcb" title="Defaulters with DCB">
              {/* <StandardReport /> */}
              <DefaultersWithDCB />
            </Tab>
            {/* <Tab eventKey="Defaulterswithdate" title="Date wise Defaulters">
              <DefaultersWithDate heading={headDate} />
            </Tab> */}
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default NewDefaulters;
