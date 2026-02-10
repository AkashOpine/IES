import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArchive, FaCopy, FaTag } from "react-icons/fa";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function DailyFeeCollection(props: any) {
  useEffect(() => {}, [props.data]);

  return (
    <>
      <Row>
        <Col md={12} className="yearly-collection-items-left mt-3">
          <h4>Daily Fee Collection</h4>
          <Row>
            <Col md={4}>
              <div className="left-border blue">
                <div className="yearly-collection-items white">
                  <div className="till-left">
                    <span className="title">Academic Fee Collection</span>
                    <span className="amount">
                      {props.data?.total_fee_collected}
                    </span>
                  </div>
                  <div className="right blue">
                    <div className="cross"></div>
                    <FaCopy />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="left-border green">
                <div className="yearly-collection-items white">
                  <div className="till-left">
                    <span className="title">Transport Fee Collection </span>
                    <span className="amount">
                      {" "}
                      {props.data?.total_trans_fee_collected}
                    </span>
                  </div>
                  <div className="right green">
                    <div className="cross"></div>
                    <FaArchive />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="left-border red">
                <div className="yearly-collection-items white">
                  <div className="till-left">
                    <span className="title">Hostel Fee Collection</span>
                    <span className="amount">
                      {" "}
                      {props.data?.total_hostetl_fee_collected}
                    </span>
                  </div>
                  <div className="right red">
                    <div className="cross"></div>
                    <FaTag />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        {/* <Col md={4} className="yearly-collection-items-right">
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
                  <span>Teachers</span>
                </div>
              </Col>
              <Col md={8} className="container-right">
                <div className="right-top">
                  <div className="attendance-details">
                    <span className="title">Total</span>
                    <span className="number">{props.data?.no_of_employee}</span>
                  </div>
                  <div className="attendance-details">
                    <span className="title">Present</span>
                    <span className="number">{props.data?.present}</span>
                  </div>
                  <div className="attendance-details">
                    <span className="title">Absent</span>
                    <span className="number">{props.data?.absent}</span>
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
        </Col> */}
      </Row>
    </>
  );
}

export default DailyFeeCollection;
