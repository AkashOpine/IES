import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import { ACADEMIC_YEAR } from "../../../config/BaseUrl";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import {
  setMiscReportFilters,
  tryFetchHeadWiseReportData,
  tryFetchMiscellaneousReportData,
  tryFetchPaymentModeReportData,
} from "../../../slices/reports/paymentReportSlice";
import { useLocation } from "react-router-dom";
import { getFeeHeadListApi, getMissFeeListApi } from "../../feeSettings/addFeeSettings/services";
function HeadWiseReportHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentYear = localStorage.getItem("year");
  const [yearOptions, setYearOptions] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [paymentMode, setPaymentMode] = useState("");
  const [feeHeadList, setFeeHeadList] = useState([]);
  const [feeHeadData, setFeeHeadData] = useState("");

  useEffect(() => {
    getMissFeeListApi().then(setFeeHeadList).catch(console.error);
  }, []);
  useEffect(() => {
    console.log("feeHeadList",feeHeadList);
    
  }, [feeHeadList])
  
  const feeHeadOptions: any = feeHeadList.map((items: any) => {
    return {
      value: items.id,
      label: items.fee_head_name,
    };
  });
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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handlePaymentModeReport = () => {
    var data = {
      academicYear: year,
      paymentMode: paymentMode,
      fromDate: Moment(fromDate).format("YYYY-MM-DD"),
      toDate: Moment(toDate).format("YYYY-MM-DD"),
      feeHeads: feeHeadData,
    };
    if (location.pathname === "/miscellaneous-report") {
      dispatch(setMiscReportFilters(data));
      dispatch(tryFetchMiscellaneousReportData(data));
    } else {
      dispatch(tryFetchHeadWiseReportData(data));
    }
  };

  useEffect(() => {
    console.log("from date", Moment(fromDate).format("YYYY-MM-DD"));
  }, [fromDate]);
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
  const paymentOptions = [
    { value: "card", label: "Card" },
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank" },
    { value: "online", label: "Online" },
  ];
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

  useEffect(() => {
    console.log("feeHeadData", feeHeadData);
  }, [feeHeadData]);

  return (
    <div className="header-items">
      <Select
        options={options}
        placeholder="Select year"
        styles={customStyles}
        onChange={(e: any) => setYear(e.value)}
        value={options.filter((option) => option.value === year)}
      />
      <Select
        options={paymentOptions}
        placeholder="Select payment mode"
        styles={customStyles}
        onChange={(e: any) => {
          setPaymentMode(e.value);
        }}
        // defaultValue={classOptions.filter(
        //   (item: any) => item.label === "All"
        // )}
        // filterOption={(option) => option.label !== "All"}
      />
      {location.pathname === "/miscellaneous-report" && (
        <Select
          options={feeHeadOptions}
          placeholder="Select Fee Head"
          styles={customStyles}
          value={feeHeadOptions.find((opt: any) => opt.value === feeHeadData)}
          onChange={(e) => setFeeHeadData(e.value)}
        />
      )}

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
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default HeadWiseReportHeader;
