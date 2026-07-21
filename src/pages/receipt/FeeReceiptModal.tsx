import React, { useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/ieslogo.png";
import {
  clearRecieptData,
  tryFetchReceiptData,
} from "../../slices/receipt/receiptSlice";
import {
  clearTableDataAfterPay,
  tryFetchFeeTableData,
} from "../../slices/feetable/feeTableSlice";

function FeeReceiptModal(props: any) {
  const feesData: any = useSelector((state: any) => state.feeTable);
  const currentYear = localStorage.getItem("year");
  const dispatch = useDispatch();
  const receipt: any = useSelector((state: any) => state.receipt.receiptData);
  // const [receipt, setReceipt] = useState({});
  const numWords = require("num-words");
  const amountInWords = numWords(receipt?.total_paid_amt?.split(".")[0]);
  const componentRef: any = useRef();
  const params = useParams();
  useEffect(() => {
    console.log("DASDTERis", props);

    dispatch(
      tryFetchReceiptData({
        academicYear: feesData?.feeData.academic_year || currentYear,
        data: props.slipId,
      }),
    );
  }, [feesData?.feeData.academic_year, props.slipId]);
  useEffect(() => {}, [receipt]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    onAfterPrint: () => console.log("react print closed"),
  });
  // useEffect(() => {
  //   return () => {
  //     dispatch(clearRecieptData());
  //   };
  // }, []);
  const handleCloseModal = () => {
    props.setShow(false);
    dispatch(clearTableDataAfterPay());
    dispatch(clearRecieptData());
    dispatch(
      tryFetchFeeTableData({
        academicYear: params.year || "",
        studentId: feesData.feeData.student_details?.student_id,
      }),
    );
  };
  return (
    <>
      <Modal show={props.show} dialogClassName="modalReceipt-90w">
        <div className="roundbtn absolute" onClick={handleCloseModal}>
          <span>x</span>
        </div>
        <Row>
          <Col md={6} className="receipt-print" style={{ marginTop: "auto" }}>
            <div className="print" onClick={() => handlePrint()}>
              {/* <FaPrint size={14} /> */}
              <span>Print receipt</span>
            </div>
            <div className="receipt-main " ref={componentRef}>
              <Row>
                <Col
                  md={12}
                  className="text-center"
                  // style={{ borderBottom: "1px solid #F3F1F1" }}
                >
                  <img
                    className="img-responsive receipt_logo"
                    alt="ies logo"
                    src={logo}
                  />
                </Col>
              </Row>
              <tr />
              <Row>
                <Col
                  md={12}
                  className="text-center mt-3"
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#B5B5C3",
                  }}
                >
                  <span className="receipt-head">
                    FEE RECEIPT {receipt?.academic_year}
                  </span>
                </Col>
              </Row>
              <div className="receipt-info gap-4 mt-4 mb-4 d-flex justify-content-between w-100">
                <Col xs={6}>
                  <div className="receipt-row">
                    <span className="label">Date</span>
                    <span className="colon">:</span>
                    <span className="value"> {receipt?.date}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="label">Name</span>
                    <span className="colon">:</span>
                    <span className="value"> {receipt?.student_name}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Adm.No</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.old_admission_no}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Class</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {receipt?.class} {receipt?.division}
                    </span>
                  </div>
                  {receipt.pickup_name ? (
                    <div className="receipt-row">
                      <span className="label">Pick Up</span>
                      <span className="colon">:</span>
                      <span className="value">{receipt?.pickup_name}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs={6}>
                  <div className="receipt-row">
                    <span className="label">Receipt No</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.receipt_no}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Payment Mode</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.payment_type}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="label">Concession</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.concession_type}</span>
                  </div>{" "}
                  {/* <div className="receipt-item">
                    <span>Date</span>
                    <span>{receipt?.date}</span>
                  </div>{" "} */}
                  {receipt.route_name ? (
                    <div className="receipt-row">
                      <span className="label">Bus No</span>
                      <span className="colon">:</span>
                      <span className="value">{receipt?.route_name}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="receipt-row">
                    <span className="label">Remarks</span>
                    <span className="colon">:</span>
                    <span className="value">{receipt?.remarks}</span>
                  </div>{" "}
                </Col>

                {/* <Col xs={12}>
                  {receipt.route_name ? (
                    <div
                      className="bold "
                      style={{
                        fontSize: "12px",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                      }}
                    >
                      <span>Bus/Pickup : </span>
                      <span className="">
                        {receipt?.route_name} / {receipt?.pickup_name}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </Col> */}
              </div>
              <Row>
                <Col md={12} className="receipt-fee-table">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start">Particulars</th>
                        <th className="text-center">Month</th>
                        <th
                          className="text-center table-amount"
                          style={{ width: "20%" }}
                        >
                          Paid Amt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {receipt?.fee_details?.length > 0
                        ? receipt?.fee_details.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.feehead_name}</td>
                                <td className="text-center">{item.feemonth}</td>
                                <td className="text-center">{item.paid_amt}</td>
                              </tr>
                            );
                          })
                        : ""}
                      {receipt?.trans_fee_details?.length > 0
                        ? receipt?.trans_fee_details.map((item: any) => {
                            return (
                              <tr>
                                <td>Bus Fee</td>
                                <td className="text-center">{item.feemonth}</td>
                                <td className="text-center">{item.paid_amt}</td>
                              </tr>
                            );
                          })
                        : ""}
                      {receipt?.hostel_fee_details?.length > 0
                        ? receipt?.hostel_fee_details.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.feehead_name}</td>
                                <td className="text-center break-words">
                                  {item.feemonth}
                                </td>
                                <td className="text-center">{item.paid_amt}</td>
                              </tr>
                            );
                          })
                        : ""}
                      <tr className="mt-2">
                        <td>Fine</td>
                        <td className="text-center"></td>
                        <td className="text-center ">{receipt?.total_fine}</td>
                      </tr>
                      <tr className="mt-2">
                        <td style={{ fontWeight: "bold" }}>Grand Total</td>
                        <td
                          className="text-center break-words"
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Rupees {amountInWords} only
                        </td>
                        <td
                          className="text-center "
                          style={{ fontWeight: "bold" }}
                        >
                          {receipt?.total_paid_amt}
                        </td>
                      </tr>
                      {/* <tr className="mt-2">
                        <td></td>
                        <td className="text-center"></td>
                        <td></td>
                      </tr> */}
                    </tbody>
                  </table>
                </Col>
                {/* <Col md={12}>
                  <div className="container">
                    <span>
                      Total in Words :
                      <strong style={{ fontWeight: "600" }}>
                        {" "}
                        Rupees {amountInWords} Only
                      </strong>
                    </span>
                  </div>
                </Col> */}
              </Row>
              {/* <Row className="mb-3">
                <Col md={12} className="remark-container">
                  <div className="title">Remarks</div>
                  <div
                    className={
                      receipt.remarks ? "content content_border" : "content"
                    }
                  >
                    {receipt?.remarks}
                  </div>
                </Col>
              </Row> */}
              <div className="mb-3 extra-charge">
                <div className="d-flex gap-2 extra-charge-item">
                  <span className="bold">Pending Amount Till Date</span>
                  <span className="bold">:</span>
                  <span>{receipt?.till_month}</span>
                </div>

                <div className="d-flex gap-2 extra-charge-item">
                  <span className="bold">Yearly Balance</span>
                  <span className="bold">:</span>
                  <span>{receipt?.yearly_balance}</span>
                </div>
              </div>
              <Row>
                <Col
                  md={12}
                  style={{
                    fontSize: "11px",
                    marginLeft: "0em",
                    marginTop: "1.5em",
                    color: "black",
                    textAlign: "left",
                  }}
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

export default FeeReceiptModal;
