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

import { useDispatch } from "react-redux";
import { tryFetchPickupPointListData } from "../../../slices/transport/transportSlice";
import { customStyles } from "../../../components/inputComponent/SelectStyle";
function Header() {
  const location = useLocation();
  // console.log("location poath name", location.pathname);
  const dispatch = useDispatch();

  const [yearOptions, setYearOptions] = useState([]);
  const [year, setYear] = useState("");
  const [routeList, setRouteList] = useState([]);
  const [route, setRoute] = useState("");

  async function getAcademicYear() {
    try {
      var token = localStorage.getItem("token") as string;
      var bodyFormData = new FormData();
      bodyFormData.append("Authorization", token);
      let resp: any = await apiPost(ACADEMIC_YEAR, bodyFormData);
      // console.log("ACADEMIC YEAR ", resp);
      if (resp.response.data.status == 200) {
        setYearOptions(resp.response.data.data);
        // console.log("class options ", yearOptions);
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
      // console.log("route data is ", resp);
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
  const routeOptions: any = routeList?.map((items: any) => {
    return {
      value: items.id,
      label: items.route,
    };
  });

  const handleYear = (e: any) => {
    setYear(e.value);
  };
  const handleRoute = (e: any) => {
    setRoute(e.value);
  };
  const handleFetchReport = () => {
    var data = {
      year: year,
      route: route,
    };

    dispatch(tryFetchPickupPointListData(data));
  };

  useEffect(() => {
    getAcademicYear();
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
        defaultValue={options.filter((option) => option.label === "2022-2023")}
      />
      <Select
        options={routeOptions}
        placeholder="Route"
        styles={customStyles}
        onChange={handleRoute}
      />
      <button
        className="button-70"
        role="button"
        onClick={handleFetchReport}
        // disabled={year === ""}
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default Header;
