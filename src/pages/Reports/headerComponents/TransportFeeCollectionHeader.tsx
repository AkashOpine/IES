import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import { FaChevronRight } from "react-icons/fa";
import Moment from "moment";
import Select, { OptionsOrGroups } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { tryFetchTransportListData } from "../../../slices/transport/transportSlice";
import {
  tryFetchTransportFeeCollectionReportData,
  tryFetchTransportFuelReportData,
} from "../../../slices/reports/transportReportSlice";
import {
  CLASS_LIST,
  DIVISION_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../../config/BaseUrl";
import { apiPost } from "../../../config/apiConfig";
import axios from "axios";
function TranspoetFeeCollectionHeader() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryFetchTransportListData());
  }, []);
  const transportData: any = useSelector((state: any) => state.transport);
  const [vehicle, setVehicle] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [className, setClassName] = useState("");
  const [route, setRoute] = useState([]);
  const [divisionName, setDivisionName] = useState("");
  const [routeList, setRouteList] = useState([]);

  //   payment mode handle function
  function handleRoute(selectedOptions: any) {
    const selectedValues = selectedOptions
      .map((option: any) => option.label)
      .join(",");
    setRoute(selectedValues);
  }
  const handleGetTransportFeeCollectionReport = () => {
    var data = {
      class: className,
      division: divisionName,
      from: Moment(fromDate).format("YYYY-MM-DD"),
      to: Moment(toDate).format("YYYY-MM-DD"),
      route_id: route,
    };
    dispatch(tryFetchTransportFeeCollectionReportData(data));
  };
  const handleClass = (e: any) => {
    const selectedValues = e.map((option: any) => option.id).join(",");
    setClassName(selectedValues);
  };
  const handleDivision = (e: any) => {
    const selectedValues = e.map((option: any) => option.id).join(",");
    setDivisionName(selectedValues);
  };
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
  useEffect(() => {
    getClassList();
    getDivisionList();
    getRouteList();
  }, []);

  const classOptions: any = classList?.map((items: any) => {
    return {
      value: items.id,
      label: items.class_name,
    };
  });
  const divisionOptions: any = divisionList?.map((items: any) => {
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
  const paymentOptions = [
    // {
    //   value: "0",
    //   label: "All",
    //   name: "all",
    // },
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
        options={classOptions}
        placeholder="Class"
        styles={customStyles}
        isMulti
        onChange={handleClass}
      />
      <Select
        options={divisionOptions}
        placeholder="Division"
        styles={customStyles}
        onChange={handleDivision}
        isMulti
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
      <Select
        options={routeOptions}
        isMulti
        placeholder="Select Route"
        styles={customStyles}
        onChange={handleRoute}
      />
      <button
        className="button-70"
        role="button"
        onClick={handleGetTransportFeeCollectionReport}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default TranspoetFeeCollectionHeader;
