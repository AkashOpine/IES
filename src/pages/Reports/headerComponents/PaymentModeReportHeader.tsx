import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR } from "../../../config/BaseUrl";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { tryFetchPaymentModeReportData } from "../../../slices/reports/paymentReportSlice";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
function PaymentModeReportHeader() {
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year");

  const [paymentMode, setPaymentMode] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [yearOptions, setYearOptions] = useState([]);
  const [year, setYear] = useState(currentYear);

  // const handlePaymentMode = (e: any) => {
  //   setPaymentMode(e.name);
  // };
  function handlePaymentMode(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.label)
      .join(",");
    setPaymentMode(selectedValues);
  }
  const handlePaymentModeReport = () => {
    var data = {
      academicYear: year,
      paymentType: paymentMode,
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
    };
    dispatch(tryFetchPaymentModeReportData(data));
  };
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);

      if (resp.response.data.status == 200) {
        setYearOptions(resp.response.data.data);
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
  const AcademicYearOptions = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  useEffect(() => {
    getAcademicYear();
  }, []);

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
  const options = [
    {
      value: "0",
      label: "All",
      name: "all",
    },
    {
      value: "1",
      label: "Cash",
      name: "cash",
    },
    {
      value: "2",
      label: "Online",
      name: "online",
    },
    {
      value: "3",
      label: "Bank",
      name: "bank",
    },
    {
      value: "4",
      label: "Card",
      name: "card",
    },
    {
      value: "5",
      label: "Cheque",
      name: "cheque",
    },
  ];
  return (
    <div className="header-items">
      <Select
        options={AcademicYearOptions}
        placeholder="Select year"
        styles={customStyles}
        onChange={(e: any) => setYear(e.value)}
        value={AcademicYearOptions.filter((option) => option.value === year)}
      />
      <Select
        options={options}
        isMulti
        placeholder="Select payment mode"
        styles={customStyles}
        onChange={handlePaymentMode}
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
        disabled={paymentMode.length === 0}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default PaymentModeReportHeader;
