import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DIVISION_LIST,
} from "../../../config/BaseUrl";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { tryFetchPaymentReportData } from "../../../slices/reports/paymentReportSlice";
function PaymentReportHeader() {
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year") as string;
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "13px",
        fontWeight: "400",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontSize: "14px",
      background: "white",
      borderRadius: "6px",
      //   minHeight: 0,
      //   height: "2em",
      borderColor: "white",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,

      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",
      padding: 0,
    }),
    option: (base: any) => ({
      ...base,
      width: "100%",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#3699FF",
      "&:hover": {
        color: "#3699FF",
      },
    }),
  };

  const [classOptions, setClassOptions] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [classId, setClassId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [toDate, setToDate] = useState(new Date());

  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
        setClassOptions(resp.response.data.data);
        console.log("class options ", classOptions);
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
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setClassList(resp.response.data.data);
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
  async function getDivisionList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(DIVISION_LIST, bodyFormData);
      console.log("data is ", resp);
      if (resp.response.data.status == 200) {
        setDivisionList(resp.response.data.data);
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
  const options = classOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
  const classesOption: any = classList.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });
  const divisionOptions: any = divisionList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  const handleYear = (e: any) => {
    setYear(e.value);
  };
  const handleClass = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setClassId(selectedValues);
  };
  const handleDivision = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setDivisionId(selectedValues);
  };
  const handlePaymentReport = () => {
    var data = {
      year: year,
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
       classId: classId,
      divisionId: divisionId,
    };
    dispatch(tryFetchPaymentReportData(data));
  };
  useEffect(() => {
    getAcademicYear();
    getClassList();
    getDivisionList();
  }, []);
  useEffect(() => {
    console.log("from date", Moment(fromDate).format("YYYY-MM-DD"));
  }, [fromDate]);

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
        options={options}
        placeholder="Select year"
        styles={customStyles}
        onChange={handleYear}
        // defaultValue={options.filter((option) => option.label === currentYear)}
        value={options.filter((option) => option.label === year)}
      />
      <Select
        options={classesOption}
        isMulti
        placeholder="Class"
        styles={customStyles}
        onChange={handleClass}
      />
      <Select
        options={divisionOptions}
        isMulti
        placeholder="Division"
        styles={customStyles}
        onChange={handleDivision}
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
        // minDate={fromDate}
      />
      <button
        className="button-70"
        role="button"
        onClick={handlePaymentReport}
        disabled={year === ""}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default PaymentReportHeader;
