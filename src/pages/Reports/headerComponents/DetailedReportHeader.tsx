import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DIVISION_LIST,
} from "../../../config/BaseUrl";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import {
  tryFetchDcbReportData,
  tryFetchDefaultersReportData,
  tryFetchDetailedFeeReportData,
  tryFetchPaymentReportData,
} from "../../../slices/reports/paymentReportSlice";
function DetailedReportHeader() {
  const currentYear = localStorage.getItem("year");
  const location = useLocation();
  console.log("location poath name", location.pathname);
  const dispatch = useDispatch();
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
  const [year, setYear] = useState(currentYear);
  const [yearOptions, setYearOptions] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [month, setMonth] = useState("");
  const monthList = [
    {
      name: "All",
      id: "",
    },
    {
      name: "May",
      id: 5,
    },
    {
      name: "June",
      id: 6,
    },
    {
      name: "July",
      id: 7,
    },
    {
      name: "August",
      id: 8,
    },
    {
      name: "September",
      id: 9,
    },
    {
      name: "October",
      id: 10,
    },
    {
      name: "November",
      id: 11,
    },
    {
      name: "December",
      id: 12,
    },
    {
      name: "January",
      id: 1,
    },
    {
      name: "February",
      id: 2,
    },
    {
      name: "March",
      id: 3,
    },
    {
      name: "April",
      id: 4,
    },
  ];
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status === 200) {
        setYearOptions(resp.response.data.data);
        console.log("class options ", yearOptions);
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
  const options: any = yearOptions.map((item: any) => {
    return {
      value: item,
      label: item,
    };
  });
  const monthOptions: any = monthList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  const handleYear = (e: any) => {
    setYear(e.value);
  };
  const handleMonth = (e: any) => {
    setMonth(e.value);
  };
  const handleFetchReport = () => {
    var data = {
      date: Moment(fromDate).format("YYYY-MM-DD"),
      year: year,
      monthId: month,
    };
    dispatch(tryFetchDetailedFeeReportData(data));
  };

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
        onChange={handleYear}
        value={options.filter((option: any) => option.value === year)}
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
      <Select
        options={monthOptions}
        placeholder="Select Month"
        styles={customStyles}
        onChange={handleMonth}
      />
      <button
        className="button-70"
        // role="button"
        onClick={handleFetchReport}
        disabled={year === "" || month === ""}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default DetailedReportHeader;
