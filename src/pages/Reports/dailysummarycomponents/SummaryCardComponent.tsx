import React, { useEffect, useRef } from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import FeeHeadChart from "./charts/FeeHeadChart";
import PaymentModeChart from "./charts/PaymentModeChart";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
function SummaryCardComponent() {
  const paymentReport: any = useSelector((state: any) => state.paymentreport);
  const componentRef: any = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   bodyClass: "print-btn",
  //   onAfterPrint: () => console.log("react print closed"),
  //   copyStyles: true,
  // });
  return (
    <>
      {/* <button onClick={handlePrint}>print</button> */}
      <Row className="tab-content" ref={componentRef}>
        <Col md={12}>
          <Card className="summary-card">
            <Card.Body>
              {Object.keys(paymentReport?.dailySummaryReportData).length > 0 ? (
                <div className="summary">
                  <Row>
                    <Col md={12} className="card-title">
                      <span>Daily Summary Report</span>
                    </Col>
                  </Row>
                  <Row className="mt-4 item-row">
                    <Col md={12} className="item-col">
                      <div className="field">
                        <span className="label">Date</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.date}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Cash</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.cash}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Fee Amount</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.fee_amount}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Card</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.card}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Special Concession</span>
                        <span className="text">
                          {
                            paymentReport?.dailySummaryReportData
                              .special_concession
                          }
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Bank</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.Bank}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Extra Concession</span>
                        <span className="text">
                          {
                            paymentReport?.dailySummaryReportData
                              .extra_concession
                          }
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Online</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.online}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Balance</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.balance}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Total Collection</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.total_paid_amt}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Fine</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.fine}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Cheque</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.cheque}
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Previous Pending Fee</span>
                        <span className="text">
                          {
                            paymentReport?.dailySummaryReportData
                              .previous_pending_fee
                          }
                        </span>
                      </div>
                      <div className="field">
                        <span className="label">Scholarship</span>
                        <span className="text">
                          {paymentReport?.dailySummaryReportData.scholarship}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-5">
                      <Row>
                        <Col md={12} className="card-title">
                          <span>Payment Mode</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md={12}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <PaymentModeChart />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6} className="mt-5">
                      <Row>
                        <Col md={12} className="card-title">
                          <span>Fee Head</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md={12}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FeeHeadChart />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div className="nosummary">No Summary found</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SummaryCardComponent;
