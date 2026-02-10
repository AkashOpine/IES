import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { apiPost } from "../../../config/apiConfig";
import {
  ACADEMIC_YEAR,
  CLASS_LIST,
  DIVISION_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../../config/BaseUrl";
import { useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { tryFetchPickupPointListData } from "../../../slices/transport/transportSlice";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
import { tryFetchClassSearchList } from "../../../slices/navsearch/ClassWiseSearchSlice";
function ClassHeader() {
  const location = useLocation();
  // console.log("location poath name", location.pathname);
  const dispatch = useDispatch();
  const TransportLists: any = useSelector((state: any) => state.transport);
  const [classList, setClassList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [className, setClassName] = useState("");
  const [divisionName, setDivisionName] = useState("");

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
  const handleClass = (e: any) => {
    setClassName(e.value);
  };
  const handleDivision = (e: any) => {
    setDivisionName(e.value);
  };
  function fetchClassWiseDetails() {
    const searchValue = {
      classSearch: className,
      divisionSearch: divisionName,
      year: "",
    };
    dispatch(tryFetchClassSearchList(searchValue));
    // history(`/class-wise-list`);
  }

  useEffect(() => {
    getClassList();
    getDivisionList();
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
      <button
        className="button-70"
        role="button"
        onClick={() => fetchClassWiseDetails()}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default ClassHeader;
