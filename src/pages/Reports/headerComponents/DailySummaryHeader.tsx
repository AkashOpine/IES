import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR } from "../../../config/BaseUrl";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { tryFetchDailySummaryReportData } from "../../../slices/reports/paymentReportSlice";
function DailySummaryHeader() {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(new Date());

  const [yearOptions, setYearOptions] = useState([]);
  const currentYear = localStorage.getItem("year");
  const [year, setYear] = useState(currentYear);
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

  const [date, setDate] = useState(new Date());

  const handleSummaryReport = () => {
    var data = {
      academicYear: year,
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      date: Moment(date).format("YYYY-MM-DD"),
    };
    dispatch(tryFetchDailySummaryReportData(data));
  };

  const options = yearOptions?.map((items: any) => {
    return {
      label: items,
      value: items,
    };
  });
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
  return (
    <div className="header-items">
      <Select
        options={options}
        placeholder="Select year"
        styles={customStyles}
        onChange={(e: any) => setYear(e.value)}
        value={options.filter((option) => option.value === year)}
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
        onChange={setDate}
        value={date}
        className="datepicker"
        clearIcon={separater}
        calendarIcon={arrowDown}
        dayPlaceholder="day"
        monthPlaceholder="month"
        yearPlaceholder="year"
        format="y-MM-dd"
      />
      <button className="button-70" role="button" onClick={handleSummaryReport}>
        <span>Search</span>
      </button>
    </div>
  );
}

export default DailySummaryHeader;
