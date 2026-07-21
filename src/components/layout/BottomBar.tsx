import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import { CHECK_FINE, PAY_FEES, PAY_FEES_PARTIAL } from "../../config/BaseUrl";
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
  const [isRadio, setIsRadio] = useState(2);
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
  const [partialPayment, setPartialPayment] = useState(false);
  const [partialCustomAmounts, setPartialCustomAmounts] = useState<{
    [key: string]: number;
  }>({});
  const [partialTotal, setPartialTotal] = useState<number>(0);
  const [editedAmounts, setEditedAmounts] = useState<
    {
      amount: number;
      id: string;
      monthId: number;
      feeType: string;
      fee_settings_id: string;
    }[]
  >([]);

  useEffect(() => {
    console.log("editedAmounts", editedAmounts);
  }, [editedAmounts]);

  const [changeTotal, setChangeTotal] = useState(false);
  const ACADEMIC_MONTH_ORDER = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 13, 14];
  const RAW_DATA_KEYS = [
    { key: "rawData1", nameKey: "rawName1" },
    { key: "rawData2", nameKey: "rawName2" },
    { key: "rawData3", nameKey: "rawName3" },
    { key: "rawData4", nameKey: "rawName4" },
    { key: "rawData5", nameKey: "rawName5" },
    { key: "rawData6", nameKey: "rawName6" },
  ];
  const MONTH_NAMES: { [key: number]: string } = {
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
    1: "Jan",
    2: "Feb",
    3: "Mar",
    13: "Apr",
    14: "May",
  };
  // Get all unique months sorted across all rawData arrays
  const allMonths: number[] = useMemo(() => {
    const monthSet = new Set<number>();

    RAW_DATA_KEYS.forEach(({ key }) => {
      feesData[key]?.forEach((item: any) => {
        monthSet.add(item.monthId);
      });
    });

    feesData.busFee?.forEach((item: any) => {
      monthSet.add(item.monthId);
    });

    feesData.hostelFee?.forEach((item: any) => {
      monthSet.add(item.monthId);
    });

    return Array.from(monthSet).sort(
      (a, b) =>
        ACADEMIC_MONTH_ORDER.indexOf(a) - ACADEMIC_MONTH_ORDER.indexOf(b),
    );
  }, [feesData]);
  useEffect(() => {
    console.log("allMonths", allMonths);
  }, [allMonths]);

  const monthOriginalTotals: { [monthId: number]: number } = useMemo(() => {
    const totals: { [monthId: number]: number } = {};
    allMonths.forEach((monthId) => {
      let sum = RAW_DATA_KEYS.reduce((s, { key }) => {
        const item = feesData[key]?.find((i: any) => i.monthId === monthId);
        return s + (item ? parseFloat(item.amount) : 0);
      }, 0);
      const busItem = feesData.busFee?.find((i: any) => i.monthId === monthId);
      if (busItem) sum += parseFloat(busItem.amount);
      const hostelItem = feesData.hostelFee?.find(
        (i: any) => i.monthId === monthId,
      );
      if (hostelItem) sum += parseFloat(hostelItem.amount);
      totals[monthId] = sum;
    });
    return totals;
  }, [feesData, allMonths]);

  const monthPartialTotals: { [monthId: number]: number } = useMemo(() => {
    const totals: { [monthId: number]: number } = {};
    allMonths.forEach((monthId) => {
      let sum = RAW_DATA_KEYS.reduce((s, { key }) => {
        const val = partialCustomAmounts[`${key}_${monthId}`];
        return s + (isNaN(val) || val === undefined ? 0 : val);
      }, 0);
      const busVal = partialCustomAmounts[`busFee_${monthId}`];
      if (!isNaN(busVal) && busVal !== undefined) sum += busVal;
      const hostelVal = partialCustomAmounts[`hostelFee_${monthId}`];
      if (!isNaN(hostelVal) && hostelVal !== undefined) sum += hostelVal;
      totals[monthId] = sum;
    });
    return totals;
  }, [partialCustomAmounts, allMonths]);

  // Initialize custom amounts when partialPayment turns on
  useEffect(() => {
    if (!partialPayment) return;
    const initial: { [key: string]: number } = {};
    RAW_DATA_KEYS.forEach(({ key }) => {
      feesData[key]?.forEach((item: any) => {
        initial[`${key}_${item.monthId}`] = parseFloat(item.amount);
      });
    });
    if (calculatedFine) initial["fine"] = parseFloat(calculatedFine);
    setPartialCustomAmounts(initial);
  }, [partialPayment, feesData, calculatedFine]);

  // Recalculate partial total
  useEffect(() => {
    if (!partialPayment) return;

    let total = 0;

    Object.values(partialCustomAmounts).forEach((val) => {
      if (!isNaN(val)) total += val;
    });

    const fine = parseFloat(calculatedFine);
    if (!isNaN(fine)) total += fine;

    setPartialTotal(total);

    if (changeTotal === false) {
      setTotalPayment(total);
    }
  }, [partialCustomAmounts, partialPayment, calculatedFine]);

  useEffect(() => {
    if (!partialPayment || !show) return;

    const initial: { [key: string]: number } = {};
    const initialEditedAmounts: {
      id: string;
      amount: number;
      fee_settings_id: string;
      monthId: number;
      feeType: string;
    }[] = [];

    const pushItem = (item: any, feeType: string) => {
      const stateKey = `${feeType}_${item.monthId}`;
      initial[stateKey] = parseFloat(item.amount);
      initialEditedAmounts.push({
        amount: parseFloat(item.amount),
        id: item.fee_settings_id,
        fee_settings_id: item.fee_settings_id,
        monthId: item.monthId,
        feeType,
      });
    };

    RAW_DATA_KEYS.forEach(({ key }) => {
      feesData[key]?.forEach((item: any) => pushItem(item, key));
    });
    feesData.busFee?.forEach((item: any) => pushItem(item, "busFee"));
    feesData.hostelFee?.forEach((item: any) => pushItem(item, "hostelFee"));

    setPartialCustomAmounts(initial);
    setEditedAmounts(initialEditedAmounts);
  }, [partialPayment, feesData, show]);

  const handlePartialAmountChange = (
    stateKey: string,
    value: number,
    max: number,
    id: string,
    monthId: number,
    feeType: string,
  ) => {
    const clamped = isNaN(value) ? 0 : Math.min(value, max);

    setChangeTotal(true);
    setPartialCustomAmounts((prev) => ({ ...prev, [stateKey]: clamped }));

    setEditedAmounts((prev) =>
      prev.map((e) =>
        e.id === id && e.monthId === monthId && e.feeType === feeType
          ? { ...e, amount: clamped }
          : e,
      ),
    );
  };

  useEffect(() => {
    if (!partialPayment) return;

    const initial: { [key: string]: number } = {};

    // rawData1–6: each item has id, amount, monthId
    [
      "rawData1",
      "rawData2",
      "rawData3",
      "rawData4",
      "rawData5",
      "rawData6",
    ].forEach((key) => {
      feesData[key]?.forEach((item: any) => {
        initial[`${key}_${item.monthId}`] = parseFloat(item.amount);
      });
    });

    feesData.busFee?.forEach((item: any) => {
      initial[`busFee_${item.monthId}`] = parseFloat(item.amount);
    });

    feesData.hostelFee?.forEach((item: any) => {
      initial[`hostelFee_${item.monthId}`] = parseFloat(item.amount);
    });

    feesData.admissionFeeRaw?.forEach((item: any) => {
      initial[`admissionFee_${item.monthId}`] = parseFloat(item.amount);
    });

    feesData.cautionDepositRaw?.forEach((item: any) => {
      initial[`cautionDeposit_${item.monthId}`] = parseFloat(item.amount);
    });

    feesData.diaryFee?.forEach((item: any) => {
      initial[`diaryFee_${item.id}`] = parseFloat(item.amount);
    });

    if (calculatedFine) {
      initial["fine"] = parseFloat(calculatedFine);
    }

    setPartialCustomAmounts(initial);
  }, [partialPayment, feesData, calculatedFine]);

  useEffect(() => {
    if (!partialPayment) return;
    const total = Object.values(partialCustomAmounts).reduce(
      (sum, val) => sum + (val || 0),
      0,
    );
    setPartialTotal(total);
  }, [partialCustomAmounts, partialPayment]);

  const handlePartialPaymentChange = () => {
    setPartialPayment(!partialPayment);
  };
  const handleChange = (e: any) => {
    setIsRadio(+e.currentTarget.value);
  };

  useEffect(() => {
    console.log("feesDataxxxxxxxxxxxxxx", feesData.hostelFee);
  }, [feesData]);

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
  const buildPartialPayload = (bodyFormData: FormData) => {
    // ── Regular fees ─────────────────────────────────────────────────
    const regularFees = editedAmounts.filter(
      (e) => e.feeType !== "busFee" && e.feeType !== "hostelFee",
    );

    const regularFeeMap = new Map<
      string,
      { monthIds: number[]; amounts: number[] }
    >();
    regularFees.forEach((e) => {
      if (!regularFeeMap.has(e.fee_settings_id)) {
        regularFeeMap.set(e.fee_settings_id, { monthIds: [], amounts: [] });
      }
      const entry = regularFeeMap.get(e.fee_settings_id)!;
      entry.monthIds.push(e.monthId);
      entry.amounts.push(e.amount);
    });

    let feeIndex = 0;
    const allRegularMonthIds = new Set<number>();
    regularFeeMap.forEach((val, fee_settings_id) => {
      bodyFormData.append(`fee[${feeIndex}][id]`, fee_settings_id);
      bodyFormData.append(
        `fee[${feeIndex}][fee_month]`,
        val.monthIds.join(","),
      );
      bodyFormData.append(`fee[${feeIndex}][amt]`, val.amounts.join(","));
      val.monthIds.forEach((m) => allRegularMonthIds.add(m));
      feeIndex++;
    });
    bodyFormData.append(
      "month_arr",
      Array.from(allRegularMonthIds)
        .sort((a, b) => a - b)
        .join(","),
    );

    // ── Bus fee ───────────────────────────────────────────────────────
    const busFees = editedAmounts.filter((e) => e.feeType === "busFee");

    const busFeeMap = new Map<
      string,
      { monthIds: number[]; amounts: number[] }
    >();
    busFees.forEach((e) => {
      if (!busFeeMap.has(e.fee_settings_id)) {
        busFeeMap.set(e.fee_settings_id, { monthIds: [], amounts: [] });
      }
      const entry = busFeeMap.get(e.fee_settings_id)!;
      entry.monthIds.push(e.monthId);
      entry.amounts.push(e.amount);
    });

    const allBusMonthIds = new Set<number>();
    let tFeeIndex = 0;
    busFeeMap.forEach((val, fee_settings_id) => {
      bodyFormData.append(
        `tfee[${tFeeIndex}][fee_month]`,
        val.monthIds.join(","),
      );
      bodyFormData.append(`tfee[${tFeeIndex}][amt]`, val.amounts.join(","));
      val.monthIds.forEach((m) => allBusMonthIds.add(m));
      tFeeIndex++;
    });
    bodyFormData.append(
      "tmonth_arr",
      Array.from(allBusMonthIds)
        .sort((a, b) => a - b)
        .join(","),
    );

    // ── Hostel fee ────────────────────────────────────────────────────
    const hostelFees = editedAmounts.filter((e) => e.feeType === "hostelFee");

    const hostelFeeMap = new Map<
      string,
      { monthIds: number[]; amounts: number[] }
    >();
    hostelFees.forEach((e) => {
      if (!hostelFeeMap.has(e.fee_settings_id)) {
        hostelFeeMap.set(e.fee_settings_id, { monthIds: [], amounts: [] });
      }
      const entry = hostelFeeMap.get(e.fee_settings_id)!;
      entry.monthIds.push(e.monthId);
      entry.amounts.push(e.amount);
    });

    const allHostelMonthIds = new Set<number>();
    let hFeeIndex = 0;
    hostelFeeMap.forEach((val, fee_settings_id) => {
      bodyFormData.append(
        `hfee[${hFeeIndex}][fee_settings_id]`,
        fee_settings_id,
      );
      bodyFormData.append(
        `hfee[${hFeeIndex}][fee_month]`,
        val.monthIds.join(","),
      );
      bodyFormData.append(`hfee[${hFeeIndex}][amt]`, val.amounts.join(","));
      val.monthIds.forEach((m) => allHostelMonthIds.add(m));
      hFeeIndex++;
    });
    bodyFormData.append(
      "hmonth_arr",
      Array.from(allHostelMonthIds)
        .sort((a, b) => a - b)
        .join(","),
    );
  };
  async function handlePayment() {
    try {
      setIsLoading(true);
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      let url = partialPayment ? PAY_FEES_PARTIAL : PAY_FEES;

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
      bodyFormData.append("fine", calculatedFine);
      bodyFormData.append("remarks", remarks);

      if (partialPayment) {
        // ── Partial payment: build fee[], tfee[], hfee[] from editedAmounts ──
        buildPartialPayload(bodyFormData);

        // Hostel settings ids (admission_fee, caution_deposit) — same as before
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
        bodyFormData.append(
          "efee",
          diaryFeeCombinedArray.length > 0 ? "1" : "0",
        );
        if (showDiscount) {
          bodyFormData.append("scholarship", feesData?.feeData?.scholarship);
        }
      } else {
        // ── Full payment: original payload untouched ──
        bodyFormData.append("month_arr", academicCombinedArray.toString());
        bodyFormData.append("tmonth_arr", busFeeCombinedArray.toString());
        bodyFormData.append("hmonth_arr", hostelFeeCombinedArray.toString());
        bodyFormData.append(
          "efee",
          diaryFeeCombinedArray.length > 0 ? "1" : "0",
        );
        bodyFormData.append(
          "admission_fee",
          admissionFeeCombinedArray.toString(),
        );
        bodyFormData.append(
          "caution_deposit",
          admissionFeeCombinedArray.toString(),
        );
        bodyFormData.append(
          "readmission",
          admissionFeeCombinedArray.toString(),
        );
        bodyFormData.append(
          "hostel_feesettings",
          feesData.hostel_details?.fee_settings_id || "",
        );
        if (showDiscount) {
          bodyFormData.append("scholarship", feesData?.feeData?.scholarship);
        }
      }

      // ── API call untouched ────────────────────────────────────────────
      let resp: any = await apiPost(url, bodyFormData);
      console.log("resp", resp.response.data);

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
    const feeDetails = feesData.rawData1;
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

            <div className="total-payment-wrapper">
              <div className="partial-payment-checkbox">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={partialPayment}
                    onChange={handlePartialPaymentChange}
                    title="Partial payment"
                  />
                  <span className="slider"></span>
                  <span className="tooltip">
                    Partial payment {partialPayment ? "on" : "off"}
                  </span>
                </label>
              </div>
            </div>
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

      <Modal
        show={show}
        onHide={handleClose}
        className="pay-modal-centered"
        centered
      >
        <div className="pay-modal-header">
          <Row>
            <Col md={8} className="pay-modal-student-info">
              <div className="pay-modal-avatar-wrap">
                <img
                  src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                  alt=""
                />
              </div>
              <div className="pay-modal-student-details">
                <span className="pay-modal-student-name">
                  {feesData.feeData.student_details?.name}
                </span>
                <p className="pay-modal-student-meta">
                  {feesData.feeData.student_details?.class +
                    " " +
                    feesData.feeData.student_details?.division}
                </p>
              </div>
              <div className="pay-modal-student-class">
                <span className="pay-modal-student-meta">
                  {feesData.feeData.student_details?.old_admission_no}
                </span>
                <div>
                  <span className="pay-modal-badge">
                    {feesData.feeData.student_details?.concession_type
                      ? feesData.feeData.student_details?.concession_type
                      : "No special privilage"}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <button className="pay-modal-close-btn" onClick={handleClose}>
                ×
              </button>
            </Col>
          </Row>
        </div>

        <Modal.Body className="pay-modal-body">
          {/* Scrollable wrapper for partial payment */}
          <div className="pay-modal-table-wrap">
            <table
              className="pay-modal-table"
              style={
                partialPayment
                  ? {
                      fontSize: "12px",
                      tableLayout: "auto",
                      minWidth: "max-content",
                    }
                  : {}
              }
            >
              <thead>
                {partialPayment ? (
                  <>
                    <tr>
                      <th
                        className="text-start pay-modal-sticky-col"
                        rowSpan={2}
                        style={{ minWidth: "110px" }}
                      >
                        Fee Head
                      </th>
                      {allMonths.map((monthId) => (
                        <th
                          key={monthId}
                          colSpan={2}
                          className="text-center"
                          style={{
                            borderLeft: "1px solid #dee2e6",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {MONTH_NAMES[monthId]}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {allMonths.map((monthId) => (
                        <React.Fragment key={monthId}>
                          <th
                            className="text-center"
                            style={{
                              borderLeft: "1px solid #dee2e6",
                              fontWeight: 400,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Amt
                          </th>
                          <th
                            className="text-center"
                            style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                          >
                            Custom
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th className="text-start">Fee Head</th>
                    <th>Amount</th>
                  </tr>
                )}
              </thead>

              {partialPayment ? (
                <tbody>
                  {/* rawData1–6 rows */}
                  {RAW_DATA_KEYS.map(({ key, nameKey }) => {
                    const dataArray: any[] = feesData[key] ?? [];
                    if (dataArray.length === 0) return null;

                    const monthMap: { [monthId: number]: any } = {};
                    dataArray.forEach((item: any) => {
                      monthMap[item.monthId] = item;
                    });

                    return (
                      <tr key={key}>
                        <td
                          className="pay-modal-sticky-col"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {feesData[nameKey]}
                        </td>
                        {allMonths.map((monthId) => {
                          const item = monthMap[monthId];
                          const stateKey = `${key}_${monthId}`;
                          return (
                            <React.Fragment key={monthId}>
                              <td
                                className="text-center"
                                style={{ borderLeft: "1px solid #dee2e6" }}
                              >
                                {item ? item.amount : "-"}
                              </td>
                              <td className="text-center">
                                {item ? (
                                  <input
                                    key={`${item.fee_settings_id}_${item.monthId}`}
                                    type="number"
                                    className="fee-input"
                                    value={
                                      partialCustomAmounts[stateKey] ??
                                      parseFloat(item.amount)
                                    }
                                    max={parseFloat(item.amount)}
                                    min={0}
                                    style={{ width: "70px" }}
                                    onChange={(e: any) => {
                                      const raw = e.target.value;
                                      const parsed =
                                        raw === "" ? 0 : parseFloat(raw);
                                      handlePartialAmountChange(
                                        stateKey,
                                        parsed,
                                        parseFloat(item.amount),
                                        item.fee_settings_id,
                                        item.monthId,
                                        key,
                                      );
                                    }}
                                    onInput={(e: any) => {
                                      if (
                                        parseFloat(e.target.value) >
                                        parseFloat(item.amount)
                                      ) {
                                        e.target.value = item.amount;
                                      }
                                    }}
                                  />
                                ) : (
                                  "-"
                                )}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Bus Fee row */}
                  {feesData.busFee?.length > 0 &&
                    (() => {
                      const busMonthMap: { [monthId: number]: any } = {};
                      feesData.busFee.forEach((item: any) => {
                        busMonthMap[item.monthId] = item;
                      });
                      return (
                        <tr>
                          <td
                            className="pay-modal-sticky-col"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {feesData.busFeeName || "Bus Fee"}
                          </td>
                          {allMonths.map((monthId) => {
                            const item = busMonthMap[monthId];
                            const stateKey = `busFee_${monthId}`;
                            return (
                              <React.Fragment key={monthId}>
                                <td
                                  className="text-center"
                                  style={{ borderLeft: "1px solid #dee2e6" }}
                                >
                                  {item ? item.amount : "-"}
                                </td>
                                <td className="text-center">
                                  {item ? (
                                    <input
                                      key={`busFee_${item.fee_settings_id}_${item.monthId}`}
                                      type="number"
                                      className="fee-input"
                                      value={
                                        partialCustomAmounts[stateKey] ??
                                        parseFloat(item.amount)
                                      }
                                      max={parseFloat(item.amount)}
                                      min={0}
                                      style={{ width: "70px" }}
                                      onChange={(e: any) => {
                                        const raw = e.target.value;
                                        const parsed =
                                          raw === "" ? 0 : parseFloat(raw);
                                        handlePartialAmountChange(
                                          stateKey,
                                          parsed,
                                          parseFloat(item.amount),
                                          item.fee_settings_id,
                                          item.monthId,
                                          "busFee",
                                        );
                                      }}
                                      onInput={(e: any) => {
                                        if (
                                          parseFloat(e.target.value) >
                                          parseFloat(item.amount)
                                        ) {
                                          e.target.value = item.amount;
                                        }
                                      }}
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })()}

                  {/* Hostel Fee row */}
                  {feesData.hostelFee?.length > 0 &&
                    (() => {
                      const hostelMonthMap: { [monthId: number]: any } = {};
                      feesData.hostelFee.forEach((item: any) => {
                        hostelMonthMap[item.monthId] = item;
                      });
                      return (
                        <tr>
                          <td
                            className="pay-modal-sticky-col"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {feesData.hostelFeeName || "Hostel Fee"}
                          </td>
                          {allMonths.map((monthId) => {
                            const item = hostelMonthMap[monthId];
                            const stateKey = `hostelFee_${monthId}`;
                            return (
                              <React.Fragment key={monthId}>
                                <td
                                  className="text-center"
                                  style={{ borderLeft: "1px solid #dee2e6" }}
                                >
                                  {item ? item.amount : "-"}
                                </td>
                                <td className="text-center">
                                  {item ? (
                                    <input
                                      key={`hostelFee_${item.fee_settings_id}_${item.monthId}`}
                                      type="number"
                                      className="fee-input"
                                      value={
                                        partialCustomAmounts[stateKey] ??
                                        parseFloat(item.amount)
                                      }
                                      max={parseFloat(item.amount)}
                                      min={0}
                                      style={{ width: "70px" }}
                                      onChange={(e: any) => {
                                        console.log("item",item);
                                        
                                        const raw = e.target.value;
                                        const parsed =
                                          raw === "" ? 0 : parseFloat(raw);
                                        handlePartialAmountChange(
                                          stateKey,
                                          parsed,
                                          parseFloat(item.amount),
                                          item.fee_settings_id,
                                          item.monthId,
                                          "hostelFee",
                                        );
                                      }}
                                      onInput={(e: any) => {
                                        if (
                                          parseFloat(e.target.value) >
                                          parseFloat(item.amount)
                                        ) {
                                          e.target.value = item.amount;
                                        }
                                      }}
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })()}

                  {/* Fine */}
                  {parseFloat(calculatedFine) > 0 && (
                    <tr>
                      <td className="pay-modal-sticky-col">Fine</td>
                      {allMonths.map((monthId, idx) => (
                        <React.Fragment key={monthId}>
                          <td
                            className="text-center"
                            style={{ borderLeft: "1px solid #dee2e6" }}
                          >
                            {idx === 0 ? calculatedFine : "-"}
                          </td>
                          <td className="text-center">
                            {idx === 0 ? calculatedFine : "-"}
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  )}

                  {/* Total row */}
                  <tr className="pay-modal-total-row">
                    <td className="pay-modal-sticky-col">Total</td>
                    {allMonths.map((monthId) => (
                      <React.Fragment key={monthId}>
                        <td
                          className="text-center"
                          style={{ borderLeft: "1px solid #dee2e6" }}
                        >
                          {monthOriginalTotals[monthId] ?? 0}
                        </td>
                        <td className="text-center">
                          {monthPartialTotals[monthId] ?? 0}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                  {/* Grand Total row — sum of all custom amounts across all months */}
                  <tr>
                    <td
                      className="bold"
                      style={{
                        position: "sticky",
                        left: 0,
                        background: "#fff",
                        zIndex: 1,
                      }}
                    >
                      Grand Total
                    </td>
                    <td
                      className="text-center bold"
                      colSpan={allMonths.length * 2}
                      style={{ borderLeft: "1px solid #dee2e6" }}
                    >
                      {Object.values(partialCustomAmounts).reduce(
                        (sum, val) => sum + (isNaN(val) ? 0 : val),
                        0,
                      )}
                    </td>
                  </tr>
                </tbody>
              ) : (
                /* ── NORMAL MODE ── */
                <tbody>
                  {feesData.rawData1.length > 0 && (
                    <tr>
                      <td>{feesData.rawName1}</td>
                      <td className="text-center">{feesData.rawSum1}</td>
                    </tr>
                  )}
                  {feesData.rawData2.length > 0 && (
                    <tr>
                      <td>{feesData.rawName2}</td>
                      <td className="text-center">{feesData.rawSum2}</td>
                    </tr>
                  )}
                  {feesData.rawData3.length > 0 && (
                    <tr>
                      <td>{feesData.rawName3}</td>
                      <td className="text-center">{feesData.rawSum3}</td>
                    </tr>
                  )}
                  {feesData.rawData4.length > 0 && (
                    <tr>
                      <td>{feesData.rawName4}</td>
                      <td className="text-center">{feesData.rawSum4}</td>
                    </tr>
                  )}
                  {feesData.rawData5.length > 0 && (
                    <tr>
                      <td>{feesData.rawName5}</td>
                      <td className="text-center">{feesData.rawSum5}</td>
                    </tr>
                  )}
                  {feesData.rawData6.length > 0 && (
                    <tr>
                      <td>{feesData.rawName6}</td>
                      <td className="text-center">{feesData.rawSum6}</td>
                    </tr>
                  )}
                  {feesData.busFee.length > 0 && (
                    <tr>
                      <td>{feesData.busFeeName}</td>
                      <td className="text-center">{feesData.rawBusSum}</td>
                    </tr>
                  )}
                  {feesData.hostelFee.length > 0 && (
                    <tr>
                      <td>{feesData.hostelFeeName}</td>
                      <td className="text-center">{feesData.hostelSum}</td>
                    </tr>
                  )}
                  {feesData.admissionFeeRaw.length > 0 && (
                    <tr>
                      <td>{feesData.admissionFeeName}</td>
                      <td className="text-center">
                        {feesData.admissionFeeSum}
                      </td>
                    </tr>
                  )}
                  {feesData.cautionDepositRaw.length > 0 && (
                    <tr>
                      <td>{feesData.cautionDepositName}</td>
                      <td className="text-center">
                        {feesData.cautionDepositSum}
                      </td>
                    </tr>
                  )}
                  {feesData.diaryFee.length > 0 &&
                    feesData.diaryFee.map((item: any) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.amount}</td>
                      </tr>
                    ))}
                  {parseFloat(calculatedFine) >= 0 && (
                    <tr>
                      <td>Fine</td>
                      <td className="text-center">{calculatedFine}</td>
                    </tr>
                  )}
                  {/* {feesData?.feeData?.scholarship && showDiscount && (
                    <tr>
                      <td>Discount</td>
                      <td className="text-center">
                        {parseInt(feesData?.feeData?.scholarship)}sdfsdfsdf
                      </td>
                    </tr>
                  )} */}
                  <tr className="pay-modal-total-row">
                    <td>Total</td>
                    <td className="text-center">{totalPayment}</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {/* Payment Method */}
          <Row>
            <Col md={12}>
              <div className="pay-modal-method-row">
                <label className="pay-modal-method-option">
                  <input
                    type="radio"
                    name="pay"
                    value="1"
                    onChange={handleChange}
                    checked={isRadio === 1}
                  />
                  Cash
                </label>
                <label className="pay-modal-method-option">
                  <input
                    type="radio"
                    name="pay"
                    value="2"
                    onChange={handleChange}
                    checked={isRadio === 2}
                  />
                  Card
                </label>
                <label className="pay-modal-method-option">
                  <input
                    type="radio"
                    name="pay"
                    value="5"
                    onChange={handleChange}
                    checked={isRadio === 5}
                  />
                  Bank
                </label>
                <label className="pay-modal-method-option">
                  <input
                    type="radio"
                    name="pay"
                    value="6"
                    onChange={handleChange}
                    checked={isRadio === 6}
                  />
                  Adv.Fee
                </label>
              </div>
            </Col>
          </Row>

          {/* Reference input */}
          {paymentMethod !== "" &&
            paymentMethod !== "cash" &&
            paymentMethod !== "Adv.Fee" && (
              <Row>
                <Col md={12}>
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
                    className="pay-modal-ref-input"
                    onChange={handlePaymentInput}
                  />
                </Col>
              </Row>
            )}

          {/* Remarks */}
          <Row>
            <Col md={12}>
              <textarea
                rows={4}
                placeholder="Remarks"
                className="pay-modal-remarks"
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Col>
          </Row>

          {/* Submit */}
          <Row className="mt-4">
            <Col md={12} className="text-center">
              <button
                role="button"
                onClick={handlePayment}
                disabled={isLoading}
                className="pay-modal-submit-btn"
              >
                <span>Pay</span>
              </button>
            </Col>
          </Row>
        </Modal.Body>
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
