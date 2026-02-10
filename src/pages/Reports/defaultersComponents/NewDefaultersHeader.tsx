import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  CONCESSION_TYPE_LIST,
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
  tryFetchNewDefaulterReportData,
  tryFetchNewDefaulterWithDate,
  tryFetchNewDefaulterWithDCBReportData,
  tryFetchPaymentReportData,
} from "../../../slices/reports/paymentReportSlice";
import { tryFetchTransportDefaultersReportData } from "../../../slices/reports/transportReportSlice";
import { tryFetchHostelDefaultersReportData } from "../../../slices/reports/hostelReportSlice";

function NewDefaultersHeader(props: any) {
  const currentYear = localStorage.getItem("year");

  const location = useLocation();
  useEffect(() => {
    console.log("selected key inside header", props.tabKey);
  }, [props.tabKey]);
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
      maxWidth: "15em",
      maxHeight: "2em",
      overflow: "auto",
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

  const [yearOptions, setYearOptions] = useState([]);
  const [classId, setClassId] = useState([]);
  const [divisionId, setDivisionId] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState([]);
  const [concessionType, setConcessionType] = useState([]);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [concessionTypeList, setConcessionTypeList] = useState([]);
  const [concession, setConcession] = useState([]);
  const [date, setDate] = useState(new Date());
  const monthList = [
    {
      name: "All",
      id: "",
    },
      {
      name: "Apr",
      id: 4,
    },
    {
      name: "May",
      id: 5,
    },
    {
      name: "Jun",
      id: 6,
    },
    {
      name: "Jul",
      id: 7,
    },
    {
      name: "Aug",
      id: 8,
    },
    {
      name: "Sep",
      id: 9,
    },
    {
      name: "Oct",
      id: 10,
    },
    {
      name: "Nov",
      id: 11,
    },
    {
      name: "Dec",
      id: 12,
    },
    {
      name: "Jan",
      id: 1,
    },
    {
      name: "Feb",
      id: 2,
    },
    {
      name: "Mar",
      id: 3,
    },
    {
      name: "Apr",
      id: 13,
    },
      {
      name: "May",
      id: 14,
    },
  ];
  const termsList = [
    {
      id: "21",
      name: "Term 1",
    },
    {
      id: "22",
      name: "Term 2",
    },
    {
      id: "23",
      name: "Term 3",
    },
  ];
  async function getClassList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CLASS_LIST, bodyFormData);

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
  async function getConcessionTypeList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(CONCESSION_TYPE_LIST, bodyFormData);

      if (resp.response.data.status == 200) {
        setConcessionTypeList(resp.response.data.data);
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
  const classOptions: any = classList.map((items: any) => {
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
  const monthOptions: any = monthList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  const termOptions: any = termsList.map((items: any) => {
    return {
      value: items.id,
      label: items.name,
    };
  });
  const concessionTypeListOptions = concessionTypeList?.map((items: any) => {
    return {
      label: items.name,
      value: items.id,
    };
  });
  const handleYear = (e: any) => {
    setYear(e.value);
  };
  function handleSelectClass(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setClassId(selectedValues);
  }
  function handleSelectDivision(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setDivisionId(selectedValues);
  }
  function handleSelectMonth(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setMonth(selectedValues);
  }
  function handleSelectConcession(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.label)
      .join(",");
    setConcession(selectedValues);
  }
  const handleFetchReport = () => {
    props.onChangeHeadDate(Moment(date).format("YYYY-MM-DD"));
    var data = {
      year: year,
      classId: classId,
      divisionId: divisionId,
      monthId: month,
      concession: concession,
      date: Moment(date).format("YYYY-MM-DD"),
    };
    if (props.tabKey === "Defaulterswithdate") {
      dispatch(tryFetchNewDefaulterWithDate(data));
    } else {
      dispatch(tryFetchNewDefaulterReportData(data));
      dispatch(tryFetchNewDefaulterWithDCBReportData(data));
    }
  };

  useEffect(() => {
    getAcademicYear();
    getClassList();
    getDivisionList();
    getConcessionTypeList();
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
      {props.tabKey === "Defaulterswithdate" ? (
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
      ) : (
        ""
      )}

      <Select
        options={AcademicYearOptions}
        placeholder="Select year"
        styles={customStyles}
        onChange={(e: any) => setYear(e.value)}
        value={AcademicYearOptions.filter((option) => option.value === year)}
      />
      <Select
        options={classOptions}
        placeholder="Class"
        isMulti
        styles={customStyles}
        onChange={handleSelectClass}
      />
      <Select
        options={divisionOptions}
        placeholder="Division"
        isMulti
        styles={customStyles}
        onChange={handleSelectDivision}
      />
      {props.tabKey === "Defaulterswithdate" ? (
        <Select
          options={termOptions}
          placeholder="Select Term"
          styles={customStyles}
          isMulti
          onChange={handleSelectMonth}
        />
      ) : (
        <Select
          options={monthOptions}
          placeholder="Select Month"
          styles={customStyles}
          isMulti
          onChange={handleSelectMonth}
        />
      )}
      {props.tabKey === "Defaulterswithdate" ? (
        ""
      ) : (
        <Select
          options={concessionTypeListOptions}
          placeholder="Select Concession"
          isMulti
          styles={customStyles}
          onChange={handleSelectConcession}
        />
      )}
      <button
        className="button-70"
        role="button"
        onClick={handleFetchReport}
        disabled={year === "" || month === null}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default NewDefaultersHeader;
