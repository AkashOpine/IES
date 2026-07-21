import React, { useRef } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/ieslogo.png";

function MiscellaneousCollectionReceiptModal(props: any) {
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "print-btn",
    onAfterPrint: () => console.log("react print closed"),
  });
  const numberToWords = (num: any) => {
    if (num === 0) return "Zero Rupees Only";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertBelowThousand = (n: any) => {
      let str = "";

      if (n >= 100) {
        str += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }

      if (n >= 20) {
        str += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      }

      if (n > 0) {
        str += ones[n] + " ";
      }

      return str.trim();
    };

    let words = "";

    if (num >= 100000) {
      words += convertBelowThousand(Math.floor(num / 100000)) + " Lakh ";
      num %= 100000;
    }

    if (num >= 1000) {
      words += convertBelowThousand(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }

    words += convertBelowThousand(num);

    return `${words.trim()} Rupees Only`;
  };

  console.log("props", props);

  return (
    <>
      <Modal show={props.openModal} dialogClassName="modalReceipt-90w">
        <div
          className="roundbtn absolute"
          onClick={() => {
            props.setOpenModal(false);
            props.closeModal();
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
                    // src={logomsv}
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
                    MISCELLANEOUS COLLECTION RECEIPT{" "}
                    {props?.receiptData?.master?.academic_year}
                  </span>
                </Col>
              </Row>

              <div className="receipt-info mt-4 mb-4 d-flex justify-content-between w-100">
                <Col md={6}>
                  <div className="receipt-row">
                    <span className="label">Receipt No</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.receipt_no}
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="label">Date</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.date}
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="label">Payment Mode</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.payment_mode}
                    </span>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="receipt-row">
                    <span className="label">Student Name</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.student_name}
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="label">Admission Number</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.adm_no}
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="label">Class</span>
                    <span className="colon">:</span>
                    <span className="value">
                      {" "}
                      {props?.receiptData?.master?.class_name}-
                      {props?.receiptData?.master?.divison_name}
                    </span>
                  </div>
                </Col>
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
                      {props?.receiptData?.details?.length > 0
                        ? props?.receiptData?.details?.map((item: any) => {
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
                      <tr>
                        <td>Total</td>
                        <td className="text-center">
                          {" "}
                          {props?.receiptData?.master?.total_fee_amount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <div className="mb-3 extra-charge">
                    <div className="d-flex gap-2 extra-charge-item">
                      <div>
                        <span className="bold mt-2">
                          {numberToWords(
                            Number(
                              props?.receiptData?.master?.total_fee_amount,
                            ),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <div className="mb-3 extra-charge">
                    <div className="d-flex gap-2 extra-charge-item">
                      <span className="bold">Remarks</span>
                      <span className="bold">:</span>
                      <span>{props?.receiptData?.master?.remarks}</span>
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
