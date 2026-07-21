import React, { useRef } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/receipt.png";
function MiscellaneousCollectionReceiptModal(props: any) {
  const receipt: any = useSelector(
    (state: any) => state.miscellaneousSetting.receiptData,
  );
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    onAfterPrint: () => console.log("react print closed"),
  });
  return (
    <>
      <Modal show={props.openModal} dialogClassName="modalReceipt-90w">
        <div
          className="roundbtn absolute"
          onClick={() => {
            props.setOpenModal(false);
            props.closeModal();
            // dispatch(clearTableDataAfterPay());
          }}
        >
          <span>x</span>
        </div>
        <Row>
          <Col md={6} className="receipt-print" style={{ margin: "auto" }}>
            <div className="print" onClick={() => handlePrint()}>
              <span>Print receipt</span>
            </div>
            <div className="receipt-main " ref={componentRef}>
              <Row>
                <Col
                  md={12}
                  className="text-center"
                  style={{ borderBottom: "1px solid #F3F1F1" }}
                >
                  <img
                    className="img-responsive"
                    alt="iamgurdeeposahan"
                    src={logo}
                  />
                </Col>
              </Row>
              <tr />
              <Row>
                <Col
                  md={12}
                  className="text-center mt-2"
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#B5B5C3",
                  }}
                >
                  <span className="receipt-head">
                    MISCELLANEOUS COLLECTION RECEIPT {receipt?.academic_year}
                  </span>
                </Col>
              </Row>
              <div className="receipt-info mt-4 mb-4 d-flex justify-content-between w-100">
                <Col md={6}>
                  <div className="receipt-row">
                    <span className="label">Receipt No</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.receipt_no}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Date</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.date}</span>
                  </div>{" "}
                  <div className="receipt-row">
                    <span className="label">Payment Mode</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.payment_mode}</span>
                  </div>{" "}
                </Col>
                <Col md={6}>
                  <div className="receipt-row">
                    <span className="label">Student Name</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.student_name}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Admission Number</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.adm_no}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Class</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {receipt?.class_name} {receipt?.divison_name}
                    </span>
                  </div>
                </Col>
                {/* <Col md={12} className="mt-2">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start">Date</th>
                        <th className="text-center">Receipt No</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr
                        style={{
                          color: "#B5B5C3",
                          textTransform: "capitalize",
                        }}
                      >
                        <td>{receipt?.date}</td>
                        <td className="text-center">{receipt?.receipt_no}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col md={12} className="">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start">Student Name</th>
                        <th className="text-center">Admn No</th>
                        <th className="text-center">Class</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr
                        style={{
                          color: "#B5B5C3",
                          textTransform: "uppercase",
                        }}
                      >
                        <td>{receipt?.student_name}</td>
                        <td className="text-center">{receipt?.adm_no}</td>
                        <td className="text-center">
                          {receipt?.class_name + " " + receipt?.divison_name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col> */}
              </div>
              <Row>
                <Col md={12} className="receipt-fee-table">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start">Fee Head</th>
                        <th className="text-center">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {receipt?.fee_list?.length > 0
                        ? receipt?.fee_list.map((item: any) => {
                            if (item.fee_head_name !== "") {
                              return (
                                <tr>
                                  <td>{item.fee_head_name}</td>
                                  <td className="text-center">
                                    {item.fee_amount}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        : ""}
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <div className="mb-3 extra-charge">
                    <div className="d-flex gap-2 extra-charge-item">
                      <span className="bold">Remarks</span>
                      <span className="bold">:</span>
                      <span>{receipt?.remarks}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={12}
                  className="mt-5"
                  style={{ fontSize: "12px", marginLeft: "2em" }}
                >
                  Authorized Signature
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default MiscellaneousCollectionReceiptModal;
