import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import { CHECK_FINE, PAY_FEES } from "../../config/BaseUrl";
import {
  academicArray,
  admissionFeeArray,
  busFeeArray,
  cautionDepositArray,
  clearTableDataAfterPay,
  hostelFeeArray,
  diaryFeeArray,
  setCalculatedFine,
} from "../../slices/feetable/feeTableSlice";
import { tryFetchReceiptData } from "../../slices/receipt/receiptSlice";
import FeeReceiptModal from "../../pages/receipt/FeeReceiptModal";
import { tryFetchStudentSearchList } from "../../slices/navsearch/ClassWiseSearchSlice";

function BottomBar() {
  const dispatch = useDispatch();
  const history = useNavigate();
  var today = new Date();
  var todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const feesData: any = useSelector((state: any) => state.feeTable);
  const academicCombinedArray: any = useSelector(academicArray);
  const busFeeCombinedArray: any = useSelector(busFeeArray);
  const hostelFeeCombinedArray: any = useSelector(hostelFeeArray);
  const admissionFeeCombinedArray: any = useSelector(admissionFeeArray);
  const cautionDepositeCombinedArray: any = useSelector(cautionDepositArray);
  const diaryFeeCombinedArray: any = useSelector(diaryFeeArray);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isRadio, setIsRadio] = useState(1);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [fine, setFine]: any = useState(0);
  const [cardNo, setCardNo]: any = useState("");
  const [chequeNo, setChequeNo]: any = useState("");
  const [bankName, setBankName]: any = useState("");
  const [dd, setDD]: any = useState("");
  const [remarks, setRemarks]: any = useState("");
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [calculatedFine, setcalculatedFine]: any = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);

  const handleChange = (e: any) => {
    setIsRadio(+e.currentTarget.value);
  };

  useEffect(() => {
    console.log("isRadio", isRadio);
  }, [isRadio]);

  var paymentMethod: string | Blob = "";

  switch (isRadio) {
    case 1:
      paymentMethod = "cash";
      break;
    case 2:
      paymentMethod = "card";
      break;
    case 3:
      paymentMethod = "cheque";
      break;
    case 4:
      paymentMethod = "DD";
      break;
    case 5:
      paymentMethod = "bank";
      break;
    case 6:
      paymentMethod = "Adv.Fee";
      break;
  }
  async function handlePayment() {
    try {
      setIsLoading(true);
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      bodyFormData.append("academic_year", feesData.feeData?.academic_year);
      bodyFormData.append(
        "student_id",
        feesData.feeData.student_details?.student_id,
      );
      bodyFormData.append("date", todayDate);
      bodyFormData.append("payment_type", paymentMethod);
      bodyFormData.append("cheque_no", chequeNo);
      bodyFormData.append("bank_name", bankName);
      bodyFormData.append("bank_br", "");
      bodyFormData.append("month_arr", academicCombinedArray.toString());
      bodyFormData.append("tmonth_arr", busFeeCombinedArray.toString());
      bodyFormData.append("hmonth_arr", hostelFeeCombinedArray.toString());
      bodyFormData.append("efee", diaryFeeCombinedArray.length > 0 ? "1" : "0");
      bodyFormData.append(
        "admission_fee",
        admissionFeeCombinedArray.toString(),
      );
      bodyFormData.append(
        "caution_deposit",
        admissionFeeCombinedArray.toString(),
      );
      bodyFormData.append(
        "hostel_feesettings",
        feesData.hostel_details?.fee_settings_id || "",
      );
      bodyFormData.append("fine", calculatedFine);
      if (showDiscount) {
        bodyFormData.append("scholarship", feesData?.feeData?.scholarship);
      }
      bodyFormData.append("remarks", remarks);

      let resp: any = await apiPost(PAY_FEES, bodyFormData);

      if (resp.response.data.status === 200) {
        setIsLoading(false);
        setShow(false);
        setReceiptId(resp.response.data.data.slip_id);
        setReceiptModalOpen(true);
        dispatch(
          tryFetchStudentSearchList({
            academicYear: feesData?.feeData?.academic_year || "",
            studentId: feesData.feeData.student_details?.student_id,
          }),
        );
        // dispatch(
        //   tryFetchFeeTableData(feesData.feeData.student_details?.student_id)
        // );

        // history(`/receipt/${resp.response.data.data.slip_id}`);
        // dispatch(
        //   tryFetchReceiptData({
        //     data: resp.response.data.data.slip_id,
        //     history,
        //   })

        // console.log("response", resp.response.data.data.slip_id);
        // history(`/receipt`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        console.log("error message: ", error.message);
        return error.message;
      } else {
        setIsLoading(false);
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  function handleShow() {
    setShow(true);
    // try {
    //   var token = localStorage.getItem("token") as string;
    //   var bodyFormData = new FormData();
    //   bodyFormData.append("Authorization", token);
    //   bodyFormData.append("academic_year", feesData.feeData?.academic_year);
    //   bodyFormData.append(
    //     "student_id",
    //     feesData.feeData.student_details?.student_id
    //   );
    //   bodyFormData.append("month_arr", academicCombinedArray.toString());
    //   bodyFormData.append("tmonth_arr", busFeeCombinedArray.toString());
    //   bodyFormData.append("hmonth_arr", hostelFeeCombinedArray.toString());
    //   bodyFormData.append("emonth_arr", diaryFeeCombinedArray.toString());
    //   bodyFormData.append(
    //     "hostel_feesettings",
    //     feesData.hostel_details ? feesData.hostel_details.fee_settings_id : ""
    //   );

    //   let resp: any = await apiPost(CHECK_FINE, bodyFormData);
    //   if (resp.response.data.status === 200) {
    //     setFine(resp.response.data.data.Fine);
    //     setShow(true);
    //   }
    //   console.log("RESPONSE FINE", resp);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     setIsLoading(false);
    //     console.log("error message: ", error.message);
    //     return error.message;
    //   } else {
    //     setIsLoading(false);
    //     console.log("unexpected error: ", error);
    //     return "An unexpected error occurred";
    //   }
    // }
  }
  useEffect(() => {}, [academicCombinedArray]);
  // const renderInputBox = useMemo(() => {
  //   return (
  //     <Row>
  //       <Col md={12}>
  //         <input
  //           type="text"
  //           placeholder="Search with Reg no."
  //           aria-label="Search"
  //           className="search-input"
  //           // onChange={handleAutoCompleteSearch}
  //           // value={search}
  //         ></input>
  //       </Col>
  //     </Row>
  //   );
  // }, []);
  const handlePaymentInput = (e: any) => {
    if (paymentMethod === "card") {
      setCardNo(e.target.value);
    }
    if (paymentMethod === "cheque") {
      setChequeNo(e.target.value);
    }
    if (paymentMethod === "DD") {
      setDD(e.target.value);
    }
    if (paymentMethod === "bank") {
      setBankName(e.target.value);
    }
    console.log("card no", cardNo);
    console.log("cheque no", chequeNo);
    console.log("DD no", dd);
    console.log("bank name", bankName);
  };
  useEffect(() => {
    if (feesData.calculatedFine >= 0) {
      setcalculatedFine(feesData.calculatedFine);
    } else {
      setcalculatedFine(0);
    }
  }, [feesData.calculatedFine]);
  const handleChangeFine = (e: any) => {
    if (e.target.value >= 0) {
      setcalculatedFine(e.target.value);
    } else {
      setcalculatedFine(0);
    }
  };
  useEffect(() => {
    // var total =
    //   parseInt(feesData.allRawTotal) +
    //   parseInt(calculatedFine) -
    //   parseInt(feesData?.feeData?.scholarship);
    // setTotalPayment(total);
    if (feesData?.feeData?.scholarship && showDiscount) {
      var total =
        parseInt(feesData.allRawTotal) +
        parseInt(calculatedFine) -
        parseInt(feesData?.feeData?.scholarship);
      setTotalPayment(total);
    } else {
      var total = parseInt(feesData.allRawTotal) + parseInt(calculatedFine);
      setTotalPayment(total);
    }
  }, [calculatedFine, feesData.allRawTotal]);
  useEffect(() => {
    console.log("feesData neew______", feesData);
  }, [feesData]);
  useEffect(() => {
    const feeDetails = feesData.rawData1;
    console.log("feeDetails", feeDetails);

    if (feeDetails.length) {
      setShowDiscount(true);
    } else {
      setShowDiscount(false);
    }
  }, [feesData.rawData1]);

  return (
    <>
      <div className="bottom-bar">
        <Row>
          <Col md={6} className="btm-bar-details">
            <span>{feesData.feeData.student_details?.name}</span>
            <span>
              {feesData.feeData.student_details?.class}{" "}
              {feesData.feeData.student_details?.division}
            </span>
          </Col>
          <Col md={6} className="btm-bar-summary">
            {feesData?.feeData?.scholarship && showDiscount ? (
              <span>
                <span>Discount</span>
                <input
                  type="number"
                  value={feesData.feeData.scholarship}
                  onChange={handleChangeFine}
                  className="fine-input"
                  disabled
                />
              </span>
            ) : (
              ""
            )}
            <span>
              <span>Total Fine</span>
              <input
                type="number"
                value={calculatedFine}
                onChange={handleChangeFine}
                className="fine-input"
              />
            </span>
            <span>Total</span>
            <span style={{ whiteSpace: "nowrap" }}>
              ₹{" "}
              {!showDiscount
                ? parseInt(feesData.allRawTotal) + parseInt(calculatedFine)
                : parseFloat(feesData.allRawTotal) +
                  parseFloat(calculatedFine > 0 ? calculatedFine : 0) -
                  parseInt(
                    feesData?.feeData?.scholarship
                      ? feesData?.feeData?.scholarship
                      : 0,
                  )}
            </span>
            <button
              className="btn-view"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => handleShow()}
              disabled={feesData.allRawTotal === 0}
            >
              Confirm payment
            </button>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose} className="pay-modal-summary">
        <div className="modalHeader">
          <Row>
            <Col md={8} className="student-profile-details">
              <div className="student-image">
                <div className="student-image-container">
                  <img
                    src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="student-details student-detail-font">
                <span className="bold mb-1">
                  {feesData.feeData.student_details?.name}
                </span>
                {feesData.feeData.student_details?.class +
                  " " +
                  feesData.feeData.student_details?.division}
              </div>
              <div className="student-class">
                <span className="mb-2 student-detail-font">
                  {feesData.feeData.student_details?.old_admission_no}
                </span>
                <div className="privilage">
                  <span className="student-privilage">
                    {feesData.feeData.student_details?.concession_type
                      ? feesData.feeData.student_details?.concession_type
                      : "No special privilage"}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <button onClick={handleClose}></button>
            </Col>
          </Row>
        </div>
        <div className="modalBody">
          <table className="table table-responsive">
            <thead className="table-head">
              <tr>
                <th className="bold text-start">Fee Head</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {feesData.rawData1.length > 0 ? (
                <tr>
                  <td>{feesData.rawName1}</td>
                  <td className="text-center">{feesData.rawSum1}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.rawData2.length > 0 ? (
                <tr>
                  <td>{feesData.rawName2}</td>
                  <td className="text-center">{feesData.rawSum2}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.rawData3.length > 0 ? (
                <tr>
                  <td>{feesData.rawName3}</td>
                  <td className="text-center">{feesData.rawSum3}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.rawData4.length > 0 ? (
                <tr>
                  <td>{feesData.rawName4}</td>
                  <td className="text-center">{feesData.rawSum4}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.rawData5.length > 0 ? (
                <tr>
                  <td>{feesData.rawName5}</td>
                  <td className="text-center">{feesData.rawSum5}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.rawData6.length > 0 ? (
                <tr>
                  <td>{feesData.rawName6}</td>
                  <td className="text-center">{feesData.rawSum6}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.busFee.length > 0 ? (
                <tr>
                  <td>{feesData.busFeeName}</td>
                  <td className="text-center">{feesData.rawBusSum}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.hostelFee.length > 0 ? (
                <tr>
                  <td>{feesData.hostelFeeName}</td>
                  <td className="text-center">{feesData.hostelSum}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.admissionFeeRaw.length > 0 ? (
                <tr>
                  <td>{feesData.admissionFeeName}</td>
                  <td className="text-center">{feesData.admissionFeeSum}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.cautionDepositRaw.length > 0 ? (
                <tr>
                  <td>{feesData.cautionDepositName}</td>
                  <td className="text-center">{feesData.cautionDepositSum}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData.diaryFee.length > 0
                ? feesData.diaryFee.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.amount}</td>
                    </tr>
                  ))
                : ""}
              {parseInt(calculatedFine) >= 0 ? (
                <tr>
                  <td>Fine</td>
                  <td className="text-center">{parseInt(calculatedFine)}</td>
                </tr>
              ) : (
                ""
              )}
              {feesData?.feeData?.scholarship && showDiscount ? (
                <tr>
                  <td>Discount</td>
                  <td className="text-center">
                    {parseInt(feesData?.feeData?.scholarship)}
                  </td>
                </tr>
              ) : (
                ""
              )}
              <tr>
                <td className="bold">Total</td>
                <td className="text-center bold">{totalPayment}</td>
              </tr>
            </tbody>
          </table>
          <Row>
            <Col
              className="d-flex justify-content-evenly mt-3 m-auto"
              style={{ fontSize: "13px" }}
              md={12}
            >
              <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="1"
                  onChange={handleChange}
                  checked={isRadio === 1}
                />
                Cash
              </div>
              <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="2"
                  onChange={handleChange}
                  checked={isRadio === 2}
                />
                Card
              </div>
              {/* <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="3"
                  onChange={handleChange}
                  checked={isRadio === 3}
                />
                Cheque
              </div>
              <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="4"
                  onChange={handleChange}
                  checked={isRadio === 4}
                />
                DD
              </div> */}
              <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="5"
                  onChange={handleChange}
                  checked={isRadio === 5}
                />
                Bank
              </div>
              <div className="d-flex align-center gap-1">
                <input
                  type="radio"
                  name="pay"
                  value="6"
                  onChange={handleChange}
                  checked={isRadio === 6}
                />
                Adv.Fee
              </div>
            </Col>
          </Row>
          {paymentMethod != "" && paymentMethod != "cash" && paymentMethod != "Adv.Fee" ? (
            <Row>
              <Col md={12} className="mt-4 ">
                <input
                  type="text"
                  placeholder={
                    paymentMethod === "card"
                      ? "Enter card no."
                      : paymentMethod === "cheque"
                        ? "Enter cheque no."
                        : paymentMethod === "DD"
                          ? "Enter DD no."
                          : paymentMethod === "bank"
                            ? "Enter bank name"
                            : ""
                  }
                  className="input-payment"
                  onChange={handlePaymentInput}
                  // value={search}
                ></input>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Col md={12} className="mt-4">
              <textarea
                rows={4}
                placeholder="Remarks"
                aria-label="Search"
                className="w-100 input-textarea"
                onChange={(e) => setRemarks(e.target.value)}
                // value={search}
              ></textarea>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} className="text-center">
              <button
                role="button"
                onClick={handlePayment}
                disabled={isLoading}
                className="button-70"
              >
                <span>Pay</span>
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
      <FeeReceiptModal
        show={receiptModalOpen}
        setShow={setReceiptModalOpen}
        slipId={receiptId}
      />
    </>
  );
}

export default BottomBar;
