import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumnTable,
  academicArray,
  admissionFeeArray,
  busFeeArray,
  cautionDepositArray,
  diaryFeeArray,
  hostelFeeArray,
  setCalculatedFine,
} from "../../slices/feetable/feeTableSlice";
import { monthDetails, tableFeeData } from "./dummydata/data";
import { handleCalculateFine } from "../../components/checkFineApi";
function TableDetailsConcession() {
  const feesData: any = useSelector((state: any) => state.feeTable);
  const academicCombinedArray: any = useSelector(academicArray);
  const busFeeCombinedArray: any = useSelector(busFeeArray);
  const hostelFeeCombinedArray: any = useSelector(hostelFeeArray);
  const diaryFeeCombinedArray: any = useSelector(diaryFeeArray);
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
  const [selection, setSelection] = useState<number>(1); // 1 for Amount, 0 for Percentage
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0); // To store total amount or calculated amount from percentage
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
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      tablerow2 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[1]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      tablerow3 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[2]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );

      tablerow4 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[3]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      tablerow5 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[4]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      tablerow6 = table?.map(
        (obj: any) =>
          feesData.feeData.fee_details[5]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
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
            (o: any) => o.month_id === obj.month_id
          ) || obj
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
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      admissionFeeRow = table?.map(
        (obj: any) =>
          feesData.feeData.hostel_details[1]?.hostel_fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      cautionDepositRow = table?.map(
        (obj: any) =>
          feesData.feeData.hostel_details[2]?.hostel_fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
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
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      setDiaryFeeRow(diaryFeeTableRow);
      setDiaryFeeName1(feesData.feeData.efee_details[1]?.dlbFeeheadName);
      diaryFeeTableRow1 = table?.map(
        (obj: any) =>
          feesData.feeData.efee_details[1]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      setDiaryFeeRow1(diaryFeeTableRow1);
      setDiaryFeeName2(feesData.feeData.efee_details[2]?.dlbFeeheadName);
      diaryFeeTableRow2 = table?.map(
        (obj: any) =>
          feesData.feeData.efee_details[2]?.fee?.find(
            (o: any) => o.month_id === obj.month_id
          ) || obj
      );
      setDiaryFeeRow2(diaryFeeTableRow2);
    }
  };
  const [checkedState, setCheckedState] = useState(
    new Array(monthDetails.length).fill(false)
  );
  const handleOnChange = (name: string, position: number) => {
    dispatch(setColumnTable(name));
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  useEffect(() => {
    setCheckedState(new Array(monthDetails.length).fill(false));
  }, [feesData.feeData?.student_details?.student_id]);
  useEffect(() => {
    setAllDatas();
  }, [checkedState, feesData]);

  useEffect(() => {
    handleCalculateFine(
      feesData,
      academicCombinedArray,
      busFeeCombinedArray,
      hostelFeeCombinedArray,
      diaryFeeCombinedArray
    ).then((value) => dispatch(setCalculatedFine(value)));
  }, [
    checkedState,
    feesData,
    academicCombinedArray,
    busFeeCombinedArray,
    hostelFeeCombinedArray,
    diaryFeeCombinedArray,
  ]);
  const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(Number(e.target.value));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (selection === 0) {
      let calculatedTotal = 0;
      Object.keys(inputValues).forEach((key) => {
        const percentageValue = inputValues[key];
        const baseAmount = 1000;
        calculatedTotal += (percentageValue / 100) * baseAmount;
      });
      setTotalAmount(calculatedTotal);
    } else {
      const total = Object.values(inputValues).reduce(
        (acc, curr) => acc + curr,
        0
      );
      setTotalAmount(total);
    }
  }, [inputValues, selection]);
  return (
    <Row>
      <div className="text-start bold my-3">
        <span>Concession Amount</span>
      </div>
      <Col
        md={12}
        className="m-4"
        style={{ maxWidth: "98%", overflowX: "auto" }}
      >
        {/* <div className="d-flex align-center gap-3 text-start bold mb-3">
          <label>
            <input
              type="radio"
              name="selection"
              value={1}
              checked={selection === 1}
              onChange={handleSelectionChange}
            />{" "}
            Concession Amount
          </label>
          <label>
            <input
              type="radio"
              name="selection"
              value={0}
              checked={selection === 0}
              onChange={handleSelectionChange}
            />{" "}
            Concession Percentage
          </label>
        </div> */}
        <table className="table table-responsive">
          <thead className="table-head">
            <tr>
              <th className=" text-start bold">Fee Heads</th>
              {monthDetails?.map((month: any, index) => {
                return (
                  <th className="text-center" key={month.month_id}>
                    <div className="d-grid">
                      <span className="mb-2">{month.month}</span>
                      <input
                        type="checkbox"
                        name={month.month}
                        checked={checkedState[index]}
                        onChange={(e) => handleOnChange(e.target.name, index)}
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
                  <td className="bold">
                    <label htmlFor="diaryFeeName">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="diaryFeeName"
                      />
                      {diaryFeeName}
                    </label>
                  </td>
                  {diaryFeeRow?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : null}
              {feesData.feeData.efee_details[1] ? (
                <tr>
                  <td className="bold">
                    <label htmlFor="diaryFeeName1">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="diaryFeeName1"
                      />
                      {diaryFeeName1}
                    </label>
                  </td>
                  {diaryFeeRow1?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : null}
              {feesData.feeData.efee_details[2] ? (
                <tr>
                  <td className="bold">
                    <label htmlFor="diaryFeeName2">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="diaryFeeName2"
                      />
                      {diaryFeeName2}
                    </label>
                  </td>
                  {diaryFeeRow2?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <td key={item.fee_settings_id}>
                          <input
                            type="text"
                            className="concession-input"
                            value={parseFloat(item.amt || 0)}
                          />
                        </td>
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {feesData.feeData.fee_details[0] ? (
                <tr>
                  <td className="bold">
                    <label htmlFor="tableRowName1">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName1"
                      />
                      {tableRowName1}
                    </label>
                  </td>
                  {tableRow1?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="tableRowName2">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName2"
                      />
                      {tableRowName2}
                    </label>
                  </td>
                  {tableRow2.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="tableRowName3">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName3"
                      />
                      {tableRowName3}
                    </label>
                  </td>
                  {tableRow3.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="tableRowName4">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName4"
                      />
                      {tableRowName4}
                    </label>
                  </td>
                  {tableRow4.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="tableRowName5">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName5"
                      />
                      {tableRowName5}
                    </label>
                  </td>
                  {tableRow5.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="tableRowName6">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="tableRowName6"
                      />
                      {tableRowName6}
                    </label>
                  </td>
                  {tableRow6.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                  <td className="bold">
                    <label htmlFor="busFeeName">
                      <input type="checkbox" className="mx-1" id="busFeeName" />
                      {busFeeName}
                    </label>
                  </td>
                  {busFeeRow.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
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
                    <td className="bold">
                      <label htmlFor="hostalFeeName">
                        <input
                          type="checkbox"
                          className="mx-1"
                          id="hostalFeeName"
                        />
                        {hostalFeeName}
                      </label>
                    </td>
                    {hostelrow?.map((item: any, index: number) => {
                      return (
                        <td key={item.fee_settings_id}>
                          <input
                            type="text"
                            className="concession-input"
                            value={parseFloat(item.amt || 0)}
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
                <tr>
                  <td className="bold">
                    <label htmlFor="admissionFeeName">
                      <input
                        type="checkbox"
                        className="mx-1"
                        id="admissionFeeName"
                      />
                      {admissionFeeName}
                    </label>
                  </td>
                  {admissionFeeRow?.map((item: any, index: number) => {
                    return (
                      <td key={item.fee_settings_id}>
                        <input
                          type="text"
                          className="concession-input"
                          value={parseFloat(item.amt || 0)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ) : (
                ""
              )}
              {feesData.feeData.hostel_details[2] ? (
                <>
                  <tr>
                    <td className="bold">
                      <label htmlFor="cautionDepositName">
                        <input
                          type="checkbox"
                          className="mx-1"
                          id="cautionDepositName"
                        />
                        {cautionDepositName}
                      </label>
                    </td>
                    {cautionDepositRow?.map((item: any, index: number) => {
                      return (
                        <td key={item.fee_settings_id}>
                          <input
                            type="text"
                            className="concession-input"
                            value={parseFloat(item.amt || 0)}
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
      <div className="d-flex justify-content-end m-2 bold">
        <p>
          {selection === 1
            ? `Total Amount: ₹${totalAmount}`
            : `Total Calculated Amount (from percentage): ₹${totalAmount}`}
        </p>
      </div>
      <div className="d-flex justify-content-end m-2" style={{ width: "100%" }}>
        <button className="btn-view" style={{ whiteSpace: "nowrap" }}>
          Submit
        </button>
      </div>
    </Row>
  );
}
export default TableDetailsConcession;
