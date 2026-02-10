import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import axios from "axios";
import Select from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  CLASS_LIST,
  DIVISION_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../../config/BaseUrl";
import { useDispatch } from "react-redux";
import { tryFetchTransportStudentListData } from "../../../slices/transport/transportSlice";
function TransportStudentListNav() {
  const dispatch = useDispatch();
  const [route, setRoute] = useState("");
  const [className, setClassName] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: "14px",
        fontWeight: "600",
      };
    },
    control: (base: any, state: { isFocused: any }) => ({
      ...base,

      background: "#f3f6f9",
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      minHeight: 0,

      height: "38px",
      borderColor: "#f3f6f9",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#" : "#",
      },
    }),
    menu: (base: any) => ({
      ...base,

      borderRadius: 0,
      width: "18em",
      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      fontSize: "13px",

      padding: 0,
    }),
  };
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
  const handleClass = (e: any) => {
    setClassName(e.value);
  };
  const handleDivision = (e: any) => {
    setDivisionName(e.value);
  };
  const handleRoute = (e: any) => {
    setRoute(e.value);
  };

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
  const handleSearch = () => {
    var data = {
      route: route,
      division: divisionName,
      class: className,
    };
    dispatch(tryFetchTransportStudentListData(data));
  };
  useEffect(() => {
    getClassList();
    getDivisionList();
    getRouteList();
  }, []);
  return (
    <Row>
      <Col md={12} className="d-flex gap-3 align-items-center">
        <Select
          options={routeOptions}
          placeholder="Route"
          styles={customStyles}
          onChange={handleRoute}
        />
        <Select
          options={classOptions}
          placeholder="Class"
          styles={customStyles}
          onChange={handleClass}
        />
        <Select
          options={divisionOptions}
          placeholder="Division"
          styles={customStyles}
          onChange={handleDivision}
        />

        <button className="button-70" role="button" onClick={handleSearch}>
          <span>Search</span>
        </button>
      </Col>
    </Row>
  );
}

export default TransportStudentListNav;
