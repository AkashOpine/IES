import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FeeTile from "./feeTile";
import {
  setRawData1,
  setRawData2,
  setRawData3,
  setRawData4,
  calculateTotal,
  setColumnTable,
  setBusFee,
  setHostelFee,
  setRawData5,
  setAdmissionFeeRaw,
  setCautionDepositRaw,
  setDiaryFee,
  setRawData6,
  academicArray,
  admissionFeeArray,
  busFeeArray,
  cautionDepositArray,
  diaryFeeArray,
  hostelFeeArray,
  setCalculatedFine,
} from "../../slices/feetable/feeTableSlice";
import { monthDetails, tableFeeData } from "./dummydata/data";
import BusFeeTile from "./BusFeeTile";
import HostelFeeTile from "./HostalFeeTile";
import { FaBus, FaBusAlt } from "react-icons/fa";
import AdmissionFeeTile from "./AdmissionFeeTile";
import CautionDepositTile from "./CautionDepositeTile";
import DiaryFeeTile from "./DiaryFeeTile";
import { handleCalculateFine } from "../../components/checkFineApi";
function TableDetails() {
  const feesData: any = useSelector((state: any) => state.feeTable);
  const academicCombinedArray: any = useSelector(academicArray);
  const busFeeCombinedArray: any = useSelector(busFeeArray);
  const hostelFeeCombinedArray: any = useSelector(hostelFeeArray);
  const admissionFeeCombinedArray: any = useSelector(admissionFeeArray);
  const cautionDepositeCombinedArray: any = useSelector(cautionDepositArray);
  const diaryFeeCombinedArray: any = useSelector(diaryFeeArray);
  const loginTypeId = localStorage.getItem("roleId");
  const dispatch = useDispatch();

  const [tableRow1, setTableRow1]: any = useState([]);
  const [tableRow2, setTableRow2]: any = useState([]);
  const [tableRow3, setTableRow3]: any = useState([]);
  const [tableRow4, setTableRow4]: any = useState([]);
  const [tableRow5, setTableRow5]: any = useState([]);
  const [tableRow6, setTableRow6]: any = useState([]);
  const [hostelrow, setHostelRow]: any = useState([]);
  const [busFeeRow, setBusFeeRow]: any = useState([]);
  const [admissionFeeRow, setAdmissionFeeRow]: any = useState([]);
  const [cautionDepositRow, setCautionDepositRow]: any = useState([]);
  const [diaryFeeRow, setDiaryFeeRow]: any = useState([]);
  const [diaryFeeRow1, setDiaryFeeRow1]: any = useState([]);
  const [diaryFeeRow2, setDiaryFeeRow2]: any = useState([]);
  const [tableRowName1, settableRowName1]: any = useState("");
  const [tableRowName2, settableRowName2]: any = useState("");
  const [tableRowName3, settableRowName3]: any = useState("");
  const [tableRowName4, settableRowName4]: any = useState("");
  const [tableRowName5, settableRowName5]: any = useState("");
  const [tableRowName6, settableRowName6]: any = useState("");
  const [busFeeName, setBusFeeName]: any = useState("");
  const [diaryFeeName, setDiaryFeeName]: any = useState("");
  const [diaryFeeName1, setDiaryFeeName1]: any = useState("");
  const [diaryFeeName2, setDiaryFeeName2]: any = useState("");
  const [hostalFeeName, setHostalFeeName]: any = useState("");
  const [admissionFeeName, setAdmissionFeeName]: any = useState("");
  const [cautionDepositName, setCautionDepositeName]: any = useState("");
  const [disabledCheckbox, setDisabledCheckbox]: any = useState(false);

  const isSeniorClass =
    feesData?.feeData?.student_details?.class === "XI" ||
    feesData?.feeData?.student_details?.class === "XII";

  const filteredMonthDetails = isSeniorClass
    ? monthDetails // show everything
    : monthDetails.filter((m) => m.month_id !== 13 && m.month_id !== 14);

  

  const setAllDatas = () => {
    let table = tableFeeData;
    let tablerow1: Array<Object> = [];

    let tablerow2: Array<Object> = [];
    let tablerow3: Array<Object> = [];
    let tablerow4: Array<Object> = [];
    let tablerow5: Array<Object> = [];
    let tablerow6: Array<Object> = [];
    let hostelrow: Array<Object> = [];
    let busFeeRow: Array<Object> = [];
    let admissionFeeRow: Array<Object> = [];
    let cautionDepositRow: Array<Object> = [];
    let diaryFeeTableRow: Array<Object> = [];
    let diaryFeeTableRow1: Array<Object> = [];
    let diaryFeeTableRow2: Array<Object> = [];

    if (feesData.feeData.fee_details) {
      settableRowName1(feesData.feeData.fee_details[0]?.dlbFeeheadName);
      settableRowName2(feesData.feeData.fee_details[1]?.dlbFeeheadName);
      settableRowName3(feesData.feeData.fee_details[2]?.dlbFeeheadName);
      settableRowName4(feesData.feeData.fee_details[3]?.dlbFeeheadName);
      settableRowName5(feesData.feeData.fee_details[4]?.dlbFeeheadName);
      settableRowName6(feesData.feeData.fee_details[5]?.dlbFeeheadName);
      tablerow1 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[0]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      tablerow2 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[1]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      tablerow3 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[2]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );

      tablerow4 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[3]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      tablerow5 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[4]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      tablerow6 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[5]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setTableRow1(tablerow1);
      setTableRow2(tablerow2);
      setTableRow3(tablerow3);
      setTableRow4(tablerow4);
      setTableRow5(tablerow5);
      setTableRow6(tablerow6);
    }
    if (feesData.feeData.transport_details) {
      setBusFeeName(feesData.feeData.transport_details?.dlbFeeheadName);
      busFeeRow = table?.map(
        (obj: any) =>
          feesData.feeData.transport_details?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setBusFeeRow(busFeeRow);
    }

    if (feesData.feeData.hostel_details) {
      // setHostalFeeName(feesData.feeData.hostel_details?.feehead_name);
      setHostalFeeName(feesData.feeData.hostel_details[0]?.feehead_name);
      setAdmissionFeeName(feesData.feeData.hostel_details[1]?.feehead_name);
      setCautionDepositeName(feesData.feeData.hostel_details[2]?.feehead_name);
      hostelrow = table?.map(
        (obj: any) =>
          feesData.feeData.hostel_details[0]?.hostel_fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      admissionFeeRow = table?.map(
        (obj: any) =>
          feesData.feeData.hostel_details[1]?.hostel_fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      cautionDepositRow = table?.map(
        (obj: any) =>
          feesData.feeData.hostel_details[2]?.hostel_fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setHostelRow(hostelrow);
      setAdmissionFeeRow(admissionFeeRow);
      setCautionDepositRow(cautionDepositRow);
    }
    if (feesData.feeData.efee_details) {
      setDiaryFeeName(feesData.feeData.efee_details[0]?.dlbFeeheadName);
      diaryFeeTableRow = table?.map(
        (obj: any) =>
          feesData.feeData.efee_details[0]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setDiaryFeeRow(diaryFeeTableRow);
      setDiaryFeeName1(feesData.feeData.efee_details[1]?.dlbFeeheadName);
      diaryFeeTableRow1 = table?.map(
        (obj: any) =>
          feesData.feeData.efee_details[1]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setDiaryFeeRow1(diaryFeeTableRow1);
      setDiaryFeeName2(feesData.feeData.efee_details[2]?.dlbFeeheadName);
      diaryFeeTableRow2 = table?.map(
        (obj: any) =>
          feesData.feeData.efee_details[2]?.fee?.find(
            (o: any) => o.month_id === obj.month_id,
          ) || obj,
      );
      setDiaryFeeRow2(diaryFeeTableRow2);
    }
  };

  const [checkedState, setCheckedState] = useState(
    new Array(filteredMonthDetails.length).fill(false),
  );
  const [selectedMonth, setSelectedMonth]: any = useState([]);
  const handleOnChange = (name: string, position: number) => {
    dispatch(setColumnTable(name));
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );

    setCheckedState(updatedCheckedState);
  };

  // useEffect(() => {
  //   const {
  //     0: detail1,
  //     1: detail2,
  //     2: detail3,
  //   } = feesData?.feeData?.efee_details || {};
  //   if (detail1) {
  //     var data = {
  //       id: `${diaryFeeName}${detail1.month_name}`,
  //       name: diaryFeeName,
  //       amount: detail1.bal_to_be_paid,
  //       month_name: detail1.month_name,
  //       isSelected: true,
  //       monthId: detail1.month_id,
  //       fine: detail1.fine,
  //     };
  //     dispatch(setDiaryFee(data));
  //   }
  //   if (detail2) {
  //     var data = {
  //       id: `${diaryFeeName1}${detail2.month_name}`,
  //       name: diaryFeeName1,
  //       amount: detail2.bal_to_be_paid,
  //       month_name: detail2.month_name,
  //       isSelected: true,
  //       monthId: detail2.month_id,
  //       fine: detail2.fine,
  //     };
  //     dispatch(setDiaryFee(data));
  //   }
  //   if (detail3) {
  //     var data = {
  //       id: `${diaryFeeName2}${detail3.month_name}`,
  //       name: diaryFeeName2,
  //       amount: detail3.bal_to_be_paid,
  //       month_name: detail3.month_name,
  //       isSelected: true,
  //       monthId: detail3.month_id,
  //       fine: detail3.fine,
  //     };
  //     dispatch(setDiaryFee(data));
  //   }
  //   if (detail1 || detail2 || detail3) {
  //     dispatch(calculateTotal());
  //   }
  // }, [
  //   feesData?.feeData?.efee_details,
  //   diaryFeeName,
  //   diaryFeeName1,
  //   diaryFeeName2,
  // ]);

  useEffect(() => {
    setCheckedState(new Array(filteredMonthDetails.length).fill(false));
  }, [feesData.feeData?.student_details?.student_id]);
  useEffect(() => {
    setAllDatas();
  }, [checkedState, feesData]);
useEffect(() => {
    console.log("busFeeRow", busFeeRow);
  }, [busFeeRow]);
  // useEffect(() => {
  //   if (loginTypeId !== "5") {
  //     setDisabledCheckbox(true);
  //   } else if (
  //     feesData?.feeData?.efee_details?.[0]?.fee?.[0]?.status === "Pending" ||
  //     feesData?.feeData?.efee_details?.[0]?.fee?.[0]?.status === "Due"
  //   ) {
  //     setDisabledCheckbox(true);
  //   } else if (feesData?.feeData?.efee_details?.[1]) {
  //     if (
  //       feesData?.feeData?.efee_details?.[1]?.fee?.[1]?.status === "Pending" ||
  //       feesData?.feeData?.efee_details?.[1]?.fee?.[0]?.status === "Due"
  //     ) {
  //       setDisabledCheckbox(true);
  //     }
  //   } else if (feesData?.feeData?.efee_details?.[2]) {
  //     if (
  //       feesData?.feeData?.efee_details?.[2]?.fee?.[1]?.status === "Pending" ||
  //       feesData?.feeData?.efee_details?.[2]?.fee?.[0]?.status === "Due"
  //     ) {
  //       setDisabledCheckbox(true);
  //     }
  //   } else {
  //     setDisabledCheckbox(false);
  //   }
  // }, [feesData?.feeData?.efee_details]);

  useEffect(() => {
    handleCalculateFine(
      feesData,
      academicCombinedArray,
      busFeeCombinedArray,
      hostelFeeCombinedArray,
      diaryFeeCombinedArray,
    ).then((value) => dispatch(setCalculatedFine(value)));
  }, [
    checkedState,
    feesData,
    academicCombinedArray,
    busFeeCombinedArray,
    hostelFeeCombinedArray,
    diaryFeeCombinedArray,
  ]);
  return (
    <Row>
      <Col md={12} className="mt-4">
        <table className="table table-responsive">
          <thead className="table-head">
            <tr>
              <th className=" text-start bold">Fee Heads</th>
              {filteredMonthDetails?.map((month: any, index) => {
                return (
                  <th className="text-center" key={month.month_id}>
                    <div className="d-grid">
                      <span className="mb-2">{month.month}</span>
                      <input
                        type="checkbox"
                        name={month.month}
                        checked={checkedState[index]}
                        onChange={(e) => handleOnChange(e.target.name, index)}
                        disabled={
                          loginTypeId !== "5"
                          // || disabledCheckbox
                          //  ||
                          // feesData.feeData?.efee_details?.[0].fee?.[0]
                          //   .status === "Pending" ||
                          // feesData.feeData?.efee_details?.[0].fee?.[0]
                          //   .status === "Due"
                        }
                      />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {feesData.feeData.fee_details ? (
            <tbody>
              {feesData.feeData.efee_details[0] ? (
                <tr>
                  <td className="bold "> {diaryFeeName}</td>
                  {diaryFeeRow?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <DiaryFeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={diaryFeeName}
                          handleClick={setDiaryFee}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                          isCheckedByDefault
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : null}
              {feesData.feeData.efee_details[1] ? (
                <tr>
                  <td className="bold "> {diaryFeeName1}</td>
                  {diaryFeeRow1?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <DiaryFeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={diaryFeeName1}
                          handleClick={setDiaryFee}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                          isCheckedByDefault
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : null}
              {feesData.feeData.efee_details[2] ? (
                <tr>
                  <td className="bold "> {diaryFeeName2}</td>
                  {diaryFeeRow2?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <DiaryFeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={diaryFeeName2}
                          handleClick={setDiaryFee}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                          isCheckedByDefault
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {/* {feesData.feeData.fee_details[0] ? (
                <tr>
                  <td className="bold ">{tableRowName1}</td>
                  {tableRow1?.map((item: any, index: number) => {
                    return (
                      <td key={item.month_id}>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName1}
                          handleClick={setRawData1}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )} */}
              {feesData.feeData.fee_details[0] ? (
                <tr>
                  <td className="bold ">{tableRowName1}</td>
                  {tableRow1?.map((item: any, index: number) => {
                    return (
                      <td key={item.month_id}>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName1}
                          handleClick={setRawData1}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}

              {feesData.feeData.fee_details[1] ? (
                <tr>
                  <td className="bold ">{tableRowName2}</td>
                  {tableRow2.map((item: any, index: number) => {
                    return (
                      <td>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName2}
                          handleClick={setRawData2}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}

              {feesData.feeData.fee_details[2] ? (
                <tr>
                  <td className="bold ">{tableRowName3}</td>
                  {tableRow3.map((item: any, index: number) => {
                    return (
                      <td>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName3}
                          handleClick={setRawData3}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}

              {feesData.feeData.fee_details[3] ? (
                <tr>
                  <td className="bold ">{tableRowName4}</td>
                  {tableRow4.map((item: any, index: number) => {
                    return (
                      <td>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName4}
                          handleClick={setRawData4}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {feesData.feeData.fee_details[4] ? (
                <tr>
                  <td className="bold ">{tableRowName5}</td>
                  {tableRow5.map((item: any, index: number) => {
                    return (
                      <td>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName5}
                          handleClick={setRawData5}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {feesData.feeData.fee_details[5] ? (
                <tr>
                  <td className="bold ">{tableRowName6}</td>
                  {tableRow6.map((item: any, index: number) => {
                    return (
                      <td>
                        <FeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={tableRowName6}
                          handleClick={setRawData6}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {Object.keys(feesData.feeData.transport_details).length ? (
                <tr>
                  <td className="bold "> {busFeeName}</td>
                  {busFeeRow.map((item: any, index: number) => {
                    return (
                      <td>
                        <BusFeeTile
                          data={item}
                          monthId={item.month_id}
                          checkedStatus={checkedState[index]}
                          month={item.month_name}
                          rowName={busFeeName}
                          handleClick={setBusFee}
                          status={item.status}
                          amount={item.amt}
                          amount_to_be_paid={item.bal_to_be_paid}
                          calculateTotal={calculateTotal}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {feesData.feeData.hostel_details[0] ? (
                <>
                  <tr>
                    <td className="bold "> {hostalFeeName}</td>
                    {hostelrow?.map((item: any, index: number) => {
                      return (
                        <td>
                          <HostelFeeTile
                            data={item}
                            monthId={item.month_id}
                            checkedStatus={checkedState[index]}
                            month={item.month_name}
                            rowName={hostalFeeName}
                            handleClick={setHostelFee}
                            status={item.status}
                            amount={item.amt}
                            amount_to_be_paid={item.bal_to_be_paid}
                            calculateTotal={calculateTotal}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </>
              ) : (
                ""
              )}
              {feesData.feeData.hostel_details[1] ? (
                <>
                  <tr>
                    <td className="bold "> {admissionFeeName}</td>
                    {admissionFeeRow?.map((item: any, index: number) => {
                      return (
                        <td>
                          <AdmissionFeeTile
                            data={item}
                            monthId={item.month_id}
                            checkedStatus={checkedState[index]}
                            month={item.month_name}
                            rowName={admissionFeeName}
                            handleClick={setAdmissionFeeRaw}
                            status={item.status}
                            amount={item.amt}
                            amount_to_be_paid={item.bal_to_be_paid}
                            calculateTotal={calculateTotal}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </>
              ) : (
                ""
              )}
              {feesData.feeData.hostel_details[2] ? (
                <>
                  <tr>
                    <td className="bold "> {cautionDepositName}</td>
                    {cautionDepositRow?.map((item: any, index: number) => {
                      return (
                        <td>
                          <CautionDepositTile
                            data={item}
                            monthId={item.month_id}
                            checkedStatus={checkedState[index]}
                            month={item.month_name}
                            rowName={cautionDepositName}
                            handleClick={setCautionDepositRaw}
                            status={item.status}
                            amount={item.amt}
                            amount_to_be_paid={item.bal_to_be_paid}
                            calculateTotal={calculateTotal}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </>
              ) : (
                ""
              )}
            </tbody>
          ) : (
            ""
          )}
        </table>
      </Col>
      <Col
        md={12}
        className={
          feesData.feeData.transport_details?.route_name
            ? "transportDetail"
            : "d-none"
        }
      >
        <div className="transportDetailItem">
          <div className="transportDetailItemLeft">
            <div className="icon">
              <FaBus size="20" color="white" />
            </div>
            <span>{feesData.feeData.transport_details?.route_name}</span>
          </div>
          <div className="transportDetailItemRight">
            <span>Pick up :</span>
            <span>{feesData.feeData.transport_details?.pick_up}</span>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default TableDetails;
