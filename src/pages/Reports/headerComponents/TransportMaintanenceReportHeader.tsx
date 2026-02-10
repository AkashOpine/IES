import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import Select, { OptionsOrGroups } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { tryFetchTransportListData } from "../../../slices/transport/transportSlice";
import {
  tryFetchTransportFuelReportData,
  tryFetchTransportMaintanenceReportData,
} from "../../../slices/reports/transportReportSlice";
function TransportMaintanenceReportHeader() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryFetchTransportListData());
  }, []);
  const transportData: any = useSelector((state: any) => state.transport);
  const [vehicle, setVehicle] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  function handleSelectChange(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setVehicle(selectedValues);
  }
  const handlePaymentModeReport = () => {
    var data = {
      vehicleId: vehicle,
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
    };
    // console.log("vehicle id", data);
    dispatch(tryFetchTransportMaintanenceReportData(data));
  };
  const vehicleListOption: any = transportData.transportListTableData?.map(
    (items: any) => {
      return {
        value: items.id,
        label: items.vehicle_no,
      };
    }
  );
  const separater = useMemo(() => {
    return <div className="sep"></div>;
  }, []);
  const arrowDown = useMemo(() => {
    return (
      <div className="arrow">
        <FaChevronRight />
      </div>
    );
  }, []);
  return (
    <div className="header-items">
      <Select
        options={vehicleListOption}
        placeholder="Select Vehicle"
        isMulti
        styles={customStyles}
        onChange={handleSelectChange}
        // value={vehicle}
      />
      <DatePicker
        onChange={setFromDate}
        value={fromDate}
        className="datepicker"
        clearIcon={separater}
        calendarIcon={arrowDown}
        dayPlaceholder="day"
        monthPlaceholder="month"
        yearPlaceholder="year"
        format="y-MM-dd"
      />
      <span style={{ color: "#80808F", fontSize: "14px", fontWeight: "500" }}>
        TO
      </span>
      <DatePicker
        onChange={setToDate}
        value={toDate}
        className="datepicker"
        clearIcon={separater}
        calendarIcon={arrowDown}
        dayPlaceholder="day"
        monthPlaceholder="month"
        yearPlaceholder="year"
        format="y-MM-dd"
        minDate={fromDate}
      />
      <button
        className="button-70"
        role="button"
        onClick={handlePaymentModeReport}
        // disabled={vehicle === ""}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default TransportMaintanenceReportHeader;
