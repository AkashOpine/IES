import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DIVISION_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../../config/BaseUrl";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import { useDispatch } from "react-redux";
import {
  tryFetchDcbReportData,
  tryFetchDefaultersReportData,
  tryFetchPaymentReportData,
} from "../../../slices/reports/paymentReportSlice";
import { tryFetchTransportDefaultersReportData } from "../../../slices/reports/transportReportSlice";
import {
  tryFetchHostelDefaultersReportData,
  tryFetchHostelListReportData,
} from "../../../slices/reports/hostelReportSlice";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import {
  tryFetchTransportConsolidatedDcbData,
  tryFetchTransportDetailsDcbData,
  tryFetchTransportRouteWiseDcbData,
} from "../../../slices/dcbReports/dcbReportSlice";

function TransportDcbReportHeader() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [yearOptions, setYearOptions] = useState([]);
  const currentYear = localStorage.getItem("year");
  const [classId, setClassId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState([]);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [route, setRoute] = useState("");
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
  const hostelList = [
    { name: "Boys", id: 1 },
    { name: "Girls", id: 2 },
  ];
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
  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
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
  async function getRouteList() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(TRANSPORT_SETTING_ROUTE_LIST, bodyFormData);
      console.log("route data is ", resp);
      if (resp.response.data.status == 200) {
        setRouteList(resp.response.data.data);
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

  const options = yearOptions?.map((items: any) => {
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
  const routeOptions: any = routeList?.map((items: any) => {
    return {
      value: items.id,
      label: items.route,
    };
  });

  const handleRoute = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setRoute(selectedValues);
  };
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
  const handleMonth = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      .map((option: any) => option.value)
      .join(",");
    setMonth(selectedValues);
  };
  const handleFetchReport = () => {
    var data = {
      year: year,
      classId: classId,
      divisionId: divisionId,
      monthId: month,
      route: route,
      date: date,
    };
    if (location.pathname === "/transport-detailed-dcb-report") {
      dispatch(tryFetchTransportDetailsDcbData(data));
    }
    if (location.pathname === "/transport-route-wise-dcb-report") {
      dispatch(tryFetchTransportRouteWiseDcbData(data));
    }
    if (location.pathname === "/transport-consolidated-dcb-report") {
      dispatch(tryFetchTransportConsolidatedDcbData(data));
    }
  };

  useEffect(() => {
    getAcademicYear();
    getClassList();
    getDivisionList();
    getRouteList();
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
        value={options.filter((option) => option.value === year)}
      />
      {location.pathname === "/transport-detailed-dcb-report" ||
      location.pathname === "/transport-route-wise-dcb-report" ? (
        <>
          <Select
            options={routeOptions}
            placeholder="Select Route"
            isMulti
            styles={customStyles}
            onChange={handleRoute}
          />
          <Select
            options={classOptions}
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
          {location.pathname === "/transport-detailed-dcb-report" ? (
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
            options={monthOptions}
            isMulti
            placeholder="Select Month"
            styles={customStyles}
            onChange={handleMonth}
          />
        </>
      ) : (
        ""
      )}

      {/* {location.pathname === "/hostel-defaulters-report" ? ( */}
      <button className="button-70" role="button" onClick={handleFetchReport}>
        <span>Search</span>
      </button>
      {/* ) : (
        <button className="button-70" role="button" onClick={handleFetchReport}>
          <span>Search</span>
        </button>
      )} */}
    </div>
  );
}

export default TransportDcbReportHeader;
