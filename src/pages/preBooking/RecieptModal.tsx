import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { apiPost } from "../../config/apiConfig";
import { PRE_REGISTRATION_RECIEPT } from "../../config/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/ieslogo.png";
import logomsv from "../../assets/logo/msv_reciept.png";

function ReceiptModal(props: any) {
  const componentRef: any = useRef();
  const [PreResp, setPreResp] = useState<{ [key: string]: any }>({});
  // const [tableData, setTableData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    console.log("props", props);
  }, [props]);

  async function getadmresp() {
    console.log("data is  reciept prop ", props.admNo);
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("application_no", props.admNo);
      bodyFormData.append("academic_year", props.year);
      bodyFormData.append("type", props.type);
      let resp: any = await apiPost(PRE_REGISTRATION_RECIEPT, bodyFormData);
      console.log("pre reg respdata is ", resp);
      if (resp.response.data.status == 200) {
        setPreResp(resp.response.data.data);
        // setTableData(resp.response.data.data?.fee);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    onAfterPrint: () => console.log("react print closed"),
  });

  const handleCloseModal = () => {
    props.setOpen(false);
    setPreResp({});
  };
  useEffect(() => {
    if (props.admNo) {
      getadmresp();
    }
  }, [props.admNo]);
  useEffect(() => {
    // console.log("props 1 data ", props);
    console.log("props 2reciept data ", PreResp?.fee);
  }, [props]);

  useEffect(() => {
    return () => {
      setPreResp({});
    };
  }, []);

  return (
    <>
      <Modal show={props.modalOpen} dialogClassName="modalReceipt-90w">
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
                    // src={logomsv}
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
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#B5B5C3",
                  }}
                >
                  <span className="receipt-head">
                    FEE RECEIPT {props?.year}
                  </span>
                </Col>
              </Row>
              <Row className="mb-4 mt-4">
                <Col md={6} xs={6}>
                  <div className="receipt-item">
                    <span>Receipt No</span>
                    <span>{PreResp?.receipt_no}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Payment Mode</span>
                    <span>{PreResp?.payment_mode}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Date</span>
                    <span>{PreResp?.date}</span>
                  </div>{" "}
                  {/* <div className="receipt-item">
                    <span>Concession</span>
                    <span>{PreResp?.concession_type}</span>
                  </div>{" "} */}
                  {props.type === "admission" ? (
                    <div className="receipt-item ">
                      <span>Adm.No</span>
                      <span>{PreResp?.old_admission_no}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={6} xs={6}>
                  <div className="receipt-item receipt-item-right">
                    <span>Name</span>
                    <span>{PreResp?.student_name}</span>
                  </div>

                  <div className="receipt-item receipt-item-right">
                    <span>Class </span>
                    <span>
                      {PreResp?.class_of_admission}
                      {/* {props.type === "application" ? `-${PreResp?.div}` : ""} */}
                    </span>
                  </div>
                  <div className="receipt-item receipt-item-right">
                    <span>App.No</span>
                    <span>{PreResp?.application_no}</span>
                  </div>
                  {/* <div className="receipt-item receipt-item-right">
                    <span>Div </span>
                    <span>{PreResp?.div}</span>
                  </div> */}
                </Col>
              </Row>
              <Row>
                <Col md={12} className="receipt-fee-table">
                  <table className="table table-responsive">
                    <thead className="table-head">
                      <tr>
                        <th className="text-start">Particulars</th>
                        <th
                          className="text-center table-amount"
                          style={{ width: "20%" }}
                        >
                          Paid Amt
                        </th>
                        {/* <th>Total</th> */}
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {PreResp?.fee_details?.map((feeDetails: any) => (
                        <tr key={feeDetails?.fee_head}>
                          <td>{feeDetails?.fee_head}</td>
                          <td className="text-center">{feeDetails?.fee_amt}</td>
                        </tr>
                      ))}
                      <tr>
                        {" "}
                        <td>Total</td>
                        <td className="text-center">{PreResp?.total}</td>
                      </tr>
                      {/* <tr>
                        <td>Total in Words</td>
                        <td>{PreResp.in_words}</td>
                      </tr> */}
                    </tbody>
                  </table>
                </Col>

                <Col md={12}>
                  <div className="container text-start pt-3">
                    Total in Words :
                    <strong style={{ fontWeight: "600" }}>
                      {" "}
                      Rupees {PreResp?.total_word} Only
                    </strong>
                  </div>
                </Col>
              </Row>
              {/* <Row className="mb-3">
                <Col md={12} className="remark-container">
                  <div className="title">Remarks</div>
                  <div
                    className={
                      receipt.remarks ? "content content_border" : "content"
                    }
                  >
                    {PreResp?.remarks}
                  </div>
                </Col>
              </Row> */}
              {/* <div className="mb-3 extra-charge">
                <div className="d-flex gap-2 extra-charge-item">
                  <span className="bold">Pending Amount Till Date</span>
                  <span className="bold">:</span>
                  <span>{PreResp?.till_month}</span>
                </div>

                <div className="d-flex gap-2 extra-charge-item">
                  <span className="bold">Yearly Balance</span>
                  <span className="bold">:</span>
                  <span>{PreResp?.yearly_balance}</span>
                </div>
              </div> */}

              <Row>
                <Col
                  md={12}
                  style={{
                    fontSize: "14px",
                    marginLeft: "0em",
                    marginTop: "4em",
                    color: "black",
                    textAlign: "left",
                  }}
                >
                  Authorized Signature
                </Col>
              </Row>
              {props.type === "admission" ? (
                <Row>
                  <Col md={12} className="pt-4" style={{ textAlign: "left" }}>
                    <strong style={{ fontWeight: "600" }}>
                      Note: Parent should submit this original receipt for the
                      refund of caution deposit.
                    </strong>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ReceiptModal;
