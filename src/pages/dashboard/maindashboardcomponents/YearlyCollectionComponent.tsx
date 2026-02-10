import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArchive, FaCopy, FaTag } from "react-icons/fa";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Console } from "console";
function YearlyCollectionComponent(props: any) {
  useEffect(() => {
    console.log("props ycc", props);
  }, [props]);

  return (
    <>
      <Row>
        <Col md={8} className="yearly-collection-items-left">
          <h4> Yearly DCB</h4>
          <Row>
            <Col md={4}>
              <div className="yearly-collection-items blue">
                <div className="left">
                  <span className="title">Demand</span>
                  <span className="amount">
                    {props?.data?.academic_demand_amt}
                  </span>
                </div>
                <div className="right blue">
                  <div className="cross"></div>
                  <FaCopy />
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="yearly-collection-items green">
                <div className="left">
                  <span className="title">Collection</span>
                  <span className="amount">
                    {" "}
                    {props?.data?.academic_collection_amt}
                  </span>
                </div>
                <div className="right green">
                  <div className="cross"></div>
                  <FaArchive />
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="yearly-collection-items red">
                <div className="left">
                  <span className="title">Balance</span>
                  <span className="amount">
                    {" "}
                    {props?.data?.academic_balance_amt}
                  </span>
                </div>
                <div className="right red">
                  <div className="cross"></div>
                  <FaTag />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="yearly-collection-items-right">
          <div className="container">
            <Row>
              <Col md={4} className="container-left">
                <div style={{ width: "4em" }}>
                  <CircularProgressbarWithChildren
                    value={100}
                    text={`${100}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                    })}
                  ></CircularProgressbarWithChildren>
                  <span>Students</span>
                </div>
              </Col>
              <Col md={8} className="container-right">
                <div className="right-top">
                  <div className="attendance-details">
                    <span className="title">Total</span>
                    <span className="number">{props?.data?.no_of_student}</span>
                  </div>
                  <div className="attendance-details">
                    <span className="title">Present</span>
                    <span className="number">
                      {props?.data?.student_present}
                    </span>
                  </div>
                  <div className="attendance-details">
                    <span className="title">Absent</span>
                    <span className="number">
                      {props?.data?.student_absent}
                    </span>
                  </div>
                </div>
                <div className="right-bottom">
                  <button className="button-70" role="button">
                    <span>More</span>
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default YearlyCollectionComponent;
